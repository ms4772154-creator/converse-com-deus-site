// App.js — Converse com Deus (100% Frontend)
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const state={userName:'',conversations:{},currentConv:null,theme:localStorage.getItem('theme')||'light'};

// Particles
const canvas=$('#particles'),ctx=canvas.getContext('2d');
let particles=[];
function initParticles(){canvas.width=innerWidth;canvas.height=innerHeight;particles=[];for(let i=0;i<40;i++)particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,s:Math.random()*2+.5,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,o:Math.random()*.4+.2})}
function drawParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle=state.theme==='dark'?`rgba(196,169,125,${p.o})`:`rgba(62,44,28,${p.o*.3})`;ctx.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0});requestAnimationFrame(drawParticles)}
addEventListener('resize',initParticles);initParticles();drawParticles();

// Splash
setTimeout(()=>$('#splash').remove(),3500);

// Verse of Day
const VERSES=[{t:"O Senhor é meu pastor; nada me faltará.",r:"Salmo 23:1"},{t:"Confia no Senhor de todo o teu coração.",r:"Provérbios 3:5"},{t:"Não temas, porque eu sou contigo.",r:"Isaías 41:10"},{t:"Porque Deus amou o mundo.",r:"João 3:16"},{t:"Posso todas as coisas naquele que me fortalece.",r:"Filipenses 4:13"},{t:"A paz vos deixo, a minha paz vos dou.",r:"João 14:27"},{t:"Deus é o nosso refúgio e fortaleza.",r:"Salmos 46:1"},{t:"Clama a mim, e responder-te-ei.",r:"Jeremias 33:3"},{t:"Deus é amor.",r:"1 João 4:8"},{t:"Busque primeiro o reino de Deus.",r:"Mateus 6:33"}];
const d=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
const v=VERSES[d%VERSES.length];
$('#verse-day').innerHTML=`"${v.t}"<span class="ref">— ${v.r}</span>`;

// Theme
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);$('#theme-btn').textContent=t==='dark'?'☀️':'🌙';localStorage.setItem('theme',t);state.theme=t}
$('#theme-btn').onclick=()=>applyTheme(state.theme==='dark'?'light':'dark');
applyTheme(state.theme);

// Welcome
$('#name-input').oninput=()=>$('#start-btn').disabled=!$('#name-input').value.trim();
$('#name-input').onkeydown=e=>{if(e.key==='Enter'&&!$('#start-btn').disabled)startChat()};
$('#start-btn').onclick=startChat;

function startChat(){
    state.userName=$('#name-input').value.trim();if(!state.userName)return;
    $('#welcome').classList.add('hidden');$('#app').classList.remove('hidden');
    $('#user-name-display').textContent=state.userName;
    showWelcomeMsg();loadConversations();
}

function showWelcomeMsg(){
    messages().innerHTML=`<div class="welcome-msg"><div style="font-size:48px">🙏</div><h3>Olá, ${state.userName}</h3><p>Estou aqui para ouvir você.</p><div class="chips"><button class="chip" data-m="Quem é Deus?">Quem é Deus?</button><button class="chip" data-m="Preciso de paz">Preciso de paz</button><button class="chip" data-m="Como é no paraíso?">O paraíso</button><button class="chip" data-m="Como orar?">Como orar</button><button class="chip" data-m="Estou com medo">Tenho medo</button></div></div>`;
    $$('.chip').forEach(c=>c.onclick=()=>{$('#msg-input').value=c.dataset.m;sendMsg()});
}

// Messages
const messages=()=>$('#messages');
$('#msg-input').oninput=()=>{$('#msg-input').style.height='auto';$('#msg-input').style.height=Math.min($('#msg-input').scrollHeight,100)+'px';$('#send-btn').disabled=!$('#msg-input').value.trim()};
$('#msg-input').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg()}};
$('#send-btn').onclick=sendMsg;

function sendMsg(){
    const text=$('#msg-input').value.trim();if(!text)return;
    const wm=messages().querySelector('.welcome-msg');if(wm)wm.remove();
    addMsg('user',text);$('#msg-input').value='';$('#msg-input').style.height='auto';$('#send-btn').disabled=true;

    // Typing indicator
    const typing=document.createElement('div');typing.className='typing';typing.innerHTML='<span></span><span></span><span></span>';messages().appendChild(typing);scrollBottom();

    setTimeout(()=>{
        typing.remove();
        const response=generateResponse(text,state.userName);
        addMsg('assistant',response);
        saveConv(text,response);
    },800+Math.random()*1200);
}

