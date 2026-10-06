// Langue de l'interface : français (par défaut) ou portugais du Brésil, pour des enfants qui apprennent le français.
// Seuls l'interface, les fiches « Les sons » (sons_pt.js) et les définitions (definitions_pt.js) changent ;
// les mots à écrire, la voix et le fichier CSV restent en français.
// Choix mémorisé dans localStorage ; ?lang=pt dans l'adresse le fixe ; sinon on suit la langue de l'appareil.
const LANG = (() => {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "fr" || q === "pt") localStorage.setItem("copieflash.lang", q);
    const s = localStorage.getItem("copieflash.lang");
    if (s === "fr" || s === "pt") return s;
  } catch {}
  return /^pt/i.test(navigator.language || "") ? "pt" : "fr";
})();
document.documentElement.lang = LANG === "pt" ? "pt-BR" : "fr";

// Clé → [français, portugais]. Une fonction sert aux textes à trous.
const TXT = {
  // Accueil
  choisis: ["Choisis un jeu.", "Escolha um jogo."], jeux: ["Jeux", "Jogos"],
  l_mode: ["Mode", "Modo"], l_saisie: ["Réponse", "Resposta"], l_voix: ["Voix", "Voz"], l_niveau: ["Niveau", "Nível"],
  l_mots: ["Mots", "Palavras"], l_nb: ["Nombre de mots", "Número de palavras"],
  l_temps: ["Temps", "Tempo"], l_verbes: ["Verbes", "Verbos"],
  // Conjugaison : temps, groupes, page « Les verbes »
  temps_present: ["présent", "presente"], temps_imparfait: ["imparfait", "imperfeito"],
  temps_futur: ["futur", "futuro"], temps_passecompose: ["passé composé", "passé composé"],
  gr_g1: ["1er groupe", "1º grupo"], gr_g2: ["2e groupe", "2º grupo"], gr_g3: ["3e groupe", "3º grupo"],
  toVerbes: ["Les verbes", "Os verbos"],
  verbes_h: ["Les verbes", "Os verbos"],
  verbes_sub: ["La terminaison en couleur : c'est elle qui change à chaque personne.", "A terminação em cor: é ela que muda em cada pessoa."],
  pieges: ["Les pièges", "As armadilhas"],
  pickTemps: ["Choisis au moins un temps.", "Escolha pelo menos um tempo."],
  pickGroupe: ["Choisis au moins un groupe de verbes.", "Escolha pelo menos um grupo de verbos."],
  noVerb: ["Aucun verbe pour ce choix à ce niveau.", "Nenhum verbo para esta escolha neste nível."],
  rev_conj: ["Voici la bonne réponse, terminaison en couleur. Compare avec ton cahier et touche un verbe s'il a une faute.", "Aqui está a resposta certa, com a terminação em cor. Compare com o caderno e toque num verbo se ele tiver erro."],
  m_cachee: ["Copie cachée", "Cópia escondida"],
  m_cachee_s: ["Le mot disparaît après 3 s. Tu peux le revoir si besoin.", "A palavra desaparece depois de 3 s. Você pode vê-la de novo se precisar."],
  m_flash: ["Copie flash", "Cópia flash"],
  m_flash_s: ["Le mot disparaît après 3 s, impossible de le revoir.", "A palavra desaparece depois de 3 s e não dá para vê-la de novo."],
  m_dictee: ["Dictée", "Ditado"],
  m_dictee_s: ["Le mot est dit deux fois, tu l'écris. Tu peux le réécouter.", "A palavra é dita duas vezes e você a escreve. Dá para ouvir de novo."],
  m_conj: ["Conjugaison", "Conjugação"],
  m_conj_s: ["Un verbe, un pronom, un temps : tu écris la forme conjuguée.", "Um verbo, um pronome, um tempo: você escreve a forma conjugada."],
  s_cahier: ["Sur le cahier", "No caderno"],
  s_cahier_s: ["Elle écrit à la main, puis valide.", "Escreve-se à mão e depois confirma-se."],
  s_clavier: ["Au clavier", "No teclado"],
  s_clavier_s: ["Mode voyage, sans papier : elle tape le mot, la faute est vérifiée toute seule.", "Modo viagem, sem papel: digita-se a palavra e o erro é verificado automaticamente."],
  v_on: ["Le mot est lu", "A palavra é lida"], v_off: ["Sans voix", "Sem voz"],
  w_hasard: ["Au hasard", "Aleatórias"], w_sons: ["Avec des sons", "Com sons"],
  go: ["C'est parti !", "Vamos lá!"], toSons: ["Les sons", "Os sons"], toStats: ["Statistiques", "Estatísticas"],
  // Les sons
  home: ["Accueil", "Início"], sons_h: ["Les sons", "Os sons"],
  sons_sub: ["Choisis un son pour voir comment on l'écrit. Touche une image pour entendre le mot.", "Escolha um som para ver como ele se escreve. Toque numa imagem para ouvir a palavra."],
  allSons: ["Tous les sons", "Todos os sons"],
  le_son: ["le son", "o som"], Le_son: ["Le son", "O som"],
  astuces: ["Astuces", "Dicas"],
  autres: [n => `D'autres mots · ${n}`, n => `Outras palavras · ${n}`],
  encore: ["D'autres", "Outras"],
  dicteeSon: ["Faire une dictée avec ce son", "Fazer um ditado com este som"],
  f_top: ["★ la plus fréquente", "★ a mais frequente"], f_moins: ["moins fréquente", "menos frequente"],
  f_rare: ["rare", "rara"], f_exception: ["exception", "exceção"],
  // Session
  stop: ["Arrêter", "Parar"],
  revoir: ["Revoir", "Ver de novo"], suivant: ["Suivant", "Próxima"], reecouter: ["Réécouter", "Ouvir de novo"],
  pos: [(i, n, niv) => `Mot ${i} / ${n} · ${niv}`, (i, n, niv) => `Palavra ${i} / ${n} · ${niv}`],
  pen_dictee: ["Prends ton stylo et écoute bien…", "Pegue a caneta e escute bem…"], pen: ["Prends ton stylo…", "Pegue a caneta…"],
  look: ["Regarde bien…", "Olhe bem…"], listen: ["Écoute…", "Escute…"],
  again_ecoute: ["réécouter le mot", "ouvir a palavra de novo"], again_revoir: ["revoir le mot", "ver a palavra de novo"],
  k_enter: ["Entrée", "Enter"], k_space: ["Espace", "Espaço"],
  valider: ["valider", "confirmar"], fini: ["quand tu as fini d'écrire", "quando terminar de escrever"], motSuivant: ["mot suivant", "próxima palavra"],
  // Correction
  bravo: ["Bravo, c'est fini !", "Parabéns, terminou!"],
  rev_sub: ["Compare avec ton cahier. Touche un mot s'il a une faute.", "Compare com o caderno. Toque numa palavra se ela tiver erro."],
  rev_dictee: ["Voici les mots dictés. Compare avec ton cahier et touche un mot s'il a une faute.", "Aqui estão as palavras ditadas. Compare com o caderno e toque numa palavra se ela tiver erro."],
  rev_clavier: ["Les fautes sont cochées toutes seules. Touche un mot pour changer.", "Os erros são marcados automaticamente. Toque numa palavra para mudar."],
  save: ["Enregistrer", "Salvar"],
  typed: [r => `tu as tapé : ${r || "(rien)"}`, r => `você digitou: ${r || "(nada)"}`],
  lettresAbr: ["l.", "let."],
  noFault: ["Aucune faute cochée", "Nenhum erro marcado"],
  nFaults: [f => `${f} faute${f > 1 ? "s" : ""} cochée${f > 1 ? "s" : ""}`, f => `${f} erro${f > 1 ? "s" : ""} marcado${f > 1 ? "s" : ""}`],
  // Résumé
  again: ["Encore une !", "Mais uma!"],
  b1: ["Tu es une championne !", "Você é demais!"], b2: ["Quelle écriture !", "Que caligrafia!"],
  b3: ["Incroyable, continue comme ça !", "Incrível, continue assim!"], b4: ["Ton stylo va trop vite !", "Sua caneta está voando!"],
  b5: ["Wouah, bravo !", "Uau, parabéns!"],
  recordZero: ["Record ET zéro faute ! ", "Recorde E zero erros! "],
  avantApres: [(a, b) => `Avant : ${a} lettres/min · Maintenant : ${b}`, (a, b) => `Antes: ${a} letras/min · Agora: ${b}`],
  recordSpeed: ["Nouveau record de vitesse !", "Novo recorde de velocidade!"],
  first0: ["Première session, et zéro faute !", "Primeira sessão e zero erros!"],
  first0_s: ["La prochaine fois, on essaiera d'aller encore plus vite.", "Da próxima vez, vamos tentar ir ainda mais rápido."],
  first: ["Première session à ce niveau !", "Primeira sessão neste nível!"],
  first_s: ["La prochaine fois, on essaiera de faire mieux.", "Da próxima vez, vamos tentar fazer ainda melhor."],
  zero: ["Zéro faute, ", "Zero erros, "],
  best: [b => `Ton record de vitesse ici : ${b} lettres/min`, b => `Seu recorde de velocidade aqui: ${b} letras/min`],
  nice: ["Bien joué, continue !", "Muito bem, continue!"],
  ref: [(n, a, b, c, d) => `repère ${n} : ${a}–${b} lettres/min, moyen-haut ≈ ${c} · ici : ${d}`, (n, a, b, c, d) => `referência ${n}: ${a}–${b} letras/min, médio-alto ≈ ${c} · aqui: ${d}`],
  c_time: ["Temps d'écriture", "Tempo de escrita"], c_speed: ["Vitesse", "Velocidade"], c_letters: ["Lettres", "Letras"],
  c_faults: ["Fautes", "Erros"], c_revoirs: ["Revoirs", "Revisões"], c_reecoutes: ["Réécoutes", "Repetições"],
  // Statistiques
  stats_h: ["Statistiques", "Estatísticas"],
  stats_sub: ["Toutes les sessions. Clique sur une ligne pour voir le détail mot par mot.\n      Fichiers :", "Todas as sessões. Clique numa linha para ver o detalhe palavra por palavra.\n      Arquivos:"],
  onDevice: ["sur cet appareil", "neste aparelho"],
  openFolder: ["Ouvrir le dossier", "Abrir a pasta"], exportCsv: ["Exporter les CSV", "Exportar os CSV"],
  th: [["Date", "Mode", "Niveau", "Mots", "Écriture", "Total", "Lettres", "L/min", "Revoirs", "Fautes"], ["Data", "Modo", "Nível", "Palavras", "Escrita", "Total", "Letras", "L/min", "Revisões", "Erros"]],
  nSessions: [n => `${n} session${n > 1 ? "s" : ""} enregistrée${n > 1 ? "s" : ""}`, n => `${n} sessão${n > 1 ? "s" : ""} registrada${n > 1 ? "s" : ""}`],
  noSession: ["Aucune session pour l'instant.", "Nenhuma sessão por enquanto."],
  delTitle: ["Supprimer cette session", "Excluir esta sessão"],
  delConfirm: [(d, m, n) => `Supprimer la session du ${d} (${m}, ${n}) ?`, (d, m, n) => `Excluir a sessão de ${d} (${m}, ${n})?`],
  delFail: ["Suppression impossible.", "Não foi possível excluir."],
  // Messages
  noVoice: ["Pas de voix disponible sur cet appareil : la dictée a besoin d'une voix (voir le README).", "Não há voz disponível neste aparelho: o ditado precisa de uma voz (veja o README)."],
  pickSon: ["Choisis au moins un son (ou « Au hasard »).", "Escolha pelo menos um som (ou « Aleatórias »)."],
  stopConfirm: ["Arrêter la session ?", "Parar a sessão?"],
  saveFail: ["Impossible d'enregistrer : ", "Não foi possível salvar: "],
};

function t(k, ...a) {
  const e = TXT[k]; if (!e) return k;
  const v = e[LANG === "pt" ? 1 : 0];
  return typeof v === "function" ? v(...a) : v;
}

// Le mode est enregistré en français dans le CSV (les records se comparent dessus) ; on ne traduit que l'affichage.
function modeLabel(m) {
  if (LANG !== "pt") return m;
  return m.replace("Copie cachée", t("m_cachee")).replace("Copie flash", t("m_flash")).replace("Dictée", t("m_dictee")).replace("(clavier)", "(teclado)");
}

// Textes fixes de la page : le HTML contient le français, data-i18n="clé" le remplace par la langue choisie.
function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(e => { e.innerHTML = t(e.dataset.i18n); });
  document.querySelectorAll("#lang button").forEach(b => b.classList.toggle("sel", b.dataset.l === LANG));
}
function setLang(l) {
  try { localStorage.setItem("copieflash.lang", l); } catch {}
  location.reload(); // recharge : definitions_pt.js et sons_pt.js ne sont chargés qu'en portugais
}
