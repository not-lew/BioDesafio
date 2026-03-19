// ========== CONSTANTS ==========
const PLAYER_COLORS = ['#E63946','#457B9D','#2A9D8F','#E9C46A','#F4A261','#264653'];
const ALL_COLORS = ['#E63946','#457B9D','#2A9D8F','#E9C46A','#F4A261','#264653','#8B5CF6','#EC4899','#14B8A6','#F97316','#6366F1','#84CC16'];
const TILES_PER_ROW = 5;
const CIRCUMFERENCE = 2 * Math.PI * 45;

// ========== CONFIG ==========
let config = { timerSeconds:90, totalTiles:40, maxHints:10, hintOrder:'free', allowPass:true, enabledCardIndices:[] };
// maxHints is always 10, hintOrder always 'free', allowPass always true, all cards always enabled

// ========== STATE ==========
let state = { players:[], currentPlayerIndex:0, usedCardIndices:[], gameOver:false, totalRounds:0 };
let currentCard = null, hintsUsed = [], hintsCount = 0;
let timerInterval = null, timeLeft = 0, timerStarted = false;
let pausedView = null;
let turnTimeout = null; // for cancelling auto-advance if any

// ========== AUDIO ==========
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function ensureAudio() { if (!audioCtx) audioCtx = new AudioCtx(); }
function playTone(f,d,t='sine',v=0.15) { try { ensureAudio(); const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type=t; o.frequency.value=f; g.gain.value=v; g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+d); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+d); } catch(e){} }
function sfxClick(){playTone(600,0.08,'sine',0.1)} function sfxHint(){playTone(800,0.12,'triangle',0.1)}
function sfxCorrect(){playTone(523,0.15,'sine',0.15);setTimeout(()=>playTone(659,0.15,'sine',0.15),100);setTimeout(()=>playTone(784,0.25,'sine',0.15),200)}
function sfxWrong(){playTone(300,0.2,'square',0.1);setTimeout(()=>playTone(250,0.3,'square',0.1),150)}
function sfxTick(){playTone(1000,0.03,'sine',0.05)}
function sfxTimeUp(){playTone(400,0.15,'sawtooth',0.12);setTimeout(()=>playTone(350,0.15,'sawtooth',0.12),120);setTimeout(()=>playTone(300,0.3,'sawtooth',0.12),240)}
function sfxVictory(){[523,587,659,698,784,880,988,1047].forEach((f,i)=>setTimeout(()=>playTone(f,0.2,'sine',0.12),i*100))}
function sfxMove(){playTone(440,0.06,'triangle',0.08)}

// ========== CONFIRM MODAL ==========
function showConfirm(title, text, icon, onConfirm) {
  document.getElementById('confirm-icon').textContent = icon || '⚠️';
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-text').textContent = text;
  document.getElementById('confirm-overlay').classList.remove('hidden');
  document.getElementById('confirm-ok').onclick = () => {
    document.getElementById('confirm-overlay').classList.add('hidden');
    if (onConfirm) onConfirm();
  };
  document.getElementById('confirm-cancel').onclick = () => {
    document.getElementById('confirm-overlay').classList.add('hidden');
  };
}

// ========== OVERLAY HELPERS ==========
function pauseGameForOverlay() {
  stopTimer();
  const active = document.querySelector('#screen-game .main-view.active');
  if (!pausedView) pausedView = active ? active.id : null;
}

function resumeGameFromOverlay() {
  if (pausedView === 'view-card' && timerStarted && config.timerSeconds > 0 && timeLeft > 0) {
    timerInterval = setInterval(() => {
      timeLeft--; updateTimerDisplay();
      if (timeLeft <= 10 && timeLeft > 0) sfxTick();
      if (timeLeft <= 0) { clearInterval(timerInterval); timerInterval = null; sfxTimeUp(); onTimerExpired(); }
    }, 1000);
  }
}