function addMsg(role,content){
    const div=document.createElement('div');div.className=`msg ${role}`;
    const av=role==='assistant'?'✨':state.userName.charAt(0).toUpperCase();
    div.innerHTML=`<div class="msg-row"><div class="msg-avatar">${av}</div><div class="msg-bubble">${fmt(content)}</div></div>`;
    messages().appendChild(div);scrollBottom();
}

function fmt(t){return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}
function scrollBottom(){setTimeout(()=>messages().scrollTop=messages().scrollHeight,50)}

// Conversations (localStorage)
function saveConv(msg,response){
    if(!state.currentConv){state.currentConv=Date.now().toString();state.conversations[state.currentConv]={title:msg.slice(0,50),messages:[]}}
    state.conversations[state.currentConv].messages.push({role:'user',content:msg},{role:'assistant',content:response});
    localStorage.setItem('convs',JSON.stringify(state.conversations));
    renderConvList();
}
function loadConversations(){
    try{state.conversations=JSON.parse(localStorage.getItem('convs')||'{}')}catch(e){state.conversations={}}
    renderConvList();
}
function renderConvList(){
    const list=$('#chat-list');list.innerHTML='';
    Object.entries(state.conversations).reverse().forEach(([id,c])=>{
        const div=document.createElement('div');div.className='item';div.textContent=c.title;
        div.onclick=()=>loadConv(id);list.appendChild(div);
    });
}
function loadConv(id){
    state.currentConv=id;messages().innerHTML='';
    state.conversations[id].messages.forEach(m=>addMsg(m.role,m.content));
    closeSidebar();
}

$('#new-chat').onclick=()=>{state.currentConv=null;messages().innerHTML='';showWelcomeMsg();renderConvList();closeSidebar()};

// Sidebar
$('#menu-btn').onclick=$('#sidebar');
function closeSidebar(){$('#sidebar').classList.remove('open')}
$('#menu-btn').onclick=()=>$('#sidebar').classList.toggle('open');

// Tabs
$$('.nav').forEach(n=>n.onclick=()=>{
    $$('.nav').forEach(x=>x.classList.remove('active'));n.classList.add('active');
    const tab=n.dataset.tab;
    $('#chat-list').classList.toggle('hidden',tab!=='chat');
    $('#quiz-panel').classList.toggle('hidden',tab!=='quiz');
    $('#journal-panel').classList.toggle('hidden',tab!=='journal');
    $('#mood-panel').classList.toggle('hidden',tab!=='mood');
    if(tab==='quiz')renderQuiz();if(tab==='journal')renderJournal();if(tab==='mood')renderMood();
});

