# Agent guidance

This repository is the reviewed, public distribution source for Lattice HR AI
skills. Drafting, experiments, synthetic fixtures, and evals live in Lattice's
internal skill sandbox and should not be copied here by default.

## Repository contract

- Each direct child of `skills/` is one installable skill.
- Every skill requires `skills/<name>/SKILL.md`.
- The frontmatter `name` must exactly match the parent directory.
- Keep frontmatter portable and minimal. Use `name` and `description`; add
  optional Agent Skills fields only when the public runtime needs them.
- Copy supporting `references/`, `scripts/`, or `assets/` only when the public
  `SKILL.md` requires them at runtime.
- Do not publish evals, fixtures, internal registries, owner notes, private
  links, customer data, or Lattice-on-Lattice test data.
- Do not invent or rename Lattice MCP tools. Confirm tool availability before
  changing a workflow.

## Authoring expectations

- Descriptions must explain both what the skill does and when to use it.
- Ask only for missing information that materially changes the result.
- Use authorized evidence and distinguish facts, interpretations, and gaps.
- Treat missing or inaccessible records as unknown, not negative evidence.
- Never claim a write succeeded without a successful tool result.
- Keep personnel decisions and accountability with the human.
- Escalate policy, legal, safety, discrimination, retaliation, leave,
  compensation, or termination concerns to the appropriate human partner.
- Include a non-Lattice workflow when the task can work from user-provided
  documents or context.
- End with concrete output expectations and quality checks.

## Promotion workflow

1. Review the complete source skill and every referenced runtime file.
2. Confirm the source contains no internal-only information.
3. Copy only the runtime package into `skills/<name>/`.
4. Run `npm run catalog`.
5. Run `npm run check`.
6. Inspect the generated ZIP root and content.
7. Open a pull request that records the sandbox source revision and testing.

Read `docs/AUTHORING-CONVENTIONS.md` and `docs/PROMOTION-WORKFLOW.md` before
adding or materially changing a skill.
