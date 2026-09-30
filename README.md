# Copie Flash

Petite app locale pour s'entraîner à copier des mots en cursive (copie cachée / copie flash / dictée).

- Lancer : `python3 copieflash.py` (ou « Copie Flash » dans le menu d'applications).
- Aucune dépendance : Python 3 + Chromium (fenêtre en mode app). Le serveur s'arrête tout seul quand la fenêtre est fermée.
- Mots : `mots.js` — 7 niveaux (CP, CE1, CE2, CM1, CM2, Collège, Lycée), ~1000 mots chacun, modifiable à la main.
  Généré par `tools/build_mots.py` : échelle Dubois-Buyse (vocabulaire par niveau, `tools/sources/dubois.json`) + Lexique 3.83 (fréquences, à télécharger dans `tools/sources/`), tri par simplicité orthographique, liste noire dans `tools/blacklist.py`.
- Plein écran : la fenêtre est tuilée par Hyprland ; **SUPER + F** la passe en plein écran (Omarchy).
- Stats : `data/sessions.csv` (une ligne par session) et `data/details.csv` (une ligne par mot). Séparateur `;`, encodage UTF‑8 — s'ouvre directement dans LibreOffice.
- Touches pendant une session : **Espace** (revoir en copie cachée, réécouter en dictée, suivant en copie flash), **Entrée** (suivant), **Échap** (arrêter).
- Trois modes : **copie cachée** (le mot s'affiche 3 s, on peut le revoir), **copie flash** (3 s, sans revoir) et **dictée**
  (le mot est dit deux fois, jamais affiché ; on peut le réécouter ; les mots apparaissent à la fin pour la correction).
  Pas de chrono imposé par mot en dictée : elle valide elle-même quand elle a fini d'écrire (le temps est mesuré comme dans les autres modes).
- Réponse **sur le cahier** (elle écrit à la main, coche ses fautes à la fin) ou **au clavier** (« mode voyage », sans papier :
  elle tape le mot, **Entrée** valide, **Tab** revoit/réécoute ; la faute est vérifiée automatiquement, accents compris, et
  reste modifiable à la correction). Les sessions au clavier sont enregistrées avec le mode suivi de « (clavier) » — records séparés,
  car on tape bien plus vite qu'on n'écrit.
- Les mots sont affichés **en syllabes colorées** (une couleur par syllabe : `syllabes.js`, règles scolaires CP-CE1 approximatives —
  pom-me, ta-ble, mon-ta-gne, vo-ya-ge, po-è-te). Découpage par règles, pas de dictionnaire : quelques mots rares peuvent être coupés bizarrement.

## Les sons

Bouton **🔤 Les sons** sur l'accueil : une fiche par son, avec pour chaque façon de l'écrire une image repère
(bat**eau**, l**in**… touche l'image pour entendre le mot), la règle « quand l'utiliser », des astuces et d'autres mots
du niveau choisi sur l'accueil. Pas d'exercice ni de stats : c'est une page pour apprendre et revoir.

- **Un son, plusieurs écritures** : [o] [an] [in] [è] [é] [s] [z] [k] [g] [j] [f] [ill].
- **Deux lettres pour un seul son** : ou, oi, on, eu, ch, gn.
- **Les pièges** : m devant m, b, p ; lettres muettes (chat → chaton) ; sons proches (p/b, t/d, f/v… main sur la gorge).

Contenu d'après le programme du cycle 2 (BO du 31/10/2024) : valeurs de s, c, g, an/am, en/em…, lettre muette trouvée
par la famille de mots ; fréquences des graphies d'après Nina Catach. Les règles de position annoncées
(eau à la fin, en/em au début des mots…) ont été vérifiées sur les listes de `mots.js`.

**Dictée avec des sons** : en mode Dictée, « Mots » → **Avec des sons**, puis choisir un ou plusieurs sons (ou bouton
« Faire une dictée avec ce son » sur une fiche). Les mots alternent entre les écritures du son (o, au, eau, ô…), au niveau
choisi puis en dessous ; une écriture absente du niveau (ph en CE1) est prise au niveau au-dessus. À la correction, la
graphie travaillée est en couleur. Dans les stats, le mode devient « Dictée · [o] [an] » : records séparés.

- `sons.js` : les fiches (textes, images, règles), modifiable à la main.
- `sons_mots.js` : les mots de chaque graphie, **généré** par `tools/build_sons.py` à partir de `mots.js` et de la
  prononciation de Lexique 3.83 (évite les faux amis : « femme » n'a pas le son [an], « ville » pas [ill]).
  À relancer après toute modification de `mots.js` : `python3 tools/build_sons.py chemin/vers/Lexique383.tsv`.

## Définitions

À la correction, chaque mot est suivi d'une définition courte, en une ligne et avec des mots simples
(« grappe : Groupe de fruits sur une tige (raisin). »). Les 6 967 mots de `mots.js` en ont une.

- Écrites à la main, niveau par niveau, dans `tools/definitions/<NIVEAU>.tsv` (une ligne : `mot<TAB>définition`),
  modifiables librement. Pour les mots à plusieurs sens courants : les deux, séparés par « ; ».
- `python3 tools/build_defs.py` assemble `definitions.js` et signale les mots sans définition, en double ou trop longs.
  À relancer après toute modification des `.tsv` ou de `mots.js`.

## Voix

En copie cachée / flash, le mot est lu à voix haute quand il s'affiche (désactivable sur l'accueil : « Sans voix »). La dictée en a besoin.

- **Mac, iPhone, iPad** : rien à installer, l'app utilise les voix françaises du système (`speechSynthesis`).
  Pour une meilleure voix sur Mac : Réglages → Accessibilité → Contenu énoncé → Voix du système → télécharger une voix
  française « améliorée » (Amélie, Audrey, Thomas…). Sur iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Français.
- **Linux** : Chromium n'a pas de voix ; le serveur utilise **Piper** (synthèse neuronale locale, hors-ligne) s'il est installé :
  `tools/install_voix_linux.sh` (paquet AUR `piper-tts-bin` + voix `fr_FR-siwis-medium`, ~63 Mo, dans `~/.local/share/piper/`).
  Les sons générés sont gardés dans `data/tts/`. Sans Piper, l'app fonctionne sans son (la dictée est alors indisponible).

Colonnes de `sessions.csv` : `duree_s` = temps total du 1er masquage à la dernière validation ; `ecriture_s` = somme des temps par mot (masquage → validation), c'est sur ce temps qu'est calculé `lettres_par_min`.

## Sur Mac

1. Python 3 : ouvrir **Terminal**, taper `python3 --version`. S'il n'est pas là, macOS propose d'installer les
   « outils de ligne de commande » → accepter (une seule fois). Sinon : https://www.python.org/downloads/macos/
2. Double-cliquer sur **`Copie Flash.command`** (la première fois : clic droit → *Ouvrir*, macOS demande confirmation).
   L'app s'ouvre dans Chrome (mode fenêtre) s'il est installé, sinon dans Safari.
3. Plein écran : le bouton vert de la fenêtre, ou **ctrl + ⌘ + F**.
4. Le serveur s'arrête tout seul ~2 min après la fermeture de la fenêtre. Si l'app est déjà lancée, un nouveau
   double-clic rouvre juste la fenêtre. Les CSV s'ouvrent dans Numbers / Excel (séparateur « ; »).

Si Safari affiche « impossible de se connecter » : le serveur n'a pas démarré — relancer le `.command` et regarder
le message dans la fenêtre Terminal qui s'ouvre (port 8765).

## Sur iPhone / iPad (ou n'importe quel navigateur, sans serveur)

L'app tourne aussi sans Python : `index.html` détecte l'absence de serveur et garde alors les sessions **sur l'appareil**
(`localStorage`, via `store.js`). Pendant la session, des boutons remplacent les touches ; **✕** en haut à droite arrête.

1. Ouvrir l'adresse de l'app (hébergée sur GitHub Pages) dans **Safari**.
2. Bouton **Partager** → **Sur l'écran d'accueil** : icône, plein écran, fonctionne hors ligne (`sw.js`).
3. Dans *Statistiques*, **Exporter les CSV** envoie `sessions` + `details` via la feuille de partage (Mail, AirDrop, Fichiers…),
   même format que sur ordinateur.

Les stats sont propres à chaque appareil (pas de synchronisation) : le Mac a ses CSV, l'iPhone les siens.
