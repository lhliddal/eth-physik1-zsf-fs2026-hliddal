# ZSF Physik 1

Abgeschlossenes Semester: **FS 2026 · Semester 2**. Korrekturen sind weiterhin über Issues und Pull Requests willkommen.

## Download

**Fertige PDF:** [physik1_fs2026_hliddal.pdf herunterladen](https://github.com/lhliddal/eth-physik1-zsf-fs2026-hliddal/releases/latest/download/physik1_fs2026_hliddal.pdf)

Wenn du nur lernen oder nachschlagen willst, brauchst du nur diese PDF. Den LaTeX-Code brauchst du nur, wenn du die Zusammenfassung selbst bearbeiten willst.

## Persönlicher Hinweis

Ich wünsche allen viel Erfolg bei der Prüfung!

Die ZSF ist so sortiert und aufbereitet, dass sie für die Prüfung möglichst übersichtlich und direkt nutzbar ist. Ziel ist es, in der Prüfung Zeit zu sparen: Inhalte sollen schnell auffindbar, direkt anwendbar und sinnvoll aufgebaut sein. Struktur, Inhalt und Layout sind darauf ausgelegt, dass man unter Prüfungsdruck intuitiv findet, was man sucht.

Für viele Formeln habe ich mich an den vom Kurs gegebenen Tipler-Unterlagen orientiert.

Die Zusammenfassung verwendet mein [Hliddal-Template](https://github.com/lhliddal/zsf-template-hliddal). Falls du Fehler findest, mach gerne ein Issue auf.

## Nutzung

Persönliche ETH-Prüfungs-Zusammenfassung. Nutzung auf eigenes Risiko; prüfe vor der Prüfung die aktuell gültigen Hilfsmittel-Regeln.

Alle Inhalte dieser Zusammenfassung – PDF, Texte, Grafiken und Quelltext – stehen unter **[Creative Commons Namensnennung – Weitergabe unter gleichen Bedingungen 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)**. Der vollständige Lizenztext steht in [LICENSE](LICENSE).

Beim Weitergeben bitte die im Dokument und hier genannten Urheber sowie dieses Repository nennen, auf die Lizenz verlinken und Änderungen kennzeichnen. Veröffentlichte Bearbeitungen stehen ebenfalls unter CC BY-SA 4.0 beziehungsweise einer kompatiblen Lizenz. Auch kommerzielle Nutzung ist erlaubt.

## LaTeX bearbeiten

```bash
make build
```

Die Quellen liegen in `main.tex`, `preamble.tex`, `chapters/`, `styles/` und den benötigten Grafikordnern. Der Build erzeugt `physik1_fs2026_hliddal.pdf` lokal im Repository-Root. Diese Datei wird mitversioniert; verbindlich veröffentlicht ist die oben verlinkte PDF im GitHub Release.
