---
description: "Math-Makros zentral in styles/10_math.tex (\\sgn, \\vect …); neue Operatoren nur dort, keine rohen \\operatorname/\\mathbb in Kapiteln"
globs: ["chapters/**/*.tex", "styles/10_math.tex"]
alwaysApply: false
decisionOwner: ai
decisionStatus: final
lastUpdatedBy: loris
lastUpdatedAt: 2026-06-10
---

Mathematische Makros liegen zentral in `styles/10_math.tex`.

- Vorhandene Makros nutzen: `\sgn`, `\vect{…}`.
- Neue Operatoren/Symbole **nur** in `styles/10_math.tex` ergänzen (nach Rücksprache), nicht inline in Kapiteln.
- Keine rohen `\operatorname{…}`-Wiederholungen in Kapiteln, wenn ein zentrales Makro existiert oder sinnvoll ist.
- Lange Formeln über `aligned` umbrechen (siehe `30_spacing`).
