# Lattice HR AI Skills

Open Agent Skills for repeatable HR workflows.

Each skill follows the [Agent Skills specification](https://agentskills.io/specification)
and can be installed into supported AI coding agents with the
[Skills CLI](https://github.com/vercel-labs/skills).

## Install a skill

```bash
npx skills add latticehr/hr-ai-skills --skill <skill-name>
```

For example:

```bash
npx skills add latticehr/hr-ai-skills --skill weekly-updates-workflow
```

The CLI asks which supported agent and scope to use. Review a skill and any
bundled scripts before installing it.

## Repository structure

```text
skills/
└── skill-name/
    ├── SKILL.md
    ├── references/  # optional
    ├── scripts/     # optional
    └── assets/      # optional
```

Every skill directory must contain a `SKILL.md`. Its frontmatter `name` must
match the directory name.

## Development

Requires Node.js 20 or later.

```bash
npm install
npm run check
```

Useful commands:

- `npm run validate` validates every skill.
- `npm run catalog` regenerates `catalog.json`.
- `npm run package` creates one installable ZIP per skill in `dist/`.

## Documentation

- [Initial skill set](docs/INITIAL-SKILLS.md)
- [Authoring conventions](docs/AUTHORING-CONVENTIONS.md)
- [Promotion workflow](docs/PROMOTION-WORKFLOW.md)
- [Contributing](CONTRIBUTING.md)
