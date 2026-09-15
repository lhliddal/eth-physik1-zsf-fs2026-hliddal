SHELL := /bin/bash
.DEFAULT_GOAL := build


MAIN := main.tex
BUILD_DIR := build
PDF_BASENAME ?= physik1_fs2026_hliddal
OUTPUT_PDF := $(PDF_BASENAME).pdf
OUTPUT_SYNC := $(PDF_BASENAME).synctex.gz
SYNCTEX ?= 1
LATEXMK_FORCE ?=
LATEXMK_FLAGS := -interaction=nonstopmode -file-line-error -pdf
ifeq ($(SYNCTEX),1)
LATEXMK_FLAGS += -synctex=1
endif

LOCAL_BUILD_DATE ?= $(shell date +%Y-%m-%d)
RELEASE_ID ?= DEV-$(LOCAL_BUILD_DATE)
RELEASE_LABEL = $(subst DEV-,DEV\space\textperiodcentered\space ,$(RELEASE_ID))
BUILD_STAMP ?= $(shell date -u +%Y%m%dT%H%M%SZ)
GIT_COMMIT ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo nogit)
LATEX_DEFS := \def\ZSFReleaseID{$(RELEASE_ID)}\def\ZSFReleaseLabel{$(RELEASE_LABEL)}\def\ZSFBuildStamp{$(BUILD_STAMP)}\def\ZSFGitCommit{$(GIT_COMMIT)}
IDENTITY_STAMP := $(BUILD_DIR)/.zsf-identity
IDENTITY_KEY := $(RELEASE_ID)|$(GIT_COMMIT)
IDENTITY_FORCE := $(shell if [ ! -f "$(IDENTITY_STAMP)" ] || [ "$$(cat "$(IDENTITY_STAMP)")" != "$(IDENTITY_KEY)" ]; then printf '%s' '-g'; fi)

# Optional local-only automation; Makefile.local is gitignored.
-include Makefile.local

.PHONY: build rebuild clean all release-proof print-pdf-basename print-release-id

build:
	INDEXSTYLE="$(CURDIR)/styles:" \
	latexmk $(LATEXMK_FORCE) $(IDENTITY_FORCE) $(LATEXMK_FLAGS) -outdir=$(BUILD_DIR) -auxdir=$(BUILD_DIR) \
		-e '$$makeindex = q{makeindex -r -s zsfindex.ist %O -o %D %S};' \
		-pdflatex="pdflatex %O '$(LATEX_DEFS)\input{%S}'" $(MAIN)
	@cp $(BUILD_DIR)/main.pdf "$(OUTPUT_PDF)"
	@if [ "$(SYNCTEX)" = "1" ] && [ -f "$(BUILD_DIR)/main.synctex.gz" ]; then cp "$(BUILD_DIR)/main.synctex.gz" "$(OUTPUT_SYNC)"; fi
	@printf '%s\n' "$(IDENTITY_KEY)" > "$(IDENTITY_STAMP)"

rebuild: LATEXMK_FORCE := -g
rebuild: build

print-pdf-basename:
	@echo "$(PDF_BASENAME)"

release-proof:
	@mkdir -p $(BUILD_DIR)
	@shasum -a 256 "$(OUTPUT_PDF)" > $(BUILD_DIR)/main.pdf.sha256
	@echo "Wrote $(BUILD_DIR)/main.pdf.sha256"

clean:
	rm -rf $(BUILD_DIR)
	rm -f *.aux *.fdb_latexmk *.fls *.log *.out *.synctex.gz *.toc *.bbl *.blg *.bcf *.run.xml *.idx *.ilg *.ind

all: build
