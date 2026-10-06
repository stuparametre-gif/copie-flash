# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Une enfant de 7 ans**, en CE1 : écriture cursive lente, perd vite confiance. Elle s'entraîne à la maison, parfois seule (elle choisit et lance un jeu toute seule), parfois avec un adulte qui règle le niveau, le nombre de mots et le type de réponse.
- **Un parent** qui règle, consulte les statistiques et exporte les CSV.
- **Des enfants lusophones** (Brésil) qui apprennent le français : interface en portugais, mots et voix en français.

## Product Purpose

Faire écrire des mots à un enfant de façon courte, répétée et mesurée : copie cachée, copie flash, dictée, conjugaison, plus deux pages pour apprendre (« Les sons », « Les verbes »). Le succès, c'est qu'elle écrive plus vite et avec moins de fautes au fil des séances, sans se décourager.

## Positioning

Une app locale, gratuite et sans compte, faite pour une enfant précise : les mots sont tirés de listes scolaires par niveau relues pour des enfants, découpés en syllabes colorées, et chaque séance est chronométrée et enregistrée en CSV, avec des records par mode.

## Operating Context

- Surtout sur **ordinateur** (Linux ou Mac, fenêtre plein écran, au clavier : Espace / Entrée / Tab / Échap) et sur **iPhone** (PWA sur l'écran d'accueil, au doigt). Hors ligne possible sur iPhone.
- Réponse sur un **cahier** à côté de l'écran (écriture cursive) ou **au clavier** (« mode voyage »).
- Séances courtes : 5 à 20 mots.

## Capabilities and Constraints

- Zéro dépendance : HTML/CSS/JS statique + petit serveur Python stdlib ; pas de framework, pas de build, pas de police ou de librairie chargée en ligne (l'app doit marcher hors ligne).
- **Intouchable pendant le jeu** : la typographie des mots et les couleurs des syllabes (une couleur par syllabe, cycle de 4).
- Les raccourcis clavier, le format CSV (`data/sessions.csv`, `data/details.csv`), les libellés de mode enregistrés en français et le fonctionnement des modes restent identiques.
- Interface bilingue FR / PT-BR (`i18n.js`).
- Accueil voulu : on **choisit d'abord le jeu**, puis un écran court avec les seuls réglages utiles à ce jeu, puis on lance.

## Brand Commitments

- Nom : **Copie Flash**.
- Références visuelles fournies par le parent : un tableau Pinterest « Graphisme minimalist kids » (graphisme minimaliste pour enfants).
- Ton : tutoiement, encourageant, phrases courtes d'enfant.

## Evidence on Hand

- Listes de mots par niveau (`mots.js`), fiches des sons (`sons.js`), définitions (`definitions.js`), verbes (`verbes.js`), statistiques réelles de l'enfant dans `data/` (jamais publiées).
- Aucun témoignage ni chiffre public : ne rien inventer.

## Product Principles

1. L'enfant doit pouvoir lancer un jeu seule, sans lire de longs textes.
2. Pendant le jeu, rien ne distrait du mot à écrire.
3. Encourager sans infantiliser : records, bravo, jamais de punition.
4. Tout reste local, gratuit et modifiable à la main.

## Accessibility & Inclusion

- Lectrice débutante (7 ans) : peu de texte, libellés courts, cibles tactiles larges.
- Lectrices non francophones : l'interface doit rester compréhensible en portugais.
