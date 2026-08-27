# Codex Working Instructions

## Repository purpose and architectural priority

This repository is the Hebrew **Vienna 2026 Travel Knowledge Vault**. It serves first as an Obsidian vault, second as the content/data source for a future Quartz site, and third as a GitHub repository intended for later publication with GitHub Pages.

The Markdown knowledge vault is the primary content and data layer. **Quartz must adapt to the Vault; never redesign the Vault merely to make Quartz configuration easier.** Do not install, initialize, or reconfigure Quartz unless a task explicitly requests it.

## Repository map

- `00-Index/`: navigation and thematic index notes.
- `01-Vienna/`: Vienna place and background notes, grouped by numbered district; cross-district topics live in `Cross-District/`.
- `02-Day-Trips/`: regional place, background, and day-trip notes grouped by destination.
- `70-People/`: standalone notes for people who materially explain places or themes.
- `80-Routes/`: curated routes that connect existing place notes in visit order.
- `90-Reference/`: policies, trip facts, practical reference material, decisions, and verification queues.
- `Templates/`: canonical Obsidian note templates for each content type.
- `assets/`: image documentation, the future local-image destination, and the central license registry.
- `.obsidian/`: vault configuration. Treat it as application state/configuration and preserve it unless explicitly asked to change it.
- `README.md` and `FILE-LIST.md`: repository overview and tracked content inventory.

## Preserve the Obsidian Vault

- Keep all notes valid in Obsidian and preserve Obsidian-native behavior.
- Do not rename, move, split, merge, or broadly reorganize notes or directories unless explicitly requested.
- Do not replace WikiLinks merely for compatibility with another publisher.
- Do not modify `.obsidian/` incidentally. Avoid committing workspace-state churn.
- Before adding a note, inspect the matching template and several nearby notes of the same type.
- If files are intentionally added, removed, or renamed, update navigation/index pages and `FILE-LIST.md` as part of the same explicitly authorized change.

## Markdown conventions

- Files use standard Markdown with YAML front matter where the note type requires it.
- The visible H1 and prose are primarily Hebrew. English, German, Austrian German, proper names, URLs, and technical terms remain in their appropriate original form.
- Follow the section structure of the relevant file in `Templates/`; also match established neighboring notes rather than mechanically adding empty sections.
- Place sources in a final `## מקורות` section. Preserve existing source formatting unless the task specifically calls for a focused migration.
- Preserve meaningful spacing, list order, image captions, comments such as `<!-- hero-image -->`, and the established editorial voice.
- Do not rewrite Hebrew merely to normalize, beautify, translate, or enforce a different style.
- Tags supplement links; they do not replace relationships expressed with WikiLinks.

## YAML and front matter

- Preserve existing keys, values, key order, scalar types, list shapes, indentation, and date format unless a requested content change requires otherwise.
- Use the appropriate template for new records. Common `type` values include `index`, `place`, `person`, `route`, `day-trip`, `reference`, and `source`; some established regional notes use `region`.
- `name` is normally the English/international name, `name_he` the Hebrew display name, and `name_local` the official local-language name when applicable.
- Keep status and planning fields semantically distinct, including `visit_status`/`status`, `content_status`, `verification`, and `recheck_before_visit`.
- Do not invent missing coordinates, dates, ratings, status values, image metadata, or relationships. Leave template fields empty or flag facts for verification as appropriate.
- Maintain existing compact YAML lists where used (for example, `tags: [place, vienna]`) unless there is a strong local reason not to.

## Internal links and content relationships

- Use Obsidian WikiLinks, normally `[[English-ASCII-Filename|Hebrew display text]]`.
- On first meaningful mention, established display text commonly gives Hebrew followed by the local/original name in parentheses, for example `[[Maria-Theresa|מריה תרזה (Maria Theresia)]]`.
- Do not change a WikiLink target, alias, heading fragment, or embed syntax without checking that the target resolves and the Hebrew display remains correct.
- Index notes are the principal navigation layer. Place/background notes link to relevant people and nearby places; person notes link back to meaningful trip locations and related people; route notes assemble linked places in visit order; day-trip notes connect regional places and context. Preserve these reciprocal, semantic relationships when editing.
- Significant people receive standalone notes only when they materially help explain a place or theme; do not create notes merely to enlarge the graph.
- After link-affecting work, check for unresolved WikiLink targets across the whole vault.

## File and directory naming

- Markdown filenames are English, ASCII-friendly, and follow the existing Pascal/Kebab-style examples, such as `Hotel-IMLAUER-Wien.md` and `Imperial-Vienna-Route.md`.
- Keep established transliterations in filenames (for example, `Schoenbrunn` and `Duernstein`); do not normalize them to accented spellings or a different transliteration scheme.
- Directory names and numeric prefixes encode content roles and, within Vienna, district organization. Preserve them.
- Hebrew belongs in display titles, aliases, and prose rather than new filenames, unless an explicit repository-wide decision changes this convention.
- Avoid case-only renames and avoid creating duplicate basenames, because Obsidian links commonly resolve by note basename.

## Hebrew, mixed-language, and RTL requirements

