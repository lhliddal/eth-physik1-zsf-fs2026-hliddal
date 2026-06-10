# ZSF Physik 1 — MODULAR_SYSTEM.md

> AUTO-GENERATED — rules-hash:3be09ae71ee64fd2
>
> Quelle: `rules/*.md` (mit YAML-Frontmatter).
> Nicht direkt bearbeiten. Änderungen: `rules/*.md` editieren → `make sync-rules`.
> Drift-Check: `make check-rules`.

Kompiliertes Regelwerk für Menschen (Pflichtdokumentation). Diese Datei ist eigenständig — sie enthält alle Projekt-Regeln für Tools, die nur `MODULAR_SYSTEM.md` lesen.

## Source of Truth

Bei Konflikt zwischen dieser Datei und `rules/*.md` gewinnen die Quelldateien.

- `rules/00_meta.md`
- `rules/10_architecture.md`
- `rules/20_boxes.md`
- `rules/30_spacing.md`
- `rules/40_tables.md`
- `rules/50_math.md`
- `rules/60_workflow.md`
- `rules/70_github.md`
- `rules/80_didaktik.md`

## Working Commands

- `make build`        — latexmk → `$(PDF_BASENAME).pdf` (Aux-Files nach build/)
- `make check`        — full check (main, chapters, root, pdf-identity, lint, rule-authorship, rules)
- `make sync-rules`   — `rules/*.md` → alle Adapter regenerieren
- `make check-rules`  — Drift-Check über Hash-Stempel

## Operating Mode

- Wenn dies die einzige geladene KI-Regel-Datei ist, gelten die kompilierten Regeln unten als verbindlich.
- `alwaysApply: true`-Regeln sind Projekt-weit aktiv. `globs`-Scope-Regeln greifen nur bei passenden Pfaden.
- Niemals diese Datei direkt editieren — immer `rules/*.md` ändern und neu kompilieren.

## Rule Index

- `00_meta.md` — Project-wide — ZSF Physik 1 — Projekt-Meta, Zweck, kritische Regeln (Sprache, Modularität, keine Inhaltsänderung ohne Befehl)
- `10_architecture.md` — Project-wide; besonders relevant für `main.tex`, `preamble.tex`, `chapters/**/*.tex`, `styles/**/*.tex` — Verzeichnis-Architektur, Modul-Verantwortlichkeiten, Verbote in Kapiteln, Fork-Guardrails (keine Module/Tests löschen)
- `20_boxes.md` — Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/60_boxes.tex`, `styles/40_colors_structure.tex`, `styles/50_typography_semantics.tex` — Box-Auswahl (defbox, tablebox, figbox, formulabox, warnbox, splitbox, runintext), Struktur-Makros, Inline-Marker (ZSFkeyword, ZSFconclusion)
- `30_spacing.md` — Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/30_layout_spacing.tex` — Spacing-Register (ZSFspace*), Gap-Makros (ZSFgap*), Section-Gap — keine rohen Spacing-/Break-Befehle in Kapiteln, Overflow-Vermeidung
- `40_tables.md` — Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/20_tables.tex` — Tabellen ausschließlich über ZSFtable/ZSFtableFlat/ZSFtablePlain, Spaltentypen L/C/R und Y/Z/Q/F, verbotene Roh-Tabellen-Befehle
- `50_math.md` — Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/10_math.tex` — Math-Makros zentral in styles/10_math.tex (\\sgn, \\vect …); neue Operatoren nur dort, keine rohen \\operatorname/\\mathbb in Kapiteln
- `60_workflow.md` — Project-wide — Build-/Check-Workflow (make build/check/sync-rules/check-rules), Agent-Build-Pflicht nach jeder Änderung, Datei-Platzierung
- `70_github.md` — Scoped; gilt bei Änderungen an `.github/**`, `Makefile`, `tests/**`, `styles/75_pdf_identity.tex`, `README.md` — Naming-Konventionen (Repo, PDF, Tags), GitHub Actions (CI Build, Release), PDF-Identity als Single Source of Truth
- `80_didaktik.md` — Project-wide; besonders relevant für `chapters/**/*.tex` — Didaktisches Prinzip für Inhalt/Erklärungen: nützlicher + intuitiver statt korrekter, Rezept-Charakter, Stolperfallen, scannbares Design + Übersichtlichkeit — keine eigenmächtigen Präzisierungen

## Compiled Rules

### `00_meta.md`

