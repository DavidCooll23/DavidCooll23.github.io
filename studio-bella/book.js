/* Studio Bella demo: the client's booking window (service → master → day and time → details → done),
   the "my booking" view (?b=ID: move or cancel), service prices from the shared data, "open now", toast. */
(function(){
'use strict';
const B=window.Bella;
const BT={
sk:{title:'Rezervácia',step:'Krok {n} z 5',close:'Zavrieť',back:'Späť',min:'min',
s1h:'Vyberte službu',s1p:'Cena je konečná. Trvanie je orientačné.',
s2h:'Ku komu chcete ísť?',any:'Ktokoľvek voľný',anyp:'Ukážeme všetky voľné časy',
s3h:'Vyberte deň a čas',near:'Najbližší voľný termín',morn:'Ráno',aft:'Popoludnie',eve:'Večer',
closedDay:'V nedeľu máme zatvorené.',full:'Na tento deň je všetko obsadené.',nearIs:'Najbližšie voľno: {x}',none:'V najbližších dvoch týždňoch už nie je nič voľné.',
s4h:'Kontaktné údaje',demo4:'Toto je ukážka. Rezervácia sa uloží len vo vašom prehliadači a nikam sa neodošle.',fill:'Vyplniť testovými údajmi',
fname:'Meno',fphone:'Telefón',fphx:'Na toto číslo vám zavoláme, ak sa niečo zmení.',femail:'E-mail',fnote:'Poznámka',opt:'(nepovinné)',
cons:'Súhlasím so spracovaním údajov na účel rezervácie.',consL:'Ako chránime vaše údaje',
eName:'Napíšte, prosím, meno.',ePhone:'Skontrolujte číslo, napríklad +421 900 123 456.',eEmail:'Skontrolujte e-mail.',eCons:'Bez súhlasu rezerváciu nemôžeme uložiť.',
confirm:'Potvrdiť rezerváciu',taken:'Tento čas si medzitým rezervoval niekto iný. Vyberte, prosím, iný.',
s5h:'Rezervácia potvrdená',s5p:'Tešíme sa na vás. Číslo rezervácie: {id}',
lWhat:'Služba',lWho:'U koho',lWhen:'Kedy',lWhere:'Kde',lPrice:'Cena',
ics:'Pridať do kalendára',wa:'Poslať si do WhatsAppu',link:'Odkaz na vašu rezerváciu (cez neho ju presuniete alebo zrušíte):',copy:'Kopírovať',copied:'Skopírované',
manage:'Presunúť alebo zrušiť',owner:'Pozrieť túto rezerváciu očami majiteľa',
prev:'Čo by vám prišlo e-mailom',mailH:'Hneď po rezervácii',remH:'Deň pred návštevou',prevNote:'Ukážka: z tejto stránky sa nič neodosiela.',
mail:'Dobrý deň, {name}!\nVaša rezervácia v Studio Bella je potvrdená: {svc}, {when}, {who}.\nAdresa: {addr}\nPresunúť alebo zrušiť: {link}',
rem:'Dobrý deň, {name}! Pripomíname, že zajtra o {time} vás čaká {svc} v Studio Bella ({addr}). Ak nemôžete prísť, zrušte to cez odkaz: {link}',
waText:'Moja rezervácia v Studio Bella: {svc}, {when}, {who}. {addr}. {link}',
mh:'Vaša rezervácia',move:'Presunúť na iný čas',cancel:'Zrušiť rezerváciu',cancelQ:'Naozaj zrušiť túto rezerváciu?',cancelY:'Áno, zrušiť',cancelN:'Nechať tak',
cancelled:'Rezervácia je zrušená',moved:'Hotovo, rezervácia je presunutá.',again:'Rezervovať nový termín',past:'Táto návšteva už prebehla.',
notFound:'Rezerváciu sme nenašli. V ukážke sa rezervácie ukladajú len v prehliadači, v ktorom ste ich urobili.',moveH:'Vyberte nový čas',
openY:'Teraz otvorené, do {t}',openN:'Teraz zatvorené · otvárame {when} o {t}',today:'dnes',tmrw:'zajtra',
fake:'Toto je ukážka, salón aj jeho kontakty sú vymyslené.'},
uk:{title:'Запис',step:'Крок {n} з 5',close:'Закрити',back:'Назад',min:'хв',
s1h:'Оберіть послугу',s1p:'Ціна остаточна. Час приблизний.',
s2h:'До кого записатися?',any:'Будь-хто вільний',anyp:'Покажемо весь вільний час',
s3h:'Оберіть день і час',near:'Найближчий вільний час',morn:'Ранок',aft:'День',eve:'Вечір',
closedDay:'У неділю ми не працюємо.',full:'На цей день усе зайнято.',nearIs:'Найближче вільне: {x}',none:'На найближчі два тижні вільного часу вже немає.',
s4h:'Ваші контакти',demo4:'Це приклад. Запис збережеться лише у вашому браузері й нікуди не надсилається.',fill:'Заповнити тестовими даними',
fname:"Ім'я",fphone:'Телефон',fphx:'Зателефонуємо на цей номер, якщо щось зміниться.',femail:'E-mail',fnote:'Примітка',opt:"(необов'язково)",
cons:'Погоджуюся на обробку даних для запису.',consL:'Як ми захищаємо ваші дані',
eName:"Напишіть, будь ласка, ім'я.",ePhone:'Перевірте номер, наприклад +421 900 123 456.',eEmail:'Перевірте e-mail.',eCons:'Без згоди ми не можемо зберегти запис.',
confirm:'Підтвердити запис',taken:'Цей час щойно зайняв хтось інший. Оберіть, будь ласка, інший.',
s5h:'Запис підтверджено',s5p:'Чекаємо на вас. Номер запису: {id}',
lWhat:'Послуга',lWho:'Майстриня',lWhen:'Коли',lWhere:'Де',lPrice:'Ціна',
ics:'Додати в календар',wa:'Надіслати собі у WhatsApp',link:'Посилання на ваш запис (через нього можна перенести або скасувати):',copy:'Копіювати',copied:'Скопійовано',
manage:'Перенести або скасувати',owner:'Подивитися на цей запис очима власника',
prev:'Що прийде вам на e-mail',mailH:'Одразу після запису',remH:'За день до візиту',prevNote:'Це приклад: із цієї сторінки нічого не надсилається.',
mail:'Добрий день, {name}!\nВаш запис у Studio Bella підтверджено: {svc}, {when}, {who}.\nАдреса: {addr}\nПеренести або скасувати: {link}',
rem:'Добрий день, {name}! Нагадуємо: завтра о {time} у вас {svc} у Studio Bella ({addr}). Якщо не зможете прийти, скасуйте за посиланням: {link}',
waText:'Мій запис у Studio Bella: {svc}, {when}, {who}. {addr}. {link}',
mh:'Ваш запис',move:'Перенести на інший час',cancel:'Скасувати запис',cancelQ:'Точно скасувати цей запис?',cancelY:'Так, скасувати',cancelN:'Залишити',
cancelled:'Запис скасовано',moved:'Готово, запис перенесено.',again:'Записатися на новий час',past:'Цей візит уже відбувся.',
notFound:'Запис не знайдено. У прикладі записи зберігаються лише в тому браузері, де ви їх зробили.',moveH:'Оберіть новий час',
openY:'Зараз відчинено, до {t}',openN:'Зараз зачинено · відчиняємо {when} о {t}',today:'сьогодні',tmrw:'завтра',
fake:'Це приклад: салон і його контакти вигадані.'},
ru:{title:'Запись',step:'Шаг {n} из 5',close:'Закрыть',back:'Назад',min:'мин',
s1h:'Выберите услугу',s1p:'Цена окончательная. Время примерное.',
s2h:'К кому записаться?',any:'Любой свободный мастер',anyp:'Покажем всё свободное время',
s3h:'Выберите день и время',near:'Ближайшее свободное время',morn:'Утро',aft:'День',eve:'Вечер',
closedDay:'В воскресенье мы не работаем.',full:'На этот день всё занято.',nearIs:'Ближайшее свободное: {x}',none:'На ближайшие две недели свободного времени уже нет.',
s4h:'Ваши контакты',demo4:'Это пример. Запись сохранится только в вашем браузере и никуда не отправится.',fill:'Заполнить тестовыми данными',
fname:'Имя',fphone:'Телефон',fphx:'Позвоним на этот номер, если что-то изменится.',femail:'E-mail',fnote:'Комментарий',opt:'(необязательно)',
cons:'Согласен(на) на обработку данных для записи.',consL:'Как мы защищаем ваши данные',
eName:'Напишите, пожалуйста, имя.',ePhone:'Проверьте номер, например +421 900 123 456.',eEmail:'Проверьте e-mail.',eCons:'Без согласия мы не можем сохранить запись.',
confirm:'Подтвердить запись',taken:'Это время только что занял кто-то другой. Выберите, пожалуйста, другое.',
s5h:'Запись подтверждена',s5p:'Ждём вас. Номер записи: {id}',
lWhat:'Услуга',lWho:'Мастер',lWhen:'Когда',lWhere:'Где',lPrice:'Цена',
ics:'Добавить в календарь',wa:'Отправить себе в WhatsApp',link:'Ссылка на вашу запись (по ней можно перенести или отменить):',copy:'Копировать',copied:'Скопировано',
manage:'Перенести или отменить',owner:'Посмотреть эту запись глазами владельца',
prev:'Что придёт вам на почту',mailH:'Сразу после записи',remH:'За день до визита',prevNote:'Это пример: с этой страницы ничего не отправляется.',
mail:'Здравствуйте, {name}!\nВаша запись в Studio Bella подтверждена: {svc}, {when}, {who}.\nАдрес: {addr}\nПеренести или отменить: {link}',
rem:'Здравствуйте, {name}! Напоминаем: завтра в {time} у вас {svc} в Studio Bella ({addr}). Если не сможете прийти, отмените по ссылке: {link}',
waText:'Моя запись в Studio Bella: {svc}, {when}, {who}. {addr}. {link}',
mh:'Ваша запись',move:'Перенести на другое время',cancel:'Отменить запись',cancelQ:'Точно отменить эту запись?',cancelY:'Да, отменить',cancelN:'Оставить',
cancelled:'Запись отменена',moved:'Готово, запись перенесена.',again:'Записаться на новое время',past:'Этот визит уже прошёл.',
notFound:'Запись не найдена. В примере записи хранятся только в том браузере, где вы их сделали.',moveH:'Выберите новое время',
openY:'Сейчас открыто, до {t}',openN:'Сейчас закрыто · откроемся {when} в {t}',today:'сегодня',tmrw:'завтра',
fake:'Это пример: салон и его контакты выдуманы.'},
en:{title:'Booking',step:'Step {n} of 5',close:'Close',back:'Back',min:'min',
s1h:'Choose a service',s1p:'Prices are final. Times are approximate.',
s2h:'Who would you like to see?',any:'Anyone available',anyp:'We show every free time',
s3h:'Choose a day and time',near:'Earliest free time',morn:'Morning',aft:'Afternoon',eve:'Evening',
closedDay:'We are closed on Sundays.',full:'This day is fully booked.',nearIs:'Next free time: {x}',none:'Nothing is free in the next two weeks.',
s4h:'Your details',demo4:'This is a demo. The booking is saved only in your browser and is not sent anywhere.',fill:'Fill in test details',
fname:'Name',fphone:'Phone',fphx:'We will call this number if anything changes.',femail:'Email',fnote:'Note',opt:'(optional)',
cons:'I agree to my details being used for this booking.',consL:'How we protect your data',
eName:'Please enter your name.',ePhone:'Please check the number, e.g. +421 900 123 456.',eEmail:'Please check the email.',eCons:'We can only save the booking with your consent.',
confirm:'Confirm booking',taken:'Someone has just booked this time. Please choose another one.',
s5h:'Booking confirmed',s5p:'See you soon. Booking number: {id}',
lWhat:'Service',lWho:'With',lWhen:'When',lWhere:'Where',lPrice:'Price',
ics:'Add to calendar',wa:'Send to myself on WhatsApp',link:'Link to your booking (use it to reschedule or cancel):',copy:'Copy',copied:'Copied',
manage:'Reschedule or cancel',owner:"See this booking as the owner sees it",
prev:'What you would get by email',mailH:'Right after booking',remH:'The day before',prevNote:'Demo only: nothing is sent from this page.',
mail:'Hello {name},\nyour booking at Studio Bella is confirmed: {svc}, {when}, {who}.\nAddress: {addr}\nReschedule or cancel: {link}',
rem:'Hello {name}, a reminder that your {svc} at Studio Bella ({addr}) is tomorrow at {time}. If you can’t make it, cancel here: {link}',
waText:'My booking at Studio Bella: {svc}, {when}, {who}. {addr}. {link}',
mh:'Your booking',move:'Move to another time',cancel:'Cancel booking',cancelQ:'Cancel this booking?',cancelY:'Yes, cancel',cancelN:'Keep it',
cancelled:'Booking cancelled',moved:'Done, your booking has been moved.',again:'Book a new time',past:'This visit has already taken place.',
notFound:'We couldn’t find this booking. In the demo, bookings are kept only in the browser where they were made.',moveH:'Choose a new time',
openY:'Open now, until {t}',openN:'Closed now · we open {when} at {t}',today:'today',tmrw:'tomorrow',
fake:'This is a demo: the salon and its contacts are made up.'}};

let L='sk',st={},step=0,mode='new',mid=null,opener=null,warn='',cancelAsk=false;
const tx=(k,o)=>{let s=BT[L][k]??'';if(o)for(const x in o)s=s.split('{'+x+'}').join(o[x]);return s};
function h(tag,a,...kids){const e=document.createElement(tag);if(a)for(const k in a){const v=a[k];if(v==null||v===false)continue;
  if(k==='on')for(const ev in v)e.addEventListener(ev,v[ev]);else if(k==='text')e.textContent=v;else if(k in e&&k!=='list'&&k!=='form')e[k]=v;else e.setAttribute(k,v===true?'':v)}
  kids.flat().forEach(c=>c!=null&&c!==false&&e.append(c));return e}
const when=(day,start,l)=>B.fmtDay(day,l||L)+', '+B.hm(start);
const manageUrl=id=>{const u=new URL(location.href);u.search='?b='+id+'&lang='+L;u.hash='';return u.href};
const ownerUrl=b=>new URL('panel/?b='+b.id+'&d='+b.day+'&lang='+L,location.href).href;

/* ---- dialog shell ---- */
const box=h('div',{class:'box'});
const dlg=h('div',{class:'bk',id:'bk',hidden:true,role:'dialog','aria-modal':'true','aria-labelledby':'bkT'},box);
const tTitle=h('b',{id:'bkT'}),tStep=h('small'),xBtn=h('button',{class:'x',type:'button',text:'×',on:{click:close}});
const prog=h('i'),body=h('div',{class:'body'}),backBtn=h('button',{class:'back',type:'button',on:{click:goBack}}),foot=h('div',{class:'foot'},backBtn,h('span'));
box.append(h('div',{class:'top'},tTitle,tStep,xBtn),h('div',{class:'prog'},prog),body,foot);
document.body.append(dlg);
dlg.addEventListener('click',e=>{if(e.target===dlg)close()});
dlg.addEventListener('keydown',e=>{
  if(e.key==='Escape'){e.preventDefault();close();return}
  if(e.key!=='Tab')return;
  const f=[...dlg.querySelectorAll('button,a[href],input,textarea,select,[tabindex="0"]')].filter(x=>!x.disabled&&x.offsetParent!==null);
  if(!f.length)return;const a=f[0],z=f[f.length-1];
  if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
});
const toastEl=h('div',{class:'toast',role:'status',hidden:true});document.body.append(toastEl);let toastT=0;
function toast(s){toastEl.textContent=s;toastEl.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>toastEl.hidden=true,3200)}

function open(svc,who){
  opener=document.activeElement;mode='new';mid=null;warn='';st={svc:null,staff:null,day:null};
  const db=B.load();
  if(svc&&B.svcById(db,svc)&&!B.svcById(db,svc).hidden){st.svc=svc;step=staffList(db).length>1?2:pickOnly(db)}
  else step=1;
  if(st.svc&&who&&staffList(db).some(x=>x.id===who)){st.staff=who;step=3}
  show();
}
function openManage(id){opener=document.activeElement;mode='manage';mid=id;warn='';cancelAsk=false;show()}
function show(){dlg.hidden=false;document.documentElement.style.overflow='hidden';render()}
function close(){dlg.hidden=true;document.documentElement.style.overflow='';
  if(opener&&opener.focus&&document.contains(opener))opener.focus({preventScroll:true})}
const staffList=db=>B.staffFor(db,B.svcById(db,st.svc));
function pickOnly(db){const s=staffList(db);st.staff=s[0].id;return 3}
function goBack(){
  warn='';
  if(mode==='move'){mode='manage';render();return}
  if(step===4){step=3}else if(step===3){step=staffList(B.load()).length>1?2:1;st.day=null}else if(step===2){step=1}
  render();
}
function go(n){step=n;warn='';render()}

function render(){
  tTitle.textContent=mode==='new'?tx('title'):tx('mh');xBtn.setAttribute('aria-label',tx('close'));backBtn.textContent='← '+tx('back');
  const prg=mode==='new';
  tStep.textContent=prg?tx('step',{n:step}):'';prog.parentNode.hidden=!prg;prog.style.width=(step*20)+'%';
  foot.hidden=!((mode==='new'&&step>1&&step<5)||mode==='move');
  body.replaceChildren();
  if(mode==='manage')rManage();
  else if(mode==='move')rTime();
  else [null,rSvc,rStaff,rTime,rForm,rDone][step]();
  body.scrollTop=0;
  const hd=body.querySelector('h3');if(hd){hd.tabIndex=-1;hd.focus({preventScroll:true})}
}
function head(t,p){body.append(h('h3',{text:t}));if(p)body.append(h('p',{class:'hint',text:p}))}
function summary(db){
  const bits=[];if(st.svc)bits.push(B.svcName(db,st.svc,L));
  if(st.staff&&step>2)bits.push(st.staff==='any'?tx('any'):B.staffName(db,st.staff,L));
  if(step>3&&st.day!=null&&st.start!=null)bits.push(when(st.day,st.start));
  if(bits.length)body.append(h('p',{class:'sum',text:bits.join(' · ')}));
}

/* 1: service */
function rSvc(){
  const db=B.load();head(tx('s1h'),tx('s1p'));
  body.append(h('div',{class:'opts'},db.services.filter(s=>!s.hidden).map(s=>h('button',{class:'opt',type:'button','aria-pressed':String(st.svc===s.id),
    on:{click:()=>{if(st.svc!==s.id){st.staff=null;st.day=null}st.svc=s.id;step=staffList(db).length>1?2:pickOnly(db);render()}}},
    h('span',null,h('b',{text:s.name[L]}),h('small',{text:B.dur(s.dur,L)+' · '+B.staffFor(db,s).map(x=>x.name[L]).join(', ')})),
    h('span',{class:'p',text:B.price(s.price,L)})))));
}
/* 2: master */
function rStaff(){
  const db=B.load();summary(db);head(tx('s2h'));
  const role={anna:'m1p',olga:'m2p'},T=typeof window.T==='object'?window.T:(typeof self.T0==='object'?self.T0:null);
  const opts=staffList(db).map(s=>h('button',{class:'opt',type:'button','aria-pressed':String(st.staff===s.id),on:{click:()=>{st.staff=s.id;st.day=null;go(3)}}},
    h('span',null,h('b',{text:s.name[L]}),h('small',{text:T&&T[L]&&T[L][role[s.id]]||''}))));
  opts.push(h('button',{class:'opt',type:'button','aria-pressed':String(st.staff==='any'),on:{click:()=>{st.staff='any';st.day=null;go(3)}}},
    h('span',null,h('b',{text:tx('any')}),h('small',{text:tx('anyp')}))));
  body.append(h('div',{class:'opts'},opts));
}
/* 3: day and time (also used to move a booking) */
function rTime(){
  const db=B.load(),n=B.now(),ex=mode==='move'?mid:undefined;
  if(mode==='move'){const b=db.bookings.find(x=>x.id===mid);body.append(h('p',{class:'sum',text:B.svcName(db,b.svc,L)+' · '+B.staffName(db,b.staff,L)+' · '+when(b.day,b.start)}));head(tx('moveH'))}
  else{summary(db);head(tx('s3h'))}
  if(warn)body.append(h('p',{class:'warn',role:'alert',text:warn}));
  const nx=B.nearest(db,st.svc,st.staff,null,ex);
  if(!st.day)st.day=nx?nx.day:n.day;
  const days=h('div',{class:'days',role:'group','aria-label':tx('s3h')});
  for(let i=0;i<=db.horizon;i++){
    const d=B.addDays(n.day,i),open=B.isOpen(db,d);
    days.append(h('button',{class:'day',type:'button',disabled:!open,'aria-pressed':String(d===st.day),'aria-label':B.fmtDay(d,L),
      on:{click:()=>{st.day=d;warn='';render();const f=body.querySelector('.t');if(f)f.focus({preventScroll:true})}}},
      h('small',{text:B.fmtDay(d,L,{weekday:'short'}).replace('.','')}),h('b',{text:String(+d.slice(8))}),h('small',{text:B.fmtDay(d,L,{month:'short'}).replace('.','')})));
  }
  body.append(days);
  if(nx)body.append(h('button',{class:'near',type:'button',on:{click:()=>{st.day=nx.day;render();const f=body.querySelector('.t');if(f)f.focus({preventScroll:true})}}},tx('near')+': '+when(nx.day,nx.start)));
  const map=B.slotMap(db,st.svc,st.staff,st.day,ex);
  if(!map.size){
    const e=h('div',{class:'empty'},h('p',{text:B.isOpen(db,st.day)?tx('full'):tx('closedDay')}));
    const nd=B.nearest(db,st.svc,st.staff,st.day,ex);
    if(nd)e.append(h('button',{class:'near',type:'button',on:{click:()=>{st.day=nd.day;render()}}},tx('nearIs',{x:when(nd.day,nd.start)})));
    else e.append(h('p',{text:tx('none')}));
    body.append(e);
  }else{
    [['morn',0,720],['aft',720,1020],['eve',1020,1440]].forEach(([k,a,z])=>{
      const ts=[...map].filter(([t])=>t>=a&&t<z);if(!ts.length)return;
      body.append(h('div',{class:'grp'},h('p',{text:tx(k)}),h('div',{class:'times'},ts.map(([t,who])=>h('button',{class:'t',type:'button',text:B.hm(t),
        'aria-label':when(st.day,t),on:{click:()=>pickTime(t,who)}})))));
    });
  }
  const sel=days.querySelector('[aria-pressed=true]');if(sel)requestAnimationFrame(()=>{days.scrollLeft=sel.offsetLeft-days.offsetLeft-8});
}
function pickTime(t,who){
  if(mode==='move'){
    const b=B.moveBooking(mid,st.day,t,who,'client');
    if(!b){warn=tx('taken');render();return}
    mode='manage';warn=tx('moved');render();return;
  }
  st.start=t;st.who=who;go(4);
}
/* 4: contact details */
const PHONE_RX=/^(\+|00)?\d{9,14}$/,MAIL_RX=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function normPhone(v){let d=v.replace(/[\s\-().\/]/g,'');if(/^0\d{9}$/.test(d))d='+421'+d.slice(1);if(d.startsWith('00'))d='+'+d.slice(2);return d}
function rForm(){
  const db=B.load();summary(db);head(tx('s4h'));
  if(warn)body.append(h('p',{class:'warn',role:'alert',text:warn}));
  const f=h('form',{novalidate:true});
  const fld=(name,label,attrs,extra)=>{const err=h('span',{class:'err',id:'e-'+name,'aria-live':'polite'});
    const inp=h(attrs.tag||'input',{name,id:'f-'+name,'aria-describedby':'e-'+name+(extra?' x-'+name:''),...attrs,tag:null});
    return [h('label',{for:'f-'+name},h('span',null,label,attrs.required?'':h('small',{text:' '+tx('opt')})),inp,extra?h('small',{id:'x-'+name,text:extra}):null,err),inp,err]};
  const demo=h('div',{class:'demo4'},h('span',{text:tx('demo4')}),h('button',{type:'button',text:tx('fill'),on:{click:()=>{
    nm[1].value=L==='en'?'Test Client':L==='sk'?'Testovací Klient':L==='uk'?'Тестова Клієнтка':'Тестовая Клиентка';ph[1].value='+421 900 123 456';cs.checked=true;f.querySelector('.btn').focus()}}}));
  const nm=fld('name',tx('fname'),{autocomplete:'name',maxlength:60,required:true});
  const ph=fld('phone',tx('fphone'),{type:'tel',autocomplete:'tel',inputmode:'tel',maxlength:24,required:true,placeholder:'+421 900 123 456'},tx('fphx'));
  const em=fld('email',tx('femail'),{type:'email',autocomplete:'email',maxlength:80});
  const nt=fld('note',tx('fnote'),{tag:'textarea',maxlength:300});
  const cs=h('input',{type:'checkbox',id:'f-cons','aria-describedby':'e-cons'}),cerr=h('span',{class:'err',id:'e-cons','aria-live':'polite'});
  const btn=h('button',{class:'btn',type:'submit',text:tx('confirm')});
  f.append(nm[0],ph[0],em[0],nt[0],h('div',null,h('label',{class:'chk',for:'f-cons'},cs,h('span',null,tx('cons')+' ',h('a',{href:'ochrana.html?lang='+L,target:'_blank',text:tx('consL')}))),cerr),btn);
  body.append(demo,f);
  f.addEventListener('submit',e=>{
    e.preventDefault();if(btn.disabled)return;
    const v={name:nm[1].value.trim(),phone:normPhone(ph[1].value),email:em[1].value.trim(),note:nt[1].value.trim()};
    const checks=[[nm,!v.name,'eName'],[ph,!PHONE_RX.test(v.phone),'ePhone'],[em,v.email&&!MAIL_RX.test(v.email),'eEmail']];
    let first=null;
    checks.forEach(([x,bad,k])=>{x[1].setAttribute('aria-invalid',bad?'true':'false');x[2].textContent=bad?tx(k):'';if(bad&&!first)first=x[1]});
    cerr.textContent=cs.checked?'':tx('eCons');if(!cs.checked&&!first)first=cs;
    if(first){first.focus();return}
    btn.disabled=true;
    const b=B.createBooking({svc:st.svc,staff:st.who,day:st.day,start:st.start,...v,lang:L,src:'web'});
    if(!b){st.start=null;step=3;warn=tx('taken');render();return}
    mid=b.id;go(5);
  });
}
/* 5 and "my booking": details of one booking */
function details(db,b){
  return h('dl',null,h('dt',{text:tx('lWhat')}),h('dd',{text:B.svcName(db,b.svc,L)+' · '+B.dur(b.dur,L)}),
    h('dt',{text:tx('lWho')}),h('dd',{text:B.staffName(db,b.staff,L)}),
    h('dt',{text:tx('lWhen')}),h('dd',{text:when(b.day,b.start)}),
    h('dt',{text:tx('lWhere')}),h('dd',null,B.ADDR),
    h('dt',{text:tx('lPrice')}),h('dd',{text:B.price(b.price,L)}));
}
function icsBtn(db,b,cls){return h('button',{class:cls||'btn ghost',type:'button',text:tx('ics'),on:{click:()=>B.download('studio-bella-'+b.id+'.ics',B.ics(db,b,L,B.svcName(db,b.svc,L)+' · Studio Bella'),'text/calendar')}})}
function rDone(){
  const db=B.load(),b=db.bookings.find(x=>x.id===mid);if(!b){mode='manage';render();return}
  const vars={name:b.name,svc:B.svcName(db,b.svc,L),when:when(b.day,b.start),who:B.staffName(db,b.staff,L),addr:B.ADDR,link:manageUrl(b.id),time:B.hm(b.start)};
  body.append(h('div',{class:'ok'},h('h3',{text:tx('s5h')})),h('p',{class:'hint',text:tx('s5p',{id:b.id})}),details(db,b));
  const lnk=h('input',{readonly:true,value:vars.link,'aria-label':tx('link')});
  body.append(h('div',{class:'acts'},icsBtn(db,b,'btn'),h('a',{class:'btn ghost',href:'https://wa.me/?text='+encodeURIComponent(tx('waText',vars)),target:'_blank',rel:'noopener',text:tx('wa')})),
    h('p',{class:'tiny',text:tx('link')}),
    h('div',{class:'link'},lnk,h('button',{type:'button',text:tx('copy'),on:{click:e=>{const t=e.currentTarget;(navigator.clipboard?navigator.clipboard.writeText(vars.link):Promise.reject()).catch(()=>{lnk.select();document.execCommand('copy')}).finally(()=>{t.textContent=tx('copied')})}}})),
    h('button',{class:'btn ghost',type:'button',style:'width:100%;margin-bottom:6px',text:tx('manage'),on:{click:()=>{mode='manage';cancelAsk=false;warn='';render()}}}),
    h('a',{class:'own',href:ownerUrl(b),target:'_blank',text:tx('owner')+' →'}),
    h('details',null,h('summary',{text:tx('prev')}),
      h('div',{class:'mail'},h('b',{text:tx('mailH')}),tx('mail',vars)),
      h('div',{class:'mail'},h('b',{text:tx('remH')}),tx('rem',vars)),
      h('p',{class:'tiny',text:tx('prevNote')})));
}
function rManage(){
  const db=B.load(),b=db.bookings.find(x=>x.id===mid),n=B.now();
  if(!b){head(tx('mh'),tx('notFound'));body.append(h('button',{class:'btn',type:'button',text:tx('again'),on:{click:()=>open()}}));return}
  if(b.status==='cancelled'){
    body.append(h('div',{class:'ok off'},h('h3',{text:tx('cancelled')})),details(db,b),h('button',{class:'btn',type:'button',text:tx('again'),on:{click:()=>open(b.svc)}}));return;
  }
  body.append(h('h3',{text:tx('mh')}));
  if(warn)body.append(h('p',{class:'hint',role:'status',text:warn}));
  body.append(details(db,b));
  if(b.day<n.day||(b.day===n.day&&b.start<n.min)){body.append(h('p',{class:'hint',text:tx('past')}));return}
  if(cancelAsk){
    body.append(h('p',{class:'warn',text:tx('cancelQ')}),h('div',{class:'acts'},
      h('button',{class:'btn',type:'button',text:tx('cancelY'),on:{click:()=>{B.updateBooking(b.id,{status:'cancelled',cancelledBy:'client'});cancelAsk=false;warn='';render()}}}),
      h('button',{class:'btn ghost',type:'button',text:tx('cancelN'),on:{click:()=>{cancelAsk=false;render()}}})));
    body.querySelector('.acts .btn').focus();return;
  }
  body.append(h('div',{class:'acts'},
    h('button',{class:'btn',type:'button',text:tx('move'),on:{click:()=>{st={svc:b.svc,staff:b.staff,day:b.day};mode='move';warn='';render()}}}),
    h('button',{class:'btn ghost',type:'button',text:tx('cancel'),on:{click:()=>{cancelAsk=true;render()}}})),
    icsBtn(db,b),h('a',{class:'own',href:ownerUrl(b),target:'_blank',text:tx('owner')+' →'}));
}

/* ---- page parts that read the shared data ---- */
function menu(){
  const db=B.load();
  document.querySelectorAll('.menu li[data-svc]').forEach(li=>{
    const s=B.svcById(db,li.dataset.svc);if(!s)return;
    li.hidden=!!s.hidden;
    li.querySelector('.eur').textContent=B.price(s.price,L);
    li.querySelector('small').textContent=B.dur(s.dur,L)+' · '+B.staffFor(db,s).map(x=>x.name[L]).join(', ');
  });
  document.querySelectorAll('.ms button[data-book][data-staff]').forEach(b=>{
    const s=B.svcById(db,b.dataset.book),w=db.staff.find(x=>x.id===b.dataset.staff);
    b.closest('li').hidden=!s||!!s.hidden||!w||!s.staff.includes(w.id);
    if(s&&w)b.setAttribute('aria-label',b.textContent+': '+s.name[L]+' · '+w.name[L]);
  });
}
function openNow(){
  const db=B.load(),n=B.now();let txt;
  const isOpen=B.isOpen(db,n.day)&&n.min>=db.hours.open&&n.min<db.hours.close;
  if(isOpen)txt=tx('openY',{t:B.hm(db.hours.close)});
  else{let d=n.day,i=0;if(!(B.isOpen(db,d)&&n.min<db.hours.open)){do{d=B.addDays(d,1);i++}while(!B.isOpen(db,d)&&i<8)}
    txt=tx('openN',{when:i===0?tx('today'):i===1?tx('tmrw'):B.fmtDay(d,L,{weekday:'long'}),t:B.hm(db.hours.open)})}
  document.querySelectorAll('[data-open]').forEach(e=>{e.textContent=txt;e.classList.toggle('no',!isOpen)});
}
function applyLang(){L=BT[document.documentElement.lang]?document.documentElement.lang:'sk';menu();openNow();if(!dlg.hidden)render()}

document.addEventListener('click',e=>{
  const t=e.target.closest('[data-book]');if(t){e.preventDefault();open(t.dataset.book||null,t.dataset.staff||null);return}
  const f=e.target.closest('[data-fake]');if(f){e.preventDefault();toast(tx('fake'))}
});
B.Store.onChange(()=>{menu();if(!dlg.hidden&&(step===3||mode==='move'||mode==='manage'||step===1))render()});
if(typeof window.setLang==='function'){const o=window.setLang;window.setLang=function(l){o(l);applyLang()}}
applyLang();
setInterval(openNow,60000);
const q=new URLSearchParams(location.search);
if(q.get('b'))openManage(q.get('b').toUpperCase());else if(q.has('book'))open(q.get('book'));
window.BellaBook={open,openManage,toast,BT};
})();
