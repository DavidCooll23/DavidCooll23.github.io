/* Studio Bella demo panel: owner sees everything, a stylist sees only her own bookings.
   Same data layer as the website (../core.js), so a booking made on the site shows up here at once. */
(function(){
'use strict';
const B=window.Bella;
const P={
sk:{title:'Panel salónu',site:'Studio Bella',panel:'panel',owner:'Majiteľka',demo:'Ukážka panelu. Údaje sú vymyslené a sú len vo vašom prehliadači. V skutočnej verzii sa vstupuje heslom.',reset:'Vymazať ukážkové údaje',resetQ:'Vrátiť ukážku do začiatočného stavu? Vaše skúšobné rezervácie zmiznú.',
 tDay:'Deň',tWeek:'Týždeň',tSvc:'Služby a ceny',tCli:'Klienti',tSum:'Prehľad',tSet:'Nastavenia',today:'Dnes',prev:'Predchádzajúci',next:'Ďalší',add:'+ Rezervácia',close:'Zablokovať čas',
 newb:'Nová',canc:'Zrušená',came:'Prišla',noshow:'Neprišla',web:'z webu',phone:'telefonicky',moved:'presunutá',free:'voľno',closedDay:'Salón má zatvorené.',emptyDay:'Žiadne rezervácie.',
 r_lunch:'Obed',r_vac:'Dovolenka',r_sick:'PN',r_other:'Zatvorené',newN:'Nové z webu: {n}',
 svc:'Služba',staff:'Špecialistka',when:'Kedy',price:'Cena',tel:'Telefón',email:'E-mail',note:'Poznámka',src:'Odkiaľ',made:'Vytvorená',
 move:'Presunúť',cancel:'Zrušiť',cancelQ:'Naozaj zrušiť? Čas sa hneď uvoľní na webe.',yes:'Áno, zrušiť',no:'Nie',call:'Zavolať',wa:'WhatsApp',
 fake:'V ukážke sa nikam nevolá. V skutočnom paneli sa tu otvorí telefón alebo WhatsApp s číslom klientky.',
 movedOk:'Presunuté. Pôvodný čas je znova voľný na webe.',cancOk:'Zrušené. Čas je znova voľný na webe.',pick:'Vyberte nový deň a čas',noSlots:'V tento deň nie je voľný čas.',taken:'Tento čas medzitým niekto obsadil. Vyberte iný.',
 day:'Deň',time:'Čas',name:'Meno',save:'Uložiť',addH:'Nová rezervácia',addOk:'Pridané. Tento čas sa už na webe neponúka.',need:'Vyplňte meno, telefón a čas.',
 closeH:'Zablokovať čas',fromD:'Od dňa',toD:'Do dňa',fromT:'Od',toT:'Do',whole:'Celý deň',reason:'Dôvod',closeOk:'Zatvorené. Na webe sa tento čas už neponúka.',clash:'Pozor: v tomto čase sú rezervácie ({n}). Zostávajú, presuňte ich alebo zrušte.',reopen:'Otvoriť znova',reopened:'Čas je znova otvorený.',badRange:'Skontrolujte dátumy a čas.',
 wkH:'Týždeň',bookN:'{n} rez.',freeH:'voľno {t}',
 svcH:'Služby a ceny',dur:'Dĺžka (min)',priceE:'Cena (€)',hide:'Skryť z webu',svcNote:'Nová cena platí len pre nové rezervácie. Kto sa už objednal, platí cenu, ktorú videl pri objednaní.',saved:'Uložené. Zmena je na webe hneď.',
 hoursH:'Otváracie hodiny',open:'Otvára',closes:'Zatvára',daysL:'Pracovné dni',hoursNote:'Platí pre nové rezervácie. Už objednané termíny zostávajú.',
 cliH:'Klienti',search:'Hľadať meno alebo telefón',visits:'Návštevy',last:'Posledná',noshows:'Neprišla',csv:'Stiahnuť do Excelu (CSV)',noCli:'Nikto sa nenašiel.',
 sumH:'Tento týždeň',total:'Rezervácie',fromWeb:'Z webu',noShowsN:'Neprišli',rev:'Tržby za týždeň',revNote:'súčet cien rezervácií okrem zrušených a tých, na ktoré klientka neprišla',loadL:'Vyťaženie špecialistiek',
 notH:'Upozornenia',nEmail:'E-mail majiteľke pri novej rezervácii',nTg:'Aj správa do Telegramu',nPrev:'Takto vyzerá e-mail',mailS:'Nová rezervácia: {svc}, {when}',mailB:'{name}, {tel}\n{svc} u špecialistky {staff}\n{when}\n\nOtvoriť v paneli: studio-bella…/panel/?b={id}',
 fH:'Časté otázky majiteľov',faq:[['Potrebujem nejaký účet?','Stačí bežný bezplatný Google účet. Rezervácie sú vo vašom vlastnom účte a máte ich pod kontrolou vy.'],['Čo ak sa dvaja objednajú na ten istý čas?','Termín dostane ten, kto potvrdí prvý. Druhému web hneď ukáže iné voľné časy, takže dvojitá rezervácia nevznikne.'],['Uvidí to špecialistka vo svojom Google Kalendári?','Áno, v skutočnej verzii môže každá rezervácia prísť aj ako udalosť do jej kalendára v telefóne.'],['Môžem si údaje kedykoľvek zobrať?','Áno. V záložke Klienti je tlačidlo na stiahnutie do Excelu a všetky rezervácie sú aj vo vašej tabuľke.']],
 mOnly:'Špecialistka vidí len svoje rezervácie, bez tržieb a nastavení.',notFound:'Rezervácia sa nenašla. Možno boli ukážkové údaje vymazané.'},
uk:{title:'Панель салону',site:'Studio Bella',panel:'панель',owner:'Власниця',demo:'Приклад панелі. Дані вигадані й зберігаються лише у вашому браузері. У справжній версії вхід за паролем.',reset:'Стерти дані прикладу',resetQ:'Повернути приклад до початкового стану? Ваші тестові записи зникнуть.',
 tDay:'День',tWeek:'Тиждень',tSvc:'Послуги й ціни',tCli:'Клієнти',tSum:'Підсумки',tSet:'Налаштування',today:'Сьогодні',prev:'Попередній',next:'Наступний',add:'+ Запис',close:'Закрити час',
 newb:'Новий',canc:'Скасовано',came:'Прийшла',noshow:'Не прийшла',web:'з сайту',phone:'телефоном',moved:'перенесено',free:'вільно',closedDay:'Салон зачинено.',emptyDay:'Записів немає.',
 r_lunch:'Обід',r_vac:'Відпустка',r_sick:'Лікарняний',r_other:'Зачинено',newN:'Нові з сайту: {n}',
 svc:'Послуга',staff:'Майстриня',when:'Коли',price:'Ціна',tel:'Телефон',email:'E-mail',note:'Коментар',src:'Звідки',made:'Створено',
 move:'Перенести',cancel:'Скасувати',cancelQ:'Справді скасувати? Час одразу звільниться на сайті.',yes:'Так, скасувати',no:'Ні',call:'Подзвонити',wa:'WhatsApp',
 fake:'У прикладі нікуди не дзвонимо. У справжній панелі тут відкриється телефон або WhatsApp із номером клієнтки.',
 movedOk:'Перенесено. Попередній час знову вільний на сайті.',cancOk:'Скасовано. Час знову вільний на сайті.',pick:'Оберіть новий день і час',noSlots:'Цього дня вільного часу немає.',taken:'Цей час щойно хтось зайняв. Оберіть інший.',
 day:'День',time:'Час',name:'Ім’я',save:'Зберегти',addH:'Новий запис',addOk:'Додано. Цей час на сайті вже не пропонується.',need:'Заповніть ім’я, телефон і час.',
 closeH:'Закрити час',fromD:'З дня',toD:'До дня',fromT:'З',toT:'До',whole:'Увесь день',reason:'Причина',closeOk:'Закрито. На сайті цей час більше не пропонується.',clash:'Увага: на цей час є записи ({n}). Вони лишаються, перенесіть або скасуйте їх.',reopen:'Відкрити знову',reopened:'Час знову відкрито.',badRange:'Перевірте дні й час.',
 wkH:'Тиждень',bookN:'{n} зап.',freeH:'вільно {t}',
 svcH:'Послуги й ціни',dur:'Тривалість (хв)',priceE:'Ціна (€)',hide:'Сховати з сайту',svcNote:'Нова ціна діє лише для нових записів. Хто вже записався, платить ту ціну, яку бачив під час запису.',saved:'Збережено. Сайт змінився одразу.',
 hoursH:'Години роботи',open:'Відчиняється',closes:'Зачиняється',daysL:'Робочі дні',hoursNote:'Діє для нових записів. Уже записані візити лишаються.',
 cliH:'Клієнти',search:'Пошук за ім’ям або телефоном',visits:'Візити',last:'Останній',noshows:'Не прийшла',csv:'Завантажити в Excel (CSV)',noCli:'Нікого не знайдено.',
 sumH:'Цей тиждень',total:'Записи',fromWeb:'З сайту',noShowsN:'Не прийшли',rev:'Виручка за тиждень',revNote:'сума цін записів, без скасованих і тих, хто не прийшов',loadL:'Завантаженість майстринь',
 notH:'Сповіщення',nEmail:'E-mail власниці про новий запис',nTg:'І повідомлення в Telegram',nPrev:'Ось такий лист',mailS:'Новий запис: {svc}, {when}',mailB:'{name}, {tel}\n{svc}, майстриня {staff}\n{when}\n\nВідкрити в панелі: studio-bella…/panel/?b={id}',
 fH:'Що питають власники',faq:[['Потрібен якийсь акаунт?','Досить звичайного безкоштовного акаунта Google. Записи зберігаються у вашому власному акаунті, і контролюєте їх ви.'],['А якщо двоє запишуться на той самий час?','Час отримує той, хто підтвердив першим. Другому сайт одразу покаже інший вільний час, тож подвійного запису не буде.'],['Майстриня побачить запис у своєму Google Календарі?','Так, у справжній версії кожен запис може приходити подією в її календар на телефоні.'],['Чи можу я будь-коли забрати дані?','Так. У вкладці «Клієнти» є кнопка завантаження в Excel, а всі записи є й у вашій таблиці.']],
 mOnly:'Майстриня бачить лише свої записи, без виручки й налаштувань.',notFound:'Запис не знайдено. Можливо, дані прикладу стерли.'},
ru:{title:'Панель салона',site:'Studio Bella',panel:'панель',owner:'Владелица',demo:'Пример панели. Данные выдуманные и хранятся только в вашем браузере. В настоящей версии вход по паролю.',reset:'Стереть данные примера',resetQ:'Вернуть пример в начальное состояние? Ваши тестовые записи исчезнут.',
 tDay:'День',tWeek:'Неделя',tSvc:'Услуги и цены',tCli:'Клиенты',tSum:'Итоги',tSet:'Настройки',today:'Сегодня',prev:'Предыдущий',next:'Следующий',add:'+ Запись',close:'Закрыть время',
 newb:'Новая',canc:'Отменена',came:'Пришла',noshow:'Не пришла',web:'с сайта',phone:'по телефону',moved:'перенесена',free:'свободно',closedDay:'Салон закрыт.',emptyDay:'Записей нет.',
 r_lunch:'Обед',r_vac:'Отпуск',r_sick:'Больничный',r_other:'Закрыто',newN:'Новые с сайта: {n}',
 svc:'Услуга',staff:'Мастер',when:'Когда',price:'Цена',tel:'Телефон',email:'E-mail',note:'Комментарий',src:'Откуда',made:'Создана',
 move:'Перенести',cancel:'Отменить',cancelQ:'Точно отменить? Время сразу освободится на сайте.',yes:'Да, отменить',no:'Нет',call:'Позвонить',wa:'WhatsApp',
 fake:'В примере никуда не звоним. В настоящей панели здесь откроется телефон или WhatsApp с номером клиентки.',
 movedOk:'Перенесено. Прежнее время снова свободно на сайте.',cancOk:'Отменено. Время снова свободно на сайте.',pick:'Выберите новый день и время',noSlots:'В этот день свободного времени нет.',taken:'Это время только что кто-то занял. Выберите другое.',
 day:'День',time:'Время',name:'Имя',save:'Сохранить',addH:'Новая запись',addOk:'Добавлено. Это время на сайте больше не предлагается.',need:'Заполните имя, телефон и время.',
 closeH:'Закрыть время',fromD:'С дня',toD:'По день',fromT:'С',toT:'До',whole:'Весь день',reason:'Причина',closeOk:'Закрыто. На сайте это время больше не предлагается.',clash:'Внимание: на это время есть записи ({n}). Они остаются, перенесите или отмените их.',reopen:'Открыть снова',reopened:'Время снова открыто.',badRange:'Проверьте дни и время.',
 wkH:'Неделя',bookN:'{n} зап.',freeH:'свободно {t}',
 svcH:'Услуги и цены',dur:'Длительность (мин)',priceE:'Цена (€)',hide:'Скрыть с сайта',svcNote:'Новая цена действует только для новых записей. Кто уже записался, платит ту цену, которую видел при записи.',saved:'Сохранено. Сайт изменился сразу.',
 hoursH:'Часы работы',open:'Открывается',closes:'Закрывается',daysL:'Рабочие дни',hoursNote:'Действует для новых записей. Уже записанные визиты остаются.',
 cliH:'Клиенты',search:'Поиск по имени или телефону',visits:'Визиты',last:'Последний',noshows:'Не пришла',csv:'Скачать в Excel (CSV)',noCli:'Никого не нашлось.',
 sumH:'Эта неделя',total:'Записи',fromWeb:'С сайта',noShowsN:'Не пришли',rev:'Выручка за неделю',revNote:'сумма цен записей, без отменённых и тех, кто не пришёл',loadL:'Загрузка мастеров',
 notH:'Уведомления',nEmail:'E-mail владелице о новой записи',nTg:'И сообщение в Telegram',nPrev:'Вот такое письмо',mailS:'Новая запись: {svc}, {when}',mailB:'{name}, {tel}\n{svc}, мастер {staff}\n{when}\n\nОткрыть в панели: studio-bella…/panel/?b={id}',
 fH:'Что спрашивают владельцы',faq:[['Нужен какой-то аккаунт?','Хватит обычного бесплатного аккаунта Google. Записи хранятся в вашем собственном аккаунте, и распоряжаетесь ими вы.'],['А если двое запишутся на одно время?','Время получает тот, кто подтвердил первым. Второму сайт сразу покажет другое свободное время, так что двойной записи не будет.'],['Мастер увидит запись в своём Google Календаре?','Да, в настоящей версии каждая запись может приходить событием в её календарь на телефоне.'],['Могу я в любой момент забрать данные?','Да. Во вкладке «Клиенты» есть кнопка выгрузки в Excel, а все записи есть и в вашей таблице.']],
 mOnly:'Мастер видит только свои записи, без выручки и настроек.',notFound:'Запись не найдена. Возможно, данные примера стёрли.'},
en:{title:'Salon panel',site:'Studio Bella',panel:'panel',owner:'Owner',demo:'Demo panel. The data is made up and stays in your browser. The real version has a password login.',reset:'Clear demo data',resetQ:'Reset the demo to its starting state? Your test bookings will be removed.',
 tDay:'Day',tWeek:'Week',tSvc:'Services & prices',tCli:'Clients',tSum:'Summary',tSet:'Settings',today:'Today',prev:'Previous',next:'Next',add:'+ Booking',close:'Block time',
 newb:'New',canc:'Cancelled',came:'Attended',noshow:'No-show',web:'online',phone:'by phone',moved:'moved',free:'free',closedDay:'The salon is closed.',emptyDay:'No bookings.',
 r_lunch:'Lunch',r_vac:'Holiday',r_sick:'Sick leave',r_other:'Closed',newN:'New online: {n}',
 svc:'Service',staff:'Stylist',when:'When',price:'Price',tel:'Phone',email:'Email',note:'Note',src:'Source',made:'Created',
 move:'Move',cancel:'Cancel booking',cancelQ:'Cancel this booking? The time becomes free on the website at once.',yes:'Yes, cancel',no:'No',call:'Call',wa:'WhatsApp',
 fake:'The demo doesn’t call anyone. In the real panel this opens the phone or WhatsApp with the client’s number.',
 movedOk:'Moved. The old time is free on the website again.',cancOk:'Cancelled. The time is free on the website again.',pick:'Pick a new day and time',noSlots:'No free time on this day.',taken:'Someone has just taken this time. Pick another.',
 day:'Day',time:'Time',name:'Name',save:'Save',addH:'New booking',addOk:'Added. This time is no longer offered on the website.',need:'Fill in the name, phone and time.',
 closeH:'Block time',fromD:'From',toD:'To',fromT:'From',toT:'To',whole:'Whole day',reason:'Reason',closeOk:'Blocked. The website no longer offers this time.',clash:'Note: there are bookings during this time ({n}). They stay, so move or cancel them.',reopen:'Open again',reopened:'The time is open again.',badRange:'Check the days and times.',
 wkH:'Week',bookN:'{n} bookings',freeH:'{t} free',
 svcH:'Services & prices',dur:'Duration (min)',priceE:'Price (€)',hide:'Hide from website',svcNote:'A new price applies to new bookings only. Anyone already booked pays the price they saw when booking.',saved:'Saved. The website is already updated.',
 hoursH:'Opening hours',open:'Opens',closes:'Closes',daysL:'Working days',hoursNote:'Applies to new bookings. Existing bookings stay as they are.',
 cliH:'Clients',search:'Search by name or phone',visits:'Visits',last:'Last visit',noshows:'No-shows',csv:'Download for Excel (CSV)',noCli:'No clients found.',
 sumH:'This week',total:'Bookings',fromWeb:'Online',noShowsN:'No-shows',rev:'Takings this week',revNote:'booking prices added up, excluding cancellations and no-shows',loadL:'How busy each stylist is',
 notH:'Notifications',nEmail:'Email the owner about each new booking',nTg:'Also send a Telegram message',nPrev:'What the email looks like',mailS:'New booking: {svc}, {when}',mailB:'{name}, {tel}\n{svc} with {staff}\n{when}\n\nOpen in the panel: studio-bella…/panel/?b={id}',
 fH:'Questions owners ask',faq:[['Do I need an account?','A normal free Google account is enough. The bookings sit in your own account, under your control.'],['What if two people book the same time?','Whoever confirms first gets it. The website shows the second person other free times straight away, so there is no double booking.'],['Will the stylist see it in her Google Calendar?','Yes. In the real version each booking can also go to her phone calendar as an event.'],['Can I take my data with me at any time?','Yes. The Clients tab has a download for Excel, and every booking is also in your own sheet.']],
 mOnly:'A stylist sees only her own bookings, with no takings or settings.',notFound:'Booking not found. The demo data may have been cleared.'}};

let L=B.langNow(),db=B.load();
const q=new URLSearchParams(location.search);
const st={role:'owner',tab:'day',day:B.now().day,hl:q.get('b')||null,search:''};
try{const r=sessionStorage.getItem('bella-role');if(r)st.role=r}catch(e){}
if(st.hl){st.role='owner';const b=db.bookings.find(x=>x.id===st.hl);st.day=b?b.day:(q.get('d')||st.day)}
const tx=(k,v)=>{let s=(P[L]&&P[L][k]!=null?P[L][k]:P.sk[k]);if(v)for(const n in v)s=String(s).split('{'+n+'}').join(v[n]);return s};
function h(t,a,...c){const e=document.createElement(t);if(a)for(const k in a){const v=a[k];if(v==null||v===false)continue;
  if(k==='on')for(const n in v)e.addEventListener(n,v[n]);else if(k==='text')e.textContent=v;else if(k==='class')e.className=v;else if(k in e&&k!=='list')e[k]=v;else e.setAttribute(k,v)}
  c.flat().forEach(x=>{if(x!=null&&x!==false)e.append(x.nodeType?x:document.createTextNode(String(x)))});return e}
const $=id=>document.getElementById(id);
const isOwner=()=>st.role==='owner';
const staffIds=()=>isOwner()?db.staff.map(s=>s.id):[st.role];
const sName=id=>B.staffName(db,id,L);
const vName=id=>B.svcName(db,id,L);
const when=b=>B.fmtDay(b.day,L)+', '+B.hm(b.start)+'–'+B.hm(b.start+b.dur);
function hours(m){const hh=Math.floor(m/60),mm=m%60;const u={sk:['h','min'],uk:['год','хв'],ru:['ч','мин'],en:['h','min']}[L];return [hh?hh+' '+u[0]:'',mm?mm+' '+u[1]:''].filter(Boolean).join(' ')||'0'}
let toastT;function toast(s){const t=$('toast');t.textContent=s;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,4200)}
const fake=()=>toast(tx('fake'));
function refresh(){db=B.load()}

/* ---------- chrome ---------- */
function chrome(){
  document.documentElement.lang=L;document.title=tx('title')+' · Studio Bella';
  $('site').replaceChildren('Studio Bella',h('small',{text:tx('panel')}));$('site').href='../?lang='+L;
  $('demo').textContent=tx('demo');$('reset').textContent=tx('reset');
  $('roles').setAttribute('aria-label',tx('title'));
  $('roles').replaceChildren(...[['owner',tx('owner')],...db.staff.map(s=>[s.id,s.name[L]])].map(([id,t])=>
    h('button',{type:'button','aria-pressed':String(st.role===id),text:t,on:{click:()=>{st.role=id;try{sessionStorage.setItem('bella-role',id)}catch(e){}
      if(!isOwner()&&!['day','week'].includes(st.tab))st.tab='day';render()}}})));
  document.querySelectorAll('[data-set]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.set===L)));
  const tabs=isOwner()?['day','week','svc','cli','sum','set']:['day','week'];
  const lbl={day:'tDay',week:'tWeek',svc:'tSvc',cli:'tCli',sum:'tSum',set:'tSet'};
  $('tabs').replaceChildren(...tabs.map(t=>h('button',{type:'button','aria-current':st.tab===t?'page':null,text:tx(lbl[t]),on:{click:()=>{st.tab=t;render()}}})));
}
function render(){refresh();chrome();const m=$('main');m.replaceChildren();
  ({day:vDay,week:vWeek,svc:vSvc,cli:vCli,sum:vSum,set:vSet}[st.tab]||vDay)(m);
  if(!isOwner())m.append(h('p',{class:'sub',style:'margin-top:20px',text:tx('mOnly')}));
}

/* ---------- day ---------- */
function vDay(m){
  const today=B.now().day,d=st.day;
  const nNew=db.bookings.filter(b=>b.status==='new'&&staffIds().includes(b.staff)).length;
  m.append(h('div',{class:'bar'},
    h('h1',{text:B.fmtDay(d,L)}),
    nNew&&isOwner()?h('span',{class:'tag new',text:tx('newN',{n:nNew})}):null,
    h('div',{class:'nav'},
      h('button',{class:'b',type:'button','aria-label':tx('prev'),text:'‹',on:{click:()=>{st.day=B.addDays(d,-1);render()}}}),
      h('button',{class:'b',type:'button',text:tx('today'),disabled:d===today,on:{click:()=>{st.day=today;render()}}}),
      h('button',{class:'b',type:'button','aria-label':tx('next'),text:'›',on:{click:()=>{st.day=B.addDays(d,1);render()}}})),
    h('button',{class:'b main',type:'button',text:tx('add'),on:{click:()=>dAdd(d)}}),
    h('button',{class:'b',type:'button',text:tx('close'),on:{click:()=>dClose(d)}})));
  const cols=h('div',{class:'cols'});
  staffIds().forEach(sid=>{
    const col=h('div',{class:'col'});
    const bs=db.bookings.filter(b=>b.staff===sid&&b.day===d).sort((a,b)=>a.start-b.start);
    const ks=db.blocks.filter(k=>k.staff===sid&&k.day===d);
    const live=bs.filter(b=>b.status!=='cancelled');
    col.append(h('h3',null,sName(sid),h('small',{text:tx('bookN',{n:live.length})})));
    if(!B.isOpen(db,d)&&!bs.length){col.append(h('p',{class:'empty',text:tx('closedDay')}));cols.append(col);return}
    const items=[];
    bs.forEach(b=>items.push([b.start,0,card(b)]));
    ks.forEach(k=>items.push([k.start,1,h('div',{class:'item blk'},h('span',{class:'tm',text:B.hm(k.start)}),
      h('span',null,h('b',{text:tx('r_'+(k.reason==='lunch'?'lunch':k.reason))}),h('span',{class:'s',text:B.hm(k.start)+'–'+B.hm(k.end)})),
      k.reason!=='lunch'||isOwner()?h('button',{class:'b',type:'button',text:tx('reopen'),style:'padding:6px 10px;min-height:0;font-size:.8125rem',on:{click:()=>{const x=B.load();x.blocks=x.blocks.filter(z=>z.id!==k.id);B.save(x);toast(tx('reopened'));render()}}}):h('span'))]));
    if(B.isOpen(db,d)&&d>=today)B.periods(db,sid,d).forEach(([a,e])=>{if(d===today){const n=B.now().min;if(e<=n)return;a=Math.max(a,Math.ceil(n/15)*15)}
      if(e-a>=30)items.push([a,2,h('div',{class:'item free'},h('span',{class:'tm',text:B.hm(a)}),h('span',{text:tx('free')+' '+B.hm(a)+'–'+B.hm(e)}),h('span'))])});
    items.sort((x,y)=>x[0]-y[0]||x[1]-y[1]).forEach(x=>col.append(x[2]));
    if(!items.length)col.append(h('p',{class:'empty',text:tx('emptyDay')}));
    cols.append(col);
  });
  m.append(cols);
  if(st.hl){const b=db.bookings.find(x=>x.id===st.hl);const id=st.hl;st.hl=null;
    if(b){setTimeout(()=>{const el=document.querySelector('[data-id="'+id+'"]');if(el)el.scrollIntoView({block:'center'});dBooking(id)},50)}else toast(tx('notFound'))}
}
function card(b){
  const today=B.now().day;
  const tag=b.status==='cancelled'?h('span',{class:'tag',text:tx('canc')}):b.status==='new'?h('span',{class:'tag new',text:tx('newb')}):
    b.came===true?h('span',{class:'tag ok',text:tx('came')}):b.came===false?h('span',{class:'tag no',text:tx('noshow')}):h('span');
  return h('button',{type:'button',class:'item'+(b.status==='cancelled'?' off':'')+(b.id===st.hl?' hl':''),'data-id':b.id,on:{click:()=>dBooking(b.id)}},
    h('span',{class:'tm'},B.hm(b.start),h('small',{text:B.hm(b.start+b.dur)})),
    h('span',null,h('b',{text:b.name}),h('span',{class:'s',text:vName(b.svc)+' · '+(b.src==='web'?tx('web'):tx('phone'))+(b.moved?' · '+tx('moved'):'')})),
    tag);
}

/* ---------- dialogs ---------- */
function openD(title,...body){$('dt').textContent=title;$('db').replaceChildren(...body);const d=$('dlg');if(!d.open)d.showModal()}
function closeD(){const d=$('dlg');if(d.open)d.close()}
$('dx').onclick=closeD;
$('dlg').addEventListener('click',e=>{if(e.target===$('dlg'))closeD()});

function dBooking(id){
  let b=B.findBooking(id);if(!b){toast(tx('notFound'));return}
  if(b.status==='new'){B.updateBooking(id,{status:'seen'});b=B.findBooking(id);render()}
  const today=B.now().day;
  const dl=h('dl',null,
    h('dt',{text:tx('svc')}),h('dd',{text:vName(b.svc)}),
    h('dt',{text:tx('staff')}),h('dd',{text:sName(b.staff)}),
    h('dt',{text:tx('when')}),h('dd',{text:when(b)}),
    isOwner()?[h('dt',{text:tx('price')}),h('dd',{text:B.price(b.price,L)})]:null,
    h('dt',{text:tx('tel')}),h('dd',{text:b.phone}),
    b.email?[h('dt',{text:tx('email')}),h('dd',{text:b.email})]:null,
    b.note?[h('dt',{text:tx('note')}),h('dd',{text:b.note})]:null,
    h('dt',{text:tx('src')}),h('dd',{text:(b.src==='web'?tx('web'):tx('phone'))+(b.moved?' · '+tx('moved'):'')}),
    b.created?[h('dt',{text:tx('made')}),h('dd',{text:new Date(b.created).toLocaleString(L==='en'?'en-GB':L+'-'+(L==='uk'?'UA':L.toUpperCase()),{timeZone:'Europe/Bratislava',dateStyle:'short',timeStyle:'short'})})]:null);
  const acts=h('div',{class:'acts'},
    h('button',{class:'b',type:'button',text:tx('call'),on:{click:fake}}),
    h('button',{class:'b',type:'button',text:tx('wa'),on:{click:fake}}));
  const area=h('div');
  if(b.status!=='cancelled'){
    if(b.day<=today)acts.append(
      h('button',{class:'b',type:'button','aria-pressed':String(b.came===true),text:'✓ '+tx('came'),on:{click:()=>{B.updateBooking(id,{came:true});render();dBooking(id)}}}),
      h('button',{class:'b',type:'button','aria-pressed':String(b.came===false),text:tx('noshow'),on:{click:()=>{B.updateBooking(id,{came:false});render();dBooking(id)}}}));
    if(b.day>=today){
      acts.append(h('button',{class:'b main',type:'button',text:tx('move'),on:{click:()=>moveUI(area,b)}}),
        h('button',{class:'b danger',type:'button',text:tx('cancel'),on:{click:()=>area.replaceChildren(h('p',{class:'warn',text:tx('cancelQ')}),
          h('div',{class:'acts'},h('button',{class:'b danger',type:'button',text:tx('yes'),on:{click:()=>{B.updateBooking(id,{status:'cancelled',cancelledBy:'salon'});closeD();render();toast(tx('cancOk'))}}}),
            h('button',{class:'b',type:'button',text:tx('no'),on:{click:()=>area.replaceChildren()}})))}}));
    }
  }
  openD(b.name,dl,acts,area);
}
function dayOptions(from){const out=[];for(let i=0,d=from;i<=db.horizon;i++,d=B.addDays(d,1))if(B.isOpen(db,d))out.push(d);return out}
function moveUI(area,b){
  const today=B.now().day;let day=b.day>=today?b.day:today,staff=b.staff,pick=null;
  const svc=B.svcById(db,b.svc);
  const daySel=h('select',null,...dayOptions(today).map(d=>h('option',{value:d,text:B.fmtDay(d,L),selected:d===day})));
  const stSel=isOwner()&&svc&&svc.staff.length>1?h('select',null,...svc.staff.map(s=>h('option',{value:s,text:sName(s),selected:s===staff}))):null;
  const times=h('div',{class:'times'}),msg=h('p');
  const save=h('button',{class:'b main',type:'button',text:tx('save'),disabled:true,on:{click:()=>{
    const r=B.moveBooking(b.id,day,pick,staff,'salon');
    if(!r){msg.className='warn';msg.textContent=tx('taken');refresh();draw();return}
    closeD();st.day=day;render();toast(tx('movedOk'))}}});
  function draw(){pick=null;save.disabled=true;const db2=B.load();
    const ts=B.slots(db2,staff,day,b.dur,b.id);
    times.replaceChildren(...ts.map(t=>h('button',{type:'button',text:B.hm(t),'aria-pressed':'false',on:{click:e=>{pick=t;save.disabled=false;times.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===e.currentTarget)))}}})));
    if(!ts.length)times.replaceChildren(h('p',{class:'sub',text:tx('noSlots')}));}
  daySel.onchange=()=>{day=daySel.value;msg.textContent='';draw()};
  if(stSel)stSel.onchange=()=>{staff=stSel.value;draw()};
  area.replaceChildren(h('h2',{text:tx('pick'),style:'margin-top:16px'}),h('div',{class:'row'},h('label',null,tx('day'),daySel),stSel?h('label',null,tx('staff'),stSel):null),times,msg,save);
  draw();
}
function dAdd(d0){
  const today=B.now().day,days=dayOptions(today);let day=days.includes(d0)?d0:days[0],pick=null;
  const svcs=db.services.filter(s=>!s.hidden&&s.staff.some(x=>staffIds().includes(x)));
  const svSel=h('select',null,...svcs.map(s=>h('option',{value:s.id,text:s.name[L]+' · '+B.dur(s.dur,L)})));
  const stSel=h('select');const dSel=h('select',null,...days.map(d=>h('option',{value:d,text:B.fmtDay(d,L),selected:d===day})));
  const nm=h('input',{autocomplete:'off'}),ph=h('input',{type:'tel',autocomplete:'off',value:'+421 '});
  const times=h('div',{class:'times'}),msg=h('p');
  function fillStaff(){const s=B.svcById(db,svSel.value);stSel.replaceChildren(...s.staff.filter(x=>staffIds().includes(x)).map(x=>h('option',{value:x,text:sName(x)})))}
  function draw(){pick=null;const s=B.svcById(B.load(),svSel.value);const ts=B.slots(B.load(),stSel.value,dSel.value,s.dur);
    times.replaceChildren(...ts.map(t=>h('button',{type:'button',text:B.hm(t),'aria-pressed':'false',on:{click:e=>{pick=t;times.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===e.currentTarget)))}}})));
    if(!ts.length)times.replaceChildren(h('p',{class:'sub',text:tx('noSlots')}))}
  svSel.onchange=()=>{fillStaff();draw()};stSel.onchange=draw;dSel.onchange=draw;fillStaff();
  const save=h('button',{class:'b main',type:'button',text:tx('save'),on:{click:()=>{
    if(!nm.value.trim()||ph.value.replace(/\D/g,'').length<9||pick==null){msg.className='warn';msg.textContent=tx('need');return}
    const r=B.createBooking({svc:svSel.value,staff:stSel.value,day:dSel.value,start:pick,name:nm.value.trim(),phone:ph.value.trim(),src:'phone',status:'seen',lang:L});
    if(!r){msg.className='warn';msg.textContent=tx('taken');draw();return}
    closeD();st.day=dSel.value;render();toast(tx('addOk'))}}});
  openD(tx('addH'),h('div',{class:'form'},h('div',{class:'row'},h('label',null,tx('svc'),svSel),h('label',null,tx('staff'),stSel)),
    h('label',null,tx('day'),dSel),times,h('div',{class:'row'},h('label',null,tx('name'),nm),h('label',null,tx('tel'),ph)),msg,save));
  draw();
}
function dClose(d0){
  const today=B.now().day;const d=d0>=today?d0:today;
  const stSel=h('select',null,...staffIds().map(x=>h('option',{value:x,text:sName(x)})));
  const f=h('input',{type:'date',value:d,min:today}),t=h('input',{type:'date',value:d,min:today});
  const tf=h('input',{type:'time',value:'14:00',step:900}),tt=h('input',{type:'time',value:'16:00',step:900});
  const whole=h('input',{type:'checkbox'});whole.onchange=()=>{tf.disabled=tt.disabled=whole.checked};
  const rs=h('select',null,...['other','vac','sick'].map(r=>h('option',{value:r,text:tx('r_'+r)})));
  rs.onchange=()=>{if(rs.value!=='other'&&!whole.checked){whole.checked=true;whole.onchange()}};
  const msg=h('p');
  const save=h('button',{class:'b main',type:'button',text:tx('save'),on:{click:()=>{
    const toMin=v=>{const [a,b]=v.split(':').map(Number);return a*60+b};
    const a=whole.checked?db.hours.open:toMin(tf.value||'0:0'),e=whole.checked?db.hours.close:toMin(tt.value||'0:0');
    if(!f.value||!t.value||t.value<f.value||e<=a||B.addDays(f.value,62)<t.value){msg.className='warn';msg.textContent=tx('badRange');return}
    const x=B.load();let clash=0;
    for(let dd=f.value;dd<=t.value;dd=B.addDays(dd,1)){
      x.blocks.push({id:'K'+Date.now().toString(36)+dd.replace(/-/g,''),staff:stSel.value,day:dd,start:a,end:e,reason:rs.value});
      clash+=x.bookings.filter(b=>b.staff===stSel.value&&b.day===dd&&b.status!=='cancelled'&&b.start<e&&b.start+b.dur>a).length}
    B.save(x);st.day=f.value;render();
    if(clash){msg.className='warn';msg.textContent=tx('clash',{n:clash});save.disabled=true}else{closeD();toast(tx('closeOk'))}}}});
  openD(tx('closeH'),h('div',{class:'form'},isOwner()?h('label',null,tx('staff'),stSel):null,
    h('div',{class:'row'},h('label',null,tx('fromD'),f),h('label',null,tx('toD'),t)),
    h('label',{class:'chk'},whole,tx('whole')),
    h('div',{class:'row'},h('label',null,tx('fromT'),tf),h('label',null,tx('toT'),tt)),
    h('label',null,tx('reason'),rs),msg,save));
}

