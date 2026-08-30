// v0.2 targeted safety fixes layered after app.js.
// Keep catalog-derived tracking IDs stable so repeated taps edit the existing item.
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
