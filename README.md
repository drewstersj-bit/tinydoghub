# TinyDogHub.co.uk

The UK's definitive online resource for owners of Chihuahuas, puppies and toy breeds.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Export)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Maps:** Leaflet + OpenStreetMap
- **Search:** Fuse.js (client-side, pre-built index)
- **Content:** MDX (git-based)
- **Deployment:** Netlify (static)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is generated to `/out` — ready for Netlify deployment.

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable React components
├── lib/           # Utility functions
content/           # MDX content files
public/            # Static assets
scripts/           # Build-time scripts
```

## Colour Palette

| Colour | Hex |
|--------|-----|
| Cream | #FFF8F0 |
| Warm White | #FDFBF7 |
| Soft Grey | #E8E4DF |
| Charcoal | #2D2D2D |
| Forest Green | #2D5016 |
| Muted Sage | #7A9B6D |
| Warm Beige | #D4C5B2 |
| Deep Coral (accent) | #E8614D |

## Typography

- **Headings:** Manrope
- **Body:** Inter
