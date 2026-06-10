#!/usr/bin/env node

/**
 * ZSF Physik 1 — Rules → Adapter compiler.
 *
 * Quelle der Wahrheit: `rules/*.md` (mit YAML-Frontmatter)
 *
 * Generierte Outputs:
 *   - `MODULAR_SYSTEM.md`                  (Pflichtdoku für Menschen)
 *   - `CLAUDE.md`                          (Anthropic / Claude Code)
 *   - `AGENTS.md`                          (Codex / OpenAI Agents)
 *   - `.github/copilot-instructions.md`    (GitHub Copilot)
 *   - `.cursor/rules/<rulename>.mdc`       (Cursor Project Rules — eine Datei pro Quell-Regel)
 *
 * Aufruf:
 *   node tools/sync-agent-rules.mjs           # write
 *   node tools/sync-agent-rules.mjs --check   # check (exit 1 bei Drift)
 *
 * Hinweis: Alle generierten Dateien tragen einen "AUTO-GENERATED"-Banner mit
 * rules-hash. Niemals direkt editieren — immer `rules/*.md` ändern + `make sync-rules`.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');
const RULES_DIR = path.resolve(ROOT, 'rules');
const PROJECT_SLUG = 'zsf-physik1';
const PROJECT_TITLE = 'ZSF Physik 1';

// Generische Build-Hinweise. Forks ändern hier nichts — der konkrete
// PDF-Name steht im Makefile ($(PDF_BASENAME)).
const WORKING_COMMANDS = [
  '- `make build`        — latexmk → `$(PDF_BASENAME).pdf` (Aux-Files nach build/)',
  '- `make check`        — full check (main, chapters, root, pdf-identity, lint, rule-authorship, rules)',
  '- `make sync-rules`   — `rules/*.md` → alle Adapter regenerieren',
  '- `make check-rules`  — Drift-Check über Hash-Stempel'
];

const FLAT_TARGETS = [
  { key: 'modular', file: 'MODULAR_SYSTEM.md', tool: 'Menschen (Pflichtdokumentation)' },
  { key: 'claude', file: 'CLAUDE.md', tool: 'Claude / Anthropic' },
  { key: 'agents', file: 'AGENTS.md', tool: 'Codex / OpenAI Agents' },
  { key: 'copilot', file: '.github/copilot-instructions.md', tool: 'GitHub Copilot' }
];

function listRuleFiles() {
  if (!fs.existsSync(RULES_DIR)) return [];
  return fs
    .readdirSync(RULES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function splitFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: '', body: content.trim() };
  }
  return { frontmatter: match[1], body: match[2].trim() };
}

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseInlineArray(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseFrontmatter(frontmatter) {
  const meta = {
    description: '',
    globs: [],
    alwaysApply: false,
    decisionOwner: '',
    decisionStatus: '',
    lastUpdatedBy: '',
    lastUpdatedAt: ''
  };

  const lines = frontmatter.replace(/\r/g, '').split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const sep = line.indexOf(':');
    if (sep === -1) continue;

    const key = line.slice(0, sep).trim();
    const raw = line.slice(sep + 1).trim();

    if (key === 'description') { meta.description = stripWrappingQuotes(raw); continue; }
    if (key === 'alwaysApply') { meta.alwaysApply = raw === 'true'; continue; }
    if (key === 'decisionOwner') { meta.decisionOwner = stripWrappingQuotes(raw); continue; }
    if (key === 'decisionStatus') { meta.decisionStatus = stripWrappingQuotes(raw); continue; }
    if (key === 'lastUpdatedBy') { meta.lastUpdatedBy = stripWrappingQuotes(raw); continue; }
    if (key === 'lastUpdatedAt') { meta.lastUpdatedAt = stripWrappingQuotes(raw); continue; }

    if (key !== 'globs') continue;

    if (!raw) {
      const globs = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        i += 1;
        globs.push(stripWrappingQuotes(lines[i].replace(/^\s*-\s+/, '').trim()));
      }
      meta.globs = globs;
      continue;
    }

    if (raw.startsWith('[')) { meta.globs = parseInlineArray(raw); continue; }
    meta.globs = [stripWrappingQuotes(raw)];
  }

  return meta;
}

function shiftHeadings(markdown, baseLevel = 3) {
  return markdown.replace(/^(#{1,6})(\s+)/gm, (_, hashes, space) => {
    const next = Math.min(hashes.length + baseLevel, 6);
    return `${'#'.repeat(next)}${space}`;
  });
}

function readRule(name) {
  const raw = fs.readFileSync(path.resolve(RULES_DIR, name), 'utf8');
  const { frontmatter, body } = splitFrontmatter(raw);
  const meta = parseFrontmatter(frontmatter);
  return {
    name,
    sourcePath: `rules/${name}`,
    raw,
    frontmatter,
    body,
    meta
  };
}

function summarizeScope(rule) {
  const { alwaysApply, globs } = rule.meta;
  if (alwaysApply && globs.length === 0) return 'Project-wide';
  if (alwaysApply && globs.length > 0) {
    return `Project-wide; besonders relevant für ${globs.map((g) => `\`${g}\``).join(', ')}`;
  }
  if (globs.length > 0) {
    return `Scoped; gilt bei Änderungen an ${globs.map((g) => `\`${g}\``).join(', ')}`;
  }
  return 'Scoped; keine globs deklariert';
}

function hashRules(rules) {
  const h = crypto.createHash('sha256');
  for (const r of rules) h.update(r.raw);
  return h.digest('hex').slice(0, 16);
}

function buildFlatContent({ kind, rules, hash }) {
  const target = FLAT_TARGETS.find((t) => t.key === kind);
  const title = target?.file ?? 'CLAUDE.md';
  const toolLabel = target?.tool ?? 'KI-Agenten';

  const intro = `Kompiliertes Regelwerk für ${toolLabel}. Diese Datei ist eigenständig — sie enthält alle Projekt-Regeln für Tools, die nur \`${title}\` lesen.`;

  const lines = [];
  lines.push(`# ${PROJECT_TITLE} — ${title}`);
  lines.push('');
  lines.push(`> AUTO-GENERATED — rules-hash:${hash}`);
  lines.push('>');
  lines.push('> Quelle: `rules/*.md` (mit YAML-Frontmatter).');
  lines.push('> Nicht direkt bearbeiten. Änderungen: `rules/*.md` editieren → `make sync-rules`.');
  lines.push('> Drift-Check: `make check-rules`.');
  lines.push('');
  lines.push(intro);
  lines.push('');
  lines.push('## Source of Truth');
  lines.push('');
  lines.push('Bei Konflikt zwischen dieser Datei und `rules/*.md` gewinnen die Quelldateien.');
  lines.push('');
  for (const r of rules) lines.push(`- \`${r.sourcePath}\``);
  lines.push('');
  lines.push('## Working Commands');
  lines.push('');
  for (const cmd of WORKING_COMMANDS) lines.push(cmd);
  lines.push('');
  lines.push('## Operating Mode');
  lines.push('');
  lines.push('- Wenn dies die einzige geladene KI-Regel-Datei ist, gelten die kompilierten Regeln unten als verbindlich.');
  lines.push('- `alwaysApply: true`-Regeln sind Projekt-weit aktiv. `globs`-Scope-Regeln greifen nur bei passenden Pfaden.');
  lines.push('- Niemals diese Datei direkt editieren — immer `rules/*.md` ändern und neu kompilieren.');
  lines.push('');
  lines.push('## Rule Index');
  lines.push('');
  for (const r of rules) {
    const desc = r.meta.description || '(keine Beschreibung)';
    lines.push(`- \`${r.name}\` — ${summarizeScope(r)} — ${desc}`);
  }
  lines.push('');
  lines.push('## Compiled Rules');
  lines.push('');
  for (const r of rules) {
    lines.push(`### \`${r.name}\``);
    lines.push('');
    lines.push(`- Quelle: \`${r.sourcePath}\``);
    lines.push(`- Scope: ${summarizeScope(r)}`);
    if (r.meta.description) lines.push(`- Beschreibung: ${r.meta.description}`);
    if (r.meta.lastUpdatedAt) {
      const by = r.meta.lastUpdatedBy ? ` (${r.meta.lastUpdatedBy})` : '';
      lines.push(`- Zuletzt aktualisiert: ${r.meta.lastUpdatedAt}${by}`);
    }
    lines.push('');
    lines.push(shiftHeadings(r.body));
    lines.push('');
  }
  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}

function buildCursorMdc({ rule, hash }) {
  const fm = [];
  fm.push('---');
  fm.push(`description: "${rule.meta.description.replace(/"/g, '\\"')}"`);
  if (rule.meta.globs.length === 0) {
    fm.push('globs: ""');
  } else {
    fm.push(`globs: "${rule.meta.globs.join(',')}"`);
  }
  fm.push(`alwaysApply: ${rule.meta.alwaysApply ? 'true' : 'false'}`);
  if (rule.meta.decisionOwner) fm.push(`decisionOwner: ${rule.meta.decisionOwner}`);
  if (rule.meta.decisionStatus) fm.push(`decisionStatus: ${rule.meta.decisionStatus}`);
  if (rule.meta.lastUpdatedBy) fm.push(`lastUpdatedBy: ${rule.meta.lastUpdatedBy}`);
  if (rule.meta.lastUpdatedAt) fm.push(`lastUpdatedAt: ${rule.meta.lastUpdatedAt}`);
  fm.push('---');
  fm.push(`<!-- AUTO-GENERATED — rules-hash:${hash} —`);
  fm.push(`     Quelle: ${rule.sourcePath}. Nicht direkt bearbeiten. Änderungen → \`make sync-rules\`. -->`);
  fm.push('');
  fm.push(rule.body);
  fm.push('');
  return `${fm.join("\n").replace(/\n+$/, "")}\n`;
}

function readCurrent(file) {
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8');
}

function ensureDirFor(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function listExistingCursorMdcs() {
  const dir = path.resolve(ROOT, '.cursor/rules');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.mdc'))
    .map((e) => path.resolve(dir, e.name));
}

function expectedCursorMdcPath(rule) {
  const base = rule.name.replace(/\.md$/, '');
  return path.resolve(ROOT, '.cursor/rules', `${PROJECT_SLUG}.${base}.mdc`);
}

function main() {
  const mode = process.argv.includes('--check') ? 'check' : 'write';

  const ruleNames = listRuleFiles();
  if (ruleNames.length === 0) {
    process.stdout.write('[sync-agent-rules] Keine rules/*.md gefunden — übersprungen.\n');
    process.exit(0);
  }

  const rules = ruleNames.map(readRule);
  const hash = hashRules(rules);

  const work = [];

  for (const target of FLAT_TARGETS) {
    const file = path.resolve(ROOT, target.file);
    const expected = buildFlatContent({ kind: target.key, rules, hash });
    work.push({ file, expected });
  }

  const expectedMdcPaths = new Set();
  for (const rule of rules) {
    const file = expectedCursorMdcPath(rule);
    expectedMdcPaths.add(file);
    const expected = buildCursorMdc({ rule, hash });
    work.push({ file, expected });
  }

  const obsoleteMdcs = listExistingCursorMdcs().filter((p) => !expectedMdcPaths.has(p));

  if (mode === 'check') {
    const drifted = [];
    for (const { file, expected } of work) {
      const current = readCurrent(file);
      if (current !== expected) drifted.push(path.relative(ROOT, file));
    }
    for (const p of obsoleteMdcs) drifted.push(`${path.relative(ROOT, p)} (verwaist)`);

    if (drifted.length > 0) {
      process.stderr.write(`[sync-agent-rules] Out-of-sync (rules-hash:${hash}):\n`);
      for (const d of drifted) process.stderr.write(`  - ${d}\n`);
      process.stderr.write('Run: make sync-rules\n');
      process.exit(1);
    }
    process.stdout.write(`[sync-agent-rules] Alle Adapter synchron (rules-hash:${hash}).\n`);
    return;
  }

  for (const { file, expected } of work) {
    ensureDirFor(file);
    fs.writeFileSync(file, expected, 'utf8');
    process.stdout.write(`[sync-agent-rules] wrote ${path.relative(ROOT, file)}\n`);
  }
  for (const p of obsoleteMdcs) {
    fs.unlinkSync(p);
    process.stdout.write(`[sync-agent-rules] removed ${path.relative(ROOT, p)} (verwaist)\n`);
  }
  process.stdout.write(`[sync-agent-rules] fertig — rules-hash:${hash}\n`);
}

main();
