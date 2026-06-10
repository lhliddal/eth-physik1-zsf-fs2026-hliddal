#!/usr/bin/env node

/**
 * check-rule-authorship — Validiert Pflicht-Frontmatter in rules/*.md.
 *
 * Pflicht-Felder pro Rule-Datei:
 *   - description (non-empty)
 *   - alwaysApply (true|false)
 *   - lastUpdatedBy
 *   - lastUpdatedAt (YYYY-MM-DD)
 *
 * Aufruf:
 *   node tools/check-rule-authorship.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');
const RULES_DIR = path.resolve(ROOT, 'rules');

const REQUIRED = ['description', 'alwaysApply', 'lastUpdatedBy', 'lastUpdatedAt'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function splitFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  return m[1];
}

function parseSimple(frontmatter) {
  const out = {};
  const lines = frontmatter.replace(/\r/g, '').split('\n');
  for (const line of lines) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let raw = line.slice(sep + 1).trim();
    if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
      raw = raw.slice(1, -1);
    }
    out[key] = raw;
  }
  return out;
}

function listRules() {
  if (!fs.existsSync(RULES_DIR)) return [];
  return fs
    .readdirSync(RULES_DIR)
    .filter((n) => n.endsWith('.md'))
    .sort();
}

function main() {
  const violations = [];
  const rules = listRules();
  if (rules.length === 0) {
    process.stdout.write('[check-rule-authorship] Keine rules/*.md gefunden.\n');
    process.exit(0);
  }

  for (const name of rules) {
    const file = path.resolve(RULES_DIR, name);
    const raw = fs.readFileSync(file, 'utf8');
    const fm = splitFrontmatter(raw);
    if (!fm) {
      violations.push(`${name}: kein Frontmatter`);
      continue;
    }
    const meta = parseSimple(fm);
    for (const key of REQUIRED) {
      if (!(key in meta) || meta[key] === '') {
        violations.push(`${name}: Pflicht-Feld fehlt → ${key}`);
      }
    }
    if (meta.alwaysApply && !['true', 'false'].includes(meta.alwaysApply)) {
      violations.push(`${name}: alwaysApply muss true|false sein (ist: ${meta.alwaysApply})`);
    }
    if (meta.lastUpdatedAt && !DATE_RE.test(meta.lastUpdatedAt)) {
      violations.push(`${name}: lastUpdatedAt muss YYYY-MM-DD sein (ist: ${meta.lastUpdatedAt})`);
    }
  }

  if (violations.length > 0) {
    process.stderr.write('[check-rule-authorship] Verletzungen:\n');
    for (const v of violations) process.stderr.write(`  - ${v}\n`);
    process.exit(1);
  }
  process.stdout.write(`[check-rule-authorship] ${rules.length} Rule-Datei(en) OK.\n`);
}

main();
