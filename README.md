# WHISER EXPERIENCE

# Projet utilisant pnpm

## Description
Ce projet est un exemple utilisant **pnpm** comme gestionnaire de paquets. **pnpm** est une alternative rapide et efficace aux gestionnaires de paquets comme npm ou yarn, permettant une utilisation optimisée de l'espace disque grâce à des liens symboliques.

## Prérequis

- **Node.js** version 14 ou ultérieure (disponible sur [nodejs.org](https://nodejs.org/))
- **pnpm** : Vous pouvez l'installer via npm avec la commande suivante :
  
  ```bash
  npm install -g pnpm
  ```

## Installation

Pour installer toutes les dépendances du projet, exécutez la commande suivante :

```bash
pnpm install
```

Cette commande créera un dossier `node_modules` optimisé grâce à pnpm, et installera toutes les dépendances spécifiées dans `package.json`.

## Scripts

Voici une liste des scripts disponibles que vous pouvez exécuter via pnpm :

- **Démarrer le projet en mode développement** :
  ```bash
  pnpm dev
  ```

- **Construire le projet pour la production** :
  ```bash
  pnpm build
  ```

- **Prévisualiser le projet après construction** :
  ```bash
  pnpm preview
  ```

- **Formater le code avec Prettier** :
  ```bash
  pnpm pretty
  ```

Vous pouvez ajouter d'autres scripts dans le fichier `package.json` et les exécuter avec `pnpm` de la même manière.

## Avantages de pnpm

- **Economies d'espace disque** : pnpm utilise des liens symboliques pour partager les dépendances entre différents projets. Cela permet d'économiser une grande quantité d'espace disque par rapport à npm ou yarn.
- **Vitesse** : En raison de l'utilisation des liens symboliques, l'installation est plus rapide.
- **Isolation stricte des dépendances** : pnpm garantit qu'aucune dépendance n'est installée par inadvertance au niveau racine, ce qui permet d'éviter les problèmes d'interdépendance.

## Utilisation de pnpm au lieu de npm

pnpm offre une syntaxe similaire à npm, voici quelques exemples de commandes courantes :

- **Installer une dépendance** :
  ```bash
  pnpm add <package>
  ```

- **Désinstaller une dépendance** :
  ```bash
  pnpm remove <package>
  ```

- **Mettre à jour les dépendances** :
  ```bash
  pnpm update
  ```

## En savoir plus

Pour en savoir plus sur **pnpm**, consultez la documentation officielle : [pnpm.io](https://pnpm.io/)

## Contribuer

1. **Forkez** le repository.
2. Créez une **branch** pour vos modifications :
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalité
   ```
3. **Commitez** vos modifications :
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. **Poussez** vers la branch :
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalité
   ```
5. Ouvrez une **Pull Request**.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.

## Dépendances

Voici un aperçu des principales dépendances utilisées dans ce projet :

- **DevDependencies** :
  - `prettier@3.2.5` : Utilisé pour formater le code automatiquement.
  - `vite@^5.1.0` : Un bundler de développement rapide pour les projets web modernes.
  - `vite-plugin-glsl@^1.3.0` : Un plugin pour charger les shaders GLSL avec Vite.

- **Dependencies** :
  - `gsap@^3.12.5` : Une bibliothèque d'animations pour créer des animations fluides.
  - `stats.js@^0.17.0` : Utilisé pour afficher des statistiques de performances.
  - `three@^0.161.0` : Une bibliothèque JavaScript pour créer des graphismes 3D.
  - `tweakpane@^4.0.4` : Un panneau de contrôle pour ajuster facilement les paramètres de l'application.