// ========== VIEW SYSTEM ==========
function showView(viewId) {
  document.querySelectorAll('#screen-game .main-view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

// ========== SCREEN 1: CONFIG ==========
function setupOptionGroup(id) {
  const c = document.getElementById(id);
  c.addEventListener('click', e => { const b=e.target.closest('.config-opt'); if(!b)return; sfxClick(); c.querySelectorAll('.config-opt').forEach(x=>x.classList.remove('active')); b.classList.add('active'); });
}
['opt-timer','opt-tiles'].forEach(setupOptionGroup);

function getOpt(id) { const a=document.querySelector(`#${id} .config-opt.active`); return a?a.dataset.value:null; }

function buildTopicsGrid() {
  // All cards are always enabled - no selection needed
}

document.getElementById('btn-go-players').addEventListener('click',()=>{
  sfxClick();
  config.timerSeconds=parseInt(getOpt('opt-timer')); config.totalTiles=parseInt(getOpt('opt-tiles'));
  config.maxHints=10; config.hintOrder='free';
  config.allowPass=true; config.enabledCardIndices=CARDS.map((_,i)=>i);
  const s=document.getElementById('config-summary');
  const tl=config.timerSeconds===0?'Sem limite':`${config.timerSeconds}s`;
  s.innerHTML=`<span>⏱️ Tempo: <strong>${tl}</strong></span><span>🎯 Tabuleiro: <strong>${config.totalTiles} casas</strong></span><span>💡 Dicas: <strong>10</strong></span><span>🃏 Temas: <strong>${CARDS.length}</strong></span>`;
  switchScreen('screen-config','screen-players');
  // Focus first empty name input
  setTimeout(()=>{
    const firstEmpty = playerInputsDiv.querySelector('input:not([value])') || playerInputsDiv.querySelector('input');
    if(firstEmpty && !firstEmpty.value) firstEmpty.focus();
  },100);
});

// ========== SCREEN 2: PLAYERS ==========
const playerInputsDiv=document.getElementById('player-inputs');
let activeColorPicker = null; // which picker is open

function getUsedColors(){
  const used = [];
  playerInputsDiv.querySelectorAll('.player-color-picker').forEach(p => used.push(p.dataset.color));
  return used;
}

function showColorPalette(pickerBtn){
  const palette = document.getElementById('color-palette');
  if(activeColorPicker === pickerBtn && !palette.classList.contains('hidden')){
    palette.classList.add('hidden'); activeColorPicker=null; return;
  }
  activeColorPicker = pickerBtn;
  const used = getUsedColors();
  const currentColor = pickerBtn.dataset.color;
  palette.innerHTML = '';
  ALL_COLORS.forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'color-swatch';
    sw.style.background = c;
    if(used.includes(c) && c !== currentColor) sw.classList.add('used');
    sw.addEventListener('click',()=>{
      pickerBtn.dataset.color = c;
      pickerBtn.style.setProperty('--pin-color', c);
      palette.classList.add('hidden');
      activeColorPicker = null;
      sfxClick();
    });
    palette.appendChild(sw);
  });
  palette.classList.remove('hidden');
  // Insert palette after the picker's row
  pickerBtn.closest('.player-input-row').after(palette);
}

// Delegate click on color pickers
playerInputsDiv.addEventListener('click', e => {
  const picker = e.target.closest('.player-color-picker');
  if(picker) showColorPalette(picker);
});

function updatePlayerButtons(){
  const r=playerInputsDiv.querySelectorAll('.player-input-row');
  document.getElementById('btn-remove-player').style.display=r.length>2?'':'none';
  document.getElementById('btn-add-player').style.display=r.length>=6?'none':'';
}

function getNextAvailableColor(){
  const used = getUsedColors();
  return ALL_COLORS.find(c => !used.includes(c)) || ALL_COLORS[0];
}

document.getElementById('btn-add-player').addEventListener('click',()=>{
  sfxClick();
  const r=playerInputsDiv.querySelectorAll('.player-input-row'), i=r.length;
  if(i>=6) return;
  const color = getNextAvailableColor();
  const d=document.createElement('div'); d.className='player-input-row';
  d.innerHTML=`<button class="player-color-picker" data-color="${color}" style="--pin-color:${color}" title="Trocar cor"></button><input type="text" placeholder="Nome do Jogador ${i+1}" maxlength="15">`;
  playerInputsDiv.appendChild(d);
  updatePlayerButtons();
  d.querySelector('input').focus();
});

document.getElementById('btn-remove-player').addEventListener('click',()=>{
  sfxClick();
  const r=playerInputsDiv.querySelectorAll('.player-input-row');
  if(r.length>2) r[r.length-1].remove();
  updatePlayerButtons();
  document.getElementById('color-palette').classList.add('hidden');
});

document.getElementById('btn-back-config').addEventListener('click',()=>{
  sfxClick();
  document.getElementById('color-palette').classList.add('hidden');
  switchScreen('screen-players','screen-config');
});

// Close color palette when clicking outside
document.addEventListener('click', e => {
  if(activeColorPicker && !e.target.closest('.player-color-picker') && !e.target.closest('.color-palette')){
    document.getElementById('color-palette').classList.add('hidden');
    activeColorPicker = null;
  }
});

document.getElementById('btn-start').addEventListener('click',()=>{
  sfxClick();
  state.players=[];
  playerInputsDiv.querySelectorAll('.player-input-row').forEach((row,i)=>{
    const inp = row.querySelector('input');
    const picker = row.querySelector('.player-color-picker');
    const color = picker ? picker.dataset.color : PLAYER_COLORS[i];
    state.players.push({name:inp.value.trim()||`Jogador ${i+1}`,color:color,position:0,score:0,correctAnswers:0,totalAnswers:0});
  });
  state.currentPlayerIndex=0; state.usedCardIndices=[]; state.cardDeck=null; state.gameOver=false; roundNumber=0;
  switchScreen('screen-players','screen-game');
  buildBoard(); renderPlayerPanels(); updateTurnIndicator(); renderPawns();
  setTimeout(()=>showTurnAnnounce(),300);
});

