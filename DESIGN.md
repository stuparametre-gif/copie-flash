---
name: Copie Flash
description: Une app d'écriture pour une enfant de 7 ans, où chaque jeu est un petit être géométrique à deux yeux.
colors:
  sun: "#ff9f1c"
  sea: "#1c3fd6"
  pink: "#ff2d8a"
  brick: "#ff5a1f"
  ink: "#141414"
  ink-soft: "#57554f"
  ground: "#efefec"
  sheet: "#ffffff"
  sheet-soft: "#f6f6f3"
  line: "#dad8d2"
  alert: "#c8102e"
  alert-bg: "#fde9ec"
  ok: "#1f7a4d"
  syllabe-1: "#e8792b"
  syllabe-2: "#2f8f83"
  syllabe-3: "#7b4fb5"
  syllabe-4: "#2b6fd8"
typography:
  display:
    fontFamily: "Jost, Adwaita Sans, system-ui, sans-serif"
    fontSize: "5.5rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Jost, Adwaita Sans, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Jost, Adwaita Sans, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Jost, Adwaita Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Jost, Adwaita Sans, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 600
    lineHeight: 1.2
  mot:
    fontFamily: "Adwaita Sans, Nimbus Sans, Liberation Sans, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.01em"
rounded:
  pill: "999px"
  card: "16px"
  key: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "30px"
  xl: "48px"
components:
  button-go:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "20px 34px 20px 38px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  pill:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
    height: "48px"
  pill-selected:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  word-tile:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "14px 18px"
  word-tile-fault:
    backgroundColor: "{colors.alert-bg}"
    textColor: "{colors.alert}"
    rounded: "{rounded.card}"
---

# Design System: Copie Flash

## Overview

**Creative North Star: "Les petits êtres"**

Chaque jeu est un compagnon : un petit être géométrique en aplat saturé, avec deux points noirs pour yeux, posé sur le trait noir d'un sol. Une grande page gris clair, une grotesque géométrique énorme pour le titre, et rien d'autre que ces quatre personnages. L'enfant choisit un compagnon, pas une option dans un formulaire.

