// v0.7.0 UI reset: return to a simple card-first layout and rebuild from the old readable base.
// Keep current opportunity data and tracking, remove interest/bookmark UI, and use one clear "hide" state.
const CY_V7_VERSION='0.7.0';
const CY_V7_HIDDEN_KEY='chungyack.opportunity.hidden.v1';
const CY_V7_VIEW_KEY='chungyack.opportunity.view.v1';

function cyV7LoadHidden(){
  try{
    const x=JSON.parse(localStorage.getItem(CY_V7_HIDDEN_KEY)||'[]');
    return new Set(Array.isArray(x)?x:[]);
  }catch{return new Set()}
}
let CY_V7_HIDDEN=cyV7LoadHidden();
let CY_V7_VIEW=localStorage.getItem(CY_V7_VIEW_KEY)==='hidden'?'hidden':'active';
let CY_V7_LEVEL='action';
let CY_V7_SEARCH='';

function cyV7SaveHidden(){localStorage.setItem(CY_V7_HIDDEN_KEY,JSON.stringify([...CY_V7_HIDDEN]))}
function cyV7SetView(view){CY_V7_VIEW=view==='hidden'?'hidden':'active';localStorage.setItem(CY_V7_VIEW_KEY,CY_V7_VIEW);renderRecommendations()}
function cyV7ToggleHidden(id){
  if(!id)return;
  if(CY_V7_HIDDEN.has(id))CY_V7_HIDDEN.delete(id);else CY_V7_HIDDEN.add(id);
  cyV7SaveHidden();
  renderRecommendations();
  if(typeof cyToast==='function')cyToast(CY_V7_HIDDEN.has(id)?'공고를 숨겼습니다.':'숨김을 해제했습니다.');
}
function cyV7ClearHidden(){CY_V7_HIDDEN.clear();cyV7SaveHidden();CY_V7_VIEW='active';localStorage.setItem(CY_V7_VIEW_KEY,'active');renderRecommendations()}

function cyV7LevelLabel(level){return {action:'검토',conditional:'조건부',hold:'보류',impossible:'불가'}[level]||'검토'}
function cyV7Items(){
  const items=Array.isArray(CY_OPPORTUNITY_DATA?.items)?CY_OPPORTUNITY_DATA.items:[];
  const q=CY_V7_SEARCH.trim().toLowerCase();
  return items.filter(item=>{
    const hidden=CY_V7_HIDDEN.has(item.id);
    if(CY_V7_VIEW==='hidden'?!hidden:hidden)return false;
    const level=cyV4Level(item);
    if(CY_V7_VIEW!=='hidden'&&CY_V7_LEVEL!=='all'&&level!==CY_V7_LEVEL)return false;
    if(q&&!`${item.name||''} ${item.region||''} ${item.category||''} ${item.agency||''}`.toLowerCase().includes(q))return false;
    return true;
  });
}
function cyV7Eligibility(item){
  const x=item?.eligibility;if(!x)return '';
  return `<div class="cy-v7-eligibility ${cyV4Level(item)}"><b>${esc(x.title||'내 조건 확인')}</b>${x.reason?`<p>${esc(x.reason)}</p>`:''}</div>`;
}
function cyV7Address(item){
  const arr=Array.isArray(item?.addresses)?item.addresses.filter(Boolean):[];
  if(!arr.length)return '';
  const extra=arr.length>1?` <small>외 ${arr.length-1}곳</small>`:'';
  return `<div class="cy-v7-address">${esc(arr[0])}${extra}</div>`;
}
function cyV7Card(item){
  const level=cyV4Level(item);
  const hidden=CY_V7_HIDDEN.has(item.id);
  const canTrack=level!=='impossible'&&level!=='hold';
  return `<article class="cy-v7-card ${level}${hidden?' is-hidden':''}">
    <div class="cy-v7-card-top">
      <div class="cy-v7-title-wrap"><div class="cy-v7-status">${esc(item.status||cyV7LevelLabel(level))}</div><h3>${esc(item.name||'')}</h3><div class="cy-v7-meta">${esc(item.agency||'')} · ${esc(item.category||'')} · ${esc(item.region||'')}</div></div>
      <button class="cy-v7-hide" data-cy-v7-hide="${esc(item.id)}">${hidden?'복원':'숨기기'}</button>
    </div>
    <div class="cy-v7-facts"><div><span>접수</span><b>${esc(item.period||'-')}</b></div><div><span>모집</span><b>${esc(item.units||'-')}</b></div></div>
    ${cyV7Eligibility(item)}
    ${item.next?`<div class="cy-v7-next"><span>다음</span><b>${esc(item.next)}</b></div>`:''}
    ${cyV7Address(item)}
    <div class="cy-v7-actions">
      ${item.source?`<a class="btn" href="${esc(item.source)}" target="_blank" rel="noopener">공식 공고</a>`:''}
      ${canTrack?`<button class="btn primary-lite cy-v7-track" data-opportunity-id="${esc(item.id)}">신청했음 → 추적</button>`:''}
    </div>
  </article>`;
}
function cyV7Toolbar(rows){
  const hiddenCount=CY_V7_HIDDEN.size;
  if(CY_V7_VIEW==='hidden'){
    return `<div class="cy-v7-toolbar"><div class="cy-v7-toolbar-row"><button class="cy-v7-view active" data-cy-v7-view="active">← 공고로 돌아가기</button><button class="cy-v7-clear-hidden" ${hiddenCount?'':'disabled'}>숨김 모두 해제</button></div><div class="cy-v7-result">숨긴 공고 <b>${rows.length}</b>개</div></div>`;
  }
  return `<div class="cy-v7-toolbar">
    <div class="cy-v7-levels">
      <button data-cy-v7-level="action" class="${CY_V7_LEVEL==='action'?'on':''}">검토</button>
      <button data-cy-v7-level="conditional" class="${CY_V7_LEVEL==='conditional'?'on':''}">조건부</button>
      <button data-cy-v7-level="hold" class="${CY_V7_LEVEL==='hold'?'on':''}">보류</button>
      <button data-cy-v7-level="impossible" class="${CY_V7_LEVEL==='impossible'?'on':''}">불가</button>
      <button data-cy-v7-level="all" class="${CY_V7_LEVEL==='all'?'on':''}">전체</button>
    </div>
    <div class="cy-v7-search-row"><input id="cyV7Search" value="${esc(CY_V7_SEARCH)}" placeholder="공고·지역 검색"><button class="cy-v7-view" data-cy-v7-view="hidden">숨긴 공고 ${hiddenCount}</button></div>
    <div class="cy-v7-result">현재 표시 <b>${rows.length}</b>개</div>
  </div>`;
}

