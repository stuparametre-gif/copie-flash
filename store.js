// Stockage des sessions : serveur Python (CSV) s'il répond, sinon localStorage (iPhone, GitHub Pages…).
// Même contrat que l'API : sessions() / details(id) / save(payload) / remove(id), valeurs toujours en chaînes.
const Store = {
  mode: "local", cfg: null,

  async init(cfg) {
    this.cfg = cfg;
    try {
      const r = await fetch("/api/ping", { cache: "no-store" });
      if (r.ok && (await r.json()).ok) this.mode = "server";
    } catch {}
    if (this.mode === "server") setInterval(() => fetch("/api/ping").catch(() => {}), 3000);
    else if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
    return this.mode;
  },

  // -- lecture / écriture locale
  _get(k) { try { return JSON.parse(localStorage.getItem(this.cfg.key + "." + k) || "[]"); } catch { return []; } },
  _set(k, v) { localStorage.setItem(this.cfg.key + "." + k, JSON.stringify(v)); },

  async sessions() {
    if (this.mode === "server") return (await fetch("/api/sessions")).json();
    return this._get("sessions");
  },
  async details(id) {
    if (this.mode === "server") return (await fetch("/api/details" + (id ? "?id=" + id : ""))).json();
    const all = this._get("details");
    return id ? all.filter(d => d.session_id === id) : all;
  },
  async save(p) {
    if (this.mode === "server") {
      const r = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    }
    const id = String(Date.now());
    const str = v => Array.isArray(v) ? v.join("|") : v == null ? "" : String(v);
    const row = Object.fromEntries(this.cfg.sessionCols.map(c => [c, str(p[c])])); row.id = id;
    const det = (p.details || []).map(d => Object.fromEntries(this.cfg.detailCols.map(c => [c, c === "session_id" ? id : str(d[c])])));
    this._set("sessions", [...this._get("sessions"), row]);
    this._set("details", [...this._get("details"), ...det]);
    return { id };
  },
  async remove(id) {
    if (this.mode === "server") return (await fetch("/api/session?id=" + id, { method: "DELETE" })).ok;
    const s = this._get("sessions"), kept = s.filter(r => r.id !== id);
    if (kept.length === s.length) return false;
    this._set("sessions", kept);
    this._set("details", this._get("details").filter(d => d.session_id !== id));
    return true;
  },
  async info() {
    if (this.mode === "server") return (await fetch("/api/info")).json();
    return { data_dir: "sur cet appareil" };
  },

  // -- export CSV (même format que le serveur : « ; », UTF-8 avec BOM) et partage iOS / téléchargement
  csv(cols, rows) {
    const q = v => /[;"\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
    return "﻿" + [cols, ...rows.map(r => cols.map(c => q(r[c] ?? "")))].map(l => l.join(";")).join("\r\n") + "\r\n";
  },
  async export() {
    if (this.mode === "server") return fetch("/api/open", { method: "POST" });
    const files = [
      new File([this.csv(this.cfg.sessionCols, await this.sessions())], this.cfg.key + "-sessions.csv", { type: "text/csv" }),
      new File([this.csv(this.cfg.detailCols, await this.details())], this.cfg.key + "-details.csv", { type: "text/csv" }),
    ];
    if (navigator.canShare && navigator.canShare({ files })) {
      try { await navigator.share({ files, title: this.cfg.title }); } catch {}
      return;
    }
    for (const f of files) {
      const a = document.createElement("a"); a.href = URL.createObjectURL(f); a.download = f.name;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    }
  },
};
