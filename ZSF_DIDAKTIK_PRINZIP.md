# Didaktisches Prinzip der Zusammenfassungen

> Leitlinie für Inhalt und Erklärungen — gilt für *alle* Fach-ZSF, die aus diesem Template entstehen.
> Für Build-/Style-Regeln siehe `rules/*.md` (bzw. das generierte `CLAUDE.md`/`AGENTS.md`). Diese Datei betrifft **was** drinsteht und **wie** erklärt wird, nicht das Layout.

## Zweck der Zusammenfassung

Die ZSF wird **direkt in der Prüfung** verwendet. Maßstab für jeden Satz ist daher:

> **Hilft das beim schnellen, sicheren Lösen von Prüfungsaufgaben?**

Nicht der Maßstab ist fachliche Vollständigkeit, Allgemeinheit oder lückenlose Strenge.

## Grundgerüst: kopieren ist erlaubt

- Oft existiert als **Grundgerüst eine andere (kopierte) Zusammenfassung**. Das ist Absicht und kein Problem.
- Struktur und Formulierungen dürfen übernommen und an das System (Boxen, Makros, Sprache) angepasst werden.

## Umgang mit Ungenauigkeiten (zentral)

- **Ungenauigkeiten sind toleriert**, solange sie dem **Niveau des Stoffs** entsprechen und intuitiv tragfähig bleiben (vereinfachte, aber nutzbare Begriffe statt jeder Sonderfall-Ausformulierung).
- **Korrektheits-Ausnahmen / Sonderfälle hinzuzufügen ist ein Fehler**, wenn sie die Aussage nur „wasserdicht", aber schwerer lesbar machen.
  - Begründung: Solche Ergänzungen kosten Lesezeit und Übersicht in der Prüfung und senken den Nutzen, ohne dass der Sonderfall im Stoff vorkommt.
  - **Regel:** Nicht „korrekter" machen — sondern **nützlicher und intuitiver**.

## Was eine gute Erklärung hier ausmacht

1. **Rezept-Charakter:** Verfahren als nummerierte Schritte (`procedure` + `\ProcStep`), die man 1:1 abarbeiten kann.
2. **Konkretes Beispiel** zum Verfahren, wo möglich.
3. **Intuition in einem Satz** statt formaler Allgemeinheit.
4. **Stolperfallen** als `\ZSFdanger{...}` — genau die Fehler, die man in der Prüfung macht.
5. **Querchecks** als Selbstkontrolle (Plausibilitäts-/Konsistenzregeln).

## Wenn unsicher

Im Zweifel **Nützlichkeit + Intuition vor Strenge**. Lieber eine knappe, leicht unscharfe Aussage, die in der Prüfung sofort anwendbar ist, als eine vollständige, die man unter Zeitdruck nicht parsen kann.

## Konsequenz für KI-Assistenten

- Beim Review/Bearbeiten **keine** Sonderfälle, Ausnahmen oder Präzisierungen eigenmächtig ergänzen.
- Erklärungen verbessern heißt hier: klarer formulieren, Beispiel ergänzen, Intuition hinzufügen, Stolperfalle markieren — **nicht** Korrektheit erhöhen.
- Inhalte nie ohne expliziten Befehl ändern, kürzen oder „korrigieren" (siehe `rules/00_meta.md`).