function switchScreen(a,b){
  const from = document.getElementById(a);
  const to = document.getElementById(b);
  from.classList.remove('active');
  to.classList.add('active');
  window.scrollTo(0,0);
}

// ========== BOARD ==========
function buildBoard(){
  const board = document.getElementById('board');
  board.innerHTML = '';
  const total = config.totalTiles;
  const cols = TILES_PER_ROW;
  const rows = Math.ceil((total + 1) / cols);

  for (let r = 0; r < rows; r++) {
    const rd = document.createElement('div');
    rd.className = 'board-row';
    if (r % 2 === 1) rd.classList.add('row-reverse');

    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (i > total) {
        const spacer = document.createElement('div');
        spacer.className = 'tile tile-spacer';
        rd.appendChild(spacer);
        continue;
      }

      const t = document.createElement('div');
      t.className = 'tile';
      t.dataset.index = i;

      if (i === 0) {
        t.classList.add('tile-start');
        t.innerHTML = `<span class="tile-label">INICIO</span>`;
      } else if (i === total) {
        t.classList.add('tile-end');
        t.innerHTML = `<span class="tile-label">FIM</span>`;
      } else {
        t.classList.add('tile-normal', `tile-color-${i % 5}`);
        t.innerHTML = `<span class="tile-number">${i}</span>`;
      }

      const pw = document.createElement('div');
      pw.className = 'tile-pawns';
      t.appendChild(pw);
      rd.appendChild(t);
    }
    board.appendChild(rd);
  }

  renderBoardLegend();
}

function renderBoardLegend(){
  const legend=document.getElementById('board-legend'); legend.innerHTML='';
  state.players.forEach(p=>{
    const item=document.createElement('div'); item.className='board-legend-item';
    item.innerHTML=`<span class="board-legend-pin" style="--pw-color:${p.color}"></span>${p.name} <span class="board-legend-pos">(${p.position})</span>`;
    legend.appendChild(item);
  });
}

function renderPawns(){
  document.querySelectorAll('.tile-pawns').forEach(d=>d.innerHTML='');
  document.querySelectorAll('.tile-occupied').forEach(t=>t.classList.remove('tile-occupied'));
  state.players.forEach((p,i)=>{
    const t=document.querySelector(`.tile[data-index="${Math.min(p.position,config.totalTiles)}"]`);
    if(!t)return;
    t.classList.add('tile-occupied');
    const pw=document.createElement('div'); pw.className='pawn'; pw.id=`pawn-${i}`;
    const head=document.createElement('div'); head.className='pawn-head'; head.style.background=p.color;
    head.textContent=p.name.charAt(0).toUpperCase();
    const spike=document.createElement('div'); spike.className='pawn-spike'; spike.style.borderTopColor=p.color;
    pw.appendChild(head); pw.appendChild(spike);
    t.querySelector('.tile-pawns').appendChild(pw);
  });
  renderBoardLegend();
}
function animatePawnMove(pi,from,to,cb){ if(to<=from){if(cb)cb();return;} let c=from;
  document.querySelectorAll('.tile-highlight').forEach(t=>t.classList.remove('tile-highlight'));
  const iv=setInterval(()=>{ c++; state.players[pi].position=Math.min(c,config.totalTiles); renderPawns(); sfxMove();
    const pw=document.getElementById(`pawn-${pi}`); if(pw){pw.classList.add('pawn-animated');setTimeout(()=>pw.classList.remove('pawn-animated'),400);}
    document.querySelectorAll('.tile-highlight').forEach(t=>t.classList.remove('tile-highlight'));
    const t=document.querySelector(`.tile[data-index="${c}"]`);
    if(t){t.classList.add('tile-highlight');}
    if(c>=to||c>=config.totalTiles){clearInterval(iv);setTimeout(()=>{document.querySelectorAll('.tile-highlight').forEach(t=>t.classList.remove('tile-highlight'));if(cb)cb();},600);}
  },300);
}

// ========== PLAYER PANELS ==========
let roundNumber = 0;

