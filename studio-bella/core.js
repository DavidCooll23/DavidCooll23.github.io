/* Studio Bella demo: shared data layer for the website and the panel.
   Everything lives in the visitor's browser (localStorage). For a real salon only `Store`
   changes (Google Apps Script web app or Cloudflare Worker + D1); the rest stays as is.
   Times are Bratislava wall-clock: day = 'YYYY-MM-DD', start = minutes from midnight. */
(function(){
'use strict';
const KEY='bella-demo-v1';
const Store={
  load(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}},
  save(db){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}},
  clear(){try{localStorage.removeItem(KEY)}catch(e){}},
  onChange(fn){addEventListener('storage',e=>{if(e.key===KEY||e.key===null)fn()})}
};

/* ---- time (Europe/Bratislava) ---- */
const TZ='Europe/Bratislava';
const NOWF=new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
const NOW_OVERRIDE=(()=>{const m=/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})$/.exec(new URLSearchParams(location.search).get('now')||'');return m?{day:m[1],min:+m[2]*60+ +m[3]}:null})();
function now(){
  if(NOW_OVERRIDE)return {...NOW_OVERRIDE};
  const p={};NOWF.formatToParts(new Date()).forEach(x=>p[x.type]=x.value);
  return {day:`${p.year}-${p.month}-${p.day}`,min:(+p.hour%24)*60+ +p.minute};
}
const D2=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d))};
const addDays=(s,n)=>{const d=D2(s);d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const dow=s=>D2(s).getUTCDay();                 /* 0 = Sunday */
const monday=s=>addDays(s,-((dow(s)+6)%7));
const hm=m=>String(m/60|0).padStart(2,'0')+':'+String(m%60).padStart(2,'0');

/* ---- the salon (example data) ---- */
const ADDR='Hlavná 1, 811 01 Bratislava';
const STAFF=[{id:'anna',name:{sk:'Anna',uk:'Анна',ru:'Анна',en:'Anna'}},{id:'olga',name:{sk:'Oľga',uk:'Ольга',ru:'Ольга',en:'Olga'}}];
const SERVICES=[
  {id:'cut',  dur:60, price:25,staff:['anna'],       name:{sk:'Strih',uk:'Стрижка',ru:'Стрижка',en:'Haircut'}},
  {id:'color',dur:120,price:60,staff:['anna'],       name:{sk:'Farbenie',uk:'Фарбування',ru:'Окрашивание',en:'Hair colouring'}},
  {id:'nails',dur:90, price:30,staff:['olga'],       name:{sk:'Manikúra',uk:'Манікюр',ru:'Маникюр',en:'Manicure'}},
  {id:'brows',dur:30, price:15,staff:['olga','anna'],name:{sk:'Obočie',uk:'Брови',ru:'Брови',en:'Brows'}}
];
const NAMES=['Jana K.','Petra M.','Lucia H.','Zuzana B.','Katarína S.','Mária V.','Veronika T.','Simona D.','Eva P.','Martina R.','Natália G.','Ivana Č.','Oksana L.','Iryna S.','Alena N.','Monika F.','Barbora J.','Tereza K.'];
const LUNCH=[780,810];
const clone=o=>JSON.parse(JSON.stringify(o));

/* ---- deterministic example bookings, generated from today's date ---- */
function hash(str){let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let s=seed||1;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296}}
const phoneFor=n=>{const d='9'+String(hash(n)%100000000).padStart(8,'0');return '+421 '+d.slice(0,3)+' '+d.slice(3,6)+' '+d.slice(6)};
function seedDay(db,day,past){
  if(!db.hours.days.includes(dow(day)))return;
  db.staff.forEach(st=>{
    const r=rng(hash(day+st.id)),svcs=db.services.filter(s=>s.staff.includes(st.id));
    db.blocks.push({id:'L'+hash(day+st.id).toString(36),staff:st.id,day,start:LUNCH[0],end:LUNCH[1],reason:'lunch'});
    let t=db.hours.open+(r()<.5?0:30);
    for(let guard=0;guard<40;guard++){
      const s=svcs[Math.floor(r()*svcs.length)];
      if(t+s.dur>db.hours.close)break;
      if(t<LUNCH[1]&&t+s.dur+db.buffer>LUNCH[0]){t=LUNCH[1];continue}
      if(r()<.55){
        const nm=NAMES[Math.floor(r()*NAMES.length)];
        db.bookings.push({id:'S'+hash(day+st.id+t).toString(36).toUpperCase(),svc:s.id,staff:st.id,day,start:t,dur:s.dur,price:s.price,
          name:nm,phone:phoneFor(nm),email:'',note:'',status:'seen',came:past?r()<.9:null,src:r()<.6?'web':'phone',created:0,seed:1});
        t=Math.ceil((t+s.dur+db.buffer)/15)*15;
      }else t+=30+Math.floor(r()*3)*30;
    }
  });
}
function topUp(db,first){
  const today=now().day,from=addDays(today,-7),to=addDays(today,db.horizon);
  let d=db.seedTo?addDays(db.seedTo,1):from;if(d<from)d=from;
  if(d>to)return false;
  for(;d<=to;d=addDays(d,1))seedDay(db,d,d<today);
  db.seedTo=to;
  if(first){ /* two fresh website bookings so the owner sees what "new" looks like */
    db.bookings.filter(b=>b.src==='web'&&b.day>today&&b.day<=addDays(today,3)).slice(0,2).forEach(b=>b.status='new');
  }
  return true;
}
function fresh(){
  const db={v:1,services:clone(SERVICES),staff:clone(STAFF),hours:{days:[1,2,3,4,5,6],open:540,close:1140},
    buffer:10,step:15,horizon:14,bookings:[],blocks:[],seedTo:null,notify:{email:true,tg:false}};
  topUp(db,true);return db;
}
function load(){let db=Store.load();if(!db||db.v!==1){db=fresh();Store.save(db)}else if(topUp(db))Store.save(db);return db}
function save(db){Store.save(db)}
function reset(){Store.clear();return load()}