- Hebrew is the primary content language and must remain natural, accurate, and readable right-to-left.
- Preserve mixed Hebrew/English/German names and technical terms exactly when they are intentional. At first appearance, use the Hebrew name followed by the official local name in parentheses where the established style calls for it.
- Do not reverse punctuation, list order, parentheses, dates, URLs, filenames, code, or Latin-script names in an attempt to simulate RTL.
- Prefer sentences that begin with a Hebrew word when writing Hebrew prose, especially where the place template requests this; this reduces bidirectional-rendering ambiguity.
- Keep URLs, code spans, YAML keys, and WikiLink targets left-to-right as authored. Only the reader-facing alias should be adapted for Hebrew display.
- Do not add ad hoc HTML wrappers or Unicode direction-control characters throughout content. Future Quartz layout/CSS should supply document-level RTL behavior while isolating left-to-right technical fragments appropriately.
- For any future rendered-site change, test headings, paragraphs, numbered and bulleted lists, parentheses around local names, punctuation, tables if introduced, WikiLink aliases, and image credits at narrow and wide widths.

## Images and licensing

- Follow `90-Reference/Image-and-License-Policy.md` and treat `assets/licenses/images.yml` as the central image registry. Consult `90-Reference/Image-Registry-Report.md` for the current audit state.
- Never add or publish an image unless publication rights are clear and documented. Acceptable licenses are Public Domain, CC0, CC BY, and CC BY-SA in the versions recorded by the registry.
- Do not use CC BY-NC, CC BY-ND, ordinary commercial/marketing images, search-result thumbnails, social-media images, or any image with ambiguous rights.
- Wikimedia Commons is the preferred source, but its file page must still be checked; being hosted on Commons is not by itself sufficient proof.
- The current model uses remote Wikimedia Commons `Special:FilePath` URLs, generally requesting a maximum width of 1600 pixels. Do not download or relocate those images without an explicit task and a coordinated metadata update.
- Every used image must record provider, exact file name, remote/local URL, source page, creator/author, exact license, license URL, verification date, and every consuming note in `assets/licenses/images.yml`.
- Mirror the registered metadata in the note's `hero_image` front matter and include the established visible credit directly below the image.
- If no clearly reusable image is available, omit it and document that status rather than substituting an unlicensed image. Never guess an author or license.
- License or registry changes require checking the registry, note front matter, rendered credit, source page, and `used_by` relationships together.

## Sources, attribution, and factual care

- Follow `90-Reference/Source-Policy.md`: prefer official venue sites; government/public and official tourism bodies; UNESCO, universities, and research institutions; official cultural institutions; then high-quality secondary sources when needed for context.
- Wikimedia Commons is the preferred image-rights source, not a default authority for all travel facts.
- Every substantive content note should retain a `## מקורות` section. Attribute claims to sources capable of supporting them and never fabricate citations.
- Treat opening hours, prices, tickets, transport, exhibitions, closures, accessibility, and similar operational details as time-sensitive. Record verification dates and maintain relevant `recheck_before_visit` fields or the verification queue.
- Distinguish verified fact, interpretation, anecdote, and uncertainty. Preserve cautions around disputed or sensitive historical claims.
- New sourced material must be paraphrased responsibly; do not copy substantial copyrighted text.

## Rules for future Quartz work

- Do not install Quartz or generate a Quartz scaffold unless explicitly requested.
- Keep Quartz configuration, components, and styling separate from the primary travel content wherever possible.
- Configure Quartz to support the existing directory layout, YAML schema, basename WikiLinks, Hebrew titles, mixed-language aliases, remote licensed images, and source sections.
- Quartz must provide accessible RTL-first presentation without injecting presentation-only markup into every note.
- Do not mass-convert WikiLinks, rename content, flatten directories, rewrite front matter, or relocate assets to satisfy a Quartz default. Adapt the build/configuration instead.
- Preserve Obsidian compatibility and verify both Obsidian authoring and the generated site after any publishing change.

## Scope discipline

- Make the smallest change that satisfies the task. Broad formatting passes, content normalization, structural cleanup, and opportunistic rewrites are prohibited unless explicitly requested.
- Do not change travel facts or editorial prose while performing tooling, publishing, metadata, or policy work.
- Review `git status` before work so pre-existing changes are not overwritten or included accidentally.
- Never modify unrelated files to make validation output cleaner.

## Testing and validation

Choose checks appropriate to the change, and report the exact commands and outcomes.

At minimum:

1. Run `git status --short` before and after the work.
2. Run `git diff --stat` and `git diff --check`.
3. Review the complete `git diff` before committing.
4. Confirm that only explicitly authorized files changed.
5. For Markdown/front-matter changes, validate YAML parsing and inspect the rendered structure or an equivalent Markdown check.
6. For link changes, scan all WikiLinks and confirm each target exists and is unambiguous.
7. For image changes, validate the registry YAML and cross-check each note, credit, registry entry, license URL, and `used_by` path.
8. For future Quartz changes, run the repository's documented build/test commands and inspect the generated Hebrew RTL pages at desktop and mobile widths. Check for broken links, missing images, accidental LTR layout, and build artifacts that should not be committed.

Do not install unrelated dependencies merely to run a check. If no automated test suite exists for a documentation-only change, state that clearly and rely on targeted structural validation, diff review, and repository-status checks.
