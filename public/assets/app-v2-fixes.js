// v0.2.1 targeted safety fixes layered after app.js.
// Keep catalog-derived tracking IDs stable so repeated taps edit the existing item.
STATUS_ICON['취소/추적중단']='⏸';

addCatalogToTracking=function(id){
  const x=CATALOG.find(v=>v.id===id);
  if(!x)return;
  const stableId=`catalog-${id}`;
  const existing=TRACKING.find(t=>t.id===stableId);
  if(existing){openTrackEditor(existing);return;}
  openTrackEditor({
    id:stableId,
    name:`${x.name} ${x.type}㎡`,
    type:`${x.type}㎡`,
    appliedAt:new Date().toISOString().slice(0,10),
    status:'신청완료',
    next:'',
    detail:`모집세대수 ${x.units} · 보증금 ${x.deposit} · 월 ${x.rent}`,
    address:x.address
  });
};

function exportLocalState(){
  const payload={
    schema:'chungyack-local-v1',
    exportedAt:new Date().toISOString(),
    filters:FILTERS,
    tracking:TRACKING
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`chungyack-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

async function importLocalState(file){
  if(!file)return;
  try{
    const parsed=JSON.parse(await file.text());
    if(parsed?.schema!=='chungyack-local-v1')throw new Error('지원하지 않는 백업 형식');
    if(!Array.isArray(parsed.tracking)||!parsed.filters)throw new Error('필수 데이터 누락');
    TRACKING=parsed.tracking;
    FILTERS=parsed.filters;
    saveTracking();
    saveFilters();
    syncFilterControls();
    renderAll();
    alert('백업을 복원했습니다.');
  }catch(e){
    console.error(e);
    alert('백업을 가져오지 못했습니다: '+e.message);
  }
}

window.addEventListener('DOMContentLoaded',()=>{
  const exportBtn=document.getElementById('exportLocalBtn');
  const importBtn=document.getElementById('importLocalBtn');
  const importFile=document.getElementById('importLocalFile');
  if(exportBtn)exportBtn.addEventListener('click',exportLocalState);
  if(importBtn&&importFile)importBtn.addEventListener('click',()=>importFile.click());
  if(importFile)importFile.addEventListener('change',()=>{const f=importFile.files?.[0];importLocalState(f);importFile.value='';});
});

window.__CY_HANDLE_NATIVE_BACK__=function(){
  const editor=document.getElementById('trackingEditor');
  if(editor?.open){editor.close();return true;}
  const active=document.querySelector('.page.active');
  if(active && active.dataset.page!=='home'){
    openPage('home');
    return true;
  }
  return false;
};
