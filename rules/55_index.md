---
description: "Stichwortverzeichnis: ZSFkeyword-Auto-Indexierung, ZSFindex/ZSFindexsee, Eintrags-Override, Umlaut-Sortkeys — Eintraege verweisen auf Abschnittsnummern"
globs: ["chapters/**/*.tex", "styles/65_index.tex"]
alwaysApply: false
decisionOwner: ai
decisionStatus: final
lastUpdatedBy: claude
lastUpdatedAt: 2026-06-29
---

Am Dokumentanfang steht ein alphabetisches Stichwortverzeichnis (`chapters/ch00_index.tex`, Maschinerie in `styles/65_index.tex`). Einträge verweisen auf **Abschnittsnummern** („6.2") in der Farbe des Zielkapitels — konsistent zu `\ZSFref`. Der Index ist der erste Scan-Anker: in der Prüfung schlägt man hier nach und springt über die farbige Nummer ins richtige Kapitel.

## Eintrags-Makros

- `\ZSFkeyword{Begriff}` erzeugt **automatisch** einen Indexeintrag (zusätzlich zur Fettung) — es ist keine manuelle Pflege nötig.
  - `\ZSFkeyword*{Begriff}`: opt-out — nur fett, kein Eintrag (z.B. für Wiederholungen oder generische Begriffe).
  - `\ZSFkeyword[sortkey@Anzeigeform]{Begriff}`: Override für Sortierung und/oder abweichende Indexform (Anzeigetext im Fließtext bleibt `Begriff`).
- `\ZSFindex[sortkey]{Begriff}`: unsichtbarer Eintrag — für Begriffe, die nicht als `\ZSFkeyword` im Text stehen (defbox-Titel, Verfahrensnamen, Tabellen-Themen).
- `\ZSFindexsee{Synonym}{Ziel}`: Verweis-Eintrag „Synonym, siehe Ziel" — am kanonischen Ort des Ziels platzieren.

## Konventionen

- **Kein Mathe / keine Makros im Begriff:** Index-Begriffe sind reiner Text. Enthält ein `\ZSFkeyword` Mathe-Modus (`$...$`) oder Makros, per `[sortkey@Anzeige]`-Override eine reine Textform setzen (Beispiel: `\ZSFkeyword[Flussdichte@Flussdichte]{Flussdichte $\vec{B}$}`).
- **Umlaut-Sortkeys bei Bedarf:** Begriffe, die mit Ä/Ö/Ü/ß beginnen oder im sortierrelevanten Teil Umlaute enthalten, brauchen einen Sortkey mit Transliteration nach DIN 5007-1 (ä→a, ö→o, ü→u, ß→ss) — sonst sortiert makeindex sie hinter Z. Beispiel: `\ZSFkeyword[Leitfahigkeit@Leitfähigkeit]{Leitfähigkeit}`.
- **Verbotene Zeichen** in Index-Begriffen: `!`, `@`, `|`, `"` (makeindex-Steuerzeichen).
- **Platzierung:** Unsichtbare `\ZSFindex`/`\ZSFindexsee`-Einträge direkt nach der zugehörigen `\SubsectionBar` bzw. Box — nie in Formeln, Titeln oder `\formulanote`.
- **Entweder–oder:** Ein Begriff ist entweder see-Eintrag oder nummerierter Eintrag, nie beides (makeindex-Encap-Konflikt).
- Die Eintragsnummer ist die aktuelle Subsection; vor der ersten `\SubsectionBar` eines Kapitels die Kapitelnummer.

## Build

`make build` ist verpflichtend — es setzt `INDEXSTYLE` und konfiguriert latexmk so, dass `makeindex` mit `styles/zsfindex.ist` läuft. Roh-Aufrufe (`pdflatex`/`makeindex` direkt) erzeugen kein korrektes Verzeichnis.
