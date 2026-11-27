/* Studio Bella inner pages: prices, durations, nearest free time and opening hours come from the same data as the booking (core.js). */
(function(){
'use strict';
const B=window.Bella;if(!B)return;
const cmp=(a,b)=>!b||(a&&(a.day<b.day||(a.day===b.day&&a.start<b.start)));
function when(n,L){
  if(!n)return '—';
  const BT=(window.BellaBook&&BellaBook.BT&&(BellaBook.BT[L]||BellaBook.BT.sk))||{},t=B.now().day;
  const d=n.day===t?BT.today:n.day===B.addDays(t,1)?BT.tmrw:B.fmtDay(n.day,L,{weekday:'short',day:'numeric',month:'numeric'});
  return (d||n.day)+' '+B.hm(n.start);
}
function fill(){
  const L=document.documentElement.lang||'sk',db=B.load(),T=window.T0||{};
  const svc=id=>B.svcById(db,id);
  document.querySelectorAll('[data-p]').forEach(e=>{const s=svc(e.dataset.p);if(s)e.textContent=B.price(s.price,L)});
  document.querySelectorAll('[data-d]').forEach(e=>{const s=svc(e.dataset.d);if(s)e.textContent=B.dur(s.dur,L)});
  document.querySelectorAll('[data-w]').forEach(e=>{const s=svc(e.dataset.w);if(s)e.replaceChildren(...B.staffFor(db,s).flatMap((x,i)=>{const b=document.createElement('span');b.className='wn w-'+x.id;b.textContent=x.name[L];return i?[' ',b]:[b]}))});
  document.querySelectorAll('[data-next]').forEach(e=>{e.textContent=when(B.nearest(db,e.dataset.next,'any'),L)});
  document.querySelectorAll('[data-next-staff]').forEach(e=>{
    let best=null;db.services.forEach(s=>{if(!s.hidden&&s.staff.includes(e.dataset.nextStaff)){const n=B.nearest(db,s.id,e.dataset.nextStaff);if(n&&cmp(n,best))best=n}});
    e.textContent=when(best,L);
  });
  const hrs=document.getElementById('hrs');
  if(hrs){
    const f=new Intl.DateTimeFormat(L,{weekday:'long',timeZone:'UTC'}),today=B.dow(B.now().day),closed=(T[L]||{}).sun||'—';
    hrs.replaceChildren(...[1,2,3,4,5,6,7].map(i=>{
      const dw=i%7,li=document.createElement('li'),a=document.createElement('span'),b=document.createElement('span');
      a.textContent=f.format(new Date(Date.UTC(2024,0,i)));           /* 1 Jan 2024 is a Monday */
      b.textContent=db.hours.days.includes(dw)?B.hm(db.hours.open)+'–'+B.hm(db.hours.close):closed;
      if(dw===today)li.className='now';li.append(a,b);return li}));
  }
}
if(typeof window.setLang==='function'){const o=window.setLang;window.setLang=function(l){o(l);fill()}}
B.Store.onChange(fill);
fill();setInterval(fill,60000);
const mng=document.getElementById('mng');
if(mng)mng.addEventListener('submit',e=>{e.preventDefault();const v=mng.code.value.trim().toUpperCase();if(!v){mng.code.focus();return}if(window.BellaBook)BellaBook.openManage(v)});
})();
