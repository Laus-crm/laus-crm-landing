---
# Ce fichier est un MODÈLE : copiez-le pour créer une nouvelle actualité.
# Il n'est jamais affiché sur le site (exclu du chargement).
# Image : déposer vos fichiers dans le dossier public/news/, puis indiquer le chemin /news/nom-du-fichier.jpg

# slug : identifiant unique pour l'URL (ex. /news/mon-slug). Pas d'espaces (utiliser des tirets), pas d'accents. Ne s'affiche pas sur la page.
slug: example
titleFr: "Titre de l'actualité en français"
titleEn: "News title in English"
# date : texte libre, affiché tel quel. Ex. "Du 1er janvier au 7 janvier 2025" ou "15 Janvier 2025"
date: "1 Janvier 2025"
# sortDate : format AAAA-MM-JJ, sert uniquement à trier les actualités (les plus récentes en premier). N'est pas affiché.
sortDate: 2025-01-01
image: /news/image-exemple-actualite.svg
# contentFr / contentEn : mise en forme possible dans le texte :
#   - Retour à la ligne : sauter une ligne dans le fichier (chaque nouvelle ligne s'affiche).
#   - Gras : <strong>votre texte</strong>
#   - Italique : <em>votre texte</em>
#   - Souligné : <u>votre texte</u>
contentFr: |
  Premier paragraphe. Pour un retour à la ligne, sautez une ligne dans le fichier comme ici.

  Deuxième paragraphe. Vous pouvez mettre du texte en <strong>gras</strong>, en <em>italique</em> ou <u>souligné</u> avec ces balises.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
contentEn: |
  First paragraph. For a line break, add a new line in the file like here.

  Second paragraph. You can use <strong>bold</strong>, <em>italic</em> or <u>underline</u> with these tags.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
---
