#!/usr/bin/env python3
"""Copie Flash — entraînement à la copie de mots (copie cachée / copie flash).

Lance un petit serveur local (aucune dépendance) et ouvre l'interface dans une
fenêtre Chromium. Les statistiques sont écrites dans data/sessions.csv et
data/details.csv (séparateur « ; », ouvrables dans LibreOffice / Excel).
"""
import csv, glob, hashlib, json, os, shutil, socket, subprocess, sys, threading, time, webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
SESSIONS = os.path.join(DATA, "sessions.csv")
DETAILS = os.path.join(DATA, "details.csv")
PORT = 8765
URL = f"http://127.0.0.1:{PORT}/"

SESSION_COLS = ["id", "date", "heure", "mode", "niveau", "nb_mots", "duree_s", "ecriture_s",
                "lettres", "lettres_par_min", "revoirs", "fautes", "mots", "mots_faux"]
DETAIL_COLS = ["session_id", "position", "mot", "lettres", "duree_s", "revoirs", "faute"]

lock = threading.Lock()
last_ping = [None]  # None tant que la page ne s'est jamais connectée

# ---- Voix (Linux) : Piper, synthèse neuronale locale, si installé. ----
# Sur Mac / iPhone la page utilise les voix du système (speechSynthesis) ; ici Chromium n'en a pas,
# donc le serveur fabrique les .wav avec Piper (tools/install_voix_linux.sh) et les garde dans data/tts/.
TTS_DIR = os.path.join(DATA, "tts")
tts_lock = threading.Lock()


def find_piper():
    exe = shutil.which("piper") or shutil.which("piper-tts")
    if not exe:
        return None
    dirs = [os.environ.get("PIPER_VOICE", ""), os.path.expanduser("~/.local/share/piper"),
            os.path.join(HERE, "tools", "voix"), "/usr/share/piper-voices"]
    models = []
    for d in dirs:
        if d and d.endswith(".onnx") and os.path.exists(d):
            models.append(d)
        elif d and os.path.isdir(d):
            models += sorted(glob.glob(os.path.join(d, "**", "*.onnx"), recursive=True))
    models = [m for m in models if os.path.exists(m + ".json")]
    fr = [m for m in models if "fr_" in os.path.basename(m)] or models
    return (exe, fr[0]) if fr else None


PIPER = find_piper() if sys.platform.startswith("linux") else None


def tts_path(mot):
    return os.path.join(TTS_DIR, hashlib.sha1(mot.encode()).hexdigest()[:16] + ".wav")


def tts_make(mots):
    """Génère (une seule fois) les .wav manquants pour une liste de mots, en un seul lancement de Piper."""
    if not PIPER:
        return False
    todo = [m for m in dict.fromkeys(mots) if m.strip() and not os.path.exists(tts_path(m))]
    if not todo:
        return True
    os.makedirs(TTS_DIR, exist_ok=True)
    lines = "".join(json.dumps({"text": m + " .", "output_file": tts_path(m)}, ensure_ascii=False) + "\n" for m in todo)
    with tts_lock:
        subprocess.run([PIPER[0], "--model", PIPER[1], "--json-input", "--sentence_silence", "0.1"],
                       input=lines.encode(), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
    return all(os.path.exists(tts_path(m)) for m in todo)


def read_csv(path):
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))