function renderPlayerPanels(){ const c=document.getElementById('player-panels'); c.innerHTML='';
  state.players.forEach((p,i)=>{ const d=document.createElement('div'); d.className='player-panel'; d.id=`panel-${i}`;
    const pct=p.totalAnswers>0?Math.round(p.correctAnswers/p.totalAnswers*100):0;
    const progress=Math.min(100,Math.round(p.position/config.totalTiles*100));
    d.innerHTML=`<div class="player-panel-header"><div class="player-pawn" style="--pw-color:${p.color}"></div><span class="player-panel-name">${p.name}</span></div><div class="player-panel-stats"><span>${p.score} pts</span><span>${p.position}/${config.totalTiles}</span></div><div class="player-progress"><div class="player-progress-bar" style="width:${progress}%;background:${p.color}"></div></div><div class="player-panel-extra">${pct}% acertos (${p.correctAnswers}/${p.totalAnswers})</div>`;
    c.appendChild(d); }); highlightActivePlayer();
  updateBoardMeta();
}
function updatePlayerPanel(i){ const p=state.players[i],d=document.getElementById(`panel-${i}`); if(!d)return;
  const pct=p.totalAnswers>0?Math.round(p.correctAnswers/p.totalAnswers*100):0;
  const progress=Math.min(100,Math.round(p.position/config.totalTiles*100));
  d.querySelector('.player-panel-header').innerHTML=`<div class="player-pawn" style="--pw-color:${p.color}"></div><span class="player-panel-name">${p.name}</span>`;
  d.querySelector('.player-panel-stats').innerHTML=`<span>${p.score} pts</span><span>${Math.min(p.position,config.totalTiles)}/${config.totalTiles}</span>`;
  d.querySelector('.player-progress-bar').style.width=progress+'%';
  d.querySelector('.player-panel-extra').textContent=`${pct}% acertos (${p.correctAnswers}/${p.totalAnswers})`;
  updateBoardMeta();
}
function updateBoardMeta(){
  const lead=state.players.reduce((a,b)=>a.position>b.position?a:b);
  document.getElementById('board-meta').textContent=`${lead.position}/${config.totalTiles}`;
}
function updateRound(){
  roundNumber++;
  const el=document.getElementById('round-number');
  if(el)el.textContent=roundNumber;
}
function highlightActivePlayer(){ document.querySelectorAll('.player-panel').forEach(p=>p.classList.remove('active-player')); const a=document.getElementById(`panel-${state.currentPlayerIndex}`); if(a)a.classList.add('active-player'); }
function updateTurnIndicator(){ document.getElementById('current-player-name').textContent=state.players[state.currentPlayerIndex].name; }

// ========== TURN ANNOUNCE (click to start) ==========
function showTurnAnnounce(){
  if(state.currentPlayerIndex===0) updateRound();
  const p=state.players[state.currentPlayerIndex];
  document.getElementById('turn-announce-pawn').style.background=p.color;
  document.getElementById('turn-announce-name').textContent=p.name;
  showView('view-turn');
}

document.getElementById('btn-start-turn').addEventListener('click',()=>{
  sfxClick();
  startTurn();
});

// ========== TIMER ==========
function startTimer(){
  if(config.timerSeconds===0){document.getElementById('timer-container').classList.add('hidden');return;}
  document.getElementById('timer-container').classList.remove('hidden');
  timeLeft=config.timerSeconds; updateTimerDisplay();
  timerInterval=setInterval(()=>{ timeLeft--; updateTimerDisplay(); if(timeLeft<=10&&timeLeft>0)sfxTick();
    if(timeLeft<=0){clearInterval(timerInterval);timerInterval=null;sfxTimeUp();onTimerExpired();}
  },1000);
}
function stopTimer(){ if(timerInterval){clearInterval(timerInterval);timerInterval=null;} }
function updateTimerDisplay(){ const r=document.getElementById('timer-ring'),t=document.getElementById('timer-text');
  r.style.strokeDasharray=CIRCUMFERENCE; r.style.strokeDashoffset=CIRCUMFERENCE*(1-timeLeft/config.timerSeconds); t.textContent=timeLeft;
  r.classList.remove('timer-warning','timer-danger'); t.classList.remove('timer-warning','timer-danger');
  if(timeLeft<=10){r.classList.add('timer-danger');t.classList.add('timer-danger');}
  else if(timeLeft<=30){r.classList.add('timer-warning');t.classList.add('timer-warning');}
}
function onTimerExpired(){ state.players[state.currentPlayerIndex].totalAnswers++; showResult(false,0,true); }

// ========== CARD / TURN ==========
// Fisher-Yates shuffle
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function getRandomCard(){
  // First call or deck exhausted: build a new shuffled deck
  if(!state.cardDeck || state.cardDeck.length===0){
    // Shuffle enabled cards, avoiding the last few played to prevent repeats across reshuffles
    let pool=[...config.enabledCardIndices];
    const recentCount=Math.min(3,Math.floor(pool.length/3));
    const recent=state.usedCardIndices.slice(-recentCount);
    // Remove recently played from new deck so they appear last
    const fresh=pool.filter(i=>!recent.includes(i));
    const tail=pool.filter(i=>recent.includes(i));
    state.cardDeck=shuffle(fresh).concat(shuffle(tail));
    state.usedCardIndices=[];
  }
  const idx=state.cardDeck.shift();
  state.usedCardIndices.push(idx);
  return CARDS[idx];
}