- Quelle: `rules/00_meta.md`
- Scope: Project-wide
- Beschreibung: ZSF Physik 1 — Projekt-Meta, Zweck, kritische Regeln (Sprache, Modularität, keine Inhaltsänderung ohne Befehl)
- Zuletzt aktualisiert: 2026-06-10 (loris)

LaTeX-Zusammenfassung Physik 1 (D-MAVT FS2026). A4 Querformat, 4 Spalten, 8pt, strikt modular (`extarticle`). Layout, Farben und Boxen werden zentral in `styles/` gesteuert; Kapitel fokussieren sich vollständig auf Fach-Inhalt.

**Zweck:** Prüfungsvorbereitung — wird direkt in der Prüfung verwendet. Schnelle Auffindbarkeit und visuelle Klarheit haben höchste Priorität.

##### Kritische Regeln

- **Build-Befehl:** Nach jeder Änderung ausschließlich `make build` verwenden — keine alternativen oder abgekürzten Kommandos (`latexmk`, `pdflatex`, …). Erst nach erfolgreichem Build gilt eine Aufgabe als erledigt.
- **Inhalte niemals ändern, kürzen oder vereinfachen** ohne expliziten Befehl.
- Keine neuen Packages oder Makros ohne explizite Anfrage hinzufügen.
- Stil und Struktur (Boxtypen, Farben, Abstände) konsistent mit bestehendem System halten.
- **Modularität ist Pflicht:** Abstände, Farben, Makros, Strukturen gehören in `styles/*.tex`. Hardcodierte Werte direkt in Box-Definitionen oder Kapiteldateien sind verboten.
- **Sprache:** Inhalte auf Deutsch. Technische Begriffe auf Englisch erlaubt. LaTeX-Labels, Befehle, Dateinamen auf Englisch.
- Vor Commit: `make check` (Lint + Strukturtests + PDF-Identität + Rule-Drift).

### `10_architecture.md`

- Quelle: `rules/10_architecture.md`
- Scope: Project-wide; besonders relevant für `main.tex`, `preamble.tex`, `chapters/**/*.tex`, `styles/**/*.tex`
- Beschreibung: Verzeichnis-Architektur, Modul-Verantwortlichkeiten, Verbote in Kapiteln, Fork-Guardrails (keine Module/Tests löschen)
- Zuletzt aktualisiert: 2026-06-10 (loris)

Die Konfiguration ist modular organisiert. Bei Layout-Änderungen NICHT die Kapitel oder `preamble.tex` ändern, sondern das passende Modul in `styles/`.

##### Modul-Verantwortlichkeiten

| Kategorie | Ort |
|---|---|
| Pakete | `styles/00_packages.tex` |
| Math-Operatoren / Vektor-Makros | `styles/10_math.tex` |
| Tabellen-Environments | `styles/20_tables.tex` |
| Abstände, Layout, multicols | `styles/30_layout_spacing.tex` |
| Farben, Kapitel-Paletten, Struktur-Makros | `styles/40_colors_structure.tex` |
| Schrift / Semantik | `styles/50_typography_semantics.tex` |
| Lesbarkeit (Hyphenation/Penalties) | `styles/55_readability.tex` |
| Box-Umgebungen (tcolorbox) | `styles/60_boxes.tex` |
| Dokument-Settings | `styles/70_document_settings.tex` |
| PDF-Identity / Owner-Marker | `styles/75_pdf_identity.tex` |
| Inhalte | `chapters/XX_*.tex` |
| KI-Regelwerke (Quell-Wahrheit) | `rules/*.md` |

`main.tex` = nur Document-Class + `\input{preamble}` + Kapitel-`\input`. `preamble.tex` = nur Loader für `styles/*.tex`.

##### Fork-Guardrails (verbindlich)

- Module und Tests dürfen **nicht gelöscht** werden. Tabellen-Modul (`20_tables.tex`) und Tests (inkl. `check_pdf_identity.sh`) bleiben vollständig; `make check` muss `check-pdf-identity` enthalten.

##### Verboten in Kapitel-Dateien

- Abstände: `\vspace`, `\hspace`, `\medskip`, `\bigskip`, `\smallskip`, `\newpage`, `\columnbreak`, `\nopagebreak` → stattdessen `\ZSFgapXS/S/M/L`, `\ZSFSectionGap`
- Schrift/Hervorhebung direkt: `\textbf`, `\textit`, `\textsf`, `\scriptsize`, `\small`, `\large` → semantische Marker (siehe `20_boxes`)
- Rohe Tabellen: `\begin{tabular}`, `\begin{tabularx}`, `\rowcolor`, `\rowcolors`, `\columncolor`, `\arrayrulecolor` → `ZSFtable*`
- Strukturbefehle: `\section`, `\subsection`, `\chapter` → `\StartChapter` / `\StartFrontChapter` / `\SubsectionBar`
- `\usepackage` → alles in `styles/00_packages.tex`
- Hartkodierte Kapitelfarben → `\chaptercolor` / `\chaptercolorlight`