/* ---------- week ---------- */
function weekDays(){const m=B.monday(st.day);return [0,1,2,3,4,5,6].map(i=>B.addDays(m,i))}
function freeMin(sid,d){const today=B.now();if(!B.isOpen(db,d)||d<today.day)return 0;
  return B.periods(db,sid,d).reduce((s,[a,e])=>{if(d===today.day)a=Math.max(a,today.min);return s+(e-a>=30?e-a:0)},0)}
function vWeek(m){
  const days=weekDays(),today=B.now().day;
  m.append(h('div',{class:'bar'},h('h1',{text:B.fmtDay(days[0],L,{day:'numeric',month:'long'})+' – '+B.fmtDay(days[6],L,{day:'numeric',month:'long'})}),
    h('div',{class:'nav'},
      h('button',{class:'b',type:'button','aria-label':tx('prev'),text:'‹',on:{click:()=>{st.day=B.addDays(st.day,-7);render()}}}),
      h('button',{class:'b',type:'button',text:tx('today'),on:{click:()=>{st.day=today;render()}}}),
      h('button',{class:'b',type:'button','aria-label':tx('next'),text:'›',on:{click:()=>{st.day=B.addDays(st.day,7);render()}}}))));
  const ids=staffIds();
  const tb=h('tbody',null,...days.map(d=>{const open=B.isOpen(db,d);
    return h('tr',{class:(d===today?'today ':'')+(open?'':'closed')},h('td',{text:B.fmtDay(d,L,{weekday:'short',day:'numeric',month:'numeric'})}),
      ...ids.map(sid=>{const n=db.bookings.filter(b=>b.staff===sid&&b.day===d&&b.status!=='cancelled').length;
        return h('td',{'data-l':sName(sid),on:open?{click:()=>{st.day=d;st.tab='day';render()}}:null},
          open?[tx('bookN',{n}),h('small',{text:d<today?'':tx('freeH',{t:hours(freeMin(sid,d))})})]:'—')}))}));
  m.append(h('div',{class:'tbl-wrap'},h('table',{class:'wk'},h('thead',null,h('tr',null,h('th',{text:tx('day')}),...ids.map(s=>h('th',{text:sName(s)})))),tb)));
}

