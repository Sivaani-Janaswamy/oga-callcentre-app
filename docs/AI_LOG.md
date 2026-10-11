# AI usage log

## Tools used

| Tool | What it did |
| --- | --- |
| Claude | Helped with planning documents, specs, and prompts. |
| GitHub Copilot agent in VS Code | Implemented most of the front end under `SPEC.md`, `DATABASE_DESIGN.md`, and `TASKLIST.md`. |

Every AI-written change was checked with lint, build, and tests. The git history records the
work in small commits.

## Key corrections

- I restarted the Git history so the project could be shipped in small, readable commits.
- I removed mock files from the repository.
- I replaced the changing-date rule with the fixed 9 Oct 2026 demo date.
- I rejected hard-coded values in components and kept data in the seed and service layers.
- I kept the mock source away from the coding agent. The implementation used my own reference
  notes, screenshots, and the written project specification.