/* ---- free slots ---- */
const isOpen=(db,day)=>db.hours.days.includes(dow(day));
function busy(db,staff,day,ex){
  const out=[];
  db.bookings.forEach(b=>{if(b.staff===staff&&b.day===day&&b.status!=='cancelled'&&b.id!==ex)out.push([b.start-db.buffer,b.start+b.dur+db.buffer])});
  db.blocks.forEach(k=>{if(k.staff===staff&&k.day===day)out.push([k.start,k.end])});
  return out;
}
/* free periods = working day minus lunch/closed time and bookings (with the cleaning buffer on both sides);
   a start time fits when the whole visit fits into one period (same idea as Easy!Appointments Availability.php) */
function periods(db,staff,day,ex){
  let ps=[[db.hours.open,db.hours.close]];
  busy(db,staff,day,ex).forEach(([a,b])=>{const out=[];ps.forEach(([s,e])=>{if(b<=s||a>=e){out.push([s,e]);return}if(a>s)out.push([s,a]);if(b<e)out.push([b,e])});ps=out});
  return ps;
}
function slots(db,staff,day,dur,ex){
  const n=now(),res=[];
  if(!isOpen(db,day)||day<n.day||day>addDays(n.day,db.horizon))return res;
  const lead=day===n.day?n.min+15:0;
  periods(db,staff,day,ex).forEach(([s,e])=>{for(let t=Math.ceil(s/db.step)*db.step;t+dur<=e;t+=db.step)if(t>=lead)res.push(t)});
  return res;
}
const svcById=(db,id)=>db.services.find(s=>s.id===id);
const staffFor=(db,svc)=>db.staff.filter(s=>svc.staff.includes(s.id));
/* {time: staffId} for a service; staff = id or 'any' (then the one with fewer visits that day) */
function slotMap(db,svcId,staff,day,ex){
  const svc=svcById(db,svcId),map=new Map();
  const who=staff==='any'?staffFor(db,svc).map(s=>s.id):[staff];
  const load=id=>db.bookings.filter(b=>b.staff===id&&b.day===day&&b.status!=='cancelled').length;
  who.slice().sort((a,b)=>load(a)-load(b)).forEach(id=>slots(db,id,day,svc.dur,ex).forEach(t=>{if(!map.has(t))map.set(t,id)}));
  return new Map([...map].sort((a,b)=>a[0]-b[0]));
}
function nearest(db,svcId,staff,fromDay,ex){
  const n=now();let d=fromDay&&fromDay>n.day?fromDay:n.day;
  for(let i=0;i<=db.horizon;i++,d=addDays(d,1)){const m=slotMap(db,svcId,staff,d,ex);if(m.size){const [t,s]=m.entries().next().value;return {day:d,start:t,staff:s}}}
  return null;
}

