// Fiches « Les sons » en portugais du Brésil : chargé seulement quand la langue est « pt » (voir i18n.js).
// Ne change que les explications ; les mots, les sons, les images et les listes de mots restent ceux de sons.js.
// Par fiche : intro, quand (un texte par graphie, null = inchangé), astuces ; titre/court si la fiche en a un à traduire.
(() => {
  ["Um som, várias maneiras de escrevê-lo", "Duas letras para um só som", "As armadilhas"].forEach((t, i) => { SONS_SECTIONS[i].titre = t; });
  const PT = {
    o: {
      intro: "A gente ouve [o]… mas dá para escrever de 4 jeitos.",
      quand: [
        "A mais frequente: 3 vezes em 4, é o.",
        "No começo ou no meio da palavra: autruche, jaune, chaud, sauter.",
        "Quase sempre no fim da palavra: bateau, chapeau, gâteau, oiseau.",
        "Rara: aprende-se palavra por palavra. Fantôme, hôpital, drôle, tôt, bientôt, plutôt.",
      ],
      astuces: [
        "EAU é a palavra « água » em francês (l'eau): ela fica no fim da palavra. Bateau, cadeau, gâteau.",
        "As palavras em -eau costumam ter um primo em -el: beau → belle, nouveau → nouvelle, chapeau → chapelier.",
      ],
    },
    an: {
      intro: "A gente ouve [an]: escreve-se an, en, am ou em.",
      quand: [
        "Tão frequente quanto en: é preciso aprender as palavras. Maman, orange, gant.",
        "No começo de uma palavra, quase sempre é en: enfant, encore, entrer, enlever.",
        "Antes de m, b, p: lampe, jambe, chambre, tambour.",
        "Antes de m, b, p: tempête, temps, novembre, emporter.",
      ],
      astuces: [
        "Para escolher entre an e en, pense numa palavra da mesma família: ela se escreve igual. Dent → dentiste, enfant → enfance, chant → chanter.",
        "Muitas palavras terminam em -ment: moment, vêtement, doucement.",
      ],
    },
    in: {
      intro: "A gente ouve [in]: é o som que tem mais jeitos de escrever!",
      quand: [
        "A mais frequente: lapin, jardin, sapin, matin.",
        "Antes de m, b, p: grimper, timbre, simple, impossible.",
        "Muitas vezes no fim da palavra: pain, main, train, demain, copain.",
        "Rara: peinture, ceinture, plein, frein, e os verbos peindre, éteindre.",
        "Logo depois de um i, escreve-se en: chien, bien, rien, magicien.",
        "Rara: un, lundi, brun, parfum, chacun, aucun. Muita gente pronuncia como in.",
      ],
      sous: { ien: "depois de i" },
      astuces: [
        "Para ain e ein, escute o feminino ou uma palavra da família: dá para ouvir o a ou o e. Certain → certaine, plein → pleine, main → manuel.",
        "ain, ein e un são raros: se você não tem certeza, in é a melhor escolha.",
      ],
    },
    "è": {
      intro: "A gente ouve [è]: è, ê, ai, ei, e, et… Há muitos jeitos!",
      quand: [
        "Muito frequente, em qualquer lugar da palavra: fraise, lait, maison, balai.",
        "Sem acento antes de duas consoantes (belle, terre, merci) ou antes de uma consoante que se ouve no fim (mer, sel, bec).",
        "Quando a sílaba seguinte termina em e: mè-re, frè-re, zè-bre, chè-vre, flè-che.",
        "Para decorar: fête, tête, forêt, fenêtre, bête, rêve.",
        "No fim da palavra: poulet, jouet, bracelet, robinet.",
        "Rara, muitas vezes antes de n ou g: neige, reine, baleine, seize, treize.",
      ],
      astuces: [
        "Duas consoantes depois do e fazem o trabalho do acento: belle, terre, lunettes. Não precisa de è! (Exceto antes de br, cr, tr, vr, bl…: zèbre, chèvre, règle.)",
        "Para -et, pense no feminino: violet → violette, muet → muette, poulet → poulette.",
        "O acento circunflexo costuma substituir um s de antigamente: forêt → forestier, fête → festin, bête → bestiole.",
      ],
    },
    "é": {
      intro: "A gente ouve [é]: na maioria das vezes é, mas também er ou ez no fim das palavras.",
      quand: [
        "A mais frequente, em qualquer lugar da palavra: étoile, école, bébé, café.",
        "No fim de muitos substantivos (panier, cahier, escalier) e de verbos como manger, chanter.",
        "Rara: nez, chez, assez. E depois de vous: vous chantez.",
      ],
      astuces: [
        "As profissões e as árvores frutíferas costumam terminar em -er: boulanger, pompier, pommier, cerisier.",
        "Verbo em -er ou em -é? Troque por prendre / pris. « Je vais manger » → « je vais prendre »: -er. « J'ai mangé » → « j'ai pris »: -é.",
        "E nas palavrinhas: et, les, des, mes, tes, ses, ces, j'ai.",
      ],
    },
    s: {
      intro: "A gente ouve [s]: s, ss, c, ç ou t. Muitas vezes é a letra ao lado que decide.",
      quand: [
        "No começo da palavra ou ao lado de uma consoante: serpent, sac, veste, danse.",
        "Entre duas vogais, precisa de dois s: poisson, tasse, trousse, dessin.",
        "Antes de e, i, y, a letra c faz [s]: citron, cerise, glace, ici.",
        "Antes de a, o, u, põe-se uma cedilha: glaçon, garçon, leçon, reçu.",
        "Nas palavras em -tion: addition, récréation, attention.",
      ],
      astuces: [
        "Um só s entre duas vogais faz [z]! Poison ☠️ não é poisson 🐟. Para fazer [s], dobra-se: ss.",
        "A cedilha é um rabinho embaixo do c: ça, ço, çu leem-se [sa], [so], [su].",
      ],
    },
    z: {
      intro: "A gente ouve [z]: escreve-se z… ou s, quando está entre duas vogais.",
      quand: [
        "Um s sozinho entre duas vogais canta [z]: rose, maison, cerise, oiseau.",
        "Mais rara: zèbre, zéro, lézard, douze, onze, seize.",
      ],
      astuces: [
        "Maison, cousin, rose: o s está entre duas vogais, então ele começa a cantar [z].",
        "Em deuxième, sixième, dixième, o x também se diz [z].",
      ],
    },
    k: {
      intro: "A gente ouve [k]: c, qu, k… Olhe a letra que vem depois!",
      quand: [
        "Antes de a, o, u ou de uma consoante: canard, cochon, cube, crabe.",
        "Antes de e e i, onde o c faria [s]: requin, masque, qui, que. E também: quatre, quoi.",
        "Rara, em palavras vindas de outros países: kangourou, koala, kiwi, ski.",
        "Muito rara: orchestre, chorale, écho.",
        "Sozinho, só no fim da palavra: coq, cinq.",
      ],
      astuces: [
        "O q nunca sai sem o seu u: qu. (Exceto coq e cinq.)",
        "c antes de e ou i faz [s] (cerise). Para manter o [k] antes de e ou i, escreve-se qu: requin, masque.",
      ],
    },
    g: {
      intro: "A gente ouve [g]: g, ou gu antes de e e i.",
      quand: [
        "Antes de a, o, u ou de uma consoante: gare, gomme, légume, grenouille.",
        "Antes de e, i, y, acrescenta-se um u: guitare, guêpe, bague, langue.",
      ],
      astuces: [
        "Sem o u, g antes de e ou i faria [j] (girafe). O u não se pronuncia: ele protege o som [g].",
      ],
    },
    j: {
      intro: "A gente ouve [j], como em jus: j, g antes de e e i, ou ge antes de a e o.",
      quand: [
        "Antes de todas as vogais: jus, jardin, jouet, jeudi.",
        "Antes de e, i, y, a letra g faz [j]: girafe, genou, gilet, magique.",
        "Antes de a, o, u, acrescenta-se um e para manter o [j]: pigeon, nageoire, il mangeait.",
      ],
      astuces: [
        "A letra g tem duas vozes: forte antes de a, o, u (gare, gomme), suave antes de e, i, y (girafe, genou).",
        "Pigeon: sem o e, leríamos « pigon »!",
      ],
    },
    f: {
      intro: "A gente ouve [f]: quase sempre f, às vezes ph.",
      quand: [
        "Quase sempre: fleur, feu, café, girafe. Às vezes dobrado: effacer, coiffeur.",
        "Em palavras vindas do grego: phoque, dauphin, éléphant, photo, téléphone.",
      ],
      astuces: [
        "O ph permanece em toda a família da palavra: téléphone, téléphoner; photo, photographe.",
      ],
    },
    ill: {
      intro: "A gente ouve [ill], como em papillon: ill, il ou y.",
      quand: [
        "No meio ou no fim, com um e: papillon, fille, abeille, feuille.",
        "No fim de palavras masculinas, depois de a, e, eu, ou: soleil, travail, réveil, fauteuil.",
        "Entre duas vogais, y vale dois i: crayon (crai-ion), noyau, voyage.",
      ],
      astuces: [
        "Un soleil, un réveil, un travail: masculino → -il. Une abeille, une bouteille, une feuille: feminino → -ille.",
      ],
    },
    ou: {
      intro: "o e u juntos fazem um só som: [ou].",
      quand: [
        "Quase sempre: hibou, loup, poule, soupe.",
        "Com acento em algumas palavras: goûter, août, e où.",
      ],
      astuces: [
        "Où, com acento, pergunta sobre um lugar: où est le loup ? Sem acento, ou quer dizer « ou então »: chat ou chien.",
      ],
    },
    oi: {
      intro: "o e i juntos fazem o som [oi].",
      quand: [
        "Sempre oi: roi, étoile, poisson, voiture.",
        "Com um n, ouve-se [oin]: poing, coin, loin, point.",
        "oy = oi + i: voyage diz-se « voi-iage ». Também: noyau, royal.",
      ],
    },
    on: {
      intro: "o e n juntos fazem o som [on]. Antes de m, b, p, o n vira m.",
      quand: [
        "Quase sempre: ballon, mouton, maison, pont.",
        "Antes de m, b, p: trompette, pompier, ombre, nombre.",
      ],
      astuces: [
        "Exceção famosa: bonbon 🍬 mantém o n antes do b!",
        "Se uma vogal ou um 2º n vem depois, não se ouve mais [on]: bonne, téléphone.",
      ],
    },
    eu: {
      intro: "e e u juntos fazem o som [eu]: feu, fleur.",
      quand: [
        "Quase sempre: feu, bleu, fleur, cheveu.",
        "Algumas palavras para decorar, com o e o e colados: cœur, sœur, œuf, bœuf, nœud, vœu.",
      ],
      astuces: [
        "As palavras em -eur não têm e no fim: fleur, peur, chaleur… exceto heure, demeure e beurre.",
      ],
    },
    ch: {
      intro: "c e h juntos fazem o som [ch].",
      quand: ["Sempre ch: chat, chien, vache, cheval."],
      astuces: [
        "Em algumas palavras eruditas, ch faz [k]: orchestre, chorale, écho.",
      ],
    },
    gn: {
      intro: "g e n juntos fazem o som [gn].",
      quand: ["Sempre gn: champignon, montagne, araignée, ligne."],
      astuces: [
        "Escute bem: em montagne, [gn] sai de uma vez só. Em panier, ouve-se n e depois i.",
      ],
    },
    mbp: {
      titre: "A regra de m, b, p", court: "regra m b p",
      intro: "Antes de m, b ou p, o n se transforma em m: am, em, im, om.",
      quand: [null, null, null, null, "A exceção para decorar: bonbon (e bonbonne)."],
      astuces: [
        "m, b, p: para dizê-los, seus lábios se tocam! Diga « mmm », « b », « p » no espelho. O n que vem logo antes também vira m.",
      ],
    },
    muettes: {
      titre: "As letras mudas", court: "letras mudas",
      intro: "No fim de muitas palavras, há uma letra que não se ouve. Para encontrá-la, procure uma palavra da mesma família ou o feminino: lá, ela se ouve!",
      astuces: [
        "Coloque a palavra no feminino: petit → petite, grand → grande, froid → froide.",
        "Às vezes a família não basta: é preciso decorar a palavra (loup, temps, corps).",
      ],
    },
    proches: {
      titre: "Os sons que se parecem",
      intro: "Estes sons vêm em pares: a boca faz o mesmo gesto, mas um faz a garganta vibrar e o outro não.",
      astuces: [
        "Ponha a mão na garganta e diga « ffff » e depois « vvvv »: com o v, vibra! Igual para b, d, z, j e g.",
        "Pain ou bain não é a mesma palavra: um único som muda todo o sentido.",
      ],
    },
  };
  for (const [f, x] of Object.entries(PT)) {
    const F = SONS[f];
    for (const k of ["titre", "court", "intro", "astuces"]) if (x[k]) F[k] = x[k];
    (x.quand || []).forEach((q, i) => { if (q) F.graphies[i].quand = q; });
    for (const [id, s] of Object.entries(x.sous || {})) F.graphies.find(g => g.id === id).sous = s;
  }
  // Si une fiche est ajoutée à sons.js sans traduction, elle reste en français plutôt que de casser.
})();