function startTurn(){
  if(state.gameOver)return;
  currentCard=getRandomCard(); hintsUsed=[]; hintsCount=0; timerStarted=false;
  const p=state.players[state.currentPlayerIndex];
  document.getElementById('card-player-dot').style.background=p.color;
  document.getElementById('card-player-name').textContent=p.name;
  const catEl = document.getElementById('card-category');
  catEl.textContent='???'; catEl.classList.remove('revealed');
  document.getElementById('hints-used-count').textContent='0';
  document.getElementById('max-hints-label').textContent=config.maxHints;
  document.getElementById('possible-points').textContent=calcPoints(0);
  if(config.timerSeconds===0){document.getElementById('timer-container').classList.add('hidden');}
  else{document.getElementById('timer-container').classList.remove('hidden');timeLeft=config.timerSeconds;updateTimerDisplay();document.getElementById('timer-text').textContent='--';}
  document.getElementById('card-instruction').classList.remove('hidden');
  const hg=document.getElementById('hints-buttons'); hg.innerHTML='';
  for(let i=0;i<config.maxHints;i++){ const b=document.createElement('button'); b.className='hint-btn'; b.textContent=i+1;
    b.addEventListener('click',()=>revealHint(i)); hg.appendChild(b); }
  hg.style.gridTemplateColumns='repeat(5,1fr)';
  document.getElementById('hints-history').innerHTML=''; document.getElementById('hints-history').classList.add('hidden');
  document.getElementById('guess-area').classList.add('hidden');
  showView('view-card');
}
function calcPoints(n){ return Math.max(1,config.maxHints+1-Math.max(1,n)); }

// Motivational messages
const MSG_PERFECT=['Genio! 🧠','Incrivel! 🌟','Mestre! 👑','Impressionante! 💎'];
const MSG_GREAT=['Muito bem! 🎯','Excelente! ✨','Otimo! 🔥','Mandou bem! 💪'];
const MSG_GOOD=['Boa! 👏','Acertou! 😄','Isso ai! 👍','Valeu! 🙌'];
const MSG_WRONG=['Na proxima! 💪','Quase la! 😅','Tente de novo! 🎯','Faz parte! 🤷'];

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }


function revealHint(index){
  if(hintsUsed.includes(index))return; sfxHint();
  if(!timerStarted){timerStarted=true;startTimer();document.getElementById('card-instruction').classList.add('hidden');}
  hintsUsed.push(index); hintsCount=hintsUsed.length;
  const btns=document.querySelectorAll('.hint-btn');
  btns.forEach((b,i)=>{b.classList.remove('hint-active');if(hintsUsed.includes(i))b.classList.add('hint-used');});
  btns[index].classList.add('hint-active'); btns[index].classList.remove('hint-used');
  const hd=document.getElementById('hints-history'); hd.classList.remove('hidden');
  const it=document.createElement('div'); it.className='hint-history-item'; it.innerHTML=`<span class="hint-number">#${index+1}</span>${currentCard.hints[index]}`; hd.appendChild(it); hd.scrollTop=hd.scrollHeight;
  document.getElementById('hints-used-count').textContent=hintsCount; document.getElementById('possible-points').textContent=calcPoints(hintsCount);
  document.getElementById('guess-area').classList.remove('hidden'); document.getElementById('guess-input').value=''; document.getElementById('guess-input').focus();
  document.getElementById('btn-next-hint').style.display=hintsCount>=config.maxHints?'none':'';
}

// ========== GUESS ==========
document.getElementById('btn-guess').addEventListener('click',submitGuess);
document.getElementById('guess-input').addEventListener('keydown',e=>{if(e.key==='Enter')submitGuess();});
document.getElementById('btn-next-hint').addEventListener('click',()=>{ sfxClick();
  for(let i=0;i<config.maxHints;i++){if(!hintsUsed.includes(i)){revealHint(i);break;}} });
document.getElementById('btn-pass').addEventListener('click',()=>{ sfxClick(); stopTimer(); state.players[state.currentPlayerIndex].totalAnswers++; revealCategory(); showResult(false,0,false); });

function normalizeText(t){ return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,'').trim().replace(/\s+/g,' '); }
function levenshtein(a,b){ const m=a.length,n=b.length; if(!m)return n; if(!n)return m; const d=Array.from({length:m+1},()=>Array(n+1).fill(0)); for(let i=0;i<=m;i++)d[i][0]=i; for(let j=0;j<=n;j++)d[0][j]=j; for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:1+Math.min(d[i-1][j],d[i][j-1],d[i-1][j-1]); return d[m][n]; }
function fuzzyWord(gw,aw){ if(gw===aw)return true; if(gw.includes(aw)||aw.includes(gw))return true; return levenshtein(gw,aw)<=( aw.length<=3?1:Math.ceil(aw.length*0.35)); }