// Quiz
const QUIZ=[
    {q:"Quem construiu a arca?",o:["Moisés","Noé","Abraão","Davi"],a:1},
    {q:"Quantos mandamentos?",o:["5","7","10","12"],a:2},
    {q:"Quem matou Golias?",o:["Pedro","Paulo","Davi","Jonas"],a:2},
    {q:"Onde Jesus nasceu?",o:["Jerusalém","Nazaré","Belém","Roma"],a:2},
    {q:"Quem traiu Jesus?",o:["Pedro","João","Judas","Tomé"],a:2},
    {q:"Quem foi engolido por peixe?",o:["Noé","Jonas","Davi","Moisés"],a:1},
    {q:"Quem foi o primeiro homem?",o:["Abraão","Noé","Adão","Moisés"],a:2},
    {q:"Jesus ressuscitou em...?",o:["1 dia","2 dias","3 dias","7 dias"],a:2},
];
let qi=0,qs=0;
function renderQuiz(){
    if(qi>=QUIZ.length){$('#quiz-panel').innerHTML=`<div class="quiz-score">🎉 ${qs}/${QUIZ.length}<br><br><button class="panel-btn" onclick="qi=0;qs=0;renderQuiz()">Jogar Novamente</button></div>`;return}
    const q=QUIZ[qi];
    $('#quiz-panel').innerHTML=`<div class="panel-title">❓ Quiz Bíblico</div><div class="quiz-q">${qi+1}. ${q.q}</div><div class="quiz-opts">${q.o.map((o,i)=>`<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}</div>`;
    $$('.quiz-opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i===q.a){b.classList.add('correct');qs++}else{b.classList.add('wrong');$$('.quiz-opt')[q.a].classList.add('correct')}$$('.quiz-opt').forEach(x=>x.style.pointerEvents='none');setTimeout(()=>{qi++;renderQuiz()},1000)});
}

// Journal
function renderJournal(){
    const j=JSON.parse(localStorage.getItem('journal')||'[]');
    let html='<div class="panel-title">📓 Diário de Orações</div>';
    j.slice(-10).reverse().forEach(x=>{html+=`<div class="journal-item">${x.text}<br><small>${x.date}</small></div>`});
    html+=`<button class="panel-btn" onclick="addJournal()">+ Nova Oração</button>`;
    $('#journal-panel').innerHTML=html;
}
function addJournal(){
    const text=prompt('Escreva sua oração:');
    if(text){const j=JSON.parse(localStorage.getItem('journal')||'[]');j.push({text,date:new Date().toLocaleDateString('pt-BR')});localStorage.setItem('journal',JSON.stringify(j));renderJournal()}
}

// Mood
const MOODS={5:'😄',4:'🙂',3:'😐',2:'😔',1:'😢'};
function renderMood(){
    const m=JSON.parse(localStorage.getItem('mood')||'[]');
    let html='<div class="panel-title">😊 Como você está?</div><div class="mood-opts">';
    for(let i=5;i>=1;i--)html+=`<button class="mood-btn" data-m="${i}">${MOODS[i]}</button>`;
    html+='</div><div class="mood-history">';
    m.slice(-7).forEach(x=>{html+=`<div class="mood-day">${MOODS[x.level]}</div>`});
    html+='</div>';$('#mood-panel').innerHTML=html;
    $$('.mood-btn').forEach(b=>b.onclick=()=>{$$('.mood-btn').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');const m2=JSON.parse(localStorage.getItem('mood')||'[]');m2.push({date:new Date().toISOString().slice(0,10),level:+b.dataset.m});localStorage.setItem('mood',JSON.stringify(m2));renderMood()});
}

// Prayer
const PRAYERS=[
    {t:"Pai celestial, obrigado por estar aqui comigo.",r:"Filipenses 4:6-7"},
    {t:"Senhor, eu te entrego tudo.",r:"1 Pedro 5:7"},
    {t:"Deus, fortalece-me hoje.",r:"Salmos 32:8"},
    {t:"Pai, obrigado pelo amor que nunca falha.",r:"1 João 4:19"},
];
$('#prayer-btn').onclick=()=>{const p=PRAYERS[Math.floor(Math.random()*PRAYERS.length)];$('#prayer-text').textContent=p.t;$('#prayer-verse').textContent=`📖 ${p.r}`;$('#prayer-overlay').classList.remove('hidden')};
$('#prayer-close').onclick=()=>$('#prayer-overlay').classList.add('hidden');
$('#prayer-overlay').onclick=e=>{if(e.target.id==='prayer-overlay')$('#prayer-overlay').classList.add('hidden')};

// Voice
let recognition=null,isRecording=false;
if(window.SpeechRecognition||window.webkitSpeechRecognition){
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    recognition=new SR();recognition.lang='pt-BR';recognition.continuous=true;recognition.interimResults=true;
    recognition.onstart=()=>{isRecording=true;$('#voice-btn').classList.add('recording');$('#voice-btn').textContent='⏹️';$('#msg-input').placeholder='🎤 Escutando...';$('#msg-input').focus()};
    recognition.onresult=e=>{let t='';for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;$('#msg-input').value=t;$('#send-btn').disabled=!t.trim()};
    recognition.onend=()=>{isRecording=false;$('#voice-btn').classList.remove('recording');$('#voice-btn').textContent='🎙️';$('#msg-input').placeholder='Escreva sua mensagem...';if($('#msg-input').value.trim())setTimeout(sendMsg,300)};
    recognition.onerror=()=>{isRecording=false;$('#voice-btn').classList.remove('recording');$('#voice-btn').textContent='🎙️'};
}
$('#voice-btn').onclick=()=>{if(!recognition){alert('Use Chrome ou Edge para voz.');return}isRecording?recognition.stop():recognition.start()};
