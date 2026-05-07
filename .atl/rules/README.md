# Rules Router

This directory contains modular project rules. When delegating to a sub-agent, use the following mapping:

| Sub-agent Phase | Rule Files to Inject |
|-----------------|----------------------|
| Explore / Propose | `vision.md` |
| Spec / Design | `vision.md`, `design-system.md` |
| Apply | `design-system.md`, `coding-standards.md` |
| Verify | `coding-standards.md` |

To inject: Read the required files and prepend their content as `## Project Standards (auto-resolved)` in the sub-agent prompt.