function checkAnswer(guess,answer){
  const g=normalizeText(guess),a=normalizeText(answer);
  if(g===a)return true;
  if(currentCard&&currentCard.aliases)for(const al of currentCard.aliases){const na=normalizeText(al);if(g===na)return true;if(na.length>=3&&levenshtein(g,na)<=Math.ceil(na.length*0.35))return true;if(g.includes(na)||na.includes(g))return true;}
  if(g.length>=4&&a.includes(g))return true; if(a.length>=4&&g.includes(a))return true;
  if(levenshtein(g,a)<=Math.max(3,Math.ceil(a.length*0.35)))return true;
  const aw=a.split(' ').filter(w=>w.length>=3),gw=g.split(' ').filter(w=>w.length>=3);
  if(!aw.length)return levenshtein(g,a)<=1||g.includes(a)||a.includes(g);
  if(gw.length&&aw.every(w=>gw.some(x=>fuzzyWord(x,w))))return true;
  const mk=aw.reduce((x,y)=>x.length>=y.length?x:y,'');
  if(mk.length>=4){for(const w of gw)if(fuzzyWord(w,mk))return true;if(fuzzyWord(g.replace(/\s/g,''),mk))return true;}
  return false;
}

function revealCategory(){
  if(!currentCard) return;
  const catEl = document.getElementById('card-category');
  catEl.textContent = currentCard.topic;
  catEl.classList.add('revealed');
}

function submitGuess(){ const inp=document.getElementById('guess-input'),guess=inp.value.trim(); if(!guess)return; sfxClick(); stopTimer();
  const p=state.players[state.currentPlayerIndex]; p.totalAnswers++;
  revealCategory();
  if(checkAnswer(guess,currentCard.topic)){p.correctAnswers++;sfxCorrect();showResult(true,calcPoints(hintsCount),false);}
  else{sfxWrong();showResult(false,0,false);}
}

// ========== RESULT ==========
function showResult(correct,points,timedOut){
  const p=state.players[state.currentPlayerIndex];
  const rp=document.getElementById('result-panel-el');
  rp.classList.remove('result-correct','result-wrong');

  const totalMove = correct ? points : 0;

  rp.classList.add(correct?'result-correct':'result-wrong');

  // Icon & title
  if(correct){
    if(hintsCount <= 2) document.getElementById('result-icon').textContent = '🏆';
    else document.getElementById('result-icon').textContent = '✅';

    if(hintsCount <= 2) document.getElementById('result-title').textContent = pickRandom(MSG_PERFECT);
    else if(hintsCount <= 4) document.getElementById('result-title').textContent = pickRandom(MSG_GREAT);
    else document.getElementById('result-title').textContent = pickRandom(MSG_GOOD);
  } else {
    document.getElementById('result-icon').textContent = timedOut ? '⏰' : '❌';
    document.getElementById('result-title').textContent = timedOut ? 'Tempo Esgotado!' : pickRandom(MSG_WRONG);
  }

  const topic = `O tema era: <strong>${currentCard.topic}</strong>`;
  let detailsHtml = '';

  if(correct){
    document.getElementById('result-text').innerHTML = `${p.name} acertou com ${hintsCount} dica${hintsCount>1?'s':''}!<br>${topic}`;
    detailsHtml = `<div class="result-breakdown">`;
    detailsHtml += `<div class="result-row"><span>🎯 Casas</span><strong>+${points} casa${points>1?'s':''}</strong></div>`;
    if(hintsCount <= 2) detailsHtml += `<div class="result-row result-bonus"><span>⚡ Acerto rapido!</span><strong></strong></div>`;
    detailsHtml += `</div>`;
  } else {
    document.getElementById('result-text').innerHTML = `${p.name} ${timedOut?'o tempo acabou':'nao acertou'}.<br>${topic}`;
    detailsHtml = `<div class="result-breakdown"><div class="result-row"><span>Permanece na casa ${p.position}</span><strong>0</strong></div></div>`;
  }

  document.getElementById('result-details').innerHTML = detailsHtml;

  document.getElementById('btn-result-ok').onclick=()=>{
    if(correct && totalMove > 0){
      const old = p.position, nw = Math.min(old + totalMove, config.totalTiles);
      p.score += totalMove;
      showView('view-waiting');
      animatePawnMove(state.currentPlayerIndex, old, nw, ()=>{
        updatePlayerPanel(state.currentPlayerIndex);
        if(p.position >= config.totalTiles){ sfxVictory(); showVictory(state.currentPlayerIndex); return; }
        nextTurn();
      });
    } else {
      updatePlayerPanel(state.currentPlayerIndex);
      nextTurn();
    }
  };
  showView('view-result');
}

// ========== NEXT TURN ==========
function nextTurn(){ state.currentPlayerIndex=(state.currentPlayerIndex+1)%state.players.length; highlightActivePlayer(); updateTurnIndicator(); saveGame(); setTimeout(()=>showTurnAnnounce(),300); }