##### Verboten in Box-Definitionen (`styles/*.tex`)

- Hardcodierte `pt`/`em`/`mm`-Werte → immer `\ZSFspace*`-Register
- Direkte Schriftbefehle → immer `\ZSFfont*`-Makros
- Direkte Farb-Tints → immer benannte `\colorlet`

### `20_boxes.md`

- Quelle: `rules/20_boxes.md`
- Scope: Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/60_boxes.tex`, `styles/40_colors_structure.tex`, `styles/50_typography_semantics.tex`
- Beschreibung: Box-Auswahl (defbox, tablebox, figbox, formulabox, warnbox, splitbox, runintext), Struktur-Makros, Inline-Marker (ZSFkeyword, ZSFconclusion)
- Zuletzt aktualisiert: 2026-06-10 (loris)

Für inhaltliche Darstellungen die vordefinierten Umgebungen nutzen.

##### Box-Auswahl (real vorhanden)

| Was wird ausgedrückt? | Box / Umgebung |
| :--- | :--- |
| Definition / Satz / Gesetz | `defbox[Titel]` |
| Tabelle | `tablebox[Titel]` |
| Abbildung | `figbox[Titel]` |
| Formel(n), evtl. mit Kontext | `formulabox` (lange einzelne Formel: `longformula`) |
| Warnung / Stolperfalle | `warnbox[Titel]` |
| Bild + Text nebeneinander | `splitbox[fraction]` |
| Reiner Fließtext-Block | `runintext` |

##### Struktur-Makros

- `\StartChapter[label]{Titel}` — nummeriertes Kapitel + Farbpalette
- `\StartFrontChapter{Titel}` — unnummeriert (Front-Matter)
- `\SubsectionBar[label]{Titel}` / `\SubsectionBar*{Titel}` — Abschnittsbalken (un/nummeriert)

Niemals `\section` / `\subsection` / `\chapter` direkt.

##### Inline-Marker

- `\ZSFkeyword{Fachbegriff}` — zentrale Fachbegriffe als **primäre Scan-Anker**, im Fließtext und direkt in Box-Inhalten; sparsam pro Block.
- `\ZSFconclusion{Folgerung}` — leitet eine Folgerung ein.
- `\ZSFref{label}` — Querverweis, gerendert als `(→ 6.6)` in der Farbe des Zielkapitels. Nur wenn eine Stelle ein Verfahren/Gesetz aus einem **anderen** Kapitel nutzt. Ziel-Label via `\SubsectionBar[sec:...]{Titel}`.
- Niemals `\textbf{}` / `\textit{}` zur semantischen Hervorhebung — die obigen Marker nutzen.

##### Farb-Palette

Kapitelfarben niemals hardcoden — nur `\chaptercolor` / `\chaptercolorlight`. Slot 0 ist dem Frontchapter vorbehalten.

### `30_spacing.md`

- Quelle: `rules/30_spacing.md`
- Scope: Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/30_layout_spacing.tex`
- Beschreibung: Spacing-Register (ZSFspace*), Gap-Makros (ZSFgap*), Section-Gap — keine rohen Spacing-/Break-Befehle in Kapiteln, Overflow-Vermeidung
- Zuletzt aktualisiert: 2026-06-10 (loris)

Die 4 Spalten auf A4-Querformat sind schmal. Abstände zentral in `styles/30_layout_spacing.tex`. **Nie** hardcodierte `pt`-Werte in Kapiteln.

##### Abstands-Makros

- **Box-intern:** `\ZSFspaceXS`, `\ZSFspaceS`, `\ZSFspaceM`, `\ZSFspaceL`
- **Zwischen Blöcken (in Kapiteln erlaubt):** `\ZSFgapXS/S/M/L`, `\ZSFSectionGap`

##### Verbotene Abstände in Kapiteln

`\vspace`, `\hspace`, `\newpage`, `\columnbreak` (Ausnahme: Anhang), `\nopagebreak`, `\smallskip`, `\medskip`, `\bigskip`, `\\[…]` — alle brechen den Linter.

##### Overflow vermeiden

Größere Matrizen vertikal stapeln statt nebeneinander; lange Gleichungen über `aligned` umbrechen (max. eine Gleichung pro Zeile).

### `40_tables.md`

