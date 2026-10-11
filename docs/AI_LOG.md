# AI usage log

## Tools used

| Tool                            | What it did                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| Claude                          | Helped with planning documents, specs, and prompts.                                         |
| GitHub Copilot agent in VS Code | Implemented most of the front end under `SPEC.md`, `DATABASE_DESIGN.md`, and `TASKLIST.md`. |
| Kilo coding agent               | Finished phone-width responsiveness, loading skeletons and empty states, contrast fixes, and verification. |

Every AI-written change was checked with lint, build, and tests. The git history records the
work in small commits.

## Key corrections

- I restarted the Git history so the project could be shipped in small, readable commits.
- I removed mock files from the repository.
- I replaced the changing-date rule with the fixed 9 Oct 2026 demo date.
- I rejected hard-coded values in components and kept data in the seed and service layers.
- I kept the mock source away from the coding agent. The implementation used my own reference notes, screenshots, and the written project specification.
- A second coding agent finished the final groups (fixing missing CSS tokens, call timer, tests, hover states, format pass, and docs sync) after the first agent hit its usage limit.
- A third agent (Kilo) finished the remaining groups: it fixed the Plan sidebar toggle (the group was unreachable from the dashboard), wired the real Practise page into the router (it was still a placeholder), replaced the `warning*` Tailwind classes that silently did not exist with the defined `warn*` tokens, darkened the success/warn/info/danger/accent tokens until Lighthouse contrast passed, added loading skeletons and empty states, added Escape and focus handling to the mobile drawer, and verified everything with an automated browser audit (no horizontal overflow at 360/390/768px) and Lighthouse accessibility 1.0 on four screens. Screenshots for `docs/screens/` were captured with headless Chrome.
