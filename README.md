# Lattice HR AI Skills

Open Agent Skills for repeatable HR workflows.

Each skill follows the [Agent Skills specification](https://agentskills.io/specification)
and can be installed into supported AI coding agents with the
[Skills CLI](https://github.com/vercel-labs/skills).

The Lattice-hosted Skills Library is the customer-facing source for current
guidance. This repository provides the matching reviewed source and downloadable
artifacts.

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

## Security and responsible use

Lattice MCP uses your existing Lattice login and permissions. A skill does not
grant access to data or actions that your account cannot already access. When a
skill can save or submit in Lattice, that action uses your existing permissions
the same way MCP does. A skill's "ask first" instruction is guidance to the AI
tool, not a technically enforced control.

- Review the skill and its requested actions before use.
- Use only approved AI tools and the minimum employee data needed.
- Never paste credentials, tokens, client secrets, or protected health
  information into a prompt.
- Review employment-related outputs yourself. Confirm every write immediately
  before it happens.
- Treat modified or forked versions as third-party content; Lattice has not
  reviewed, supported, or endorsed those changes.

Learn more:

- [Lattice MCP security and permissions](https://help.lattice.com/en-us/articles/15878584-lattice-mcp-security-and-permissions)
- [Lattice MCP server FAQs](https://help.lattice.com/en-us/articles/15850155-lattice-mcp-server-faqs)
- [Lattice Trust Center](https://trustcenter.lattice.com/)
- [Security policy and vulnerability reporting](SECURITY.md)

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
- [Skill ownership and lifecycle](docs/SKILL-LIFECYCLE.md)
- [Contributing](CONTRIBUTING.md)

## License

This repository is licensed under the [MIT License](LICENSE).

These Skills are examples and are not an official Lattice product. They are
provided "as is" without HR, legal, employment, or compliance advice and for use
at your own risk. Lattice does not warrant any result produced by a Skill and is
not responsible for your use of or reliance on any output. You are responsible
for reviewing outputs and complying with all applicable laws, policies, and
agreements.
