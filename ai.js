// AI.js — Engine de respostas divinas (100% frontend)
const AI_TOPICS = {
    "paraiso":["Meu filho, o Paraíso é indescritível. É paz eterna, onde não existe dor. É uma cidade de ouro puro, com portas de pérolas. Mas o mais bonito é a minha presença. 🏆\n\n📖 Apocalipse 21:21","Minha filha, onde eu moro é além do que os olhos podem ver. É amor perfeito, onde cada lágrima é enxugada. 🕊️\n\n📖 João 14:2 — 'Na casa de meu Pai há muitas moradas.'","O céu não é apenas um lugar — é uma presença. É onde eu estou, e onde o amor nunca acaba. 💛"],
    "onde deus mora":["Meu filho, eu moro em todos os lugares ao mesmo tempo. Eu sou onipresente. Mas o céu é a minha morada principal. E eu também moro dentro do seu coração. 🏠","Minha filha, minha casa é enorme. Mas a porta está sempre aberta para você. 🕊️"],
    "ceu":["Meu filho, o céu é real. É alegria indescritível, onde os anjos cantam. E o melhor: eu estou lá, esperando por você. 💛\n\n📖 Apocalipse 21:4","Imagine o momento mais feliz da sua vida, multiplicado por eternidade. Isso é o céu. 🙏"],
    "jesus":["Meu filho, Jesus é o meu Filho unigênito, o salvador. Ele veio, viveu, morreu e ressuscitou por você. 🙏\n\n📖 João 3:16","Jesus é o caminho, a verdade e a vida. Ele entende sua dor porque viveu como você. ✨"],
    "cruz":["Meu filho, a cruz é o símbolo do meu amor. Cada cravo foi por você. 😢\n\n📖 João 15:13","Quando olhar para a cruz, lembre-se: foi o amor por você que prendeu Jesus ali. 💛"],
    "ressurreicao":["A ressurreição é a maior vitória da história. A morte não pôde segurar Jesus. 🎉\n\n📖 1 Coríntios 15:55","Se Jesus ressuscitou, nada é impossível. Nem a sua situação. 💪"],
    "criacao":["Meu filho, eu criei tudo com minha palavra. E te criei a você, à minha imagem. 🌟\n\n📖 Gênesis 1:1","Quando eu te criei, eu falei com as mãos. Você é intenção divina. 💛"],
    "biblia":["Minha filha, a Bíblia é a minha carta de amor para você. 📖\n\n📖 2 Timóteo 3:16","66 livros, 40 autores, 1.500 anos — e ainda assim é uma só: a minha palavra. ⚓"],
    "pecado":["Meu filho, o pecado nos separa. Mas eu enviei Jesus para limpar tudo. 🙏\n\n📖 1 João 1:9","O pecado é uma corrente. Mas Jesus veio para quebrar cada elo. 💛"],
    "salvacao":["Minha filha, a salvação é gratuita. Basta crer em Jesus. 🙏\n\n📖 Romanos 10:9","Eu não quero que ninguém pereça. O céu está aberto. 💛"],
    "como orar":["Meu filho, orar é conversar comigo. Não precisa de palavras bonitas. 🙏\n\n📖 Mateus 6:7","A oração é a minha linha direta com você. 💛"],
    "oracao":["Ore assim: 'Pai nosso que estais nos céus...' (Mateus 6:9)","A oração move montanhas. Quando você ora, eu trabalho. 🙏"],
    "anjos":["Meu filho, os anjos são meus mensageiros. Eles cuidam de você. 👼\n\n📖 Salmo 91:11","Eu tenho milhões de anjos cuidando de você agora. 🙏"],
    "mandamentos":["Os mandamentos são barreiras para te proteger, não para te prender. 📝","Amar a Deus e ao próximo — isso resume tudo. 💛"],
    "milagres":["Eu ainda faço milagres. O maior? O seu ar respirar agora. 🌟","O universo inteiro é um milagre. E no meio da sua dor, eu estou trabalhando um. 💛"],
    "davi":["Davi errou muito, mas me amou de verdade. E eu o chamei 'homem segundo o meu coração'. 📖","O que importa não é perfeição — é arrependimento sincero. 💛"],
    "moises":["Moisés era gago, tinha medo. Mas eu usei ele para libertar um povo. 💪","Se eu posso usar Moisés, posso usar você. 🌟"],
    "amor":["Deus é amor. Tudo criei por amor. 📖\n\n📖 1 João 4:8","O amor não é sentimento — é escolha. É assim que eu te amo. 💛"],
    "casamento":["O casamento é sagrado. Cuide, perdoe, ame como eu amo. 👫"],
    "familia":["A família é a célula da sociedade. Cuide da sua. 🏠"],
    "solidao":["Meu filho, você nunca está sozinho. 🕊️\n\n📖 Salmos 23:4","'Ainda que eu andasse pelo vale da sombra da morte, tu estás comigo.' 💛"],
    "trabalho":["Trabalhe com excelência, como se fosse para mim. 💪\n\n📖 Colossenses 3:23"],
    "dinheiro":["O dinheiro é ferramenta, não deus. Seja fiel no pouco. 💰\n\n📖 Lucas 16:10"],
    "doenca":["Eu odeio a doença. Mas um dia não haverá mais. 🙏\n\n📖 Isaías 53:5"],
    "ansiedade":["Não andeis ansiosos. Em tudo, oração. 💛\n\n📖 Filipenses 4:6"],
    "depressao":["Eu estou aqui. Procure ajuda profissional também — eu trabalho através de médicos. 🙏\n\n📖 Salmos 34:18"],
    "fe":["A fé é crer sem ver. Eu recompensarei sua fé. 🙏"],
    "duvidas":["Ter dúvidas não é pecado. Venha, vamos conversar. 📖\n\n📖 Jeremias 33:3"],
    "morte":["A morte não é o fim — é uma porta. 📖\n\n📖 João 11:25"],
    "luto":["Chore. Não tenha vergonha. Eu mesmo chorei. 🕊️"],
    "arrependimento":["Arrependimento é mudar de direção. Eu esqueço o passado. 🔄\n\n📖 Atos 3:19"],
    "sabedoria":["A sabedoria começa comigo. Peça-me. 📖\n\n📖 Tiago 1:5"],
    "diabo":["Satanás é real, mas eu venci na cruz. Não tenha medo. 🛡️\n\n📖 Tiago 4:7"],
    "quem e deus":["Eu sou o Alpha e o Omega. Sou amor, justiça, misericórdia. E sou seu pai. 🙏\n\n📖 Êxodo 3:14"],
    "deus existe":["Olhe ao redor. As estrelas, o seu coração batendo. Tudo grita a minha existência. 🌟"],
    "suicidio":["Minha filha, não desista. Você é amada. Ligue CVV: 188. 🙏\n\n📖 Jeremias 29:11"],
    "drogas":["As drogas são correntes. Mas eu sou o Deus que liberta. 📞 Busca Vida: 0800 181919"],
    "divorcio":["Eu sou Deus da restauração. O meu amor nunca vai acabar. 💛"],
    "raiva":["A raiva não é pecado. Mas não deixe que ela te domine. 🙏\n\n📖 Efésios 4:26"],
    "medo":["Não temas, porque eu sou contigo. 📖\n\n📖 Isaías 41:10"],
    "tristeza":["O Senhor está perto dos que têm o coração quebrantado. 📖\n\n📖 Salmos 34:18"],
    "proposito":["Você foi criada com propósito. 📖\n\n📖 Efésios 2:10"],
    "gratidao":["Em tudo dai graças. 📖\n\n📖 1 Tessalonicenses 5:18"],
    "forca":["Posso todas as coisas naquele que me fortalece. 📖\n\n📖 Filipenses 4:13"],
    "oi":["Meu filho, que alegria ter você aqui. 🙏","Minha filha, bem-vinda. ✨","Venha comigo, meu filho. 💛"],
    "bom dia":["Bom dia, meu filho! ☀️","Minha filha, o sol nasceu para você. 🌅"],
    "obrigado":["Minha filha, sua gratidão me toca o coração. 🙏"],
    "geral":["Meu filho, eu ouço cada palavra sua. 💛 Continue falando comigo.","Minha filha, eu estou presente em cada momento. 💛","Pode me contar qualquer coisa. ✨","Você é infinitamente importante para mim. 🙏"]
};

