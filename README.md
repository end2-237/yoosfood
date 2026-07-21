# YoosFood

Application YoosFood — site public (slider horizontal) + tableau de bord admin
(produits, commandes, avis) + pages de configuration NeonX.

Projet **unique Next.js** (App Router) : l'ancien frontend Vite/React et
l'ancien backend Express ont été fusionnés en une seule application.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **Supabase** (auth + données)
- **lucide-react** (icônes)

## Démarrage

```bash
npm install
cp .env.example .env.local   # renseignez vos clés Supabase
npm run dev                  # http://localhost:3000
```

## Scripts

| Commande        | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Serveur de développement           |
| `npm run build` | Build de production                |
| `npm run start` | Démarre le build de production     |
| `npm run lint`  | Lint Next.js                       |

## Structure

```
src/
  app/
    layout.jsx                 # layout racine + metadata
    page.jsx                   # site public + admin (rendu client)
    globals.css                # Tailwind
    neonx-admin/
      config/page.jsx          # /neonx-admin/config
      db-config/page.jsx       # /neonx-admin/db-config
    api/neonx/
      config/route.js          # GET  /api/neonx/config
      db-config/route.js       # GET/POST /api/neonx/db-config
  App.jsx                      # application principale (navigation par vues)
  components/                  # sections du site public
  pages/                       # vues (Home, Admin, Products, Orders, Reviews…)
  neonx.admin/                 # pages + auth NeonX
  services/                    # SupabaseServices, StorageService
  lib/                         # config NeonX + db.config.json
public/
  yfl1.png                     # logo
```

## Variables d'environnement

Voir `.env.example`. Les variables `NEXT_PUBLIC_*` sont exposées au navigateur.
