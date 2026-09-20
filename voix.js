// Voix — lit un mot à voix haute. Deux moteurs :
//  - serveur Python + Piper (Linux) : /api/tts renvoie un .wav ;
//  - sinon speechSynthesis du navigateur (voix Apple sur Mac / iPhone / iPad, Google sur Android).
// Voix.dire(mot) renvoie une promesse résolue à la fin de la lecture (ou au bout de 4 s max).
const Voix = {
  server: false, on: true, _voice: null, _audio: null,
  async init(key) {
    try { this.on = localStorage.getItem(key + ".voix") !== "0"; } catch {}
    this._key = key;
    if (typeof Store !== "undefined" && Store.mode === "server") {
      try { this.server = !!(await Store.info()).tts; } catch {}
    }
    if ("speechSynthesis" in window) {
      const pick = () => { this._voice = this._best(speechSynthesis.getVoices()); };
      pick(); speechSynthesis.addEventListener?.("voiceschanged", pick);
    }
  },
  toggle(v) { this.on = v; try { localStorage.setItem(this._key + ".voix", v ? "1" : "0"); } catch {} },
  // Un moteur est-il disponible ? (indispensable pour la dictée)
  dispo() { return this.server || ("speechSynthesis" in window); },
  _best(voices) {
    const fr = voices.filter(v => /^fr[-_]/i.test(v.lang));
    if (!fr.length) return null;
    // Préférences : voix Apple de qualité, puis fr-FR, puis locale, puis n'importe quelle voix française.
    const names = ["amélie", "amelie", "audrey", "aurélie", "aurelie", "thomas", "marie", "daniel", "google français"];
    const score = v => {
      const n = v.name.toLowerCase();
      let s = 0;
      const i = names.findIndex(x => n.includes(x)); if (i >= 0) s += 100 - i;
      if (/enhanced|premium|améliorée/.test(n)) s += 20;
      if (/compact|eloquence|espeak/.test(n)) s -= 50;
      if (/^fr[-_]fr/i.test(v.lang)) s += 10;
      if (v.localService) s += 5;
      return s;
    };
    return fr.sort((a, b) => score(b) - score(a))[0];
  },
  // À appeler dans un clic/tap : iOS n'autorise le son qu'après une interaction.
  unlock() {
    if (this.server) { const a = new Audio(); a.play?.().catch(() => {}); }
    else if ("speechSynthesis" in window) { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(""); u.volume = 0; speechSynthesis.speak(u); }
  },
  // Pré-génère les sons côté serveur (Piper) pour éviter toute latence pendant la session.
  prep(mots) { if (this.server) fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mots }) }).catch(() => {}); },
  stop() {
    if (this._audio) { this._audio.pause(); this._audio = null; }
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  },
  dire(mot) {
    this.stop();
    return new Promise(resolve => {
      let done = false; const fin = () => { if (!done) { done = true; resolve(); } };
      setTimeout(fin, 4000);
      if (this.server) {
        const a = new Audio("/api/tts?q=" + encodeURIComponent(mot)); this._audio = a;
        a.onended = fin; a.onerror = fin; a.play().catch(fin);
      } else if ("speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(mot);
        u.lang = "fr-FR"; u.rate = 0.85; if (this._voice) u.voice = this._voice;
        u.onend = fin; u.onerror = fin;
        speechSynthesis.speak(u);
      } else fin();
    });
  },
};
