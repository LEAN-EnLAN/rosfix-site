# Tool Routing

Use external tools only when they materially improve delivery or execution.

## Primary routing

### Canva

Use Canva tools when the user wants:

- finished social pieces
- carousels
- resized social variants
- presentations
- design generation from templates
- translation or iteration of a design

Preferred flows:

- `carousel_system` + Canva for slide/carousel execution
- `visual_prompt` + Canva when the user wants a produced asset instead of only a prompt
- branded presentations via the Canva presentation workflow if ROSFIX needs sales or institutional decks

### BrowserOS

Use BrowserOS when the task needs:

- visual review of the ROSFIX website
- screenshots of live pages
- DOM inspection
- confirmation that landing edits preserve brand quality
- competitive analysis on visible web references

### Vercel

Use Vercel tools and MCP when the task touches:

- deployments
- preview URLs
- docs for web implementation
- project inspection
- build or deploy debugging

### Gmail

Use Gmail when the user wants:

- inbox triage for leads
- draft replies to prospects
- labeling or organizing consultations
- forwarding inbound opportunities

### Google Calendar

Use Google Calendar when the user wants:

- scheduling for meetings, pickups, or content production
- daily briefs
- available slots
- reminders tied to marketing operations

### GitHub

Use GitHub when the task involves:

- repo issues or PRs for the ROSFIX site
- publishing marketing copy or design-system changes through code review

## Default output by task

- Caption request: deliver final copy directly; only use tools if the user wants publishing or design execution.
- Visual prompt request: deliver prompt + art direction first; use Canva only when the user wants the asset produced.
- Landing/web request: inspect files locally first, then BrowserOS/Vercel when verification is needed.
- Brand review request: audit locally first; use BrowserOS for live pages when there is a rendered target.

## Bias rule

When there is a choice between:

- more spectacular
- more coherent

choose more coherent.
