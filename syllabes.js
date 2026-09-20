// Découpage d'un mot en syllabes écrites (règles scolaires CP-CE1, approximatives mais régulières) :
//  - une syllabe par groupe de voyelles ; les voyelles qui se suivent restent ensemble (eau, ai, ou, oi…)
//    sauf après é/è/ê ou devant ï/ë (po-è-te, ré-u-nion, na-ïf) ;
//  - une consonne entre deux voyelles part avec la suivante (ma-chi-ne) ;
//  - deux consonnes se séparent (pom-me, mon-ta-gne… non : gn reste ensemble), sauf les groupes
//    insécables : consonne + l ou r (ta-ble, a-bri), ch, ph, th, gn, qu, gu ;
//  - le y entre deux voyelles fait consonne (vo-ya-ge).
// Les tirets et apostrophes coupent le mot.
const Syllabes = (() => {
  const V = "aeiouyàâäéèêëîïôöùûüœ";
  const isV = c => V.includes(c);
  const digraph = (a, b) => (b === "h" && "cpts".includes(a)) || (a === "g" && b === "n");
  const inseparable = (a, b) => ("lr".includes(b) && "bcdfgkptv".includes(a)) || (b === "h" && "cpts".includes(a)) || (a === "g" && b === "n") || (a === "q" && b === "u") || (a === "g" && b === "u");

  function couper(mot) {
    const w = mot.toLowerCase();
    const n = w.length;
    // Classe de chaque lettre : v (voyelle) / c (consonne). y entre deux voyelles = consonne.
    const cls = [];
    for (let i = 0; i < n; i++) {
      const c = w[i];
      if (c === "y" && i > 0 && i < n - 1 && isV(w[i-1]) && isV(w[i+1])) cls.push("c");
      else if (c === "q" && w[i+1] === "u") { cls.push("c"); cls.push("c"); i++; }   // "qu" = une consonne
      else if (c === "g" && w[i+1] === "u" && isV(w[i+2] || "")) { cls.push("c"); cls.push("c"); i++; } // "gu" + voyelle
      else cls.push(isV(c) ? "v" : "c");
    }
    // Noyaux vocaliques : indices de début et fin de chaque groupe de voyelles.
    const nuclei = [];
    for (let i = 0; i < n; i++) {
      if (cls[i] !== "v") continue;
      let j = i;
      while (j + 1 < n && cls[j+1] === "v" && !("éèê".includes(w[j]) && w[j+1] !== "e") && !"éèêïë".includes(w[j+1])) j++;
      nuclei.push([i, j]); i = j;
    }
    if (nuclei.length < 2) return [mot];
    // Coupures entre deux noyaux, selon les consonnes qui les séparent.
    const cuts = [];
    for (let k = 0; k + 1 < nuclei.length; k++) {
      const a = nuclei[k][1] + 1, b = nuclei[k+1][0]; // consonnes w[a..b-1]
      const m = b - a;
      let cut;
      if (m === 0) cut = b;                                     // hiatus : po-è-te
      else if (m === 1) cut = a;                                // ma-chi-ne
      else if (inseparable(w[b-2], w[b-1])) cut = b - 2;        // ta-ble, mon-ta-gne, or-ches-tre
      else if (m === 3 && digraph(w[a], w[a+1]) && "lr".includes(w[a+2]) && w[a] !== "g" && !(w[a] === "t" && w[a+2] === "l")) cut = a; // chré-tien
      else if (m >= 3 && digraph(w[a], w[a+1])) cut = a + 2;    // ryth-me
      else cut = a + 1;                                         // pom-me, chan-ter
      // ne jamais couper à l'intérieur d'un "qu"/"gu"
      if (cut > 0 && (w[cut-1] === "q" || (w[cut-1] === "g" && w[cut] === "u"))) cut--;
      cuts.push(cut);
    }
    const out = []; let p = 0;
    for (const c of cuts) { if (c > p) { out.push(mot.slice(p, c)); p = c; } }
    out.push(mot.slice(p));
    return out;
  }

  // Mot complet (tirets/apostrophes conservés, chacun collé à la syllabe précédente).
  function syllabes(mot) {
    const parts = mot.split(/([-'’])/);
    const out = [];
    for (const p of parts) {
      if (!p) continue;
      if (/^[-'’]$/.test(p)) { if (out.length) out[out.length-1] += p; else out.push(p); }
      else out.push(...couper(p));
    }
    return out;
  }

  // HTML : une <span class="syl"> par syllabe (couleurs en CSS, cycle de 4).
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  function html(mot) { return syllabes(mot).map((s, i) => `<span class="syl s${i % 4}">${esc(s)}</span>`).join(""); }

  return { syllabes, html };
})();
if (typeof module !== "undefined") module.exports = Syllabes;
