#!/usr/bin/env python3
"""Assemble ../definitions.js à partir de tools/definitions/<NIVEAU>.tsv (une ligne : mot<TAB>définition).
Les définitions sont écrites à la main, simples, en une ligne, pour une lecture d'enfant.
Vérifie que chaque mot de mots.js a sa définition et signale les mots inconnus ou en double.

Même chose pour le portugais du Brésil : tools/definitions_pt/<NIVEAU>.tsv -> definitions_pt.js
(traduction de chaque définition, le mot reste en français ; lignes dans le même ordre que le français).

Usage : python3 tools/build_defs.py"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "mots.js"), encoding="utf-8").read()
body = src[src.index("{"):src.index("};") + 1]
MOTS = json.loads(re.sub(r",\s*}", "}", re.sub(r"//.*", "", body)))

defs, problemes = {}, []
for L in MOTS:
    p = os.path.join(HERE, "definitions", L + ".tsv")
    if not os.path.exists(p):
        continue
    for n, ligne in enumerate(open(p, encoding="utf-8"), 1):
        if not ligne.strip():
            continue
        mot, _, d = ligne.rstrip("\n").partition("\t")
        d = d.strip()
        if not d:
            problemes.append(f"{L}:{n} sans définition : {mot}")
        elif mot in defs:
            problemes.append(f"{L}:{n} en double : {mot}")
        else:
            defs[mot] = d

tous = {w for ws in MOTS.values() for w in ws}
for L, ws in MOTS.items():
    manque = [w for w in ws if w not in defs]
    print(f"{L:8} {len(ws) - len(manque):5} / {len(ws)}" + (f"   manquent : {' '.join(manque[:12])}{' …' if len(manque) > 12 else ''}" if manque else ""))
inconnus = sorted(set(defs) - tous)
if inconnus: problemes.append("mots absents de mots.js : " + " ".join(inconnus))
longues = [f"{m} ({len(d)})" for m, d in defs.items() if len(d) > 90]
if longues: problemes.append("définitions de plus de 90 caractères : " + ", ".join(longues))
for p in problemes: print("⚠", p)

with open(os.path.join(HERE, "..", "definitions.js"), "w", encoding="utf-8") as f:
    f.write("// Définitions courtes des mots de mots.js, affichées à la correction.\n")
    f.write("// Généré par tools/build_defs.py depuis tools/definitions/*.tsv : modifier les .tsv, pas ce fichier.\n")
    f.write("const DEFS = {\n")
    for m in sorted(defs):
        f.write(f"  {json.dumps(m, ensure_ascii=False)}: {json.dumps(defs[m], ensure_ascii=False)},\n")
    f.write("};\n")
print(f"definitions.js écrit : {len(defs)} définitions")


# ---- Portugais du Brésil : mêmes mots, définitions traduites (interface en portugais, voir i18n.js) ----
pt, pb = {}, []
for L in MOTS:
    p = os.path.join(HERE, "definitions_pt", L + ".tsv")
    if not os.path.exists(p):
        continue
    for n, ligne in enumerate(open(p, encoding="utf-8"), 1):
        if not ligne.strip():
            continue
        mot, _, d = ligne.rstrip("\n").partition("\t")
        d = d.strip()
        if not d:
            pb.append(f"pt {L}:{n} sans traduction : {mot}")
        elif mot in pt:
            pb.append(f"pt {L}:{n} en double : {mot}")
        else:
            pt[mot] = d
manque = sorted(set(defs) - set(pt))
if manque: pb.append(f"pt : {len(manque)} définitions sans traduction : " + " ".join(manque[:12]) + (" …" if len(manque) > 12 else ""))
en_trop = sorted(set(pt) - set(defs))
if en_trop: pb.append("pt : mots absents du français : " + " ".join(en_trop[:12]))
longues = [f"{m} ({len(d)})" for m, d in pt.items() if len(d) > 110]
if longues: pb.append("pt : traductions de plus de 110 caractères : " + ", ".join(longues))
for p in pb: print("⚠", p)
if pt:
    with open(os.path.join(HERE, "..", "definitions_pt.js"), "w", encoding="utf-8") as f:
        f.write("// Définitions traduites en portugais du Brésil, affichées à la correction quand la langue est « pt » (i18n.js).\n")
        f.write("// Généré par tools/build_defs.py depuis tools/definitions_pt/*.tsv : modifier les .tsv, pas ce fichier.\n")
        f.write("const DEFS_PT = {\n")
        for m in sorted(pt):
            f.write(f"  {json.dumps(m, ensure_ascii=False)}: {json.dumps(pt[m], ensure_ascii=False)},\n")
        f.write("};\n")
    print(f"definitions_pt.js écrit : {len(pt)} définitions")
