// Fiches « Les sons » : un son → ses façons de l'écrire, avec une image repère et la règle « quand ».
// Sources : programme de français du cycle 2 (BO du 31/10/2024, en vigueur à la rentrée 2025) ;
// fréquences des graphies d'après N. Catach ; images repères, gestes et astuces inspirés des pratiques
// d'orthophonie (mot-image référent, sourde/sonore « main sur la gorge », familles de mots).
// Les positions annoncées (eau à la fin, en au début…) ont été vérifiées sur les listes de mots.js.
//
// Mot repère : la graphie est entre crochets, bat[eau]. id = clé dans SONS_MOTS (sons_mots.js,
// généré par tools/build_sons.py) ; par défaut id = g. freq : "top" (la plus fréquente), "moins", "rare", "exception".
const SONS_SECTIONS = [
  { titre: "Un son, plusieurs façons de l'écrire", fiches: ["o", "an", "in", "è", "é", "s", "z", "k", "g", "j", "f", "ill"] },
  { titre: "Deux lettres pour un seul son", fiches: ["ou", "oi", "on", "eu", "ch", "gn"] },
  { titre: "Les pièges", fiches: ["mbp", "muettes", "proches"] },
];

const SONS = {
  "o": {
    nom: "[o]", court: "o · au · eau · ô",
    intro: "On entend [o]… mais on peut l'écrire de 4 façons.",
    graphies: [
      { g: "o", mot: "vél[o]", img: "🚲", freq: "top", quand: "La plus fréquente : 3 fois sur 4, c'est o." },
      { g: "au", mot: "dinos[au]re", img: "🦕", freq: "moins", quand: "Au début ou au milieu du mot : autruche, jaune, chaud, sauter." },
      { g: "eau", mot: "bat[eau]", img: "⛵", freq: "moins", quand: "Presque toujours à la fin du mot : bateau, chapeau, gâteau, oiseau." },
      { g: "ô", mot: "fant[ô]me", img: "👻", freq: "rare", quand: "Rare : on l'apprend mot par mot. Fantôme, hôpital, drôle, tôt, bientôt, plutôt." },
    ],
    astuces: [
      "EAU, c'est comme l'eau qui coule : on la trouve au bout du mot. Bateau, cadeau, gâteau.",
      "Les mots en -eau ont souvent un cousin en -el : beau → belle, nouveau → nouvelle, chapeau → chapelier.",
    ],
  },
  "an": {
    nom: "[an]", court: "an · en · am · em",
    intro: "On entend [an] : on l'écrit an, en, am ou em.",
    graphies: [
      { g: "an", mot: "or[an]ge", img: "🍊", freq: "top", quand: "Aussi fréquent que en : il faut apprendre les mots. Maman, orange, gant." },
      { g: "en", mot: "d[en]t", img: "🦷", freq: "top", quand: "Au début d'un mot, c'est presque toujours en : enfant, encore, entrer, enlever." },
      { g: "am", mot: "l[am]pe", img: "💡", freq: "moins", quand: "Devant m, b, p : lampe, jambe, chambre, tambour." },
      { g: "em", mot: "t[em]pête", img: "🌩️", freq: "moins", quand: "Devant m, b, p : tempête, temps, novembre, emporter." },
    ],
    astuces: [
      "Pour choisir entre an et en, pense à un mot de la même famille : il s'écrit pareil. Dent → dentiste, enfant → enfance, chant → chanter.",
      "Beaucoup de mots finissent par -ment : moment, vêtement, doucement.",
    ],
  },
  "in": {
    nom: "[in]", court: "in · ain · ein · un",
    intro: "On entend [in] : c'est le son qui a le plus d'écritures !",
    graphies: [
      { g: "in", mot: "lap[in]", img: "🐇", freq: "top", quand: "La plus fréquente : lapin, jardin, sapin, matin." },
      { g: "im", mot: "gr[im]per", img: "🧗", freq: "moins", quand: "Devant m, b, p : grimper, timbre, simple, impossible." },
      { g: "ain", mot: "p[ain]", img: "🍞", freq: "moins", quand: "Souvent à la fin du mot : pain, main, train, demain, copain." },
      { g: "ein", mot: "p[ein]ture", img: "🎨", freq: "rare", quand: "Rare : peinture, ceinture, plein, frein, et les verbes peindre, éteindre." },
      { id: "ien", g: "en", sous: "après i", mot: "chi[en]", img: "🐶", freq: "moins", quand: "Juste après un i, on écrit en : chien, bien, rien, magicien." },
      { g: "un", mot: "[un]", img: "1️⃣", freq: "rare", quand: "Rare : un, lundi, brun, parfum, chacun, aucun. Beaucoup de gens le disent comme in." },
    ],
    astuces: [
      "Pour ain et ein, écoute le féminin ou un mot de la famille : on y entend le a ou le e. Certain → certaine, plein → pleine, main → manuel.",
      "ain, ein et un sont rares : si tu n'es pas sûre, in est le meilleur choix.",
    ],
  },
  "è": {
    nom: "[è]", court: "è · ê · ai · ei · e · et",
    intro: "On entend [è] : è, ê, ai, ei, e, et… Il y a beaucoup de façons !",
    graphies: [
      { g: "ai", mot: "fr[ai]se", img: "🍓", freq: "top", quand: "Très fréquent, partout dans le mot : fraise, lait, maison, balai." },
      { g: "e", mot: "m[e]r", img: "🌊", freq: "top", quand: "Sans accent devant deux consonnes (belle, terre, merci) ou devant une consonne qu'on entend à la fin (mer, sel, bec)." },
      { g: "è", mot: "z[è]bre", img: "🦓", freq: "moins", quand: "Quand la syllabe d'après finit par e : mè-re, frè-re, zè-bre, chè-vre, flè-che." },
      { g: "ê", mot: "f[ê]te", img: "🎉", freq: "moins", quand: "À apprendre par cœur : fête, tête, forêt, fenêtre, bête, rêve." },
      { g: "et", mot: "poul[et]", img: "🐔", freq: "moins", quand: "À la fin du mot : poulet, jouet, bracelet, robinet." },
      { g: "ei", mot: "n[ei]ge", img: "❄️", freq: "rare", quand: "Rare, souvent devant n ou g : neige, reine, baleine, seize, treize." },
    ],
    astuces: [
      "Deux consonnes après le e font le travail de l'accent : belle, terre, lunettes. Pas besoin de è ! (Sauf devant br, cr, tr, vr, bl… : zèbre, chèvre, règle.)",
      "Pour -et, pense au féminin : violet → violette, muet → muette, poulet → poulette.",
      "L'accent circonflexe remplace souvent un s d'autrefois : forêt → forestier, fête → festin, bête → bestiole.",
    ],
  },
  "é": {
    nom: "[é]", court: "é · er · ez",
    intro: "On entend [é] : le plus souvent é, mais aussi er ou ez à la fin des mots.",
    graphies: [
      { g: "é", mot: "[é]toile", img: "⭐", freq: "top", quand: "La plus fréquente, partout dans le mot : étoile, école, bébé, café." },
      { g: "er", mot: "pani[er]", img: "🧺", freq: "top", quand: "À la fin de beaucoup de noms (panier, cahier, escalier) et des verbes comme manger, chanter." },
      { g: "ez", mot: "n[ez]", img: "👃", freq: "rare", quand: "Rare : nez, chez, assez. Et après vous : vous chantez." },
    ],
    astuces: [
      "Les métiers et les arbres fruitiers finissent souvent par -er : boulanger, pompier, pommier, cerisier.",
      "Verbe en -er ou -é ? Remplace par prendre / pris. « Je vais manger » → « je vais prendre » : -er. « J'ai mangé » → « j'ai pris » : -é.",
      "Et dans les petits mots : et, les, des, mes, tes, ses, ces, j'ai.",
    ],
  },
  "s": {
    nom: "[s]", court: "s · ss · c · ç",
    intro: "On entend [s] : s, ss, c, ç ou t. Souvent, c'est la lettre d'à côté qui décide.",
    graphies: [
      { g: "s", mot: "[s]erpent", img: "🐍", freq: "top", quand: "Au début du mot ou à côté d'une consonne : serpent, sac, veste, danse." },
      { g: "ss", mot: "poi[ss]on", img: "🐟", freq: "moins", quand: "Entre deux voyelles, il faut deux s : poisson, tasse, trousse, dessin." },
      { g: "c", mot: "[c]itron", img: "🍋", freq: "moins", quand: "Devant e, i, y, la lettre c fait [s] : citron, cerise, glace, ici." },
      { g: "ç", mot: "gla[ç]on", img: "🧊", freq: "rare", quand: "Devant a, o, u, on ajoute une cédille : glaçon, garçon, leçon, reçu." },
      { g: "t", mot: "addi[t]ion", img: "➕", freq: "rare", quand: "Dans les mots en -tion : addition, récréation, attention." },
    ],
    astuces: [
      "Un seul s entre deux voyelles fait [z] ! Poison ☠️ n'est pas poisson 🐟. Pour faire [s], on double : ss.",
      "La cédille est une petite queue sous le c : ça, ço, çu se lisent [sa], [so], [su].",
    ],
  },
  "z": {
    nom: "[z]", court: "z · s",
    intro: "On entend [z] : on l'écrit z… ou s, quand il est entre deux voyelles.",
    graphies: [
      { g: "s", mot: "ro[s]e", img: "🌹", freq: "top", quand: "Un s tout seul entre deux voyelles chante [z] : rose, maison, cerise, oiseau." },
      { g: "z", mot: "lé[z]ard", img: "🦎", freq: "moins", quand: "Plus rare : zèbre, zéro, lézard, douze, onze, seize." },
    ],
    astuces: [
      "Maison, cousin, rose : le s est entre deux voyelles, alors il se met à chanter [z].",
      "Dans deuxième, sixième, dixième, le x se dit aussi [z].",
    ],
  },
  "k": {
    nom: "[k]", court: "c · qu · k",
    intro: "On entend [k] : c, qu, k… Regarde la lettre qui suit !",
    graphies: [
      { g: "c", mot: "[c]anard", img: "🦆", freq: "top", quand: "Devant a, o, u ou une consonne : canard, cochon, cube, crabe." },
      { g: "qu", mot: "re[qu]in", img: "🦈", freq: "top", quand: "Devant e et i, où c ferait [s] : requin, masque, qui, que. Et aussi : quatre, quoi." },
      { g: "k", mot: "[k]angourou", img: "🦘", freq: "rare", quand: "Rare, dans des mots venus d'ailleurs : kangourou, koala, kiwi, ski." },
      { g: "ch", mot: "or[ch]estre", img: "🎻", freq: "rare", quand: "Très rare : orchestre, chorale, écho." },
      { g: "q", mot: "co[q]", img: "🐓", freq: "rare", quand: "Tout seul, seulement à la fin : coq, cinq." },
    ],
    astuces: [
      "Le q ne sort jamais sans son u : qu. (Sauf coq et cinq.)",
      "c devant e ou i fait [s] (cerise). Pour garder [k] devant e ou i, on écrit qu : requin, masque.",
    ],
  },
  "g": {
    nom: "[g]", court: "g · gu",
    intro: "On entend [g] : g, ou gu devant e et i.",
    graphies: [
      { g: "g", mot: "[g]renouille", img: "🐸", freq: "top", quand: "Devant a, o, u ou une consonne : gare, gomme, légume, grenouille." },
      { g: "gu", mot: "[gu]itare", img: "🎸", freq: "moins", quand: "Devant e, i, y, on ajoute un u : guitare, guêpe, bague, langue." },
    ],
    astuces: [
      "Sans le u, g devant e ou i ferait [j] (girafe). Le u ne se prononce pas : il protège le son [g].",
    ],
  },
  "j": {
    nom: "[j]", court: "j · g · ge",
    intro: "On entend [j] comme dans jus : j, g devant e et i, ou ge devant a et o.",
    graphies: [
      { g: "j", mot: "[j]us", img: "🧃", freq: "top", quand: "Devant toutes les voyelles : jus, jardin, jouet, jeudi." },
      { g: "g", mot: "[g]irafe", img: "🦒", freq: "top", quand: "Devant e, i, y, la lettre g fait [j] : girafe, genou, gilet, magique." },
      { g: "ge", mot: "pi[ge]on", img: "🕊️", freq: "rare", quand: "Devant a, o, u, on ajoute un e pour garder [j] : pigeon, nageoire, il mangeait." },
    ],
    astuces: [
      "La lettre g a deux voix : dure devant a, o, u (gare, gomme), douce devant e, i, y (girafe, genou).",
      "Pigeon : sans le e, on lirait « pigon » !",
    ],
  },
  "f": {
    nom: "[f]", court: "f · ph",
    intro: "On entend [f] : presque toujours f, parfois ph.",
    graphies: [
      { g: "f", mot: "[f]leur", img: "🌸", freq: "top", quand: "Presque toujours : fleur, feu, café, girafe. Parfois doublé : effacer, coiffeur." },
      { g: "ph", mot: "[ph]oque", img: "🦭", freq: "rare", quand: "Dans des mots venus du grec : phoque, dauphin, éléphant, photo, téléphone." },
    ],
    astuces: [
      "Le ph reste dans toute la famille du mot : téléphone, téléphoner ; photo, photographe.",
    ],
  },
  "ill": {
    nom: "[ill]", court: "ill · il · y",
    intro: "On entend [ill] comme dans papillon : ill, il ou y.",
    graphies: [
      { g: "ill", mot: "pap[ill]on", img: "🦋", freq: "top", quand: "Au milieu ou à la fin avec un e : papillon, fille, abeille, feuille." },
      { g: "il", mot: "sole[il]", img: "☀️", freq: "moins", quand: "À la fin des mots masculins, après a, e, eu, ou : soleil, travail, réveil, fauteuil." },
      { g: "y", mot: "cra[y]on", img: "✏️", freq: "moins", quand: "Entre deux voyelles, y vaut deux i : crayon (crai-ion), noyau, voyage." },
    ],
    astuces: [
      "Un soleil, un réveil, un travail : masculin → -il. Une abeille, une bouteille, une feuille : féminin → -ille.",
    ],
  },
  "ou": {
    nom: "[ou]", court: "ou",
    intro: "o et u ensemble font un seul son : [ou].",
    graphies: [
      { g: "ou", mot: "hib[ou]", img: "🦉", freq: "top", quand: "Presque toujours : hibou, loup, poule, soupe." },
      { id: "où", g: "oû", mot: "g[oû]ter", img: "🍪", freq: "rare", quand: "Avec un accent dans quelques mots : goûter, août, et où." },
    ],
    astuces: [
      "Où avec un accent pose une question de lieu : où est le loup ? Sans accent, ou veut dire « ou bien » : chat ou chien.",
    ],
  },
  "oi": {
    nom: "[oi]", court: "oi · oin",
    intro: "o et i ensemble font le son [oi].",
    graphies: [
      { g: "oi", mot: "r[oi]", img: "👑", freq: "top", quand: "Toujours oi : roi, étoile, poisson, voiture." },
      { g: "oin", mot: "p[oin]g", img: "👊", freq: "moins", quand: "Avec un n, on entend [oin] : poing, coin, loin, point." },
      { g: "oy", mot: "v[oy]age", img: "🧳", freq: "rare", quand: "oy = oi + i : voyage se dit « voi-iage ». Aussi : noyau, royal." },
    ],
    astuces: [],
  },
  "on": {
    nom: "[on]", court: "on · om",
    intro: "o et n ensemble font le son [on]. Devant m, b, p, le n devient m.",
    graphies: [
      { g: "on", mot: "ball[on]", img: "🎈", freq: "top", quand: "Presque toujours : ballon, mouton, maison, pont." },
      { g: "om", mot: "tr[om]pette", img: "🎺", freq: "moins", quand: "Devant m, b, p : trompette, pompier, ombre, nombre." },
    ],
    astuces: [
      "Exception célèbre : bonbon 🍬 garde son n devant le b !",
      "Si une voyelle ou un 2e n suit, on n'entend plus [on] : bonne, téléphone.",
    ],
  },
  "eu": {
    nom: "[eu]", court: "eu · œu",
    intro: "e et u ensemble font le son [eu] : feu, fleur.",
    graphies: [
      { g: "eu", mot: "f[eu]", img: "🔥", freq: "top", quand: "Presque toujours : feu, bleu, fleur, cheveu." },
      { g: "œu", mot: "c[œu]r", img: "❤️", freq: "rare", quand: "Quelques mots à retenir, avec o et e collés : cœur, sœur, œuf, bœuf, nœud, vœu." },
    ],
    astuces: [
      "Les mots en -eur n'ont pas de e à la fin : fleur, peur, chaleur… sauf heure, demeure et beurre.",
    ],
  },
  "ch": {
    nom: "[ch]", court: "ch",
    intro: "c et h ensemble font le son [ch].",
    graphies: [
      { g: "ch", mot: "[ch]at", img: "🐱", freq: "top", quand: "Toujours ch : chat, chien, vache, cheval." },
    ],
    astuces: [
      "Dans quelques mots savants, ch fait [k] : orchestre, chorale, écho.",
    ],
  },
  "gn": {
    nom: "[gn]", court: "gn",
    intro: "g et n ensemble font le son [gn].",
    graphies: [
      { g: "gn", mot: "champi[gn]on", img: "🍄", freq: "top", quand: "Toujours gn : champignon, montagne, araignée, ligne." },
    ],
    astuces: [
      "Écoute bien : dans montagne, [gn] se dit d'un seul coup. Dans panier, on entend n puis i.",
    ],
  },
  "mbp": {
    nom: "m b p", titre: "La règle de m, b, p", court: "règle m b p",
    intro: "Devant m, b ou p, le n se transforme en m : am, em, im, om.",
    graphies: [
      { g: "am", mot: "t[am]bour", img: "🥁", quand: "tambour, jambe, lampe, chambre" },
      { g: "em", mot: "t[em]ps", img: "⏰", quand: "temps, tempête, novembre, emmener" },
      { g: "im", mot: "gr[im]per", img: "🧗", quand: "grimper, timbre, simple, impossible" },
      { g: "om", mot: "p[om]pier", img: "🚒", quand: "pompier, trompette, ombre, nombre" },
      { id: "-", g: "n", mot: "bo[n]bon", img: "🍬", freq: "exception", quand: "L'exception à retenir : bonbon (et bonbonne)." },
    ],
    astuces: [
      "m, b, p : pour les dire, tes lèvres se touchent ! Dis « mmm », « b », « p » dans un miroir. Le n qui est juste avant devient m, lui aussi.",
    ],
  },
  "muettes": {
    nom: "muettes", titre: "Les lettres muettes", court: "lettres muettes", type: "muettes",
    intro: "À la fin de beaucoup de mots, il y a une lettre qu'on n'entend pas. Pour la trouver, cherche un mot de la même famille ou le féminin : là, on l'entend !",
    graphies: [
      { id: "fin", mot: "cha[t]", img: "🐱", famille: "cha[t]on" },
      { id: "fin", mot: "lai[t]", img: "🥛", famille: "lai[t]ier" },
      { id: "fin", mot: "den[t]", img: "🦷", famille: "den[t]iste" },
      { id: "fin", mot: "gro[s]", img: "🐘", famille: "gro[s]sir" },
      { id: "fin", mot: "blan[c]", img: "⚪", famille: "blan[c]he" },
      { id: "fin", mot: "froi[d]", img: "🥶", famille: "froi[d]e" },
      { id: "fin", mot: "san[g]", img: "🩸", famille: "san[g]uin" },
      { id: "fin", mot: "ri[z]", img: "🍚", famille: "ri[z]ière" },
    ],
    astuces: [
      "Mets le mot au féminin : petit → petite, grand → grande, froid → froide.",
      "Parfois la famille ne suffit pas : il faut apprendre le mot par cœur (loup, temps, corps).",
    ],
  },
  "proches": {
    nom: "sons proches", titre: "Les sons qui se ressemblent", court: "p/b t/d f/v…", type: "paires",
    intro: "Ces sons vont par deux : la bouche fait le même geste, mais l'un fait vibrer la gorge et l'autre non.",
    paires: [
      { sons: "p / b", a: { mot: "[p]ain", img: "🍞" }, b: { mot: "[b]ain", img: "🛁" } },
      { sons: "t / d", a: { mot: "[t]hé", img: "☕" }, b: { mot: "[d]é", img: "🎲" } },
      { sons: "f / v", a: { mot: "[f]il", img: "🧵" }, b: { mot: "[v]ille", img: "🏙️" } },
      { sons: "s / z", a: { mot: "poi[ss]on", img: "🐟" }, b: { mot: "poi[s]on", img: "☠️" } },
      { sons: "ch / j", a: { mot: "[ch]ou", img: "🥬" }, b: { mot: "[j]oue", img: "😊" } },
      { sons: "k / g", a: { mot: "[c]ar", img: "🚌" }, b: { mot: "[g]are", img: "🚉" } },
    ],
    astuces: [
      "Pose ta main sur ta gorge et dis « ffff » puis « vvvv » : avec v, ça vibre ! Pareil pour b, d, z, j et g.",
      "Pain ou bain, ce n'est pas le même mot : un seul son change tout le sens.",
    ],
  },
};
