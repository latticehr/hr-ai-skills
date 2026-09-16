# Skill promotion workflow

Lattice maintains two separate skill repositories:

- The internal sandbox is the working environment for drafts, synthetic
  fixtures, evals, iteration, and Lattice-on-Lattice UAT.
- This repository is the reviewed runtime distribution source consumed by the
  public skill library and installation tooling.

This boundary prevents internal program metadata and test data from becoming
part of a customer-facing skill package.

## Promotion checklist

### 1. Establish the source

- Start from a reviewed sandbox commit.
- Record the source commit in the public pull request.
- Confirm the skill passed its relevant evals and manual review.

### 2. Review public readiness

Read the complete `SKILL.md` and every file it references. Confirm:

- Frontmatter is valid and the name matches the directory.
- The description clearly distinguishes the skill from adjacent skills.
- Lattice MCP tool names and documented capabilities are current.
- Permission, confidentiality, write-action, and human-accountability
  boundaries are explicit.
- Links are public and durable.
- No customer data, private links, internal owners, tracker metadata, fixture
  paths, or eval-harness instructions are present.

### 3. Copy the runtime package

Copy the skill to `skills/<skill-name>/`.

Promote:

- `SKILL.md`
- Runtime `references/`, `scripts/`, and `assets/` required by `SKILL.md`

Keep internal unless publication is explicitly approved:

- `evals/`
- Synthetic or live-data fixtures
- Internal registries and MCP manifests
- Notion links, ownership notes, and launch tracking
- Internal CI and evaluation scripts

### 4. Validate distribution

```bash
npm run catalog
npm run check
```

Then inspect:

- `catalog.json` contains the expected metadata, source URLs, and install
  command.
- `dist/<skill-name>.zip` contains one top-level
  `<skill-name>/` directory.
- The archive includes every runtime file and excludes internal-only files.
- `dist/SHA256SUMS.txt` includes the package checksum.

### 5. Review and release

- Open a focused pull request.
- Include source revision, eval/UAT summary, known limitations, and affected MCP
  tools.
- Merge only after content and safety review.
- Create a `v*` tag when downloadable ZIP artifacts should be published as a
  GitHub release.

## Updating an existing public skill

Repeat the same process. Do not sync the sandbox directory wholesale: internal
evals and metadata can change independently of the runtime skill. Review the
diff from the last promoted source and copy only intentional runtime changes.