- Quelle: `rules/40_tables.md`
- Scope: Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/20_tables.tex`
- Beschreibung: Tabellen ausschließlich über ZSFtable/ZSFtableFlat/ZSFtablePlain, Spaltentypen L/C/R und Y/Z/Q/F, verbotene Roh-Tabellen-Befehle
- Zuletzt aktualisiert: 2026-06-10 (loris)

Tabellendesign ist entkoppelt. Formatierung direkt in Kapiteln ist verboten.

##### Tabellen-Umgebungen

- `\begin{ZSFtable}[font]{colspec}` — farbige Titelzeile + Zebra
- `\begin{ZSFtableFlat}[font]{colspec}` — kein Header, Zebra ab Zeile 1
- `\begin{ZSFtablePlain}[font]{colspec}` — ohne Zebra

##### Spaltentypen

- `L/C/R` — links/zentriert/rechts (gleichverteilt, umbricht)
- `Y{n}` (links), `Z{n}` (zentriert), `Q{n}` (rechts) — proportional mit Faktor `n`
- `F{n}` — proportionale, zentrierte Formelspalte

##### Verboten in Kapiteln

`tabular`, `tabularx`, `\rowcolor`, `\rowcolors`, `\columncolor`, `\arrayrulecolor` — Zebra/Linienfarbe kommen aus den `ZSFtable*`-Stilen.

### `50_math.md`

- Quelle: `rules/50_math.md`
- Scope: Scoped; gilt bei Änderungen an `chapters/**/*.tex`, `styles/10_math.tex`
- Beschreibung: Math-Makros zentral in styles/10_math.tex (\\sgn, \\vect …); neue Operatoren nur dort, keine rohen \\operatorname/\\mathbb in Kapiteln
- Zuletzt aktualisiert: 2026-06-10 (loris)

Mathematische Makros liegen zentral in `styles/10_math.tex`.

- Vorhandene Makros nutzen: `\sgn`, `\vect{…}`.
- Neue Operatoren/Symbole **nur** in `styles/10_math.tex` ergänzen (nach Rücksprache), nicht inline in Kapiteln.
- Keine rohen `\operatorname{…}`-Wiederholungen in Kapiteln, wenn ein zentrales Makro existiert oder sinnvoll ist.
- Lange Formeln über `aligned` umbrechen (siehe `30_spacing`).

### `60_workflow.md`

- Quelle: `rules/60_workflow.md`
- Scope: Project-wide
- Beschreibung: Build-/Check-Workflow (make build/check/sync-rules/check-rules), Agent-Build-Pflicht nach jeder Änderung, Datei-Platzierung
- Zuletzt aktualisiert: 2026-06-10 (loris)

##### Workflow-Befehle

```bash
make build                  # latexmk -> physik1_fs2026_hliddal.pdf (Aux nach build/)
make check                  # check-main-full + check-chapters + check-root-clean
                            #   + check-pdf-identity + lint + check-rule-authorship + check-rules
make sync-rules             # rules/*.md -> MODULAR_SYSTEM.md, CLAUDE.md, AGENTS.md,
                            #   .github/copilot-instructions.md, .cursor/rules/*.mdc
