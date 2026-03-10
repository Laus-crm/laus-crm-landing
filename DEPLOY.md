# Déploiement GitHub Pages avec domaine perso (ex. mondns.com)

## 1. Domaine personnalisé dans GitHub

- Repo → **Settings** → **Pages**
- **Source** : GitHub Actions (ou la branche que tu utilises)
- **Custom domain** : `mondns.com` (ou `www.mondns.com`)
- Enregistrer, puis cocher **Enforce HTTPS** une fois le DNS à jour

## 2. DNS chez ton hébergeur (mondns.com)

Pour que **mondns.com** (sans www) pointe vers GitHub Pages :

- **Enregistrements A** (4 entrées), nom `@` (ou racine) :
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

Pour **www.mondns.com** (optionnel) :

- **CNAME** : nom `www` → valeur `TON-USERNAME.github.io`

La propagation DNS peut prendre jusqu’à 48 h.

## 3. Build pour la racine du domaine (mondns.com sans /laus-crm-landing/)

Pour que le site soit en `mondns.com` et non `mondns.com/laus-crm-landing/` :

```bash
VITE_BASE_PATH=/ npm run build
```

Puis déploie le contenu du dossier `dist/` (via ton workflow GitHub Actions ou en branch `gh-pages`).

**Si tu utilises un 404.html** (redirection SPA) : ouvre `public/404.html` et remplace la ligne :

```js
var base = '/laus-crm-landing/';
```

par :

```js
var base = '/';
```

avant de lancer le build pour le domaine perso.

## 4. Résumé

| Déploiement              | Commande de build        | URL finale              |
|--------------------------|--------------------------|-------------------------|
| GitHub Pages (sous-repo) | `npm run build`          | `...github.io/laus-crm-landing/` |
| Domaine perso            | `VITE_BASE_PATH=/ npm run build` + 404 avec `base = '/'` | `mondns.com`            |

Documentation GitHub : [Custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