// ========== VICTORY ==========
function showVictory(wi){ state.gameOver=true; clearSave(); document.getElementById('victory-player').textContent=state.players[wi].name;
  const sorted=[...state.players].sort((a,b)=>b.position!==a.position?b.position-a.position:b.score-a.score);
  const pc=['gold','silver','bronze'];
  document.getElementById('final-scores').innerHTML=sorted.map((p,i)=>{
    const pct=p.totalAnswers>0?Math.round(p.correctAnswers/p.totalAnswers*100):0;
    return`<div class="final-score-row">
      <div class="final-score-pos ${pc[i]||''}">${i+1}°</div>
      <div class="player-pawn" style="--pw-color:${p.color}"></div>
      <span class="final-score-name">${p.name}</span>
      <span class="final-score-stats">${pct}% acertos (${p.correctAnswers}/${p.totalAnswers})</span>
    </div>`;}).join('');
  showView('view-victory');
}
document.getElementById('btn-new-game').addEventListener('click',()=>{ sfxClick(); clearSave(); switchScreen('screen-game','screen-config'); });

// ========== PAUSE / RESUME ==========
document.getElementById('btn-pause').addEventListener('click',()=>{ sfxClick();
  pauseGameForOverlay();
  showView('view-paused');
});
document.getElementById('btn-resume').addEventListener('click',()=>{ sfxClick();
  if(pausedView){showView(pausedView);}else{showView('view-waiting');}
  resumeGameFromOverlay();
  pausedView=null;
});

// ========== SIDEBAR NAV ==========
document.getElementById('btn-sidebar-inicio').addEventListener('click',()=>{
  sfxClick();
  pauseGameForOverlay();
  showConfirm(
    'Voltar ao Inicio',
    'O progresso do jogo sera perdido. Deseja continuar?',
    '🏠',
    () => { pausedView = null; clearSave(); switchScreen('screen-game','screen-config'); }
  );
});

// ========== SOBRE (available everywhere) ==========
function openSobre() {
  sfxClick();
  if(document.getElementById('screen-game').classList.contains('active')) pauseGameForOverlay();
  document.getElementById('sobre-overlay').classList.remove('hidden');
}
function closeSobre() {
  document.getElementById('sobre-overlay').classList.add('hidden');
  if(document.getElementById('screen-game').classList.contains('active')) resumeGameFromOverlay();
}
document.getElementById('btn-sidebar-sobre').addEventListener('click', openSobre);
document.getElementById('btn-config-sobre').addEventListener('click', openSobre);
document.getElementById('btn-sobre-close').addEventListener('click', closeSobre);

// ========== GABARITO DO PROFESSOR (available everywhere) ==========
// SHA-256 hash of the password (not stored in plaintext)
const GABARITO_SENHA_HASH = 'a4b1627476df97e9cb8810dc82cf0d957bed59b37addd99b22b0a614798a56b7';
let gabaritoAuthed = false;

