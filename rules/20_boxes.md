---
description: "Box-Auswahl (defbox, tablebox, figbox, formulabox, warnbox, splitbox, runintext), Struktur-Makros, Inline-Marker (ZSFkeyword, ZSFconclusion)"
globs: ["chapters/**/*.tex", "styles/60_boxes.tex", "styles/40_colors_structure.tex", "styles/50_typography_semantics.tex"]
alwaysApply: false
decisionOwner: ai
decisionStatus: final
lastUpdatedBy: loris
lastUpdatedAt: 2026-06-10
---

Für inhaltliche Darstellungen die vordefinierten Umgebungen nutzen.

## Box-Auswahl (real vorhanden)

| Was wird ausgedrückt? | Box / Umgebung |
| :--- | :--- |
| Definition / Satz / Gesetz | `defbox[Titel]` |
| Tabelle | `tablebox[Titel]` |
| Abbildung | `figbox[Titel]` |
| Formel(n), evtl. mit Kontext | `formulabox` (lange einzelne Formel: `longformula`) |
| Warnung / Stolperfalle | `warnbox[Titel]` |
| Bild + Text nebeneinander | `splitbox[fraction]` |
| Reiner Fließtext-Block | `runintext` |

## Struktur-Makros

- `\StartChapter[label]{Titel}` — nummeriertes Kapitel + Farbpalette
- `\StartFrontChapter{Titel}` — unnummeriert (Front-Matter)
- `\SubsectionBar[label]{Titel}` / `\SubsectionBar*{Titel}` — Abschnittsbalken (un/nummeriert)

Niemals `\section` / `\subsection` / `\chapter` direkt.

## Inline-Marker

- `\ZSFkeyword{Fachbegriff}` — zentrale Fachbegriffe im Fließtext, sparsam.
- `\ZSFconclusion{Folgerung}` — leitet eine Folgerung ein.
- Niemals `\textbf{}` / `\textit{}` zur semantischen Hervorhebung — die obigen Marker nutzen.

## Farb-Palette

Kapitelfarben niemals hardcoden — nur `\chaptercolor` / `\chaptercolorlight`. Slot 0 ist dem Frontchapter vorbehalten.