// Rebuild the opportunity page from scratch. Previous v4/v5/v6/v6.1 render layers remain as compatibility files only.
renderRecommendations=function(){
  const list=document.getElementById('recommendList');if(!list)return;
  if(!CY_OPPORTUNITY_DATA){list.innerHTML='<div class="empty">현재 공고 데이터 불러오는 중…</div>';return;}
  const rows=cyV7Items();
  list.innerHTML=`${cyV7Toolbar(rows)}<div class="cy-v7-list">${rows.length?rows.map(cyV7Card).join(''):'<div class="empty">표시할 공고가 없습니다.</div>'}</div>`;
  const count=document.getElementById('recommendCount');if(count)count.textContent=rows.length;
  document.querySelectorAll('[data-cy-v7-level]').forEach(b=>b.addEventListener('click',()=>{CY_V7_LEVEL=b.dataset.cyV7Level||'action';renderRecommendations()}));
  document.querySelectorAll('[data-cy-v7-view]').forEach(b=>b.addEventListener('click',()=>cyV7SetView(b.dataset.cyV7View)));
  document.querySelectorAll('[data-cy-v7-hide]').forEach(b=>b.addEventListener('click',()=>cyV7ToggleHidden(b.dataset.cyV7Hide)));
  document.querySelectorAll('.cy-v7-track').forEach(b=>b.addEventListener('click',()=>cyV4AddTracking(b.dataset.opportunityId)));
  const q=document.getElementById('cyV7Search');if(q)q.addEventListener('input',()=>{CY_V7_SEARCH=q.value;renderRecommendations()});
  const clear=document.querySelector('.cy-v7-clear-hidden');if(clear)clear.addEventListener('click',cyV7ClearHidden);
};

