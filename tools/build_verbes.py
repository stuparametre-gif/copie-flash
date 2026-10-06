#!/usr/bin/env python3
"""Vérifie les formes de conjugaison de ../verbes.js contre Lexique 3.83.

Ne génère rien : verbes.js est écrit/édité à la main. Ce script est un FILET DE SÉCURITÉ.
Il énumère toutes les formes produites par le conjugueur (présent, imparfait, futur) et les
participes passés + auxiliaires (passé composé), puis vérifie que chacune existe bien dans
Lexique 3.83 avec le bon lemme et la bonne étiquette (ind:pre / ind:imp / ind:fut / par:pas).

À lancer après toute modification de verbes.js, quand Lexique est disponible :
    python3 tools/build_verbes.py [chemin/Lexique383.tsv]

Nécessite Node.js (pour réutiliser EXACTEMENT le conjugueur de verbes.js, sans le réécrire)."""
import csv, json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
LEX = next((a for a in sys.argv[1:] if a.endswith(".tsv")), os.path.join(HERE, "sources", "Lexique383.tsv"))

# Étiquettes Lexique (colonne infover) attendues, par temps et par personne (je..ils).
PERS = ["1s", "2s", "3s", "1p", "2p", "3p"]
TAG = {"present": "ind:pre", "imparfait": "ind:imp", "futur": "ind:fut"}

# ---- 1) Énumérer toutes les formes via Node (le vrai conjugueur de verbes.js) ----
NODE = r"""
const V = require(process.argv[1]);
const out = { simples: [], pp: [] };   // simples : [inf, temps, p, forme] ; pp : [inf, participe, aux]
const groupes = {};
for (const L in V.VERBES_G1) for (const w of V.VERBES_G1[L]) groupes[w] = 1;
for (const L in V.VERBES_G2) for (const w of V.VERBES_G2[L]) groupes[w] = 2;
for (const w in V.VERBES_IRR) groupes[w] = 3;
for (const inf in groupes) {
  for (const t of ["present", "imparfait", "futur"])
    for (let p = 0; p < 6; p++) out.simples.push([inf, t, p, V.Conj.conjugue(inf, t, p).forme]);
  // passé composé : on vérifie le participe passé (masc. sing.) et l'auxiliaire séparément
  const g = V.Conj.groupe(inf);
  const pp = V.Conj.participe(inf, g);
  const aux = V.VERBES_IRR[inf] ? V.VERBES_IRR[inf].aux : (V.AUX_ETRE.has(inf) ? "être" : "avoir");
  out.pp.push([inf, pp, aux]);
}
process.stdout.write(JSON.stringify(out));
"""
try:
    raw = subprocess.run(["node", "-e", NODE, os.path.join(ROOT, "verbes.js")],
                         capture_output=True, text=True, check=True).stdout
except FileNotFoundError:
    raise SystemExit("Node.js est nécessaire (il exécute le conjugueur de verbes.js). Installer node, puis relancer.")
except subprocess.CalledProcessError as e:
    raise SystemExit("Erreur en chargeant verbes.js :\n" + e.stderr)
forms = json.loads(raw)
print(f"{len(forms['simples'])} formes simples + {len(forms['pp'])} participes à vérifier.")

if not os.path.exists(LEX):
    raise SystemExit("Télécharger Lexique383.zip (lexique.org) et dézipper Lexique383.tsv dans tools/sources/ "
                     "(ou passer son chemin en argument). Les formes ont été énumérées mais pas vérifiées.")

# ---- 2) Indexer Lexique : (lemme) -> liste de (ortho, infover) pour les verbes ----
idx = {}
with open(LEX, encoding="utf-8", newline="") as f:
    r = csv.DictReader(f, delimiter="\t")
    for row in r:
        if row.get("cgram") != "VER":
            continue
        idx.setdefault(row["lemme"], []).append((row["ortho"], row.get("infover", "")))


def existe(lemme, forme, tag):
    """forme (sans accent de casse) existe-t-elle pour ce lemme avec cette étiquette ?"""
    f = forme.lower()
    for ortho, infover in idx.get(lemme, []):
        if ortho.lower() == f and any(t.startswith(tag) for t in infover.split(";")):
            return True
    return False


# ---- 3) Vérifier ----
manques = []
for inf, temps, p, forme in forms["simples"]:
    tag = TAG[temps] + ":" + PERS[p]
    # les verbes « défectifs » ou absents de Lexique sont signalés à part (pas forcément une faute)
    if inf not in idx:
        continue
    if not existe(inf, forme, tag):
        manques.append(f"{inf:12} {temps:10} {['je','tu','il','nous','vous','ils'][p]:5} → {forme}  (cherché {tag})")

for inf, pp, aux in forms["pp"]:
    if inf in idx and not existe(inf, pp, "par:pas"):
        manques.append(f"{inf:12} participe passé → {pp}  (cherché par:pas)")

absents = sorted(inf for inf, _, _ in forms["pp"] if inf not in idx)
if absents:
    print(f"\n{len(absents)} verbe(s) absent(s) de Lexique (non vérifiés) : {', '.join(absents)}")

if manques:
    print(f"\n❌ {len(manques)} forme(s) introuvable(s) dans Lexique — à vérifier à la main :")
    print("\n".join(manques))
    sys.exit(1)
print("\n✓ Toutes les formes présentes dans Lexique sont confirmées.")
