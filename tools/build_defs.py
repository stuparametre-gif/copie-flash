#!/usr/bin/env python3
"""Assemble ../definitions.js à partir de tools/definitions/<NIVEAU>.tsv (une ligne : mot<TAB>définition).
Les définitions sont écrites à la main, simples, en une ligne, pour une lecture d'enfant.
Vérifie que chaque mot de mots.js a sa définition et signale les mots inconnus ou en double.

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
