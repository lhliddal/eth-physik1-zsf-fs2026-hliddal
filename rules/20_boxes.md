---
description: "Box-Auswahl (Decision Tree), Struktur-Makros (StartChapter, SubsectionBar), Inline-Marker (ZSFkeyword, ZSFdanger, ZSFconclusion), Formel-Highlighting"
globs: ["chapters/**/*.tex", "styles/60_boxes.tex", "styles/40_colors_structure.tex", "styles/50_typography_semantics.tex"]
alwaysApply: false
decisionOwner: ai
decisionStatus: final
lastUpdatedBy: codex
lastUpdatedAt: 2026-06-27
---

Für inhaltliche Darstellungen die vordefinierten Umgebungen nutzen.

## Box-Auswahl (Decision Tree)

| Was wird ausgedrückt? | Box / Umgebung |
| :--- | :--- |
| Definition / Satz / Gesetz | `defbox[Titel]` |
| Tabelle | `tablebox[Titel]` |
| Abbildung | `figbox[Titel]` |
| Formel(n), evtl. mit Kontext | `formulabox` |
| Warnung / Stolperfalle | `warnbox[Titel]` |
| Eigenschaft / kurze Aussage | `statementbox[Titel]` |
| Schritt-für-Schritt-Verfahren | `procedure[Titel]` + `\ProcStep` |
| Lose Faktenliste | `factlist` + `\ZSFFact` |
| Faktenliste mit Rahmen + Titel | `propertylist[Titel]` + `\ZSFFact` |
| Wertetabelle (kompakt) | `valuegrid{n}[Titel]` |
| Ziele / Bedingungen (kompaktes Grid) | `goalbox`, `compactgridbox` |
| Bild + Text nebeneinander | `splitbox[fraction]` |
| Reiner Fließtext-Block | `runintext` |

## Nutzungsregeln

- **defbox vs. statementbox:** Im Zweifel `defbox` für gewichtige Gesetze, Definitionen und zentrale Sätze verwenden. `statementbox` (dezenter linker Farbbalken) für kleinere Aussagen, Bemerkungen oder kompakte Eigenschaften.
- **Formel-Grouping:** Mehrere verwandte Formeln gehen in **eine** `formulabox` mit `\formulasep` (graue Trennlinie) und optionalen Beschreibungen via `\formulanote`. Für gleichwertige Fälle: `\ZSFItemHeading{Fall A}`.
- **Bilder:** Ausschließlich über `figbox` + `\ZSFfig{path}{Titel}{Caption}` oder `\ZSFfigside{path}{Titel}{Inhalt}`. Niemals nackte `\includegraphics`-Befehle in Kapiteln.

## Struktur-Makros

- `\StartChapter[label]{Titel}` — nummeriertes Kapitel + Farbpalette
- `\StartFrontChapter{Titel}` — unnummeriert (Front-Matter)
- `\SubsectionBar[label]{Titel}` / `\SubsectionBar*{Titel}` — Abschnittsbalken (un/nummeriert)

Niemals `\section` / `\subsection` / `\chapter` direkt.

## Inline-Marker

- `\ZSFkeyword{Fachbegriff}` — zentrale Fachbegriffe als **primäre Scan-Anker**, im Fließtext und direkt in Box-Inhalten; sparsam pro Block.
- `\ZSFdanger{Achtung-Text}` — Inline-Pill für Stolperfallen / kritische Ausnahmen.
- `\ZSFconclusion{Folgerung}` — leitet eine Folgerung ein.
- `\ZSFref{label}` — Querverweis, gerendert als `(→ 6.6)` in der Farbe des Zielkapitels. Nur wenn eine Stelle ein Verfahren/Gesetz aus einem **anderen** Kapitel nutzt. Ziel-Label via `\SubsectionBar[sec:...]{Titel}`.
- Niemals `\textbf{}` / `\textit{}` zur semantischen Hervorhebung — die obigen Marker nutzen.

## Semantisches Formel-Highlighting

Experimentelles System, um Zusammenhänge über mehrere Formeln oder Verfahrensschritte hinweg sichtbar zu machen. Es ist bewusst klein gehalten und darf nicht als Dekoration verwendet werden.

| Makro | Rolle |
|---|---|
| `\ZSFmhlA{...}` | Quelle / gegeben / erster Strang |
| `\ZSFmhlB{...}` | Gegenstück / abgeleitet / zweiter Strang |
| `\ZSFmhlD{...}` | dritter paralleler Strang, nur wenn wirklich nötig |
| `\ZSFmhlC{...}` | Ziel / Endform / Resultat |

Nur einsetzen, wenn die farbliche Verbindung fachlich eindeutig stimmt. `\ZSFmhlD` ist kein Standardmarker; nur verwenden, wenn drei gleichwertige Stränge gleichzeitig verfolgt werden müssen und `\ZSFmhlC` weiterhin als Ziel/Resultat gebraucht wird.

## Farb-Palette

Kapitelfarben niemals hardcoden — nur `\chaptercolor` / `\chaptercolorlight`. Slot 0 ist dem Frontchapter vorbehalten.