/* ---------- services & settings ---------- */
function vSvc(m){
  m.append(h('h1',{text:tx('svcH')}),h('p',{class:'sub',style:'margin:6px 0 14px',text:tx('svcNote')}));
  const rows=db.services.map(s=>{
    const du=h('input',{type:'number',min:15,max:300,step:15,value:s.dur}),pr=h('input',{type:'number',min:0,max:999,step:1,value:s.price}),hi=h('input',{type:'checkbox',checked:!!s.hidden});
    return {s,du,pr,hi,tr:h('tr',null,h('td',null,h('b',{text:s.name[L]}),h('small',{class:'sub',style:'display:block',text:s.staff.map(sName).join(', ')})),
      h('td',{'data-l':tx('dur')},du),h('td',{'data-l':tx('priceE')},pr),h('td',null,h('label',{class:'chk'},hi,tx('hide'))))}});
  const msg=h('p',{class:'ok-msg',role:'status'});
  m.append(h('div',{class:'tbl-wrap'},h('table',null,h('thead',null,h('tr',null,h('th',{text:tx('svc')}),h('th',{text:tx('dur')}),h('th',{text:tx('priceE')}),h('th',{text:tx('hide')}))),h('tbody',null,...rows.map(r=>r.tr)))),
    h('p',{style:'margin-top:12px'},h('button',{class:'b main',type:'button',text:tx('save'),on:{click:()=>{
      const x=B.load();rows.forEach(r=>{const s=x.services.find(z=>z.id===r.s.id);
        const du=Math.round(+r.du.value/15)*15,pr=Math.round(+r.pr.value);
        if(du>=15&&du<=300)s.dur=du;if(pr>=0&&pr<=999)s.price=pr;s.hidden=r.hi.checked});
      B.save(x);refresh();msg.textContent=tx('saved')}}})),msg);
}
function vSet(m){
  m.append(h('h1',{text:tx('tSet')}));
  const toT=v=>B.hm(v),toM=v=>{const [a,b]=v.split(':').map(Number);return a*60+b};
  const o=h('input',{type:'time',value:toT(db.hours.open),step:900}),c=h('input',{type:'time',value:toT(db.hours.close),step:900});
  const dn=[1,2,3,4,5,6,0].map(n=>{const ref=B.addDays('2026-11-23',(n+6)%7);return [n,h('input',{type:'checkbox',checked:db.hours.days.includes(n)}),B.fmtDay(ref,L,{weekday:'short'})]});
  const msg=h('p',{class:'ok-msg',role:'status'});
  m.append(h('h2',{text:tx('hoursH')}),h('div',{class:'box'},
    h('div',{class:'row'},h('label',null,tx('open'),o),h('label',null,tx('closes'),c)),
    h('p',{style:'margin:14px 0 6px;font-weight:600;font-size:.875rem',text:tx('daysL')}),
    h('div',{class:'row'},...dn.map(([,cb,t])=>h('label',{class:'chk'},cb,t))),
    h('p',{class:'sub',style:'margin:12px 0',text:tx('hoursNote')}),
    h('button',{class:'b main',type:'button',text:tx('save'),on:{click:()=>{
      const a=toM(o.value||'9:00'),e=toM(c.value||'19:00');if(e<=a+60)return;
      const x=B.load();x.hours.open=a;x.hours.close=e;x.hours.days=dn.filter(d=>d[1].checked).map(d=>d[0]);B.save(x);refresh();msg.textContent=tx('saved')}}}),msg));
  // notifications
  const ne=h('input',{type:'checkbox',checked:db.notify.email}),nt=h('input',{type:'checkbox',checked:db.notify.tg});
  const keep=()=>{const x=B.load();x.notify={email:ne.checked,tg:nt.checked};B.save(x)};ne.onchange=nt.onchange=keep;
  const sample=db.bookings.filter(b=>b.src==='web'&&b.status!=='cancelled'&&b.day>=B.now().day).sort((a,b)=>a.day.localeCompare(b.day)||a.start-b.start)[0];
  const v=sample?{svc:vName(sample.svc),when:when(sample),name:sample.name,tel:sample.phone,staff:sName(sample.staff),id:sample.id}:null;
  m.append(h('h2',{text:tx('notH')}),h('div',{class:'box'},h('label',{class:'chk'},ne,tx('nEmail')),h('label',{class:'chk',style:'margin-top:8px'},nt,tx('nTg')),
    v?h('details',{style:'margin-top:12px'},h('summary',{text:tx('nPrev'),style:'font-weight:600;cursor:pointer'}),h('div',{class:'mail'},h('b',{text:tx('mailS',v)}),'\n'+tx('mailB',v))):null));
  // fears
  m.append(h('h2',{text:tx('fH')}),h('div',{class:'faq'},...tx('faq').map(([qq,a])=>h('details',null,h('summary',{text:qq}),h('p',{text:a})))));
}

