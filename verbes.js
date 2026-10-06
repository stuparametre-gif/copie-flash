// Conjugaison — données et conjugueur pour Copie Flash.
//
// Principe : conjuguer, c'est surtout choisir la bonne terminaison. On génère donc les formes par règle
// pour les verbes réguliers (1er et 2e groupes) et on garde une table écrite à la main pour les verbes
// irréguliers fréquents (3e groupe). Chaque forme est vérifiable contre Lexique 3.83 : tools/build_verbes.py.
//
// Classement scolaire (Bescherelle) :
//   1er groupe : -er (sauf aller), réguliers.           présent : -e -es -e -ons -ez -ent
//   2e groupe  : -ir qui fait -issons (nous finissons). présent : -is -is -it -issons -issez -issent
//   3e groupe  : tout le reste, irréguliers (table ci-dessous).
//
// IMPORTANT (mots montrés à un enfant) : on n'auto-génère que ce dont la terminaison est sûre.
// Les verbes à radical changeant (-eler/-eter/-yer, lever, acheter, espérer…) ne sont PAS dans les
// listes auto-générées ; s'il en faut, les ajouter dans VERBES_IRR avec leurs formes écrites à la main.

// ---- Temps proposés (noms affichés dans i18n.js : t("temps_<id>")) ----
const TEMPS_IDS = ["present", "imparfait", "futur", "passecompose"];
// Noms français des temps, pour le libellé du mode dans le CSV (les records se comparent en français).
const TEMPS_FR = { present: "présent", imparfait: "imparfait", futur: "futur", passecompose: "passé composé" };

// ---- 1er groupe : infinitifs réguliers, par niveau (verbes clairement réguliers uniquement). ----
// Les -cer / -ger sont gardés (plaçons, mangeons : géré par la règle). Les radicaux changeants sont exclus.
const VERBES_G1 = {
  "CP": ["chanter", "jouer", "donner", "parler", "aimer", "regarder", "sauter", "danser", "laver",
         "fermer", "porter", "trouver", "pousser", "tirer", "marcher", "crier", "cacher", "manger"],
  "CE1": ["aider", "arrêter", "attraper", "casser", "chercher", "coller", "compter", "couper", "coûter",
          "demander", "dessiner", "dîner", "écouter", "entrer", "gagner", "garder", "goûter",
          "habiter", "inviter", "montrer", "nager", "passer", "penser", "pleurer", "poser", "préparer", "ramasser",
          "rentrer", "rester", "sonner", "tomber", "travailler", "traverser"],
  "CE2": ["accrocher", "allumer", "apporter", "attacher", "avancer", "briller", "brosser", "bouger",
          "commencer", "continuer", "décorer", "déjeuner", "dépenser", "deviner", "expliquer", "fabriquer",
          "glisser", "colorier", "inventer", "lancer", "mélanger", "mériter", "monter", "oublier", "partager",
          "piquer", "plonger", "quitter", "ranger", "raconter", "respirer", "ronger", "souffler",
          "siffler", "souhaiter", "tourner", "tracer", "voler"],
  "CM1": ["abandonner", "accompagner", "admirer", "ajouter", "approcher", "assurer", "augmenter",
          "balancer", "bavarder", "calculer", "camper", "coiffer", "contempler", "cultiver", "escalader", "déborder",
          "déchirer", "déranger", "dévorer", "diriger", "effacer", "emprunter", "entourer", "étonner",
          "féliciter", "galoper", "gaspiller", "jardiner", "habiller", "imaginer", "indiquer", "négliger",
          "observer", "pardonner", "plier", "remarquer", "réparer", "séparer", "signer", "soigner", "trembler"],
  "CM2": ["abriter", "accorder", "affirmer", "agacer", "arroser", "associer", "chuchoter", "coincer",
          "consoler", "déclarer", "dégager", "récompenser", "désirer", "dévisager", "distribuer", "échanger",
          "éclabousser", "encourager", "envelopper", "exercer", "exprimer", "forcer", "fréquenter",
          "hésiter", "influencer", "mendier", "remercier", "négocier", "soupçonner", "surveiller"],
  "Collège": ["accentuer", "acquitter", "ajuster", "alterner", "amplifier", "analyser", "annoncer", "collaborer",
              "apprécier", "argumenter", "bercer", "certifier", "circuler", "concerner", "condamner",
              "consacrer", "désigner", "divulguer", "élaborer", "émerger", "engager", "énoncer", "évaluer",
              "formuler", "consulter", "illustrer", "incarner", "justifier", "manier", "modifier",
              "prononcer", "rédiger", "renoncer", "signaler", "solliciter", "témoigner", "vérifier"],
  "Lycée": ["abroger", "adjuger", "allouer", "atténuer", "conjecturer", "corroborer",
            "délimiter", "dénaturer", "dénombrer", "effectuer", "éprouver", "estimer", "entériner",
            "exacerber", "fluctuer", "généraliser", "hiérarchiser", "homologuer", "légitimer", "moduler",
            "objecter", "préconiser", "présager", "prôner", "réfuter", "relativiser", "stipuler", "substituer"],
};

