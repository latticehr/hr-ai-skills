# Skill authoring conventions

These conventions reflect the patterns established by the first six Lattice HR
AI skills. They supplement the
[Agent Skills specification](https://agentskills.io/specification).

## Frontmatter

Use minimal, portable frontmatter:

```yaml
---
name: lowercase-hyphenated-name
description: Explain what the skill does and when an agent should use it.
---
```

The directory and frontmatter names must match. Treat the description as the
skill's routing trigger, not as generic marketing copy.

## Recommended structure

Use only the sections the workflow needs, generally in this order:

1. Purpose and non-negotiable boundaries
2. `## Intake`
3. `## Lattice MCP workflow`
4. `## Non-Lattice workflow`
5. Domain-specific method, modes, or framework
6. `## Quality checks`
7. `## Output`
8. `## Best-practice foundation`

When a skill supports multiple variants, group them under one top-level section
with descriptive `###` headings. Infer the appropriate variant from context
instead of presenting a long menu.

## Intake

- Ask only for missing information that materially changes the workflow.
- Proceed without questions when the supplied context is sufficient.
- Batch related questions into one turn.
- Do not search every connected source by default. Use sources the user selects
  or clearly authorizes.

## Evidence and permissions

- Ground material claims in user input or retrieved evidence.
- Never replace missing evidence with plausible content.
- Separate observed facts from interpretation and recommendation.
- Track the date range and population actually reviewed.
- Distinguish “not checked,” “checked and empty,” and “not visible.”
- Minimize sensitive details in final and supporting artifacts.
- Respect the requester's existing Lattice permissions.

## Lattice MCP workflows

- Reference tool names in backticks.
- Explain tool order when sequencing affects correctness.
- State whether relevant tools are read-only or can write.
- Gate saves and submissions behind explicit approval.
- Never claim a save, submission, or other action succeeded without a successful
  tool result.
- Describe results to end users in plain language rather than exposing internal
  tool or field names.

## Human accountability and safety

Skills advise, prepare, and draft; they do not make personnel, performance,
promotion, compensation, or employment decisions.

Flag policy, legal, security, privacy, safety, discrimination, retaliation,
leave, compensation, or termination issues for the appropriate human owner.
Check for recency, proximity, attribution, confirmation, halo/horns,
similarity, and single-source bias where relevant.

## Output and quality

Define a practical output contract: structure, audience, constraints, review
steps, and available next actions. More content is not automatically better;
fit the requested meeting length, format, or scope.

The quality section should be testable. It is the starting point for internal
eval scenarios and should cover evidence fidelity, balance, permissions,
action-claim honesty, human accountability, fit for purpose, and appropriate
clarification.

## Supporting files

Keep `SKILL.md` concise and use:

- `references/` for detailed guidance loaded only when needed.
- `scripts/` for deterministic processing that instructions alone cannot do.
- `assets/` for templates and files used in generated output.

Use relative, shallow references. Do not add supporting files solely to mirror
the internal sandbox's eval structure.
