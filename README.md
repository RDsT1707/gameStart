# GameStart - Boutique de jeux vidéo

## Présentation du projet

GameStart est un projet de boutique en ligne de jeux vidéo que j'ai développé dans le cadre de ma formation en développement web full stack.  
L'objectif était de créer une application moderne, performante et responsive, permettant aux utilisateurs de naviguer parmi une sélection de jeux, de les ajouter à un panier, et de gérer leur compte utilisateur.

J'ai utilisé Next.js 13 avec son nouveau système de routing (App Router), React 18, et TypeScript pour garantir un code clair et typé.  
La gestion d'état globale est assurée par Redux Toolkit, notamment pour le panier et un système de crédits simulant un solde utilisateur.  
Pour l'authentification, j'ai intégré NextAuth.js avec la connexion via Google OAuth.  

Le site est déployé sur Vercel, avec une intégration continue via GitHub.

---

## Technologies et outils utilisés

- **Next.js 13 (App Router)** : J'ai choisi Next.js pour bénéficier du rendu côté serveur (SSR) et de la génération statique (SSG) qui améliorent les performances et le référencement naturel (SEO). Le système App Router m'a permis d'organiser le projet avec des dossiers `app` contenant des fichiers `page.tsx`, ce qui facilite la gestion des routes et la modularité.

- **React 18** : Utilisé pour construire une interface utilisateur réactive et dynamique.

- **TypeScript** : J'ai typé toutes les données et composants afin de réduire les erreurs à la compilation et faciliter la maintenance du code.

- **Redux Toolkit** : Pour gérer l'état global, notamment le panier d'achat et le système de crédits virtuels. Cela permet une gestion propre et efficace du flux de données entre les composants.

- **NextAuth.js** : Implémentation d'un système d'authentification sécurisé avec connexion via Google. Cela m'a permis d'offrir une expérience utilisateur simplifiée tout en assurant la sécurité.

- **Tailwind CSS** : Framework CSS utilitaire que j'ai utilisé pour styliser rapidement le site avec un design moderne, responsive, et cohérent.

- **Vercel** : Plateforme de déploiement utilisée pour héberger le projet avec un déploiement continu directement depuis GitHub.

---

## Fonctionnalités développées

- **Affichage dynamique des jeux vidéo** : J'ai créé un hook personnalisé `useGames` qui récupère les données des jeux (simulées ou via API), et qui permet d'afficher les listes avec leurs informations (titre, image, prix).

- **Panier d'achat** : L'utilisateur peut ajouter ou retirer des jeux dans son panier. La gestion est centralisée avec Redux Toolkit. Le total du panier est calculé en temps réel.

- **Système de crédits** : J'ai simulé un système de crédits que l'utilisateur peut utiliser pour acheter des jeux. La gestion des crédits et des achats est intégrée dans le store Redux.

- **Authentification Google** : Intégration de NextAuth.js pour permettre aux utilisateurs de se connecter via leur compte Google. Cela comprend la gestion des sessions et la sécurisation des pages privées.

- **Page compte utilisateur** : Affichage des informations personnelles récupérées via la session (nom, email), ainsi qu'une liste fictive de commandes passées.

- **Gestion des variables d’environnement** : Toutes les clés sensibles (client ID, secret Google, secret NextAuth) sont stockées dans un fichier `.env.local` et configurées dans Vercel pour la production, afin de garantir la sécurité.

- **Déploiement sur Vercel** : J’ai mis en place un workflow CI/CD automatique qui déclenche un build et un déploiement à chaque push sur la branche principale. J’ai aussi corrigé les problèmes liés au cache et aux conflits entre les dossiers `pages` et `app`.

---

## Méthodologie et bonnes pratiques

- J’ai structuré le projet en utilisant les standards modernes de Next.js 13 avec le dossier `app` et ses pages en `page.tsx`.  
- La gestion du type `Game` dans TypeScript m’a permis d’éviter des erreurs fréquentes liées à des valeurs potentiellement `undefined` (exemple : prix du jeu).  
- J’ai utilisé les hooks React personnalisés pour isoler la logique métier (ex: récupération des jeux) et rendre le code plus lisible.  
- Pour Redux, j’ai utilisé `createSlice` et `configureStore` de Redux Toolkit, qui simplifient la gestion des reducers et des actions.  
- L’authentification est gérée avec NextAuth en suivant la recommandation d’ajouter une clé secrète en production (`NEXTAUTH_SECRET`), ce qui est obligatoire pour garantir la sécurité.  
- Le style est entièrement réalisé avec Tailwind, ce qui facilite la maintenance et l’homogénéité du design.  
- J’ai effectué plusieurs tests locaux et déploiements successifs sur Vercel, en corrigeant les erreurs liées au build (notamment la suppression des dossiers `pages` en conflit avec `app`, et le nettoyage du cache Vercel).

---

## Installation et lancement du projet

1. Cloner le dépôt GitHub :  
   ```bash
   git clone <URL_DU_REPO>