// Keep the home report useful but compact: no giant evidence boxes, no nested accordions.
renderHourlyReport=function(report){
  const home=document.querySelector('.page[data-page="home"]');if(!home)return;
  let root=document.getElementById('hourlyReport');
  if(!root){root=document.createElement('section');root.id='hourlyReport';root.className='hourly-report cy-v7-hourly';home.insertBefore(root,home.firstChild)}
  const groups=(Array.isArray(report?.groups)?report.groups:[]).map(g=>({...g,items:Array.isArray(g.items)?g.items:[]})).filter(g=>g.items.length);
  root.innerHTML=`<div class="cy-v7-hourly-head"><div><h2>지금 볼 것</h2><small>${report?.updatedAt?new Date(report.updatedAt).toLocaleString('ko-KR'):'-'}</small></div></div>${groups.length?`<div class="cy-v7-hourly-groups">${groups.map(g=>`<div class="cy-v7-hourly-group"><b>${esc(g.icon||'')} ${esc(g.title||'')}</b>${g.items.map(x=>`<div class="cy-v7-hourly-item"><strong>${esc(x.name||'')}</strong><span>${esc(x.status||'')}</span></div>`).join('')}</div>`).join('')}</div>`:'<div class="empty">현재 바로 확인할 항목이 없습니다.</div>'}`;
};

const _cyV7RenderHero=renderHero;
renderHero=function(){_cyV7RenderHero();const v=document.getElementById('appVersion');if(v)v.textContent='v'+CY_V7_VERSION};
const _cyV7RenderSettings=renderSettings;
renderSettings=function(){_cyV7RenderSettings();const v=document.getElementById('settingsVersion');if(v)v.textContent=CY_V7_VERSION};

// Backup only states that still matter in the rebuilt UI. Old interest/bookmark data is intentionally ignored.
cyBackupObject=function(){return {format:'chungyack-local-backup-v1',appVersion:CY_V7_VERSION,exportedAt:new Date().toISOString(),filters:FILTERS,tracking:TRACKING,trash:typeof cyTrash==='function'?cyTrash():[],hiddenOpportunities:[...CY_V7_HIDDEN]}};
cyImportBackup=async function(file){
  if(!file)return;let obj;
  try{obj=JSON.parse(await file.text())}catch{alert('백업 JSON을 읽을 수 없습니다.');return}
  if(obj?.format!=='chungyack-local-backup-v1'||!Array.isArray(obj.tracking)||!obj.filters){alert('청약 레이더 백업 파일 형식이 아닙니다.');return}
  if(!confirm(`백업을 불러올까요?\n추적 ${obj.tracking.length}건과 필터·숨김 설정이 현재 로컬 데이터를 대체합니다.`))return;
  localStorage.setItem(FILTER_KEY,JSON.stringify(obj.filters));localStorage.setItem(TRACK_KEY,JSON.stringify(obj.tracking));
  if(typeof cySaveTrash==='function')cySaveTrash(Array.isArray(obj.trash)?obj.trash:[]);
  localStorage.setItem(CY_V7_HIDDEN_KEY,JSON.stringify(Array.isArray(obj.hiddenOpportunities)?obj.hiddenOpportunities:[]));
  localStorage.removeItem('chungyack.opportunity.flags.v1');localStorage.removeItem('chungyack.opportunity.savedview.v1');
  location.reload();
};

function cyV7Wire(){
  document.querySelector('.page[data-page="recommend"] .section-head h2')?.replaceChildren(document.createTextNode('현재 검토 공고'));
  const small=document.querySelector('.page[data-page="recommend"] .section-head small');if(small)small.textContent='핵심만 보고 · 필요 없으면 숨기기';
  const reset=document.getElementById('resetLocalBtn');if(reset){const fresh=reset.cloneNode(true);reset.replaceWith(fresh);fresh.addEventListener('click',()=>{if(!confirm('이 기기의 필터·추적·숨김 기록을 전부 초기화할까요?\n실제 청약 신청에는 영향이 없습니다.'))return;localStorage.removeItem(FILTER_KEY);localStorage.removeItem(TRACK_KEY);localStorage.removeItem(CY_TRASH_KEY);localStorage.removeItem(CY_V7_HIDDEN_KEY);localStorage.removeItem(CY_V7_VIEW_KEY);localStorage.removeItem('chungyack.opportunity.flags.v1');localStorage.removeItem('chungyack.opportunity.savedview.v1');location.reload()})}
  const a=document.getElementById('appVersion');if(a)a.textContent='v'+CY_V7_VERSION;
  const b=document.getElementById('settingsVersion');if(b)b.textContent=CY_V7_VERSION;
  renderRecommendations();
}
window.addEventListener('DOMContentLoaded',cyV7Wire);