def append_csv(path, cols, rows):
    new = not os.path.exists(path)
    with open(path, "a", encoding="utf-8-sig" if new else "utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, delimiter=";")
        if new:
            w.writeheader()
        w.writerows(rows)


def write_csv(path, cols, rows):
    with open(path, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, delimiter=";")
        w.writeheader()
        w.writerows(rows)


def delete_session(sid):
    """Retire une session (et son détail) des deux CSV. Renvoie True si trouvée."""
    sessions = read_csv(SESSIONS)
    kept = [r for r in sessions if r["id"] != sid]
    if len(kept) == len(sessions):
        return False
    write_csv(SESSIONS, SESSION_COLS, kept)
    write_csv(DETAILS, DETAIL_COLS, [r for r in read_csv(DETAILS) if r["session_id"] != sid])
    return True


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=HERE, **k)

    def log_message(self, *a):  # silence
        pass

    def send_json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        u = urlparse(self.path)
        if u.path == "/api/ping":
            last_ping[0] = time.time()
            return self.send_json({"ok": True})
        if u.path == "/api/info":
            return self.send_json({"data_dir": DATA, "tts": bool(PIPER)})
        if u.path == "/api/tts":
            mot = parse_qs(u.query).get("q", [""])[0]
            path = tts_path(mot)
            if not os.path.exists(path) and not tts_make([mot]):
                return self.send_json({"error": "tts"}, 404)
            with open(path, "rb") as f:
                body = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return self.wfile.write(body)
        if u.path == "/api/sessions":
            with lock:
                return self.send_json(read_csv(SESSIONS))
        if u.path == "/api/details":
            sid = parse_qs(u.query).get("id", [""])[0]
            with lock:
                return self.send_json([r for r in read_csv(DETAILS) if r["session_id"] == sid])
        if u.path.startswith("/api/"):
            return self.send_json({"error": "not found"}, 404)
        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_DELETE(self):
        u = urlparse(self.path)
        if u.path == "/api/session":
            sid = parse_qs(u.query).get("id", [""])[0]
            with lock:
                found = delete_session(sid)
            return self.send_json({"ok": found}, 200 if found else 404)
        return self.send_json({"error": "not found"}, 404)

    def do_POST(self):
        u = urlparse(self.path)
        if u.path == "/api/open":
            opener = shutil.which("open") if sys.platform == "darwin" else shutil.which("xdg-open")
            if opener:
                subprocess.Popen([opener, DATA], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return self.send_json({"ok": True})
        if u.path == "/api/tts":
            n = int(self.headers.get("Content-Length", 0))
            p = json.loads(self.rfile.read(n))
            return self.send_json({"ok": tts_make(p.get("mots", []))})
        if u.path == "/api/session":
            n = int(self.headers.get("Content-Length", 0))
            p = json.loads(self.rfile.read(n))
            with lock:
                sid = str(int(time.time() * 1000))
                row = {c: p.get(c, "") for c in SESSION_COLS}
                row["id"] = sid
                row["mots"] = "|".join(p.get("mots", []))
                row["mots_faux"] = "|".join(p.get("mots_faux", []))
                append_csv(SESSIONS, SESSION_COLS, [row])
                append_csv(DETAILS, DETAIL_COLS,
                           [dict(session_id=sid, **{c: d.get(c, "") for c in DETAIL_COLS if c != "session_id"})
                            for d in p.get("details", [])])
            return self.send_json({"id": sid})
        return self.send_json({"error": "not found"}, 404)


def port_busy():
    with socket.socket() as s:
        return s.connect_ex(("127.0.0.1", PORT)) == 0


def open_window():
    launcher = shutil.which("omarchy-launch-webapp")
    if launcher:
        subprocess.Popen([launcher, URL], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return
    if sys.platform == "darwin":
        for app in ("Google Chrome", "Chromium", "Brave Browser"):
            if os.path.isdir(f"/Applications/{app}.app"):
                subprocess.Popen(["open", "-na", app, "--args", f"--app={URL}"],
                                 stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return
        webbrowser.open(URL)
        return
    for b in ("chromium", "google-chrome", "brave"):
        exe = shutil.which(b)
        if exe:
            subprocess.Popen([exe, f"--app={URL}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return
    webbrowser.open(URL)


def main():
    os.makedirs(DATA, exist_ok=True)
    headless = "--no-browser" in sys.argv
    if port_busy():
        print("Copie Flash tourne déjà, ouverture de la fenêtre.")
        if not headless:
            open_window()
        return
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    print(f"Copie Flash : {URL}  (données : {DATA})")
    if sys.platform.startswith("linux"):
        print("Voix : " + (f"Piper, {os.path.basename(PIPER[1])}" if PIPER else "aucune (voir tools/install_voix_linux.sh)"))
    if not headless:
        open_window()
    # S'arrête tout seul ~2 min après la fermeture de la fenêtre (plus de « ping »).
    # (Pas moins : en arrière-plan, Safari et Chrome ne laissent la page « pinger » qu'une fois par minute.)
    started = time.time()
    try:
        while True:
            time.sleep(2)
            if headless:
                continue
            lp = last_ping[0]
            if (lp is None and time.time() - started > 60) or (lp is not None and time.time() - lp > 120):
                break
    except KeyboardInterrupt:
        pass
    srv.shutdown()


if __name__ == "__main__":
    main()
