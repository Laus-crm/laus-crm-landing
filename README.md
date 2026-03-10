# Comment ajouter une actualité (news) depuis l’interface GitHub

Vous pouvez ajouter une nouvelle actualité sans toucher au code, en passant par GitHub (copier le fichier modèle, le modifier, puis committer pour déclencher le build).

### 1. Copier le fichier modèle

1. Sur GitHub, ouvrez le dossier **`src/content/news/`**.
2. Cliquez sur le fichier **`example.md`**.
3. Cliquez sur le bouton **"Raw"** (affichage du contenu brut).
4. Sélectionnez tout le texte (Ctrl+A / Cmd+A) et copiez-le (Ctrl+C / Cmd+C).
5. Revenez à la liste des fichiers du dossier `src/content/news/` (cliquez sur le nom du dossier dans le fil d’Ariane).
6. Cliquez sur **"Add file"** → **"Create new file"**.
7. Dans **"Name your file..."**, donnez un nom au fichier, par exemple **`ma-nouvelle-actu.md`** (sans espaces, avec des tirets).
8. Collez le contenu copié dans la zone de texte (Ctrl+V / Cmd+V).

### 2. Adapter le contenu du fichier

Dans le fichier que vous venez de créer, modifiez au minimum :

- **slug** : remplacez `example` par un identifiant unique pour cette actualité (ex. `ma-nouvelle-actu`). Pas d’espaces, pas d’accents.
- **titleFr** et **titleEn** : les titres en français et en anglais.
- **date** : le texte affiché (ex. `"15 Janvier 2025"` ou `"Du 1er au 7 janvier 2025"`).
- **sortDate** : la date au format `AAAA-MM-JJ` (ex. `2025-01-15`) pour le tri — les plus récentes s’affichent en premier.
- **image** : si vous ajoutez une image, déposez-la d’abord dans le dossier **`public/news/`** (voir étape 3), puis indiquez ici par ex. `/news/nom-du-fichier.jpg`.
- **contentFr** et **contentEn** : le corps du texte en français et en anglais.

Conservez le même format (bloc YAML entre `---`, champs avec les deux-points). Vous pouvez supprimer les lignes de commentaire qui commencent par `#` si vous le souhaitez.

### 3. (Optionnel) Ajouter une image

1. Sur GitHub, ouvrez le dossier **`public/news/`**.
2. Cliquez sur **"Add file"** → **"Upload files"**.
3. Glissez-déposez votre image (ou cliquez pour la sélectionner).
4. Dans votre fichier `.md`, le champ **image** doit pointer vers ce fichier, par ex. **`/news/mon-image.jpg`**.

### 4. Enregistrer et déclencher le build

1. En bas de la page, dans **"Commit changes"**, donnez un message (ex. *Ajout de l’actualité X*).
2. Cliquez sur **"Commit changes"** (ou **"Commit directly to the main branch"** si proposé).
3. Une fois le commit poussé, le déploiement (build) se lance automatiquement. Après quelques minutes, la nouvelle actualité apparaît sur le site.