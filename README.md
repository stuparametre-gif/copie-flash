# Copie Flash

Petite app locale pour s'entraîner à copier des mots en cursive (copie cachée / copie flash).

- Lancer : `python3 copieflash.py` (ou « Copie Flash » dans le menu d'applications).
- Aucune dépendance : Python 3 + Chromium (fenêtre en mode app). Le serveur s'arrête tout seul quand la fenêtre est fermée.
- Mots : `mots.js` — 7 niveaux (CP, CE1, CE2, CM1, CM2, Collège, Lycée), ~1000 mots chacun, modifiable à la main.
  Généré par `tools/build_mots.py` : échelle Dubois-Buyse (vocabulaire par niveau, `tools/sources/dubois.json`) + Lexique 3.83 (fréquences, à télécharger dans `tools/sources/`), tri par simplicité orthographique, liste noire dans `tools/blacklist.py`.
- Plein écran : la fenêtre est tuilée par Hyprland ; **SUPER + F** la passe en plein écran (Omarchy).
- Stats : `data/sessions.csv` (une ligne par session) et `data/details.csv` (une ligne par mot). Séparateur `;`, encodage UTF‑8 — s'ouvre directement dans LibreOffice.
- Touches pendant une session : **Espace** (revoir en copie cachée / suivant en copie flash), **Entrée** (suivant), **Échap** (arrêter).

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
