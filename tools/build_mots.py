#!/usr/bin/env python3
"""Génère ../mots.js : Dubois-Buyse (tools/sources/dubois.json) + Lexique 3.83 + listes v1.
Usage : python3 tools/build_mots.py [probe]"""
import csv, math, re, json, random, sys, collections
import os
HERE=os.path.dirname(os.path.abspath(__file__)); S=os.path.join(HERE,"sources")
# Lexique383.tsv : http://www.lexique.org/databases/Lexique383/Lexique383.zip (à dézipper dans tools/sources/)
if not os.path.exists(f"{S}/Lexique383.tsv"): raise SystemExit("Télécharger Lexique383.zip et dézipper Lexique383.tsv dans tools/sources/")
random.seed(42)
exec(open(f"{HERE}/blacklist.py",encoding="utf-8").read())   # définit BLACK (set)
WORD=re.compile(r"[a-zàâäéèêëîïôöùûüÿçœæ]+(?:[-'][a-zàâäéèêëîïôöùûüÿçœæ]+)*")
STOP=set("ne pas si là oui non plus peu très bien tout sur pour avec lui ici ça ci en y et ou où".split())
def flags_of(o):
    return sum(len(re.findall(p,o)) for p in (r"ph",r"th",r"rh",r"gn",r"ill",r"y",r"x",r"w",r"k",r"ç",r"œ",r"æ",r"[ïëüÿ]",r"sc[eiy]",r"-",r"'",r"(?<![cps])h",r"[bcdfgklmnprstvz]{3}",r"(?:tion|tien)",r"[aeiou](?:mm|nn|ll|tt|pp|rr|ss|cc|ff)"))

lex={}
with open(f"{S}/Lexique383.tsv",encoding="utf-8") as f:
    for x in csv.DictReader(f,delimiter="\t"):
        o=x["ortho"]
        if not WORD.fullmatch(o): continue
        fl=float(x["freqlemlivres"]); ff=float(x["freqlemfilms2"]); n=int(x["nblettres"]); nph=int(x["nbphons"]) or n; syl=int(x["nbsyll"]) or 1
        rec=dict(o=o,cg=x["cgram"],fl=fl,ff=ff,f=0.6*fl+0.4*ff,n=n,syl=syl,silent=max(0,n-nph),flags=flags_of(o),islem=x["islem"]=="1",plural=x["nombre"]=="p" and x["cgram"]=="NOM")
        rec["D"]=2.2*(-math.log10(rec["f"]+0.01))+0.55*n+0.7*rec["silent"]+1.0*rec["flags"]+0.6*syl
        if o not in lex or (rec["islem"] and not lex[o]["islem"]): lex[o]=rec
def O(o):
    r=lex.get(o); n=len(o)
    silent=r["silent"] if r else 2; syl=r["syl"] if r else max(1,round(n/2.6)); fl=r["flags"] if r else flags_of(o)
    return 0.5*n+0.7*silent+1.0*fl+0.5*syl
def participe(r):
    o=r["o"]
    if r["cg"]!="ADJ": return False
    if o.endswith("é") and (o[:-1]+"er") in lex: return True
    if o.endswith("i") and (o[:-1]+"ir") in lex: return True
    if o.endswith("u") and any((o[:-1]+e) in lex for e in ("re","oir","ir")): return True
    return o in ("dit","mis","pris","fait","né","mort","vu","su","cru","lu","bu","tu","eu","dû","assis","ouvert","offert","couvert","écrit","peint","joint","remis","exclu","suivi","cuit")
def base_ok(r):
    o=r["o"]
    if not r["islem"] or r["plural"] or o in BLACK or o in STOP: return False
    if r["cg"] not in ("NOM","ADJ","VER","ADV"): return False
    if r["cg"]=="ADV" and r["n"]<5: return False
    if r["n"]<3 or r["n"]>22 or participe(r): return False
    if o.endswith("ing") or "'s" in o or re.search(r"[wk]|ee|oo|sh|ck",o): return False
    if r["fl"]<0.8 or (r["ff"]>4*r["fl"] and r["fl"]<8): return False
    return True

# --- vocabulaire connu : Dubois-Buyse + listes v1
ech={}
for x in json.load(open(f"{S}/dubois.json")):
    o=(x.get("word") or x.get("mot ") or "").strip().lower()
    if WORD.fullmatch(o) and o not in BLACK: ech.setdefault(o,x["level"])
v1=open(f"{S}/mots_v1.js",encoding="utf-8").read(); body=v1[v1.index("{"):v1.rindex("};")+1]; body=re.sub(r"//.*","",body); body=re.sub(r",\s*]","]",body)
for L,ws in json.loads(body).items():
    for o in ws:
        o=o.lower()
        if WORD.fullmatch(o) and o not in BLACK: ech.setdefault(o,{"CE1":9,"CE2":13,"CM1":17,"CM2":21,"Collège":28,"Lycée":40}[L])
