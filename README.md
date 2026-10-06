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

## Accueil et design

L'accueil montre **quatre petits êtres** (formes géométriques à deux yeux) : un par jeu — copie cachée (dôme orange), copie flash
(triangle bleu), dictée (rond rose), conjugaison (bloc brique). On en touche un : il saute et ouvre un écran court avec **seulement
les réglages de ce jeu** (niveau, nombre de mots, réponse, voix ; « Mots » pour la dictée ; temps et verbes pour la conjugaison),
puis **C'est parti !** (ou Entrée). Les réglages sont **mémorisés** sur l'appareil : un adulte règle une fois, l'enfant n'a plus qu'à lancer.
Échap revient aux jeux. Pendant le jeu, l'être du jeu accompagne l'enfant seulement quand le mot est caché ; il fête un record ou un zéro faute.

- **Intouchable** : la police des mots et les couleurs des syllabes pendant le jeu (voir `DESIGN.md`, règles « Frozen Syllables »).
- Police de l'interface : **Jost** (SIL OFL), hébergée dans `fonts/` pour marcher hors ligne ; icônes dessinées en SVG dans `index.html` (pas d'emoji).
- `DESIGN.md` décrit le système (couleurs, typo, composants, à faire / à ne pas faire) ; `PRODUCT.md` le produit. Le dossier `.impeccable/`
  contient les notes de travail du design (non publiées : GitHub Pages ignore les dossiers commençant par un point).

## Les sons

Lien **Les sons** sur l'accueil : une fiche par son, avec pour chaque façon de l'écrire une image repère
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

## Conjugaison

Le petit être **Conjugaison** sur l'accueil : une carte = un verbe à conjuguer. L'app affiche la consigne
**pronom + infinitif + temps** (« nous · chanter · présent »), elle écrit la forme conjuguée (chantons),
la voix la lit si elle est activée. Même mécanique que la dictée : réponse **sur le cahier** ou **au clavier**
(vérifiée toute seule, accents compris), **Entrée** valide, **Espace/Tab** réécoute. À la correction, la
**terminaison est en couleur** et la consigne est rappelée sous chaque verbe.

- **Choix** : un ou plusieurs **temps** (présent, imparfait, futur, passé composé) et un ou plusieurs
  **groupes** (1er, 2e, 3e). Les verbes sont tirés au niveau choisi et en dessous, avec un pronom au hasard
  (je, tu, il/elle/on, nous, vous, ils/elles).
- **Pédagogie** : conjuguer, c'est surtout choisir la bonne terminaison ; on produit la forme (on ne la
  reconnaît pas dans une liste), une difficulté à la fois, les verbes fréquents d'abord. Le passé composé
  des verbes en être reste au pronom explicite (il/elle/ils/elles) pour que l'accord ait une seule réponse
  juste (elle est allée, ils sont partis).
- Dans les stats, le mode devient « Conjugaison · présent » (ou « · présent futur » si plusieurs temps) :
  **records séparés**, comme les dictées de sons.

Page **Les verbes** (lien de l'accueil) : une fiche par temps, avec un verbe modèle par groupe (terminaisons
colorées, calculées par le conjugueur) et les pièges (le -ent muet, -er vs -é, avoir/être au passé composé).
Pas d'exercice ni de stats : c'est une page pour apprendre et revoir, comme « Les sons ».

- `verbes.js` (modifiable à la main) : les listes d'infinitifs réguliers par niveau (`VERBES_G1`, `VERBES_G2`),
  la table des verbes irréguliers fréquents (`VERBES_IRR` : présent, radical du futur, participe passé,
  auxiliaire) et le conjugueur (`Conj`). On n'auto-génère que les formes sûres : les verbes à radical
  changeant (-eler/-eter/-yer, lever, acheter, espérer…) ne sont **pas** dans les listes régulières ; s'il en
  faut, les ajouter dans `VERBES_IRR` avec leurs formes écrites.
- `python3 tools/build_verbes.py [chemin/Lexique383.tsv]` **vérifie** chaque forme produite (présent, imparfait,
  futur) et chaque participe passé contre Lexique 3.83, pour ne jamais montrer une forme fausse. À relancer après
  toute modification de `verbes.js` (nécessite Node.js, qui exécute le vrai conjugueur).

## Interface en portugais du Brésil

Pour des enfants qui apprennent le français : boutons **🇫🇷 Français / 🇧🇷 Português** en haut de l'accueil. Le choix est mémorisé ;
`?lang=pt` dans l'adresse (ex. `…/copie-flash/?lang=pt`) le fixe pour un lien à partager ; sans choix, on suit la langue de l'appareil.

- Seuls l'interface (`i18n.js`), les fiches « Les sons » (`sons_pt.js`) et les définitions (`definitions_pt.js`) passent en portugais.
  Les mots à écrire, la voix, la consigne « Écris le mot : … » et les fichiers CSV restent en français (les records se comparent sur le mode enregistré en français).
- Définitions : `tools/definitions_pt/<NIVEAU>.tsv` (`mot<TAB>traduction`, même ordre que le français, la traduction se termine souvent par le mot apparenté
  en portugais pour faire le lien) ; `python3 tools/build_defs.py` produit aussi `definitions_pt.js` et vérifie que tout mot a sa traduction.
  Un mot ajouté à `mots.js` doit donc être défini en français **et** en portugais.
- Une nouvelle fiche dans `sons.js` reste en français tant qu'elle n'est pas ajoutée à `sons_pt.js`.
- Conjugaison : l'interface (mode, temps, groupes, boutons) et les messages passent en portugais via `i18n.js` ;
  les verbes, la voix et les textes de la page « Les verbes » (intros et pièges, dans `verbes.js`) restent en français.

## Voix

En copie cachée / flash, le mot est lu à voix haute quand il s'affiche (désactivable sur l'accueil : « Sans voix »). La dictée en a besoin.

- **Mac, iPhone, iPad** : rien à installer, l'app utilise les voix françaises du système (`speechSynthesis`).
  Pour une meilleure voix sur Mac : Réglages → Accessibilité → Contenu énoncé → Voix du système → télécharger une voix
  française « améliorée » (Amélie, Audrey, Thomas…). Sur iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Français.
- **Linux** : Chromium n'a pas de voix ; le serveur utilise **Piper** (synthèse neuronale locale, hors-ligne) s'il est installé :
  `tools/install_voix_linux.sh` (paquet AUR `piper-tts-bin` + voix `fr_FR-siwis-medium`, ~63 Mo, dans `~/.local/share/piper/`).
  Les sons générés sont gardés dans `data/tts/`. Sans Piper, l'app fonctionne sans son (la dictée est alors indisponible).
- **Enceinte Bluetooth** : PipeWire met la sortie en veille après 5 s de silence et la rallumer avale le début du mot. Pour l'éviter, désactiver la veille :
  `~/.config/wireplumber/wireplumber.conf.d/bluetooth-no-suspend.conf` (`session.suspend-timeout-seconds = 0` sur les nœuds `bluez_output.*`).
  En plus, le serveur fait précéder chaque .wav d'une amorce quasi silencieuse (`COPIEFLASH_AMORCE_MS`, 300 ms par défaut, 0 pour couper),
  et en dictée la 1re écoute dit « Écris le mot : … » pour que ce soit « Écris » et non le mot qui soit avalé.

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
