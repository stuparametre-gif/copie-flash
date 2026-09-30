#!/usr/bin/env python3
"""Génère ../sons_mots.js : pour chaque fiche de sons.js et chacune de ses graphies, les mots de mots.js
qui la contiennent, avec la graphie entre crochets (bat[eau], [ch]at).

Chaque règle = (motif sur l'orthographe, phonème exigé dans la prononciation Lexique 3.83).
La prononciation évite les faux amis : « femme » n'a pas le son [an], « examen » n'a pas [an], « ville » pas [ill].
Les identifiants (fiche, graphie) doivent correspondre à ceux de sons.js.

Usage : python3 tools/build_sons.py [chemin/Lexique383.tsv] [probe]"""
import csv, json, os, re, sys, collections

HERE = os.path.dirname(os.path.abspath(__file__))
LEX = next((a for a in sys.argv[1:] if a.endswith(".tsv")), os.path.join(HERE, "sources", "Lexique383.tsv"))
if not os.path.exists(LEX): raise SystemExit("Télécharger Lexique383.zip (lexique.org) et dézipper Lexique383.tsv dans tools/sources/")

V = "aeiouyàâäéèêëîïôöùûüœ"
NV = f"(?![{V}hn])"                      # « an », « on »… : pas suivi d'une voyelle, d'un h ou d'un 2e n (sinon pas nasal)

def fin_muette(o, p):
    """Lettres finales qu'on n'entend pas (chat, temps, vingt) ; renvoie l'indice où elles commencent, ou None."""
    SON = {"t": "t", "d": "d", "s": "sz", "p": "p", "x": "ksz", "g": "g", "c": "k", "z": "z"}
    if not o or o[-1] not in SON or p[-1:] in SON[o[-1]]: return None
    i = len(o)
    while i > 0 and o[i-1] in "tdspxgcz": i -= 1
    if i == 0 or i == len(o): return None
    # « nez », « chez » : le z fait partie de la graphie ez, pas une lettre muette au sens scolaire
    if o.endswith("ez"): return None
    return i

# fiche -> graphie -> (motif, test sur la prononciation)
has = lambda s: (lambda p: any(c in p for c in s))
R = {
  "o": {
    "o":   (r"o(?![uiyœnm])|o(?=n[naeiouyéèêh]|m[maeiouyéèê])", has("oO")),
    "au":  (r"(?<!e)au", has("oO")),
    "eau": (r"eau", has("oO")),
    "ô":   (r"ô", has("oO")),
  },
  "an": {
    "an": (r"an" + NV, has("@")),
    "en": (r"(?<![iéy])en" + NV, has("@")),
    "am": (r"am(?=[bp])", has("@")),
    "em": (r"em(?=[bp])|em(?=m)(?!ment)", has("@")),     # emmener, mais pas « différemment » [a]
  },
  "in": {
    "in":  (r"(?<![aeo])in" + NV, has("5")),
    "im":  (r"(?<![aeo])im(?=[bp])", has("5")),
    "ain": (r"ai[nm]" + NV, has("5")),
    "ein": (r"ei[nm]" + NV, has("5")),
    "un":  (r"u[nm]" + NV, has("1")),
    "ien": (r"(?<=[iéy])en" + NV, lambda p: "j5" in p or "e5" in p),
  },
  "è": {
    "è":  (r"è", has("E")),
    "ê":  (r"ê", has("E")),
    "ai": (r"a[iî](?!l)(?![nm](?![naeiouyéèêh]))", has("E")),
    "ei": (r"ei(?!l)(?![nm](?![naeiouyéèêh]))", has("E")),
    # e sans accent devant deux consonnes (belle, merci) ou une consonne finale prononcée (sel, mer) ;
    # pas « -er », « -et », « -ez » des fins de mots (panier, poulet, nez), ni an/en nasal
    "e":  [(r"e(?=([bcdfgmnpqrstvz])\1|[bcdfgmnpqrstvxz](?![aeiouyéèêlrh])|[lcf]$|x)(?![nm](?![naeiouyéèêh]))(?!(?:r|t|ts|z|s)$)", has("E")),
           (r"e(?=r$)", lambda p: p.endswith("ER"))],
    "et": (r"et$", lambda p: p.endswith("E")),
  },
  "é": {
    "é":  (r"é", has("e")),
    "er": (r"er$", lambda p: p.endswith("e")),
    "ez": (r"ez$", lambda p: p.endswith("e")),
  },
  "s": {
    "s":  (rf"(?:^|(?<=[^{V}s]))s(?![hs])(?!$)|s(?=[bcdfgklmnpqrtvz])", has("s")),
    "ss": (r"ss", has("s")),
    "c":  (r"(?<![sc])c(?=[eiyéèê])", has("s")),
    "ç":  (r"ç", has("s")),
    "t":  (r"t(?=i[oa])", lambda p: "sj" in p),
  },
  "z": {
    "z": (r"z(?!$)", has("z")),
    "s": (rf"(?<=[{V}])s(?=[{V}])", has("z")),
  },
  "k": {
    "c":  (r"c(?=[aoubcdfgklmnpqrstvwxzàâôûœ]|$)", has("k")),
    "qu": (r"qu", has("k")),
    "k":  (r"k", has("k")),
    "ch": (r"ch", lambda p: "k" in p and "S" not in p),
    "q":  (r"q$", has("k")),
  },
  "g": {
    "g":  (r"g(?=[aolràâôûœ]|u(?![eiyéèêî]))", has("g")),
    "gu": (r"gu(?=[eiyéèêî])", has("g")),
  },
  "j": {
    "j":  (r"j", has("Z")),
    "g":  (r"g(?=[iyéèêî]|e(?![aoâôu]))", has("Z")),
    "ge": (r"ge(?=[aoâôu])", has("Z")),
  },
  "f": {
    "f":  (r"ff?", has("f")),
    "ph": (r"ph", has("f")),
  },
  "ill": {
    "ill": (r"ill", has("j")),
    "il":  (r"(?<=[aeuœ])il$", lambda p: p.endswith("j")),
    "y":   (rf"y(?=[{V}])", has("j")),
  },
  "ou": {
    "ou": (r"ou(?![{V}])".format(V=V), has("u")),
    "où": (r"o[ùû]", has("u")),
  },
  "oi": {
    "oi":  (r"oi(?!n(?![naeiouyéèêh]))", lambda p: "wa" in p),
    "oin": (r"oin" + NV, lambda p: "w5" in p),
    "oy":  (r"oy", lambda p: "waj" in p),
  },
  "on": {
    "on": (r"on" + NV, has("§")),
    "om": (r"om(?=[bp])", has("§")),
  },
  "eu": {
    "eu": (r"(?<![oœ])eu", has("29")),
    "œu": (r"œu|oeu", has("29")),
  },
  "ch": {"ch": (r"ch", has("S"))},
  "gn": {"gn": (r"gn", has("N"))},
  "mbp": {
    "am": (r"am(?=[bp])", has("@")),
    "em": (r"em(?=[bp])|em(?=m)(?!ment)", has("@")),
    "im": (r"(?<![aeo])im(?=[bp])", has("5")),
    "om": (r"om(?=[bp])", has("§")),
  },
  "muettes": {"fin": (None, None)},     # calculé par fin_muette()
}

