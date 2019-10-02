# Mettre en place une progressive web app

L'objectif de ce projet consiste en la mise en place d'une progressive web app configurée grâce à WorkBox.

## Qu'est ce qu'une progressive web app ? 

> Une PWA c’est un site web qui a l’allure d’une application native.

> Comme un site, elle est composée d’un code unique, en HTML / CSS / JS / PHP ; d’une adresse URL, de la protection HTTPS, etc. Et comme une application, elle est disponible hors connexion, on peut y intégrer des métadonnées, certains accès aux fonctions natives du téléphone et les notifications push (pour les modèles plutôt récents sous Android). L’architecture Shell (Application Shell Architecture) des PWA permet un chargement instantané avec mise en cache : la structure est chargée en première et mise en cache, ainsi à chaque re-visite, seul le contenu est mis à jour via la connexion internet.

> Une Progressive Web App fonctionne avec les « service workers » qui sont des fonctionnalités du navigateur, exploitées via JavaScript. On retrouve aussi une notion d’amélioration progressive. L’idée est de concevoir une expérience qui fonctionne partout puis de l’améliorer pour les appareils qui supportent davantage de fonctionnalités.

Source: [medium.com by Biig](https://medium.com/@BiigDigital/les-progressive-web-apps-7b065b11983b "medium.com by Biig")

### Installer Workbox

`$ npm install workbox-cli --save-dev `

### L'utilitaire WorkBox

La première commande que nous allons utiliser est la commande `wizard`

`workbox wizard` scanne nos répertoires et nous pose quelques questions afin de créer le fichier de configuration **workbox.config.js**

`$ npx workbox wizard`

Répondez **yes** à toutes les questions (en s'assurant que cela a du sens)

[<img src="https://miro.medium.com/max/2030/1*uT5yudgZKMMAeYAVm5WOaQ.gif">](https://medium.com/google-developer-experts/a-5-minute-intro-to-workbox-3-0-156803952b3e)

Vous avez maintenant un fichier de configuration **workbox-config.js** contenant le code ci-dessous 

```javascript
module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{jpg,html,js,css}"
  ],
  "swDest": "dist/sw.js"
};
```
### La commande Workbox generateSW
Cette commande va lire notre fichier **workbox-config.js** et va générer un service worker qui va mettre en cache les fichiers correspondant au pattern `"**/*.{jpg,html,js,css}"` 

`$ npx workbox generateSW workbox-config.js`

### Enregistrer le service worker 
Pour cela ajoutons un lien vers le fichier sw.js précedemment crée dans notre fichier `index.html`

```html
<script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('sw.js');
            });
        }
</script>
```

### Lancez Visual Studio Live Server

Et voilà ! 
Vous pouvez voir que dans l'onglet **Network** de Chrome Dev Tools les requêtes faites par notre **service worker** sont préfixées d'une icône ⚙️

Vous pouvez également voir les fichiers mis en cache par Workbox dans l'onglet **Application > Cache Storage > Workbox precache**

### Testez en Offline 

Rendez-vous dans l'onglet **Network** et mettez-vous en mode **offline**

> Que remarquez-vous ? 🧙‍

### Workbox injectManifest

Comme vous pouvez-le voir le fichier `sw.js` est généré par Workbox. 
Mais que se passe t-il si l'on veut personnaliser notre **service worker ?**
Si l'on veut ajouter de l'**analytics offline** ?

Vous ne pouvez pas modifier le fichier `sw.js` car il sera re-généré à chaque fois.

Pour cela nous avons besoin d'un `source service worker` qui servira de référence pour la génération de notre fichier `sw.js`

Créons alors un fichier **src-sw.js** à la racine de notre projet contenant le code suivant 

```javascript
// Importation de workbox depuis un CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// Ajout de code personnalisé
console.log('this is my custom service worker');

//Ajout d'un placeholder 
workbox.precaching.precacheAndRoute([]);
```

Workbox va donc:

1. Générer notre tableau contenant nos ressources à mettre en cache (**voir sw.js**)
2. Injecter notre "code personnalisé" 
3. Ajouter notre ligne `workbox.precaching.precacheAndRoute([]);`

Maintenant, ajouter la ligne suivante dans votre fichier `workbox-config.js`

```javascript
module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{css,html,js}"
  ],
  "swDest": "build/sw.js",
  "swSrc": "src-sw.js"
};
```
*Workbox.config.js*

> Maintenant, lancer simplement la commande `npx workbox injectManifest`

### Workbox routing 

Nous avons maintenant ajouté du *pre-caching*, nous allons ajouter des instructions à **workbox** concernant quelques ressources supplémentaires à mettre en cache

C'est à ce moment qu'intervient **Workbox routing** qui nous permet de définir, grâce aux expressions régulières, des stratégies spécifiques.

> Nous pourions définir nos propres stratégies mais nous utiliserons ces trois dernières qui répondent à la majorité de nos besoins 

```javascript
workbox.strategies.cacheFirst()
workbox.strategies.networkFirst()
workbox.strategies.staleWhileRevalidate()
```

Pour plus d'informations sur comment ces stratégies fonctionnent [voir la documentation strategies docs](https://developers.google.com/web/tools/workbox/modules/workbox-strategies)

Traduit et adapté de l'anglais depuis [https://medium.com/google-developer-experts/a-5-minute-intro-to-workbox-3-0-156803952b3e](https://medium.com/google-developer-experts/a-5-minute-intro-to-workbox-3-0-156803952b3e)

# Mettre en place un manifest.json
Le manifest d'une web app sert à donner au navigateur des informations à propos de notre application et comment elle doit être installée sur mobile ou desktop.

Par exemple, un manifest est requis pour afficher une demande d'ajout sur l'écran d'accueil sur Chrome. ([voir documentation](https://developers.google.com/web/fundamentals/app-install-banners/)) 

### Creer le fichier manifest

Créez un fichier `manifest.json` dans votre dossier `/dist/`

```json
{
  "short_name": "IIST",
  "name": "Is it sunny tomorrow ?",
  "icons": [
    {
      "src": "/assets/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/assets/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/dist/?source=pwa",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/dist/",
  "theme_color": "#3367D6"
}
```

### Lier le manifest
Liez le manifest à votre `index.html` 

```html
<link rel="manifest" href="/manifest.json">
```

### Tester notre manifest

Pour tester votre `manifest.json` rendez-vous dans l'onglet **Application** des outils de développement *Chrome*

[<img src="https://developers.google.com/web/fundamentals/web-app-manifest/images/devtools-manifest.png">](https://medium.com/google-developer-experts/a-5-minute-intro-to-workbox-3-0-156803952b3e)

# Pour aller plus loin

> Vous souhaitez aller plus loin ?

Développez sur votre **PWA** une demande d'ajout à l'écran d'accueil sur Android ([Add To Home Screen](https://developers.google.com/web/fundamentals/app-install-banners#test))


Traduit et adapté de l'anglais depuis [https://developers.google.com/web/fundamentals/web-app-manifest](https://developers.google.com/web/fundamentals/web-app-manifest)
