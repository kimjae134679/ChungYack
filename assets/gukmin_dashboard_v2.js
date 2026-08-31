const DATA=[...(window.SH_PART_1||[]),...(window.SH_PART_2||[]),...(window.SH_PART_3||[]),...(window.SH_PART_4||[])];
const REGIONS=[...new Set(DATA.map(r=>r.지역))].sort((a,b)=>a.localeCompare(b,'ko'));
const TYPES=[...new Set(DATA.map(r=>r.형))].sort((a,b)=>a-b);
const SOUTH=new Set(['강남구','강동구','강서구','구로구','서초구','송파구','양천구']);
const selectedRegions=new Set();
const selectedTypes=new Set();
let sortState={key:'모집세대수',dir:'desc'};
let currentRows=[];
let leafletMap=null, markerLayer=null;
const geocodeCache=JSON.parse(localStorage.getItem('shGeocodeCacheV1')||'{}');

const q=document.getElementById('q'),river=document.getElementById('river'),minUnits=document.getElementById('minUnits'),sort=document.getElementById('sort'),tbody=document.getElementById('tbody');
const count=document.getElementById('count'),sum=document.getElementById('sum'),chips=document.getElementById('chips');

function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function naverUrl(text){return 'https://map.naver.com/p/search/'+encodeURIComponent(text);}
function riverSide(region){return SOUTH.has(region)?'south':'north';}
function parseMoney(s){const m=String(s||'').match(/[\d,]+/);return m?Number(m[0].replace(/,/g,'')):Number.POSITIVE_INFINITY;}
function selectedText(set,total,label){if(set.size===0||set.size===total)return '전체 '+label;const arr=[...set];return arr.length<=3?arr.join(', '):`${arr.slice(0,2).join(', ')} 외 ${arr.length-2}`;}
function updateSummaries(){regionSummary.textContent=selectedText(selectedRegions,REGIONS.length,'지역');typeSummary.textContent=selectedText(selectedTypes,TYPES.length,'형');regionCount.textContent=(selectedRegions.size===0||selectedRegions.size===REGIONS.length)?'전체':selectedRegions.size;typeCount.textContent=(selectedTypes.size===0||selectedTypes.size===TYPES.length)?'전체':selectedTypes.size;}
function buildMulti(){
 regionChecks.innerHTML=REGIONS.map(x=>`<label class="multi-item"><input type="checkbox" value="${esc(x)}">${esc(x)}</label>`).join('');
 typeChecks.innerHTML=TYPES.map(x=>`<label class="multi-item"><input type="checkbox" value="${x}">${x}㎡</label>`).join('');
 regionChecks.querySelectorAll('input').forEach(el=>el.addEventListener('change',()=>{el.checked?selectedRegions.add(el.value):selectedRegions.delete(el.value);updateSummaries();render();}));
 typeChecks.querySelectorAll('input').forEach(el=>el.addEventListener('change',()=>{const v=Number(el.value);el.checked?selectedTypes.add(v):selectedTypes.delete(v);syncTypeChips();updateSummaries();render();}));
 regionAll.onclick=()=>{selectedRegions.clear();regionChecks.querySelectorAll('input').forEach(x=>x.checked=false);updateSummaries();render();};
 regionClear.onclick=()=>{selectedRegions.clear();regionChecks.querySelectorAll('input').forEach(x=>x.checked=false);updateSummaries();render();};
 typeAll.onclick=()=>{selectedTypes.clear();typeChecks.querySelectorAll('input').forEach(x=>x.checked=false);syncTypeChips();updateSummaries();render();};
 typeClear.onclick=()=>{selectedTypes.clear();typeChecks.querySelectorAll('input').forEach(x=>x.checked=false);syncTypeChips();updateSummaries();render();};
}
function buildChips(){
 const all=document.createElement('button');all.className='chip active';all.textContent='전체 형';all.dataset.all='1';all.onclick=()=>{selectedTypes.clear();typeChecks.querySelectorAll('input').forEach(x=>x.checked=false);syncTypeChips();updateSummaries();render();};chips.appendChild(all);
 TYPES.forEach(t=>{const b=document.createElement('button');b.className='chip';b.textContent=t+'㎡';b.dataset.type=t;b.onclick=()=>{selectedTypes.has(t)?selectedTypes.delete(t):selectedTypes.add(t);const c=typeChecks.querySelector(`input[value="${t}"]`);if(c)c.checked=selectedTypes.has(t);syncTypeChips();updateSummaries();render();};chips.appendChild(b);});
}
function syncTypeChips(){chips.querySelectorAll('.chip').forEach(b=>{if(b.dataset.all)b.classList.toggle('active',selectedTypes.size===0);else b.classList.toggle('active',selectedTypes.has(Number(b.dataset.type)));});}
function sortRows(rows){const mul=sortState.dir==='asc'?1:-1;return rows.sort((a,b)=>{let av,bv;switch(sortState.key){case'지역':av=a.지역;bv=b.지역;return mul*av.localeCompare(bv,'ko');case'형':av=a.형;bv=b.형;break;case'모집세대수':av=a.모집세대수;bv=b.모집세대수;break;case'보증금':av=parseMoney(a.보증금);bv=parseMoney(b.보증금);break;case'월임대료':av=parseMoney(a.월임대료);bv=parseMoney(b.월임대료);break;default:return 0;}return mul*(av-bv)||a.지역.localeCompare(b.지역,'ko');});}
function getRows(){const query=q.value.trim().toLowerCase(),min=Number(minUnits.value||0),rv=river.value;let rows=DATA.filter(r=>{const hay=(r.지역+' '+r.단지+' '+r.대표주소+' '+(r.주소목록||[]).map(x=>x.name+' '+x.address).join(' ')).toLowerCase();return(!query||hay.includes(query))&&(selectedRegions.size===0||selectedRegions.has(r.지역))&&(selectedTypes.size===0||selectedTypes.has(r.형))&&(!rv||riverSide(r.지역)===rv)&&r.모집세대수>=min;});return sortRows(rows);}
function renderAddress(r){const list=r.주소목록||[];if(!list.length)return'<span style="color:#b42318">주소 확인 필요</span>';const first=list[0];const btn=x=>`<button class="mapbtn inmap" type="button" onclick='showOneOnMap(${JSON.stringify(x.address)},${JSON.stringify(x.name)})'>HTML 지도</button><a class="mapbtn" target="_blank" href="${naverUrl(x.address)}">네이버지도</a>`;if(list.length===1)return`<div class="address-main">${esc(first.address)} <span class="badge single">정확주소</span></div>${btn(first)}`;const lis=list.map(x=>`<li><b>${esc(x.name)}</b> — ${esc(x.address)}<br>${btn(x)}</li>`).join('');return`<div class="address-main">${esc(first.address)} 외 <b>${list.length-1}</b>곳 <span class="badge multi">여러 단지 묶음</span></div><details class="row-details"><summary>실제 단지 주소 ${list.length}개 펼치기</summary><ul class="addr-list">${lis}</ul></details>`;}
function render(){currentRows=getRows();tbody.innerHTML=currentRows.map(r=>`<tr><td class="region">${esc(r.지역)}</td><td class="complex">${esc(r.단지)}</td><td class="num"><span class="type">${r.형}㎡</span></td><td class="num units">${r.모집세대수}</td><td class="num">${esc(r.보증금)}</td><td class="num">${esc(r.월임대료)}</td><td>${renderAddress(r)}</td></tr>`).join('');count.textContent=currentRows.length.toLocaleString();sum.textContent=currentRows.reduce((a,b)=>a+b.모집세대수,0).toLocaleString();updateSortMarks();}
function updateSortMarks(){document.querySelectorAll('th.sortable').forEach(th=>{const mark=th.querySelector('.sortmark');mark.textContent=th.dataset.key===sortState.key?(sortState.dir==='asc'?'▲':'▼'):'↕';});}
function setSort(key,dir){sortState={key,dir};const map={모집세대수:{asc:'units_asc',desc:'units_desc'},형:{asc:'type_asc',desc:'type_desc'},보증금:{asc:'deposit_asc',desc:'deposit_desc'},월임대료:{asc:'rent_asc',desc:'rent_desc'},지역:{asc:'region_asc'}};if(map[key]?.[dir])sort.value=map[key][dir];render();}
document.querySelectorAll('th.sortable').forEach(th=>th.addEventListener('click',()=>{const k=th.dataset.key;setSort(k,sortState.key===k&&sortState.dir==='asc'?'desc':'asc');}));
sort.addEventListener('change',()=>{const [k,d]=({units_desc:['모집세대수','desc'],units_asc:['모집세대수','asc'],type_asc:['형','asc'],type_desc:['형','desc'],deposit_asc:['보증금','asc'],deposit_desc:['보증금','desc'],rent_asc:['월임대료','asc'],rent_desc:['월임대료','desc'],region_asc:['지역','asc']})[sort.value];sortState={key:k,dir:d};render();});
[q,river,minUnits].forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',render));

