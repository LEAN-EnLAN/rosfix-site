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