// ---- 2e groupe : verbes en -ir qui font -issons (réguliers), par niveau. ----
const VERBES_G2 = {
  "CP": ["finir", "grandir"],
  "CE1": ["choisir", "remplir", "réussir", "rougir", "salir", "guérir", "bondir", "punir"],
  "CE2": ["applaudir", "obéir", "réfléchir", "ralentir", "atterrir", "bâtir", "démolir", "franchir",
          "nourrir", "pâlir", "saisir", "unir"],
  "CM1": ["accomplir", "agir", "avertir", "éblouir", "élargir", "enrichir", "envahir", "fournir",
          "garnir", "jaillir", "rajeunir", "surgir", "vieillir"],
  "CM2": ["abolir", "adoucir", "affaiblir", "aplatir", "assombrir", "assourdir", "convertir", "définir",
          "éclaircir", "engloutir", "épanouir", "étourdir", "resplendir", "rétablir"],
  "Collège": ["abêtir", "affranchir", "amoindrir", "assainir", "assortir", "avilir", "compatir",
              "investir", "ternir", "vrombir"],
  "Lycée": ["ahurir", "amerrir", "anoblir", "ragaillardir", "subvertir"],
};

// ---- 3e groupe et verbes irréguliers : table écrite à la main (vérifiée). ----
// pres : les 6 personnes du présent (je, tu, il, nous, vous, ils).
// futs : radical du futur (on ajoute -ai -as -a -ons -ez -ont).
// pp   : participe passé (masculin singulier). aux : "avoir" ou "être" (pour le passé composé).
// impf : imparfait écrit à la main, seulement quand il ne se déduit pas du « nous » du présent (être).
// niv  : niveau d'apparition. Imparfait déduit : radical du « nous » présent (prenons → pren-) + -ais…
const VERBES_IRR = {
  "être":      { pres: ["suis", "es", "est", "sommes", "êtes", "sont"], impf: ["étais", "étais", "était", "étions", "étiez", "étaient"], futs: "ser", pp: "été", aux: "avoir", niv: "CP" },
  "avoir":     { pres: ["ai", "as", "a", "avons", "avez", "ont"], futs: "aur", pp: "eu", aux: "avoir", niv: "CP" },
  "aller":     { pres: ["vais", "vas", "va", "allons", "allez", "vont"], futs: "ir", pp: "allé", aux: "être", niv: "CE1" },
  "faire":     { pres: ["fais", "fais", "fait", "faisons", "faites", "font"], futs: "fer", pp: "fait", aux: "avoir", niv: "CE1" },
  "dire":      { pres: ["dis", "dis", "dit", "disons", "dites", "disent"], futs: "dir", pp: "dit", aux: "avoir", niv: "CE1" },
  "venir":     { pres: ["viens", "viens", "vient", "venons", "venez", "viennent"], futs: "viendr", pp: "venu", aux: "être", niv: "CE1" },
  "prendre":   { pres: ["prends", "prends", "prend", "prenons", "prenez", "prennent"], futs: "prendr", pp: "pris", aux: "avoir", niv: "CE1" },
  "voir":      { pres: ["vois", "vois", "voit", "voyons", "voyez", "voient"], futs: "verr", pp: "vu", aux: "avoir", niv: "CE1" },
  "partir":    { pres: ["pars", "pars", "part", "partons", "partez", "partent"], futs: "partir", pp: "parti", aux: "être", niv: "CE2" },
  "sortir":    { pres: ["sors", "sors", "sort", "sortons", "sortez", "sortent"], futs: "sortir", pp: "sorti", aux: "être", niv: "CE2" },
  "dormir":    { pres: ["dors", "dors", "dort", "dormons", "dormez", "dorment"], futs: "dormir", pp: "dormi", aux: "avoir", niv: "CE2" },
  "mettre":    { pres: ["mets", "mets", "met", "mettons", "mettez", "mettent"], futs: "mettr", pp: "mis", aux: "avoir", niv: "CE2" },
  "lire":      { pres: ["lis", "lis", "lit", "lisons", "lisez", "lisent"], futs: "lir", pp: "lu", aux: "avoir", niv: "CE2" },
  "écrire":    { pres: ["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"], futs: "écrir", pp: "écrit", aux: "avoir", niv: "CE2" },
  "boire":     { pres: ["bois", "bois", "boit", "buvons", "buvez", "boivent"], futs: "boir", pp: "bu", aux: "avoir", niv: "CE2" },
  "pouvoir":   { pres: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"], futs: "pourr", pp: "pu", aux: "avoir", niv: "CE2" },
  "vouloir":   { pres: ["veux", "veux", "veut", "voulons", "voulez", "veulent"], futs: "voudr", pp: "voulu", aux: "avoir", niv: "CE2" },
  "attendre":  { pres: ["attends", "attends", "attend", "attendons", "attendez", "attendent"], futs: "attendr", pp: "attendu", aux: "avoir", niv: "CE2" },
  "entendre":  { pres: ["entends", "entends", "entend", "entendons", "entendez", "entendent"], futs: "entendr", pp: "entendu", aux: "avoir", niv: "CE2" },
  "répondre":  { pres: ["réponds", "réponds", "répond", "répondons", "répondez", "répondent"], futs: "répondr", pp: "répondu", aux: "avoir", niv: "CE2" },
  "perdre":    { pres: ["perds", "perds", "perd", "perdons", "perdez", "perdent"], futs: "perdr", pp: "perdu", aux: "avoir", niv: "CE2" },
  "ouvrir":    { pres: ["ouvre", "ouvres", "ouvre", "ouvrons", "ouvrez", "ouvrent"], futs: "ouvrir", pp: "ouvert", aux: "avoir", niv: "CE2" },
  "courir":    { pres: ["cours", "cours", "court", "courons", "courez", "courent"], futs: "courr", pp: "couru", aux: "avoir", niv: "CE2" },
  "savoir":    { pres: ["sais", "sais", "sait", "savons", "savez", "savent"], futs: "saur", pp: "su", aux: "avoir", niv: "CM1" },
  "devoir":    { pres: ["dois", "dois", "doit", "devons", "devez", "doivent"], futs: "devr", pp: "dû", aux: "avoir", niv: "CM1" },
  "tenir":     { pres: ["tiens", "tiens", "tient", "tenons", "tenez", "tiennent"], futs: "tiendr", pp: "tenu", aux: "avoir", niv: "CM1" },
  "croire":    { pres: ["crois", "crois", "croit", "croyons", "croyez", "croient"], futs: "croir", pp: "cru", aux: "avoir", niv: "CM1" },
  "offrir":    { pres: ["offre", "offres", "offre", "offrons", "offrez", "offrent"], futs: "offrir", pp: "offert", aux: "avoir", niv: "CM1" },
  "sentir":    { pres: ["sens", "sens", "sent", "sentons", "sentez", "sentent"], futs: "sentir", pp: "senti", aux: "avoir", niv: "CM1" },
  "servir":    { pres: ["sers", "sers", "sert", "servons", "servez", "servent"], futs: "servir", pp: "servi", aux: "avoir", niv: "CM1" },
  "rendre":    { pres: ["rends", "rends", "rend", "rendons", "rendez", "rendent"], futs: "rendr", pp: "rendu", aux: "avoir", niv: "CM1" },
  "descendre": { pres: ["descends", "descends", "descend", "descendons", "descendez", "descendent"], futs: "descendr", pp: "descendu", aux: "être", niv: "CM1" },
  "devenir":   { pres: ["deviens", "deviens", "devient", "devenons", "devenez", "deviennent"], futs: "deviendr", pp: "devenu", aux: "être", niv: "CM1" },
  "connaître": { pres: ["connais", "connais", "connaît", "connaissons", "connaissez", "connaissent"], futs: "connaîtr", pp: "connu", aux: "avoir", niv: "CM2" },
  "recevoir":  { pres: ["reçois", "reçois", "reçoit", "recevons", "recevez", "reçoivent"], futs: "recevr", pp: "reçu", aux: "avoir", niv: "CM2" },
  "vivre":     { pres: ["vis", "vis", "vit", "vivons", "vivez", "vivent"], futs: "vivr", pp: "vécu", aux: "avoir", niv: "CM2" },
  "suivre":    { pres: ["suis", "suis", "suit", "suivons", "suivez", "suivent"], futs: "suivr", pp: "suivi", aux: "avoir", niv: "CM2" },
  "paraître":  { pres: ["parais", "parais", "paraît", "paraissons", "paraissez", "paraissent"], futs: "paraîtr", pp: "paru", aux: "avoir", niv: "Collège" },
  "craindre":  { pres: ["crains", "crains", "craint", "craignons", "craignez", "craignent"], futs: "craindr", pp: "craint", aux: "avoir", niv: "Collège" },
  "peindre":   { pres: ["peins", "peins", "peint", "peignons", "peignez", "peignent"], futs: "peindr", pp: "peint", aux: "avoir", niv: "Collège" },
  "rire":      { pres: ["ris", "ris", "rit", "rions", "riez", "rient"], futs: "rir", pp: "ri", aux: "avoir", niv: "Collège" },
  "conduire":  { pres: ["conduis", "conduis", "conduit", "conduisons", "conduisez", "conduisent"], futs: "conduir", pp: "conduit", aux: "avoir", niv: "Collège" },
  "mourir":    { pres: ["meurs", "meurs", "meurt", "mourons", "mourez", "meurent"], futs: "mourr", pp: "mort", aux: "être", niv: "Collège" },
  "naître":    { pres: ["nais", "nais", "naît", "naissons", "naissez", "naissent"], futs: "naîtr", pp: "né", aux: "être", niv: "Collège" },
  "résoudre":  { pres: ["résous", "résous", "résout", "résolvons", "résolvez", "résolvent"], futs: "résoudr", pp: "résolu", aux: "avoir", niv: "Lycée" },
  "vaincre":   { pres: ["vaincs", "vaincs", "vainc", "vainquons", "vainquez", "vainquent"], futs: "vaincr", pp: "vaincu", aux: "avoir", niv: "Lycée" },
  "coudre":    { pres: ["couds", "couds", "coud", "cousons", "cousez", "cousent"], futs: "coudr", pp: "cousu", aux: "avoir", niv: "Lycée" },
  "acquérir":  { pres: ["acquiers", "acquiers", "acquiert", "acquérons", "acquérez", "acquièrent"], futs: "acquerr", pp: "acquis", aux: "avoir", niv: "Lycée" },
};

// Verbes du 1er groupe qui se conjuguent avec être au passé composé (accord avec le sujet).
const AUX_ETRE = new Set(["entrer", "rentrer", "rester", "tomber", "monter", "passer", "arriver", "retourner"]);

// ---- Conjugueur ----
const Conj = (() => {
  // je, tu, il, nous, vous, ils
  const END = {
    present:    ["e", "es", "e", "ons", "ez", "ent"],       // 1er groupe
    imparfait:  ["ais", "ais", "ait", "ions", "iez", "aient"],
    futur:      ["ai", "as", "a", "ons", "ez", "ont"],
    present2:   ["is", "is", "it", "issons", "issez", "issent"], // 2e groupe
  };
  const AUX = {
    avoir: ["ai", "as", "a", "avons", "avez", "ont"],
    être:  ["suis", "es", "est", "sommes", "êtes", "sont"],
  };

  function groupe(inf) {
    if (VERBES_IRR[inf]) return 3;
    if (inf.endsWith("er")) return 1;
    if (inf.endsWith("ir")) return 2; // on ne met en 2e groupe que des -ir réguliers (listes ci-dessus)
    return 3;
  }

  // 1er groupe : cédille devant a/o (plaçons, plaçais) et « e » tampon pour -ger (mangeons, mangeais),
  // mais pas devant i/e (placions, mangions). firstLetter = 1re lettre de la terminaison.
  function g1stem(rad, firstLetter) {
    const last = rad.slice(-1);
    if (last === "c" && "aou".includes(firstLetter)) return rad.slice(0, -1) + "ç";
    if (last === "g" && "aou".includes(firstLetter)) return rad + "e";
    return rad;
  }

  const stripOns = x => x.endsWith("ons") ? x.slice(0, -3) : x;

  function participe(inf, g) {
    if (g === 3) return VERBES_IRR[inf].pp;
    if (g === 1) return inf.slice(0, -2) + "é";
    return inf.slice(0, -2) + "i"; // 2e groupe : fini
  }
  // accord du participe (verbes en être) : + e au féminin, + s au pluriel. allé → allées.
  function accord(pp, num, gen) {
    return pp + (gen === "f" ? "e" : "") + (num === "pl" ? "s" : "");
  }

  // Renvoie { forme, hl } : hl = la forme avec la terminaison entre crochets pour la colorer à la correction
  // (chant[ons]). Quand la terminaison ne se découpe pas proprement (3e groupe au présent, passé composé),
  // hl = la forme telle quelle (pas de couleur, pas de découpage en syllabes).
  function conjugue(inf, temps, p, opt = {}) {
    const g = groupe(inf);
    const col = (stem, end) => ({ forme: stem + end, hl: stem + "[" + end + "]" });
    const plain = f => ({ forme: f, hl: f });

    if (temps === "passecompose") {
      const aux = VERBES_IRR[inf] ? VERBES_IRR[inf].aux : (AUX_ETRE.has(inf) ? "être" : "avoir");
      let pp = participe(inf, g);
      if (aux === "être") pp = accord(pp, p >= 3 ? "pl" : "sg", opt.gen || "m");
      return plain(AUX[aux][p] + " " + pp);
    }
    if (g === 3) {
      const T = VERBES_IRR[inf];
      if (temps === "present") return plain(T.pres[p]);
      if (temps === "imparfait") {
        if (T.impf) return plain(T.impf[p]);
        return col(stripOns(T.pres[3]), END.imparfait[p]);
      }
      if (temps === "futur") return col(T.futs, END.futur[p]);
    }
    if (g === 2) {
      const rad = inf.slice(0, -2);
      if (temps === "present") return col(rad, END.present2[p]);
      if (temps === "imparfait") return col(rad + "iss", END.imparfait[p]);
      if (temps === "futur") return col(inf, END.futur[p]);
    }
    // 1er groupe
    const rad = inf.slice(0, -2);
    if (temps === "present") { const e = END.present[p]; return col(g1stem(rad, e[0]), e); }
    if (temps === "imparfait") { const e = END.imparfait[p]; return col(g1stem(rad, e[0]), e); }
    if (temps === "futur") return col(inf, END.futur[p]); // chanter → chanterai
  }

  // Les 6 personnes d'un verbe à un temps (pour la fiche « Les verbes »).
  function tableau(inf, temps) {
    return [0, 1, 2, 3, 4, 5].map(p => conjugue(inf, temps, p));
  }

  return { groupe, conjugue, participe, tableau, AUX_ETRE };
})();

// ---- Fiche « Les verbes » (page pour apprendre, comme « Les sons »). Textes en français. ----
// Chaque temps : un verbe modèle par groupe (les terminaisons sont colorées automatiquement) + les pièges.
const VERBES_FICHES = [
  {
    id: "present", modeles: { g1: "chanter", g2: "finir", g3: "prendre" },
    intro: "Au présent, la terminaison change à chaque personne. Le radical, lui, bouge peu.",
    pieges: [
      "Le piège qu'on n'entend pas : avec « ils / elles », la terminaison -ent est muette (ils chantent se dit comme il chante).",
      "Ne pas confondre l'infinitif en -er (chanter) et le présent « je chante » : on peut dire « je veux chanter » pour vérifier l'infinitif.",
      "1er groupe : nous mangeons, nous plaçons — on garde le son [j]/[s] avec un e ou une cédille.",
    ],
  },
  {
    id: "imparfait", modeles: { g1: "chanter", g2: "finir", g3: "prendre" },
    intro: "L'imparfait a les mêmes terminaisons pour tous les verbes : -ais -ais -ait -ions -iez -aient.",
    pieges: [
      "On entend pareil : -ais, -ait, -aient. C'est la personne qui décide (je/tu → -ais, il → -ait, ils → -aient).",
      "Le radical vient du « nous » du présent : nous prenons → je prenais ; nous faisons → je faisais.",
      "Attention à nous : -ions, -iez avec un i (nous chantions, vous chantiez).",
    ],
  },
  {
    id: "futur", modeles: { g1: "chanter", g2: "finir", g3: "prendre" },
    intro: "Au futur, on part souvent de l'infinitif et on ajoute -ai -as -a -ons -ez -ont.",
    pieges: [
      "On entend presque le mot « avoir » : j'aurai, tu auras… ai, as, a, ons, ez, ont.",
      "Il reste un r avant la terminaison : je chanterai, je finirai, je prendrai.",
      "Quelques verbes ont un futur spécial à retenir : être → je serai, avoir → j'aurai, aller → j'irai, faire → je ferai.",
    ],
  },
  {
    id: "passecompose", modeles: { g1: "chanter", g2: "finir", g3: "prendre" },
    intro: "Le passé composé = un petit mot (avoir ou être) + le participe passé (chanté, fini, pris).",
    pieges: [
      "La plupart des verbes utilisent avoir : j'ai chanté, nous avons fini.",
      "Certains utilisent être (aller, venir, partir, sortir…) : elle est allée, ils sont partis — et le participe s'accorde avec le sujet.",
      "Participe passé : 1er groupe en -é (chanté), 2e groupe en -i (fini), 3e groupe à retenir (pris, fait, vu…).",
    ],
  },
];

if (typeof module !== "undefined") module.exports = { VERBES_G1, VERBES_G2, VERBES_IRR, AUX_ETRE, Conj, TEMPS_IDS, TEMPS_FR, VERBES_FICHES };
