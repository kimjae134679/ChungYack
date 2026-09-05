// Restore access to the existing data without changing saved IDs or source facts.
let cyPcReportItems=[];
function cyPcSafeUrl(value){
  try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}
}
function cyPcMaps(item){
  const addresses=[...new Set([...(Array.isArray(item.addresses)?item.addresses:[]),item.address].filter(x=>typeof x==='string'&&x.trim()))];
  return addresses.length?addresses.map(a=>`<div class="cy-pc-links"><span>${esc(a)}</span><a class="btn" href="${esc(cyV4MapUrl(a))}" target="_blank" rel="noopener noreferrer">네이버 지도 ↗</a></div>`).join(''):'<p class="cy-pc-muted">확인된 공급주택 주소가 아직 없어 지도를 표시할 수 없습니다.</p>';
}
const cyPcOriginalCard=cyV7Card;
cyV7Card=function(item){
  let html=cyPcOriginalCard(item);
  html=html.replace(`<h3>${esc(item.name||'')}</h3>`,`<h3><button class="cy-pc-title" data-cy-detail="${esc(item.id)}">${esc(item.name||'')}</button></h3>`);
  const address=(item.addresses||[]).find(Boolean);
  const links=`<div class="cy-pc-links"><button class="btn" data-cy-detail="${esc(item.id)}">상세보기</button>${address?`<a class="btn" href="${esc(cyV4MapUrl(address))}" target="_blank" rel="noopener noreferrer">지도 ↗</a>`:''}</div>`;
  return html.replace('<div class="cy-v7-actions">',links+'<div class="cy-v7-actions">');
};
const cyPcOriginalReport=renderHourlyReport;
renderHourlyReport=function(report){
  cyPcOriginalReport(report);
  cyPcReportItems=(report?.groups||[]).filter(g=>g.items?.length).flatMap(g=>g.items);
  document.querySelectorAll('#hourlyReport .cy-v7-hourly-item').forEach((row,i)=>{
    const item=cyPcReportItems[i];
    const title=row.querySelector('strong');
    title.innerHTML=`<button class="cy-pc-title" data-cy-report-detail="${i}">${esc(item.name||'')}</button>`;
    row.insertAdjacentHTML('beforeend',`<div class="cy-pc-links"><button class="btn" data-cy-report-detail="${i}">상세보기</button>${item.address?`<a class="btn" href="${esc(cyV4MapUrl(item.address))}" target="_blank" rel="noopener noreferrer">지도 ↗</a>`:''}</div>`);
  });
};
function cyPcOpenDetail(item,reportItem){
  if(!item)return;
  let dialog=document.getElementById('cyPcDetail');
  if(!dialog){
    dialog=document.createElement('dialog');dialog.id='cyPcDetail';dialog.className='cy-pc-detail';dialog.setAttribute('aria-labelledby','cyPcDetailTitle');document.body.appendChild(dialog);
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  }
  const source=cyPcSafeUrl(item.source);
  const fields=[['접수',item.period],['모집',item.units],['지역',item.region],['현재 상태',reportItem?.status||item.status],['내 조건',item.eligibility?.title],['조건 상세',item.eligibility?.reason],['다시 확인할 조건',item.eligibility?.check],['다음 확인',item.next]];
  const maps={...item,addresses:item.addresses||[],address:reportItem?.address||item.address};
  dialog.innerHTML=`<header><h2 id="cyPcDetailTitle">${esc(item.name||'공고 상세')}</h2><button type="button" autofocus>닫기 ×</button></header><div class="cy-pc-body">${fields.filter(([,v])=>v).map(([k,v])=>`<h3>${k}</h3><p>${esc(v)}</p>`).join('')}<h3>위치 · 지도</h3>${cyPcMaps(maps)}<h3>공고 원문</h3>${source?`<a class="btn" href="${esc(source)}" target="_blank" rel="noopener noreferrer">공식 공고 열기 ↗</a>`:'<p class="cy-pc-muted">이 항목에 연결된 공고 원문 링크가 없습니다.</p>'}${item.id==='sh-happy-2026-2'?`<h3>단지별 공급 · 임대조건</h3>${cyV61HappyHtml()}`:item.candidates?.length?`<h3>단지 후보</h3><ul>${item.candidates.map(c=>`<li>${esc(c.name)} — ${esc(c.verification||'')}</li>`).join('')}</ul>`:''}</div>`;
  dialog.querySelector('header button').addEventListener('click',()=>dialog.close());
  dialog.showModal();dialog.scrollTop=0;
}
document.addEventListener('click',e=>{
  const button=e.target.closest('[data-cy-detail],[data-cy-report-detail]');if(!button)return;
  const items=CY_OPPORTUNITY_DATA?.items||[];
  if(button.hasAttribute('data-cy-detail'))cyPcOpenDetail(items.find(x=>x.id===button.dataset.cyDetail));
  else{
    const reportItem=cyPcReportItems[Number(button.dataset.cyReportDetail)];
    if(reportItem)cyPcOpenDetail(items.find(x=>x.name===reportItem.name)||reportItem,reportItem);
  }
});
