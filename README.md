# rosFIX

Sitio multipagina para `rosFIX`, un servicio tecnico independiente de Rosario orientado a celulares, notebooks y PC.

## Stack

- React 19
- Vite
- Tailwind CSS 4
- SVG custom para hero y visuales tecnicos

## Paginas

- `index.html`
- `servicios.html`
- `proceso.html`
- `sobre-rosfix.html`
- `contacto.html`
- `diagnostico.html`

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publicacion estable en GitHub Pages

Este repo usa GitHub Pages en modo `main` + `/docs` para evitar depender de GitHub Actions.

Flujo recomendado:

```bash
npm install
npm run publish:pages
git add .
git commit -m "Update Pages build"
git push
```

Eso reconstruye `dist/` y sincroniza `docs/`, que es la carpeta servida por Pages.

## Agente local ROSFIX Marketing

El repo ahora incluye un plugin local en [plugins/rosfix-marketing](/home/pulpo/Documents/rosfix/plugins/rosfix-marketing) y un marketplace local en [.agents/plugins/marketplace.json](/home/pulpo/Documents/rosfix/.agents/plugins/marketplace.json).

Skills principales:

- `rosfix-marketing-director`
- `instagram_caption`
- `visual_prompt`
- `carousel_system`
- `reel_script`
- `brand_guard`
- `landing_copy`
- `art_direction`

La configuracion portable de marca y guardrails vive en [plugins/rosfix-marketing/references/agent-config.yaml](/home/pulpo/Documents/rosfix/plugins/rosfix-marketing/references/agent-config.yaml).