function ensureMap(){if(leafletMap)return true;if(typeof L==='undefined'){mapStatus.innerHTML='<span class="map-fail">지도 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인하세요.</span>';return false;}leafletMap=L.map('map').setView([37.55,126.99],10);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(leafletMap);markerLayer=L.layerGroup().addTo(leafletMap);return true;}
function saveCache(){try{localStorage.setItem('shGeocodeCacheV1',JSON.stringify(geocodeCache));}catch(e){}}
async function geocode(address){if(geocodeCache[address])return geocodeCache[address];const url='https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=kr&accept-language=ko&q='+encodeURIComponent(address);const res=await fetch(url,{headers:{'Accept':'application/json'}});if(!res.ok)throw new Error('HTTP '+res.status);const arr=await res.json();if(!arr.length)return null;const v={lat:Number(arr[0].lat),lon:Number(arr[0].lon),display:arr[0].display_name};geocodeCache[address]=v;saveCache();return v;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function plotPlaces(places,{replace=true,focus=true}={}){if(!ensureMap())return;if(replace)markerLayer.clearLayers();const unique=[];const seen=new Set();for(const p of places){if(p.address&&!seen.has(p.address)){seen.add(p.address);unique.push(p);}}if(unique.length>25){mapStatus.innerHTML=`현재 정확주소가 <b>${unique.length}</b>곳입니다. 지도 과부하 방지를 위해 지역/형 필터로 <b>25곳 이하</b>로 좁혀주세요.`;return;}if(!unique.length){mapStatus.textContent='표시할 정확주소가 없습니다.';return;}mapStatus.textContent=`${unique.length}개 주소 좌표 확인 중…`;const bounds=[];let ok=0,fail=0;for(let i=0;i<unique.length;i++){const p=unique[i];try{const g=await geocode(p.address);if(g){L.marker([g.lat,g.lon]).bindPopup(`<b>${esc(p.name||p.address)}</b><br>${esc(p.address)}<br><a target="_blank" href="${naverUrl(p.address)}">네이버지도</a>`).addTo(markerLayer);bounds.push([g.lat,g.lon]);ok++;}else fail++;}catch(e){fail++;}mapStatus.textContent=`좌표 확인 ${i+1}/${unique.length} · 성공 ${ok} · 실패 ${fail}`;if(i<unique.length-1&&!geocodeCache[unique[i+1].address])await sleep(1100);}if(focus&&bounds.length){if(bounds.length===1)leafletMap.setView(bounds[0],15);else leafletMap.fitBounds(bounds,{padding:[30,30],maxZoom:14});}mapStatus.innerHTML=`지도 표시 <b>${ok}</b>곳${fail?` · <span class="map-fail">좌표 실패 ${fail}곳</span>`:''}`;}
mapVisible.onclick=()=>{const places=[];currentRows.forEach(r=>(r.주소목록||[]).forEach(x=>places.push({name:x.name||r.단지,address:x.address})));plotPlaces(places,{replace:true,focus:true});};
clearMap.onclick=()=>{if(ensureMap())markerLayer.clearLayers();mapStatus.textContent='지도를 비웠습니다.';};
window.showOneOnMap=async(address,name)=>{await plotPlaces([{address,name}],{replace:true,focus:true});document.querySelector('.mapbox').scrollIntoView({behavior:'smooth',block:'start'});};

buildMulti();buildChips();updateSummaries();render();ensureMap();