# Tyssia Malalatiana — Portfolio

Portfolio en ligne de **Tyssia Malalatiana**, chargée de clientèle.

🌐 **Site :** https://tyssiam.github.io/
💼 **LinkedIn :** https://www.linkedin.com/in/tyssiamalalatiana/

## Contenu

Site d'une seule page en HTML, CSS et JavaScript, sans framework ni étape de build.

```
index.html     Structure et contenu de la page
styles.css     Mise en forme
script.js      Interactions (menu, animations)
assets/        Images, photo, favicon et image de partage
.nojekyll      Demande à GitHub Pages de servir les fichiers tels quels
```

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```bash
python3 -m http.server 8000
```

puis aller sur http://localhost:8000.

## Mettre à jour le site

Le site est publié avec GitHub Pages depuis la branche `main`, à la racine du repo.
Chaque push sur `main` met le site à jour en une ou deux minutes :

```bash
git add -A
git commit -m "Mise à jour du portfolio"
git push
```