/* ---- bookings ---- */
const newId=()=>'B'+(Date.now()%46656).toString(36).toUpperCase().padStart(3,'0')+Math.floor(Math.random()*1296).toString(36).toUpperCase().padStart(2,'0');
/* returns the saved booking, or null if the slot was taken meanwhile (re-reads the store first) */
function createBooking(d){
  const db=load(),svc=svcById(db,d.svc);
  if(!svc||!slots(db,d.staff,d.day,svc.dur).includes(d.start))return null;
  const b={id:newId(),svc:svc.id,staff:d.staff,day:d.day,start:d.start,dur:svc.dur,price:svc.price,name:d.name,phone:d.phone,
    email:d.email||'',note:d.note||'',status:d.status||'new',came:null,src:d.src||'web',created:Date.now(),lang:d.lang||'sk'};
  db.bookings.push(b);save(db);return b;
}
function moveBooking(id,day,start,staff,by){
  const db=load(),b=db.bookings.find(x=>x.id===id);if(!b)return null;
  const st=staff||b.staff;
  if(!slots(db,st,day,b.dur,id).includes(start))return null;
  Object.assign(b,{day,start,staff:st,status:b.status==='cancelled'?'new':b.status,came:null,moved:by||'client'});
  if(by==='salon')b.status='seen';
  save(db);return b;
}
function updateBooking(id,patch){const db=load(),b=db.bookings.find(x=>x.id===id);if(!b)return null;Object.assign(b,patch);save(db);return b}
const findBooking=id=>load().bookings.find(b=>b.id===id)||null;

/* ---- formatting ---- */
const LOC={sk:'sk-SK',uk:'uk-UA',ru:'ru-RU',en:'en-GB'};
const DAYF={sk:{weekday:'long',day:'numeric',month:'numeric'},uk:{weekday:'long',day:'numeric',month:'long'},ru:{weekday:'long',day:'numeric',month:'long'},en:{weekday:'long',day:'numeric',month:'long'}};
const fmtDay=(day,l,o)=>new Intl.DateTimeFormat(LOC[l]||'sk-SK',{...(o||DAYF[l]||DAYF.sk),timeZone:'UTC'}).format(D2(day));
const fmtDate=(day,l)=>{const [y,m,d]=day.split('-').map(Number);return l==='en'?`${d}/${m}/${y}`:l==='sk'?`${d}. ${m}. ${y}`:`${String(d).padStart(2,'0')}.${String(m).padStart(2,'0')}.${y}`};
const price=(p,l)=>l==='en'?'€'+p:p+' €';
const MIN={sk:'min',uk:'хв',ru:'мин',en:'min'};
const dur=(m,l)=>m+' '+(MIN[l]||'min');
const svcName=(db,id,l)=>{const s=svcById(db,id);return s?(s.name[l]||s.name.sk):id};
const staffName=(db,id,l)=>{const s=db.staff.find(x=>x.id===id);return s?(s.name[l]||s.name.sk):id};

/* ---- calendar file (.ics) ---- */
function ics(db,b,l,title){
  const esc=s=>String(s).replace(/[\\;,]/g,m=>'\\'+m).replace(/\n/g,'\\n');
  const dt=(day,min)=>day.replace(/-/g,'')+'T'+hm(min).replace(':','')+'00';
  const st=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Studio Bella demo//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH',
    'BEGIN:VTIMEZONE','TZID:Europe/Bratislava',
    'BEGIN:STANDARD','DTSTART:19701025T030000','RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU','TZOFFSETFROM:+0200','TZOFFSETTO:+0100','TZNAME:CET','END:STANDARD',
    'BEGIN:DAYLIGHT','DTSTART:19700329T020000','RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU','TZOFFSETFROM:+0100','TZOFFSETTO:+0200','TZNAME:CEST','END:DAYLIGHT',
    'END:VTIMEZONE','BEGIN:VEVENT','UID:'+b.id+'@studio-bella.example','DTSTAMP:'+st,
    'DTSTART;TZID=Europe/Bratislava:'+dt(b.day,b.start),'DTEND;TZID=Europe/Bratislava:'+dt(b.day,b.start+b.dur),
    'SUMMARY:'+esc(title),'LOCATION:'+esc(ADDR),
    'BEGIN:VALARM','TRIGGER:-PT2H','ACTION:DISPLAY','DESCRIPTION:'+esc(title),'END:VALARM',
    'END:VEVENT','END:VCALENDAR'].join('\r\n');
}
function download(name,text,type){
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;
  document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
}
function langNow(){
  const q=new URLSearchParams(location.search).get('lang');let s='';try{s=localStorage.lang}catch(e){}
  const bl=(navigator.language||'').slice(0,2);const l=q||s||(['en','ru','uk'].includes(bl)?bl:'sk');
  return LOC[l]?l:'sk';
}

window.Bella={Store,KEY,ADDR,now,addDays,dow,monday,hm,load,save,reset,isOpen,slots,slotMap,nearest,svcById,staffFor,
  createBooking,moveBooking,updateBooking,findBooking,fmtDay,fmtDate,price,dur,svcName,staffName,ics,download,langNow,busy,periods};
})();