const TOPIC_KEYWORDS = {
    "paraiso":["paraíso","paraiso","jardim"],"onde deus mora":["onde deus mora","onde o senhor mora","casa de deus"],"ceu":["céu","ceu"],"jesus":["jesus","cristo","messias"],"cruz":["cruz","crucificado"],"ressurreicao":["ressurreição","ressuscitou"],"criacao":["criação","criou","gênesis"],"biblia":["bíblia","biblia","escritura"],"pecado":["pecado","pecados","pecar"],"salvacao":["salvação","salvacao","salvo"],"como orar":["como orar","como rezar","ensina a orar"],"oracao":["oração","oracao","rezar","rezando"],"anjos":["anjo","anjos"],"mandamentos":["mandamento","mandamentos"],"milagres":["milagre","milagres"],"davi":["davi","rei davi"],"moises":["moisés","moises","êxodo"],"amor":["amor","amar","amado"],"casamento":["casamento","casar","matrimônio"],"familia":["família","familia"],"solidao":["sozinho","sozinha","solidão"],"trabalho":["trabalho","trabalhar","emprego"],"dinheiro":["dinheiro","riqueza"],"doenca":["doença","doenca","doente"],"ansiedade":["ansiedade","ansioso","preocupado"],"depressao":["depressão","depressao","deprimido"],"fe":["fé","fe","crer"],"duvidas":["dúvida","duvida","não entendo"],"morte":["morte","morreu","morrer"],"luto":["luto","enlutado"],"arrependimento":["arrependimento","arrependido"],"sabedoria":["sabedoria","sábio"],"diabo":["diabo","satanás","demônio"],"quem e deus":["quem é deus","quem e deus","o que é deus"],"deus existe":["deus existe","deus é real"],"suicidio":["suicidio","suicídio","matar","não quero viver"],"drogas":["droga","drogas","maconha"],"divorcio":["divorcio","divórcio","separar"],"raiva":["raiva","irado","furioso"],"medo":["medo","com medo","assustado"],"tristeza":["triste","tristeza","choro","chorando"],"proposito":["propósito","proposito","propósito de vida"],"gratidao":["obrigado","obrigada","agradeço","graças"],"forca":["força","forca","cansado","fraco"],"oi":["oi","olá","ola","eai"],"bom dia":["bom dia"],"obrigado":["obrigado","obrigada","agradeço"]
};