# --- mots de l'app
src = open(os.path.join(HERE, "..", "mots.js"), encoding="utf-8").read()
body = src[src.index("{"):src.index("};") + 1]
MOTS = json.loads(re.sub(r",\s*}", "}", re.sub(r"//.*", "", body)))
LEVELS = list(MOTS)
level = {w: L for L in LEVELS for w in MOTS[L]}

phon, cgram = {}, {}
with open(LEX, encoding="utf-8") as f:
    for x in csv.DictReader(f, delimiter="\t"):
        o = x["ortho"]
        if o in level and (o not in phon or x["islem"] == "1"): phon[o] = x["phon"]; cgram[o] = x["cgram"]
print(f"{len(level)} mots, {len(phon)} avec prononciation")

out = {fi: {g: [] for g in gs} for fi, gs in R.items()}
for w in sorted(level, key=lambda w: (LEVELS.index(level[w]), w)):
    p = phon.get(w)
    if not p: continue
    lw = w.lower()
    for fi, gs in R.items():
        for g, rules in gs.items():
            if fi == "muettes":
                # noms et adjectifs seulement : c'est là que l'astuce de la famille marche (chat → chaton, grand → grande)
                i = fin_muette(lw, p) if cgram[w] in ("NOM", "ADJ") else None
                if i is not None: out[fi][g].append(f"{w[:i]}[{w[i:]}]")
                continue
            for pat, test in (rules if isinstance(rules, list) else [rules]):
                m = re.search(pat, lw)
                if m and test(p):
                    out[fi][g].append(f"{w[:m.start()]}[{w[m.start():m.end()]}]{w[m.end():]}"); break

if "probe" in sys.argv:
    import random; random.seed(1)
    for fi, gs in out.items():
        for g, ws in gs.items():
            byL = collections.Counter(level[re.sub(r"[\[\]]", "", x)] for x in ws)
            print(f"\n{fi}/{g}: {len(ws)}  " + " ".join(f"{L}:{byL[L]}" for L in LEVELS if byL[L]))
            print("   ", ", ".join(random.sample(ws, min(18, len(ws)))))
    sys.exit()

with open(os.path.join(HERE, "..", "sons_mots.js"), "w", encoding="utf-8") as f:
    f.write("// Généré par tools/build_sons.py — ne pas modifier à la main (relancer le script après avoir changé mots.js).\n")
    f.write("// Pour chaque fiche de sons.js et chaque graphie : les mots de mots.js qui la contiennent, graphie entre crochets.\n")
    f.write("const SONS_MOTS = {\n")
    for fi, gs in out.items():
        f.write(f'  "{fi}": {{\n')
        for g, ws in gs.items():
            f.write(f'    "{g}": {json.dumps(ws, ensure_ascii=False)},\n')
        f.write("  },\n")
    f.write("};\n")
print("sons_mots.js écrit :", sum(len(ws) for gs in out.values() for ws in gs.values()), "entrées")
