#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# check_refs.sh — Schutz vor toten internen Verweisen.
#
# Prueft, dass jeder interne Verweis in chapters/ auf ein real
# definiertes Label zeigt. Gepruefte Verweisformen:
#   - \ZSFref{label}      (ZSF-Querverweis)
#   - \hyperref[label]{}  (rohes hyperref auf ein Label)
# Definierte Labels stammen aus:
#   - optionalem Argument der Struktur-Makros
#     (\StartChapter[label], \SubsectionBar[label],
#      \SubsectionBarOnNewColumn[label], jeweils auch *-Variante)
#   - rohem \label{label} (z.B. nach \section/\subsection)
#
# Kommentarzeilen (unmaskiertes %) werden ignoriert, damit
# auskommentierte Beispiel-Refs keine Fehlalarme ausloesen.
# Rein statisch — kein Build noetig. Exit 1 bei totem Verweis.
# ============================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHAPTER_DIR="$ROOT_DIR/chapters"

if [[ ! -d "$CHAPTER_DIR" ]]; then
  echo "chapters directory not found: $CHAPTER_DIR"
  exit 1
fi

labels="$(mktemp)"
trap 'rm -f "$labels"' EXIT

# TeX-Kommentare entfernen (unmaskiertes %), Zeilenanzahl bleibt erhalten.
strip_comments() {
  sed -E 's/([^\\])%.*/\1/; s/^%.*//' "$1"
}

# --- Pass 1: alle definierten Labels einsammeln ---
# grep darf leer ausgehen (Dateien ohne Labels) -> || true gegen set -e/pipefail.
while IFS= read -r f; do
  { strip_comments "$f" \
      | grep -oE '\\(StartChapter|StartChapterOnNewColumn|SubsectionBar|SubsectionBarOnNewColumn)\*?\[[^]]*\]' \
      | sed -E 's/.*\[([^]]*)\]/\1/'; } || true
  { strip_comments "$f" \
      | grep -oE '\\label\{[^}]*\}' \
      | sed -E 's/\\label\{([^}]*)\}/\1/'; } || true
done < <(find "$CHAPTER_DIR" -name '*.tex' | sort) | sort -u > "$labels"

# --- Pass 2: jeden Verweis gegen die Label-Menge pruefen ---
violations=0
while IFS= read -r f; do
  rel="${f#"$ROOT_DIR"/}"
  while IFS= read -r hit; do
    [[ -z "$hit" ]] && continue
    lineno="${hit%%:*}"
    match="${hit#*:}"
    # Ziel aus \ZSFref{...} ODER \hyperref[...] extrahieren.
    target="$(printf '%s' "$match" | sed -E 's/\\ZSFref\{([^}]*)\}/\1/; s/\\hyperref\[([^]]*)\]/\1/')"
    if ! grep -qxF "$target" "$labels"; then
      echo "[DANGLING REF] $rel:$lineno -> $match hat kein passendes Label"
      violations=1
    fi
  done < <(strip_comments "$f" | grep -noE '\\ZSFref\{[^}]*\}|\\hyperref\[[^]]*\]' || true)
done < <(find "$CHAPTER_DIR" -name '*.tex' | sort)

if [[ "$violations" -ne 0 ]]; then
  echo "Reference check failed: tote interne Verweise gefunden (siehe oben)."
  exit 1
fi

echo "Reference check passed: alle \\ZSFref zeigen auf existierende Labels."
