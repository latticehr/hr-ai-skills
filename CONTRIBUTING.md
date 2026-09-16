# Contributing

Lattice-authored skills are drafted and evaluated in the internal sandbox, then
promoted here after review. Follow
[the promotion workflow](docs/PROMOTION-WORKFLOW.md) for those changes.

## Add a skill

1. Copy `templates/SKILL.template.md` into
   `skills/<skill-name>/SKILL.md`.
2. Use a lowercase, hyphenated name of 1–64 characters.
3. Make the frontmatter `name` exactly match the parent directory.
4. Write a description that explains what the skill does and when an agent
   should use it.
5. Keep the main instructions focused. Move detailed material into
   `references/`, deterministic helpers into `scripts/`, and reusable files
   into `assets/`.
6. Run `npm run catalog` to update the generated catalog.
7. Run `npm run check`.

## Authoring guidelines

- Treat `SKILL.md` as executable guidance, not general documentation.
- Make requirements explicit and put steps in the order they should run.
- Include representative trigger prompts and expected outcomes.
- Use relative paths for bundled resources and keep references shallow.
- Do not include credentials, customer data, private links, or internal-only
  information.
- Avoid scripts when instructions are sufficient.
- Document dependencies, network access, and destructive behavior.
- Keep `SKILL.md` below 500 lines when practical.

## Pull requests

Every pull request should explain:

- The workflow the skill supports.
- Who should use it.
- How it was tested.
- Any scripts, network access, or external dependencies it introduces.

At least one reviewer should read the complete skill and inspect every bundled
script before merge.
