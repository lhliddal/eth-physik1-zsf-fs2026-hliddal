# ZSF-Ideen (Scan-Design)

> Kompaktes Inventar: was diese ZSF für Scannbarkeit/Übersichtlichkeit tut.
> Neue Ideen unten eintragen. „Spezifisch" = Übernahme-Kandidaten fürs Template.

## Standard (alle ZSF)

- **Fett-Anker** (aus Analysis): `\ZSFkeyword` dicht als primäre Scan-Anker — hier höchste Dichte aller ZSF (195×).
- **Querverweise** (aus LinAlg): `\ZSFref{label}` → „(→ 6.6)" in Zielkapitel-Farbe. Label via `\SubsectionBar[sec:...]{...}`.

## Spezifisch (Template-Kandidaten)

- Zwei-Takt-Muster: kurzer `runintext` (1 Satz Kontext) → `formulabox` — beim Scannen liest man nur die Formelboxen.
- Stärkste Formelgruppierung: `\formulasep` (90×) + `\formulanote` — verwandte Formeln in einer Box.
- `splitbox` (13×): Bild + Text nebeneinander (Feldlinienbilder etc.).
- Lookup-Frontmatter: `ch00_zeichen.tex` (Symbol → Bedeutung → SI als Zebra-Tabelle) und `ch00_wichtige.tex` (wichtigste Formeln aller Kapitel vorab).

## Ideen / TODO

- _(frei eintragen)_