make check-rules            # Drift-Check (Hash-Stempel) gegen rules/*.md
make check-rule-authorship  # Pflicht-Frontmatter prüfen
make clean                  # build/ + aux entfernen
```

Der Rule-Compiler liegt in `tools/sync-agent-rules.mjs` (Node 18+). Quellen sind `rules/*.md` mit YAML-Frontmatter.

##### Agent-Build-Pflicht

Nach **jeder** Änderung sofort `make build` ausführen — immer genau dieser Befehl. Erst nach erfolgreichem Build gilt eine Aufgabe als erledigt.

##### Regeln ändern

KI-Regeln **nie** direkt in `CLAUDE.md`/`AGENTS.md`/`MODULAR_SYSTEM.md`/`.github/copilot-instructions.md`/`.cursor/rules/*` editieren (alle auto-generiert). Stattdessen `rules/*.md` ändern → `make sync-rules` → `make check-rules` muss synchron melden.

##### Datei-Platzierung

Root ist tabu für Fremd-Dateien (`tests/check_root_clean.sh` blockt). Neues gehört in `chapters/`, `styles/`, `tests/`, `scripts/`, `tools/`, `rules/`, `graphics/`, `_scratch/`.

### `70_github.md`

- Quelle: `rules/70_github.md`
- Scope: Scoped; gilt bei Änderungen an `.github/**`, `Makefile`, `tests/**`, `styles/75_pdf_identity.tex`, `README.md`
- Beschreibung: Naming-Konventionen (Repo, PDF, Tags), GitHub Actions (CI Build, Release), PDF-Identity als Single Source of Truth
- Zuletzt aktualisiert: 2026-06-10 (loris)

##### Namenskonventionen

- **Repository:** `eth-physik1-zsf-fs2026-hliddal` (Muster: `eth-<fach>-zsf-<semester>-hliddal`)
- **PDF:** `physik1_fs2026_hliddal.pdf` (Muster: `fach_semester_hliddal.pdf`)
- **Semesterformat:** `fsYYYY` oder `hsYYYY`
- **Release-Tags:** Semantic Versioning `vMAJOR.MINOR.PATCH`

##### GitHub Actions

- **Workflow `CI Build`** (push/PR auf `main`): `make check` + `make build`, PDF als Artifact.
- **Workflow `Release PDF`** (push auf Tag `v*`): `make check` + `make build` + `make release-proof`; Release mit PDF + SHA256.

##### PDF-Identity / Authentizität

`styles/75_pdf_identity.tex` ist Single Source of Truth für `\ZSFOwnerNameASCII` (Author), `\ZSFOwnerID`, `\ZSFReleaseID`, `\ZSFBuildID` sowie Title/Subject/Keywords. `tests/check_pdf_identity.sh` prüft die Metadaten nach Build (Teil von `make check`) — der Test darf nicht entfernt werden.

##### Konsistenz bei Naming-Änderungen

Naming-Patterns immer konsistent halten in: `Makefile`, `tests/check_root_clean.sh`, `styles/75_pdf_identity.tex`, `README.md`, `.github/workflows/*.yml`, `rules/70_github.md`.

### `80_didaktik.md`

- Quelle: `rules/80_didaktik.md`
- Scope: Project-wide; besonders relevant für `chapters/**/*.tex`
- Beschreibung: Didaktisches Prinzip für Inhalt/Erklärungen: nützlicher + intuitiver statt korrekter, Rezept-Charakter, Stolperfallen, scannbares Design + Übersichtlichkeit — keine eigenmächtigen Präzisierungen
- Zuletzt aktualisiert: 2026-06-10 (loris)

Diese Regel betrifft **was** drinsteht und **wie** erklärt wird (nicht das Layout). Vollständige Leitlinie: `ZSF_DIDAKTIK_PRINZIP.md`.

##### Maßstab

Die ZSF wird **direkt in der Prüfung** verwendet. Maßstab für jeden Satz:

> Hilft das beim schnellen, sicheren Lösen von Prüfungsaufgaben?

Nicht der Maßstab ist Vollständigkeit, Allgemeinheit oder lückenlose Strenge.

##### Kernregeln

- **Ungenauigkeiten auf Kursniveau sind toleriert**, solange sie intuitiv tragfähig sind.
- **Sonderfälle/Präzisierungen hinzuzufügen ist ein Fehler**, wenn sie die Aussage nur „wasserdicht", aber schwerer lesbar machen. Regel: nicht „korrekter" machen — sondern **nützlicher und intuitiver**.
- Gute Erklärung: Rezept-Charakter (`procedure` + `\ProcStep`), konkretes Zahlenbeispiel, Intuition in einem Satz, Stolperfallen via `\ZSFdanger`, Querchecks zur Selbstkontrolle.

##### Scannbarkeit & Übersichtlichkeit

- **Scannbares Design ist Pflicht:** In der Prüfung wird nicht gelesen, sondern gesucht. Jede Information muss in Sekunden auffindbar sein — über Boxen, Titel, Marker und visuelle Struktur statt Fließtext.
- **Übersichtlichkeit schlägt Dichte:** Lieber klar gegliederte Blöcke (Box pro Aussage, Tabelle statt Aufzählung im Text) als kompakte, aber unstrukturierte Absätze.
- Lange Fließtext-Passagen sind ein Warnsignal — Inhalt in Tabellen oder einzelne Boxen umstrukturieren, sodass das Auge beim Überfliegen hängen bleibt.

##### Konsequenz für KI-Assistenten

- Beim Review/Bearbeiten **keine** mathematischen Sonderfälle, Ausnahmen oder Präzisierungen eigenmächtig ergänzen.
- Erklärungen verbessern heißt: klarer formulieren, Beispiel/Intuition ergänzen, Stolperfalle markieren — **nicht** Korrektheit erhöhen.
- Inhalte nie ohne expliziten Befehl ändern, kürzen oder „korrigieren" (siehe `00_meta`).