T={1:[o for o,e in ech.items() if e<=15],2:[o for o,e in ech.items() if 16<=e<=23],3:[o for o,e in ech.items() if 24<=e<=35],4:[o for o,e in ech.items() if e>=36]}
LX={}
for r in lex.values():
    if r["o"] in ech or not base_ok(r): continue
    t=1 if (r["fl"]>=10 and r["ff"]>=5) else 2 if (r["fl"]>=3 and r["ff"]>=1) else 3 if r["fl"]>=1.5 else 4
    LX.setdefault(t,[]).append(r["o"])
print("T:",{k:len(v) for k,v in T.items()},"LX:",{k:len(v) for k,v in sorted(LX.items())})

CPF=r"ph|th|gn|ill|y|x|-|'|tion|[bcdfgklmnprstvz]{3}|[ïëüÿ]|œ"
def step(src, nmin=3, nmax=99, flags=99, silent=99, syl=99, forbid=r"$^"):
    def ok(o):
        r=lex.get(o); n=len(o)
        return nmin<=n<=nmax and (r is None or (r["flags"]<=flags and r["silent"]<=silent and r["syl"]<=syl)) and not re.search(forbid,o)
    return (src, ok)
LX1s=[o for o in LX[1] if lex[o]["ff"]>=8 and lex[o]["cg"] in ("NOM","VER","ADJ")]
PLAN={
 "CP":     [step(T[1],nmax=7,flags=1,silent=2,syl=3,forbid=CPF), step(T[2],nmax=6,flags=0,silent=2,syl=2,forbid=CPF), step(LX1s,nmax=6,flags=0,silent=2,syl=2,forbid=CPF)],
 "CE1":    [step(T[1]), step(T[2],nmax=8,flags=1,silent=3,syl=3,forbid=r"ph|th|y|x|-|'"), step(LX1s,nmax=8,flags=1,forbid=r"ph|th|y|x|-|'")],
 "CE2":    [step(T[2],nmax=9,flags=2,silent=4), step(T[3],nmax=9,flags=2,silent=4), step(LX[1],nmax=9,flags=2,silent=4), step(LX[2],nmax=9,flags=1,silent=3)],
 "CM1":    [step(T[2]), step(T[3],nmax=11), step(LX[2],nmin=5,nmax=12,flags=2)],
 "CM2":    [step(T[3]), step(LX[2],nmin=6,nmax=14), step(LX[3],nmin=7,nmax=14)],
 "Collège":[step(T[3]), step(LX[3],nmin=8,nmax=18), step(LX[2],nmin=9,nmax=18)],
}
LEVELS=["CP","CE1","CE2","CM1","CM2","Collège","Lycée"]
out={}; used=set(); origin={}
for L,steps in PLAN.items():
    words=[]
    for src,ok in steps:
        need=1000-len(words)
        if need<=0: break
        c=sorted((o for o in src if o not in used and ok(o)), key=O)
        for o in c[:need]: words.append(o); used.add(o); origin[o]="DB" if o in ech else "LX"
    out[L]=sorted(set(words))
lyc=[o for o in T[4] if o not in used]
c=[r for r in lex.values() if r["o"] not in used and base_ok(r) and r["D"]>=7.5 and (r["n"]>=11 or r["flags"]>=2) and r["n"]>=8 and r["fl"]>=1.5]
c.sort(key=lambda r:-r["f"])
for r in c[:1000-len(lyc)]: lyc.append(r["o"]); origin[r["o"]]="LX"
for o in T[4]: origin[o]="DB"
out["Lycée"]=sorted(set(lyc))
for L in LEVELS:
    print(L, len(out[L]), dict(collections.Counter(origin[o] for o in out[L])))
if "probe" in sys.argv:
    for L in LEVELS:
        db_=[w for w in out[L] if origin[w]=="DB"]; lx_=[w for w in out[L] if origin[w]=="LX"]
        print(f"\n== {L} DB :", ", ".join(random.sample(db_,min(30,len(db_)))))
        print(f"== {L} LX :", ", ".join(random.sample(lx_,min(40,len(lx_)))))
    sys.exit()
with open(os.path.join(HERE,"..","mots.js"),"w",encoding="utf-8") as f:
    f.write("// Listes de mots par niveau — français uniquement.\n// Sources : échelle Dubois-Buyse (vocabulaire par niveau) + Lexique 3.83 (fréquences), triées par simplicité orthographique.\n// Modifier librement : une entrée = un mot.\nconst MOTS = {\n")
    for L in LEVELS:
        f.write(f'  "{L}": [\n'); line="   "
        for w in out[L]:
            tok=f' "{w}",'
            if len(line)+len(tok)>110: f.write(line+"\n"); line="   "
            line+=tok
        f.write(line.rstrip(",")+"\n  ],\n")
    f.write("};\nconst NIVEAUX = Object.keys(MOTS);\n")