Le monde vient du graphisme minimaliste pour enfants (affiches à formes primitives, livres d'images des années 50) : des formes que l'on peut décrire exactement (un dôme, un triangle, un rond, un bloc), aucune texture, aucun dégradé décoratif, aucun contour autour des formes. La couleur vit dans les êtres ; le texte reste à l'encre. Pendant le jeu, l'interface se retire : le mot à écrire garde sa police et ses syllabes colorées, et le compagnon n'apparaît que quand le mot est caché.

C'est une interface d'usage (choisir, régler, écrire, se corriger) : densité faible, cibles de 44 à 48 px au moins, un seul geste principal par écran.

**Key Characteristics:**
- Quatre êtres = quatre jeux, une couleur chacun, réutilisée comme couleur d'action dans tout le jeu choisi.
- Le sol : un trait noir de 3 px sur lequel les êtres sont posés.
- Fond gris clair neutre, feuilles blanches pour les contenus, encre presque noire.
- Grotesque géométrique Jost, auto-hébergée ; les mots du jeu gardent leur police d'origine.
- Icônes dessinées au trait de 2 px, jamais d'emoji dans l'interface.

## Colors

Quatre aplats saturés sur un fond neutre ; une seule couleur d'alerte, réservée aux fautes.

### Primary
- **Soleil** (#ff9f1c) : la copie cachée (un dôme à moitié sous le sol, les yeux fermés). Texte posé dessus : encre.
- **Outremer** (#1c3fd6) : la copie flash (un triangle). Seule couleur de jeu qui porte un texte blanc.
- **Rose** (#ff2d8a) : la dictée (un rond qui parle). Texte posé dessus : encre. Aussi le bouton « Faire une dictée avec ce son ».
- **Brique** (#ff5a1f) : la conjugaison (un bloc). Texte posé dessus : encre.

La couleur du jeu choisi devient l'accent de tout son parcours (pastilles choisies, bouton « C'est parti ! », barre de temps, point de progression en cours, soulignement de saisie) via `body[data-jeu]`.

### Secondary
- **Syllabes** (#e8792b, #2f8f83, #7b4fb5, #2b6fd8) : une couleur par syllabe, en cycle de quatre, dans le mot du jeu, la correction et les fiches. Valeurs gelées, indépendantes des couleurs de jeu.

### Neutral
- **Encre** (#141414) : texte, yeux des êtres, trait du sol, bouton principal hors jeu, pastille de langue choisie.
- **Encre douce** (#57554f) : sous-titres, descriptions, en-têtes de tableau (6,5:1 sur le fond).
- **Fond** (#efefec) : toutes les pages.
- **Feuille** (#ffffff) et **Feuille douce** (#f6f6f3) : tuiles de mots, pastilles au repos, tableaux, astuces.
- **Trait** (#dad8d2) : séparateurs de tableau, rail de la barre de temps, saisie au repos.
- **Alerte** (#c8102e sur #fde9ec) : un mot fautif à la correction, une session fautive dans les stats, la suppression.
- **Réussi** (#1f7a4d) : le badge « la plus fréquente » des fiches de sons.

**The Color Lives In The Creatures Rule.** Les aplats saturés appartiennent aux êtres et aux contrôles du jeu choisi ; le texte courant n'est jamais coloré, il reste à l'encre ou à l'encre douce.

**The Frozen Syllables Rule.** Les quatre couleurs de syllabes et la police des mots ne changent jamais, même si les couleurs de jeu évoluent.

**The One Alarm Rule.** Le rouge #c8102e ne sert qu'à signaler une faute ou une destruction.

## Typography

**Display Font:** Jost (fichier `fonts/jost.woff2`, variable 400–800, SIL OFL), puis Adwaita Sans, system-ui
**Body Font:** Jost
**Mot du jeu:** Adwaita Sans / Nimbus Sans / Liberation Sans / system-ui, 700 — police historique de l'app, conservée

**Character:** Jost est une géométrique héritée de Futura, au « a » à un seul étage comme l'écriture que l'on apprend à l'école ; elle répond aux formes des êtres. Les mots à écrire restent dans leur grotesque d'origine pour que rien ne change pendant l'entraînement.

### Hierarchy
- **Display** (800, 5.5rem, 0.9, -0.035em) : le titre « Copie Flash » de l'accueil, sur deux lignes. 4.25rem sous 960 px, 3.1rem sous 640 px.
- **Headline** (700, 3rem, 1.02, -0.025em) : titres de page (Statistiques, Les sons, Bravo). 2.75rem pour le nom du jeu dans les réglages.
- **Title** (700, 1.6rem, 1.1) : nom de chaque jeu sous son être ; 1.4rem pour les titres de section.
- **Body** (400, 18px, 1.45) : descriptions et consignes ; mesure limitée à 60–72ch.
- **Label** (600, 1.08rem) : pastilles, boutons ; libellés de réglage en 700, 1.1rem, casse normale.

**The No Eyebrow Rule.** Aucun petit texte en capitales espacées au-dessus d'un titre : le titre porte seul son poids.

## Layout

Une colonne centrée de 1040 px maximum, marges de 24 px (16 px sur téléphone). L'accueil occupe toute la hauteur : titre en haut à gauche, sélecteur de langue en haut à droite, puis les quatre êtres repoussés vers le bas, alignés sur un sol continu en grille de quatre colonnes égales (deux colonnes sous 640 px). Hauteur des êtres : 220 px au-dessus de 1200 px, 196 px, 132 px sous 960 px, 120 px sous 640 px. Liens secondaires (Les sons, Les verbes, Statistiques) sous le sol.

Les réglages d'un jeu : à gauche (280 px, collée en haut) l'être choisi et son nom ; à droite les réglages empilés, espacés de 30 px. Sur téléphone, l'être (96 px) et le nom passent sur une ligne au-dessus. Le bouton « C'est parti ! » reste collé en bas de l'écran sur une bande qui se fond dans le fond.

La session est centrée verticalement, avec un bandeau (position, chrono, arrêter) en haut. Espacement : 8, 12, 24, 30, 48 px ; plus d'air au-dessus d'un titre qu'en dessous.

## Elevation & Depth

Plat par défaut : les êtres, les pastilles, les tuiles et les tableaux n'ont pas d'ombre, la profondeur vient du contraste entre le fond gris et les feuilles blanches. Une seule ombre, sous le geste principal.

### Shadow Vocabulary
- **Ombre d'envol** (`box-shadow: 0 12px 24px -14px rgba(20, 20, 20, .45)`) : uniquement sous « C'est parti ! », qui flotte au-dessus des réglages. Elle disparaît à l'appui.

**The Flat Creatures Rule.** Les êtres ne portent ni ombre, ni contour, ni dégradé : un aplat, deux yeux.

## Shapes

Les êtres sont de la géométrie exacte dans une boîte de 120 × 112 dont le bas touche le sol : dôme (demi-disque), triangle aux coins arrondis, disque, bloc à coins supérieurs arrondis inégaux. Yeux : disques noirs de rayon 6 ; humeurs : yeux fermés (traits), regard vers le bas, yeux plissés et sourire (fête), bouche ouverte et trois ondes (dictée).

Contrôles : pastilles entièrement arrondies (999px) ; tuiles et options à deux lignes en 16px ; touches de clavier dessinées en 8px. Pas de bordures : un anneau intérieur de 2 px d'encre apparaît au survol.

## Components

### Buttons
- **Shape:** pilule (999px).
- **C'est parti !:** couleur du jeu, texte lisible dessus (encre, ou blanc sur l'outremer), 1.6rem en 700, flèche dessinée, ombre d'envol ; monte de 2 px au survol.
- **Primaire hors jeu:** encre, texte blanc (Encore une !, Enregistrer prennent la couleur du jeu).
- **Fantôme:** transparent, anneau intérieur d'encre de 2 px (Accueil, Revoir, Statistiques).
- **Retour:** texte et flèche sans fond ; fond feuille au survol.
- **Focus:** contour d'encre de 3 px décalé de 3 px, seulement au clavier.

### Chips
- **Style:** pastilles feuille sur le fond, texte encre en 600, hauteur 48 px (44 pour les longues listes de sons, temps et groupes).
- **State:** choisie = aplat de la couleur du jeu ; survol = anneau d'encre ; appui = léger rétrécissement.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** feuille blanche sur le fond gris.
- **Shadow Strategy:** aucune.
- **Border:** aucune ; une tuile fautive prend le fond et l'anneau d'alerte, et le mot est barré.
- **Internal Padding:** 14px 18px.

### Inputs / Fields
- **Style:** la saisie au clavier est une ligne : grand texte dans la police des mots, trait inférieur de 5 px.
- **Focus:** le trait passe à la couleur du jeu, le curseur aussi.

### Navigation
- Accueil : les quatre êtres sont les portes ; trois liens à icône dessous, soulignés au survol. Sélecteur FR/PT en segment pilule, langue active à l'encre.

### Petit être (signature)
Un bouton par jeu : l'être, le nom, une ligne d'explication. Les pupilles suivent la souris ou le doigt (jusqu'à 5 unités). Au survol, l'être monte de 8 px, et la copie cachée ouvre les yeux. Au choix, il saute (300 ms), puis on glisse vers ses réglages. Il clignote toutes les sept secondes, en décalé. Pendant la session, il revient en compagnon de 128 px seulement quand le mot est caché ; au résumé, il fête un record ou un zéro faute.

## Do's and Don'ts

### Do:
- **Do** donner à chaque nouveau jeu son propre être (forme exacte, aplat, deux yeux) et sa couleur, posé sur le sol de 3 px.
- **Do** utiliser la couleur du jeu choisi (`--g`, et `--g-on` pour le texte dessus) pour tout état actif de son parcours.
- **Do** dessiner les icônes en SVG au trait de 2 px, extrémités arrondies, 24 px.
- **Do** garder les mots du jeu, la correction et les fiches dans la police des mots, avec les quatre couleurs de syllabes.
- **Do** respecter `prefers-reduced-motion` : sauts, clignements et ondes s'arrêtent.

### Don't:
- **Don't** changer la police des mots ni les couleurs des syllabes pendant le jeu.
- **Don't** mettre d'emoji dans l'interface (les images repères des fiches de sons sont du contenu, pas des icônes).
- **Don't** ajouter ombre, contour, dégradé ou texture aux êtres.
- **Don't** afficher un compagnon ou une décoration pendant que le mot est visible.
- **Don't** utiliser le rouge d'alerte pour autre chose qu'une faute ou une suppression.