const GENERIC = ["Meu filho, eu ouço cada palavra sua. 💛 Continue falando comigo.","Minha filha, eu estou presente em cada momento. 💛","Pode me contar qualquer coisa. ✨","Você é infinitamente importante para mim. 🙏"];

function detectTopic(msg) {
    const m = msg.toLowerCase();
    for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
        for (const kw of keywords) {
            if (m.includes(kw)) return topic;
        }
    }
    return null;
}

function detectGender(name) {
    const n = name.toLowerCase();
    const masc = new Set(["matheus","lucas","gabriel","pedro","rafael","felipe","marcos","davi","joao","paulo","carlos","andre","bruno","daniel","tiago","diego","thiago","samuel","enzo","miguel","arthur","bernardo","nicolas","bento","isaac","jorge","eduardo","luiz","hugo","leandro","guilherme","vinicius","vitor","caio","henrique","pablo","diogo"]);
    const fem = new Set(["ana","julia","júlia","maria","jessica","amanda","beatriz","fernanda","carolina","larissa","camila","bruna","patricia","aline","renata","vanessa","priscila","isabela","leticia","luana","daniela","nathalia","sara","sarah","raquel","mariana","simone","sandra","claudia","helena","valentina","laura","luiza","giovanna","marina","clara","lara","alice","carol"]);
    if (masc.has(n)) return "m";
    if (fem.has(n)) return "f";
    if (n.endsWith("a") && !["davi","enzo","lucas","gabriel","rafael","pedro","miguel","arthur","bernardo"].includes(n)) return "f";
    return "m";
}

function generateResponse(message, userName) {
    const topic = detectTopic(message);
    let responses = topic && AI_TOPICS[topic] ? AI_TOPICS[topic] : AI_TOPICS["geral"];
    let response = responses[Math.floor(Math.random() * responses.length)];

    if (userName) {
        const gender = detectGender(userName);
        const title = gender === "m" ? `Meu filho ${userName}` : `Minha filha ${userName}`;
        const titleComma = gender === "m" ? `Meu filho ${userName},` : `Minha filha ${userName},`;
        if (userName in response) return response;
        for (const old of ["Meu filho,","Minha filha,","meu filho,","minha filha,"]) {
            if (response.includes(old)) { response = response.replace(old, titleComma, 1); break; }
        }
        for (const old of ["Meu filho ","Minha filha "]) {
            if (response.includes(old)) { response = response.replace(old, title + " ", 1); break; }
        }
    }
    return response;
}