/* ---------- clients ---------- */
function clients(){const map=new Map();const today=B.now().day;
  db.bookings.filter(b=>b.status!=='cancelled').forEach(b=>{const k=b.phone.replace(/\D/g,'');let c=map.get(k);
    if(!c){c={name:b.name,phone:b.phone,email:b.email,visits:0,last:'',ns:0};map.set(k,c)}
    if(b.day<=today){c.visits+=b.came===false?0:1;if(b.day>c.last)c.last=b.day}if(b.came===false)c.ns++;if(b.email)c.email=b.email});
  return [...map.values()].sort((a,b)=>b.last.localeCompare(a.last))}
function vCli(m){
  const all=clients();
  const inp=h('input',{class:'search',type:'search',placeholder:tx('search'),value:st.search,'aria-label':tx('search')});
  const tb=h('tbody');
  function draw(){const qv=inp.value.trim().toLowerCase(),qd=qv.replace(/\D/g,'');st.search=inp.value;
    const list=all.filter(c=>!qv||c.name.toLowerCase().includes(qv)||(qd&&c.phone.replace(/\D/g,'').includes(qd)));
    tb.replaceChildren(...list.map(c=>h('tr',null,h('td',null,h('b',{text:c.name})),h('td',{'data-l':tx('tel'),text:c.phone}),h('td',{'data-l':tx('visits'),text:String(c.visits)}),
      h('td',{'data-l':tx('last'),text:c.last?B.fmtDate(c.last,L):'—'}),h('td',{'data-l':tx('noshows'),text:String(c.ns)}))));
    if(!list.length)tb.replaceChildren(h('tr',null,h('td',{colspan:5,text:tx('noCli')})))}
  inp.oninput=draw;draw();
  const csv=()=>{const esc=v=>'"'+String(v).replace(/"/g,'""')+'"';
    const rows=[[tx('name'),tx('tel'),tx('email'),tx('visits'),tx('last'),tx('noshows')],...all.map(c=>[c.name,c.phone,c.email,c.visits,c.last,c.ns])];
    B.download('studio-bella-klienti.csv','﻿'+rows.map(r=>r.map(esc).join(';')).join('\r\n'),'text/csv;charset=utf-8')};
  m.append(h('div',{class:'bar'},h('h1',{text:tx('cliH')+' · '+all.length}),h('button',{class:'b',type:'button',text:tx('csv'),on:{click:csv}})),inp,
    h('div',{class:'tbl-wrap'},h('table',null,h('thead',null,h('tr',null,...['name','tel','visits','last','noshows'].map(k=>h('th',{text:tx(k)})))),tb)));
}

/* ---------- summary ---------- */
function vSum(m){
  const days=weekDays().slice(0,7);
  const wk=db.bookings.filter(b=>days.includes(b.day)&&b.status!=='cancelled');
  const web=wk.filter(b=>b.src==='web').length,ns=wk.filter(b=>b.came===false).length;
  const rev=wk.filter(b=>b.came!==false).reduce((s,b)=>s+b.price,0);
  m.append(h('div',{class:'bar'},h('h1',{text:tx('sumH')}),h('span',{class:'sub',text:B.fmtDay(days[0],L,{day:'numeric',month:'long'})+' – '+B.fmtDay(days[6],L,{day:'numeric',month:'long'})})),
    h('div',{class:'cards'},
      h('div',{class:'card'},h('b',{text:String(wk.length)}),h('span',{text:tx('total')})),
      h('div',{class:'card'},h('b',{text:wk.length?Math.round(web/wk.length*100)+' %':'—'}),h('span',{text:tx('fromWeb')})),
      h('div',{class:'card'},h('b',{text:String(ns)}),h('span',{text:tx('noShowsN')})),
      h('div',{class:'card'},h('b',{text:B.price(rev,L)}),h('span',{text:tx('rev')}),h('small',{class:'sub',style:'display:block;font-size:.75rem',text:tx('revNote')}))),
    h('h2',{text:tx('loadL')}),
    h('div',{class:'cards'},...db.staff.map(s=>{
      let cap=0,used=0;days.forEach(d=>{if(!B.isOpen(db,d))return;cap+=db.hours.close-db.hours.open-db.blocks.filter(k=>k.staff===s.id&&k.day===d).reduce((x,k)=>x+k.end-k.start,0);
        used+=wk.filter(b=>b.staff===s.id&&b.day===d).reduce((x,b)=>x+b.dur,0)});
      const p=cap>0?Math.min(100,Math.round(used/cap*100)):0;
      return h('div',{class:'card'},h('b',{text:p+' %'}),h('span',{text:s.name[L]}),h('div',{class:'meter'},h('i',{style:'width:'+p+'%'})))})));
}

/* ---------- wiring ---------- */
document.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{L=b.dataset.set;try{localStorage.lang=L}catch(e){}render()});
$('reset').onclick=()=>{if(confirm(tx('resetQ'))){B.reset();st.day=B.now().day;render()}};
B.Store.onChange(()=>{const open=$('dlg').open;render();if(open){}});
render();
window.BellaPanel={render,st};
})();