async function hashPassword(pwd) {
  const data = new TextEncoder().encode(pwd);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function openGabarito() {
  sfxClick();
  if(document.getElementById('screen-game').classList.contains('active')) pauseGameForOverlay();
  const overlay = document.getElementById('gabarito-overlay');
  overlay.classList.remove('hidden');
  if (gabaritoAuthed) {
    document.getElementById('gabarito-login').style.display = 'none';
    document.getElementById('gabarito-search').classList.remove('hidden');
    document.getElementById('gabarito-input').focus();
  } else {
    document.getElementById('gabarito-login').style.display = '';
    document.getElementById('gabarito-search').classList.add('hidden');
    document.getElementById('gabarito-password').value = '';
    document.getElementById('gabarito-password').focus();
    document.getElementById('gabarito-error').classList.add('hidden');
  }
}

function closeGabarito() {
  document.getElementById('gabarito-overlay').classList.add('hidden');
  if(document.getElementById('screen-game').classList.contains('active')) resumeGameFromOverlay();
}

document.getElementById('btn-sidebar-gabarito').addEventListener('click', openGabarito);
document.getElementById('btn-config-gabarito').addEventListener('click', openGabarito);

document.getElementById('btn-gabarito-enter').addEventListener('click', tryGabaritoLogin);
document.getElementById('gabarito-password').addEventListener('keydown', e => { if (e.key === 'Enter') tryGabaritoLogin(); });

async function tryGabaritoLogin() {
  const pwd = document.getElementById('gabarito-password').value;
  const hash = await hashPassword(pwd);
  if (hash === GABARITO_SENHA_HASH) {
    gabaritoAuthed = true;
    document.getElementById('gabarito-login').style.display = 'none';
    document.getElementById('gabarito-search').classList.remove('hidden');
    document.getElementById('gabarito-error').classList.add('hidden');
    document.getElementById('gabarito-input').focus();
  } else {
    document.getElementById('gabarito-error').classList.remove('hidden');
  }
}

document.getElementById('btn-gabarito-close').addEventListener('click', closeGabarito);
document.getElementById('btn-gabarito-cancel').addEventListener('click', closeGabarito);

document.getElementById('gabarito-input').addEventListener('input', () => {
  const query = normalizeText(document.getElementById('gabarito-input').value);
  const results = document.getElementById('gabarito-results');

  if (query.length < 2) {
    results.innerHTML = '<p class="gabarito-placeholder">Digite algo para pesquisar nas dicas e temas...</p>';
    return;
  }

  let html = '';
  const queryWords = query.split(' ').filter(w => w.length >= 2);

  CARDS.forEach(card => {
    const topicNorm = normalizeText(card.topic);
    let matchedHints = [];

    const topicMatch = queryWords.some(qw => topicNorm.includes(qw));

    card.hints.forEach((hint, idx) => {
      const hintNorm = normalizeText(hint);
      if (queryWords.some(qw => hintNorm.includes(qw))) {
        matchedHints.push({ idx, text: hint });
      }
    });

    if (topicMatch || matchedHints.length > 0) {
      html += `<div class="gabarito-card">`;
      html += `<div class="gabarito-card-topic">✅ Resposta: ${card.topic}</div>`;

      if (matchedHints.length > 0) {
        matchedHints.forEach(h => {
          let display = h.text;
          queryWords.forEach(qw => {
            if (qw.length >= 2) {
              const regex = new RegExp(`(${qw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
              display = display.replace(regex, '<span class="gabarito-match">$1</span>');
            }
          });
          html += `<div class="gabarito-card-hint"><span class="hint-num">#${h.idx + 1}</span>${display}</div>`;
        });
      } else {
        html += `<div class="gabarito-card-hint" style="font-style:italic;opacity:0.7">Tema corresponde a pesquisa. Todas as 10 dicas disponiveis.</div>`;
      }
      html += `</div>`;
    }
  });

  if (!html) {
    html = '<p class="gabarito-placeholder">Nenhum resultado encontrado.</p>';
  }
  results.innerHTML = html;
});

// ========== CLOSE OVERLAYS ON BACKDROP CLICK ==========
document.getElementById('gabarito-overlay').addEventListener('click', e => { if(e.target === e.currentTarget) closeGabarito(); });
document.getElementById('sobre-overlay').addEventListener('click', e => { if(e.target === e.currentTarget) closeSobre(); });
document.getElementById('confirm-overlay').addEventListener('click', e => { if(e.target === e.currentTarget) document.getElementById('confirm-overlay').classList.add('hidden'); });

// ========== KEYBOARD: ESC CLOSES OVERLAYS ==========
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') {
    if(!document.getElementById('gabarito-overlay').classList.contains('hidden')) closeGabarito();
    else if(!document.getElementById('sobre-overlay').classList.contains('hidden')) closeSobre();
    else if(!document.getElementById('confirm-overlay').classList.contains('hidden')) document.getElementById('confirm-overlay').classList.add('hidden');
  }
});

// ========== LOCAL STORAGE PERSISTENCE ==========
const SAVE_KEY = 'biodesafio_save';

function saveGame() {
  if(state.gameOver) { localStorage.removeItem(SAVE_KEY); return; }
  const save = {
    config: config,
    state: state,
    roundNumber: roundNumber,
    version: 1
  };
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch(e) {}
}

function clearSave() { localStorage.removeItem(SAVE_KEY); }

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const save = JSON.parse(raw);
    if (!save || !save.state || !save.config || !save.state.players || save.state.players.length < 2) { clearSave(); return false; }
    // Validate that card indices still exist
    if (save.config.enabledCardIndices.some(i => i >= CARDS.length)) { clearSave(); return false; }
    return save;
  } catch(e) { clearSave(); return false; }
}

function resumeSavedGame(save) {
  config = save.config;
  state = save.state;
  roundNumber = save.roundNumber || 0;
  switchScreen('screen-config', 'screen-game');
  buildBoard(); renderPlayerPanels(); updateTurnIndicator(); renderPawns();
  setTimeout(() => showTurnAnnounce(), 300);
}

function checkForSavedGame() {
  const save = loadGame();
  if (!save) return;
  const names = save.state.players.map(p => p.name).join(', ');
  showConfirm(
    'Continuar Jogo?',
    `Existe um jogo salvo com ${save.state.players.length} jogadores (${names}). Deseja continuar de onde parou?`,
    '💾',
    () => resumeSavedGame(save)
  );
  // Override cancel to clear save
  document.getElementById('confirm-cancel').onclick = () => {
    document.getElementById('confirm-overlay').classList.add('hidden');
    clearSave();
  };
}

// ========== INIT ==========
checkForSavedGame();
