/* SVG STAR */
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z"/></svg>';

/* DATA */
const destinations=[
  {n:'Kashmir',p:'65,000',img:'kashmir.webp'},
  {n:'Manali',p:'55,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/manali.webp'},
  {n:'Shimla',p:'52,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/shimla.webp'},
  {n:'Kerala',p:'60,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/kerala.webp'},
  {n:'Delhi',p:'45,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/delhi.webp'},
  {n:'Agra',p:'50,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/agra.webp'},
  {n:'Jaipur',p:'48,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/jaipur.webp'},
  {n:'Varanasi',p:'47,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/banaras.webp'},
  {n:'Ayodhya',p:'46,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/ayodhya.webp'},
  {n:'Haridwar',p:'45,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/haridwar.webp'},
  {n:'Munnar',p:'58,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/munnar.webp'},
  {n:'Ooty',p:'55,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/ooty.webp'},
  {n:'Nainital',p:'50,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/nainital.webp'},
  {n:'Amritsar',p:'48,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/amritsar.webp'}
];

const packages=[
  {t:'North India Discovery',d:'22 Days',badge:'Bestseller',price:'88,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/delhi.webp',
   route:'Mauritius→Delhi→Lucknow→Ayodhya→Agra→Mathura→Vrindavan→Jaipur→Amritsar→Manali→Shimla→Chandigarh→Haridwar→Delhi',
   incl:['Flights','3-Star Hotels','Breakfast','Transport','Sightseeing','Visa','Tour Leader']},
  {t:'South India Experience',d:'12 Days',badge:'Popular',price:'75,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/kerala.webp',
   route:'Kerala→Munnar→Alleppey→Kochi→Ooty→Kodaikanal→Madurai→Rameswaram',
   incl:['Hotels','Breakfast','Transfers','Sightseeing']},
  {t:'Manali Winter Escape',d:'11 Days',badge:'Winter Special',price:'80,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/manali.webp',
   route:'Delhi→Shimla→Manali→Solang Valley→Rohtang Pass',
   incl:['Hotel','Breakfast + Dinner','Private Cab']},
  {t:'Sri Lanka Holiday',d:'8 Days',badge:'International',price:'67,266',img:'https://ik.imagekit.io/g8nndpy6v/JST/srilanka.webp',
   route:'Kandy→Nuwara Eliya→Bentota→Colombo',
   incl:['Flights','Hotels','Visa','Transfers']}
];

const testimonials=[
  {r:5,t:'North India trip covering all 12 destinations was perfectly planned. Every hotel, transfer and sightseeing was organized beautifully.',a:'Priya Ramnarain',l:'Port Louis'},
  {r:5,t:'The pilgrimage tour to Varanasi and Ayodhya was deeply spiritual and beautifully organized.',a:'Rajesh Boodhun',l:'Curepipe'},
  {r:5,t:'South India tour was a dream come true. Kerala backwaters, Munnar tea gardens, Rameswaram temple unforgettable.',a:'Anita Gobin',l:'Rose Hill'},
  {r:5,t:'First time visiting India and JST made it completely stress free.',a:'Vikram Luchoomun',l:'Quatre Bornes'}
];

const faqs=[
  {q:'How do I book a trip?',a:'Reach us via WhatsApp, email or the website inquiry form — we reply within 24 hours.'},
  {q:'Do you provide visa assistance?',a:'Yes, we offer specialized visa assistance for passport holders.'},
  {q:'Can I customize my itinerary?',a:'Yes, every itinerary is fully tailored to your dates, budget and preferences.'},
  {q:'Do you arrange airport transfers?',a:'Yes, private airport transfers are included in most of our packages.'},
  {q:'Do you offer travel insurance?',a:'Yes, our insurance covers medical, cancellation, delay and baggage.'}
];

/* RENDER CAROUSEL */
const track=document.getElementById('carTrack');
track.innerHTML=destinations.map(d=>`
  <div class="slide">
    <div class="dest-card">
      <img src="${d.img}" alt="${d.n}" onerror="this.src='https://placehold.co/520x720/00468B/ffffff?text=${d.n}'" />
      <div class="overlay">
        <h3>${d.n}</h3>
        <div class="price">from MUR ${d.p}</div>
        <a class="btn btn-gold inquire" href="#contact">Inquire Now</a>
      </div>
    </div>
  </div>`).join('');

/* CAROUSEL ENGINE */
(function(){
  const viewport=track.parentElement;
  let perView=4, index=0, timer=null;
  function calcPerView(){const w=window.innerWidth;perView=w<=760?1:w<=980?2:4;}
  function maxIndex(){return Math.max(0,destinations.length-perView);}
  function update(){
    const slideW=viewport.clientWidth/perView;
    track.style.transform=`translateX(${-index*slideW}px)`;
    document.querySelectorAll('.car-dots button').forEach((b,i)=>b.classList.toggle('active',i===index));
  }
  function buildDots(){
    const dots=document.getElementById('carDots');
    dots.innerHTML='';
    for(let i=0;i<=maxIndex();i++){
      const b=document.createElement('button');
      b.addEventListener('click',()=>{index=i;update();restart();});
      dots.appendChild(b);
    }
  }
  function go(dir){index+=dir;if(index<0)index=maxIndex();if(index>maxIndex())index=0;update();}
  function restart(){clearInterval(timer);timer=setInterval(()=>go(1),4000);}
  document.getElementById('carNext').addEventListener('click',()=>{go(1);restart();});
  document.getElementById('carPrev').addEventListener('click',()=>{go(-1);restart();});
  const car=document.getElementById('carousel');
  car.addEventListener('mouseenter',()=>clearInterval(timer));
  car.addEventListener('mouseleave',restart);
  function init(){calcPerView();if(index>maxIndex())index=maxIndex();buildDots();update();}
  window.addEventListener('resize',init);
  init();restart();
})();

/* RENDER PACKAGES */
document.getElementById('pkgGrid').innerHTML=packages.map((p,i)=>`
  <div class="pkg-card">
    <div class="pkg-img">
      <img src="${p.img}" alt="${p.t}" onerror="this.src='https://placehold.co/700x440/00468B/ffffff?text=${encodeURIComponent(p.t)}'" />
      <span class="badge">${p.badge}</span>
    </div>
    <div class="pkg-body">
      <h3>${p.t}</h3>
      <div class="pkg-meta">${p.d}</div>
      <div class="pkg-route">${p.route}</div>
      <div class="pkg-price">MUR ${p.price} <span>/ person</span></div>
      <div class="pkg-actions">
        <button class="btn btn-blue" onclick="openModal(${i})">View Details</button>
        <a class="btn btn-gold" href="#contact">Inquire Now</a>
      </div>
    </div>
  </div>`).join('');

/* RENDER TESTIMONIALS */
document.getElementById('testGrid').innerHTML=testimonials.map(t=>{
  const initials=t.a.split(' ').map(n=>n[0]).join('').toUpperCase();
  return `
    <div class="test-card reveal">
      <div class="test-header">
        <div class="test-avatar">${initials}</div>
        <div class="test-meta">
          <div class="test-author">${t.a}</div>
          <div class="test-loc">${t.l}</div>
          <div class="stars">${STAR.repeat(t.r)}</div>
        </div>
      </div>
      <p>"${t.t}"</p>
    </div>`;
}).join('');

/* RENDER FAQ */
document.getElementById('faqList').innerHTML=faqs.map((f,i)=>`
  <div class="faq-item">
    <button class="faq-q">
      <span class="faq-num">${String(i+1).padStart(2,'0')}</span>
      <span class="faq-q-text">${f.q}</span>
      <span class="plus"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></span>
    </button>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>`).join('');

document.querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>{
  const item=b.parentElement;
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>{
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight=null;
  });
  if(!wasOpen){
    item.classList.add('open');
    const a=item.querySelector('.faq-a');
    a.style.maxHeight=a.scrollHeight+'px';
  }
}));
/* MODAL */
const modal=document.getElementById('modal');
function openModal(i){
  const p=packages[i];
  document.getElementById('modalContent').innerHTML=`
    <h3>${p.t}</h3>
    <div class="m-meta">${p.d} • MUR ${p.price} / person • ${p.badge}</div>
    <div class="itinerary"><strong>Itinerary:</strong><br>${p.route.replace(/→/g,' → ')}</div>
    <div class="incl">${p.incl.map(x=>`<span>✓ ${x}</span>`).join('')}</div>`;
  modal.classList.add('open');document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');document.body.style.overflow='';}
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});

/* HEADER SCROLL + TO TOP */
const header=document.getElementById('header');
const toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>60);
  toTop.classList.toggle('show',window.scrollY>500);
});
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* MOBILE NAV */
const navLinks=document.getElementById('navLinks');
document.getElementById('hamburger').addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

/* HERO ROTATION — hour-based start + hourly crossfade */
(function(){
  const slides=[...document.querySelectorAll('.hero-bg')];
  slides.forEach(s=>s.style.backgroundImage=`url('${s.dataset.img}')`);
  // Start based on hour, but rotate every 10 minutes instead of every hour
  let idx=new Date().getHours()%slides.length;
  slides[idx].classList.add('active');
  setInterval(()=>{
    slides[idx].classList.remove('active');
    idx=(idx+1)%slides.length;
    slides[idx].classList.add('active');
  },600000); // 10 minutes in ms
})();

/* SCROLL REVEAL */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* WHATSAPP "BACKEND" */
const WA_NUMBER='23059608155';

function showError(group,msg){group.classList.add('invalid');const e=group.querySelector('.err-msg');if(e)e.textContent=msg;}
function clearError(group){group.classList.remove('invalid');}
function validateField(input){
  const group=input.closest('.form-group');if(!group)return true;
  const val=(input.value||'').trim();
  if(input.hasAttribute('required')&&!val){showError(group,'This field is required');return false;}
  if(input.type==='email'&&val&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)){showError(group,'Enter a valid email');return false;}
  if(input.type==='tel'&&val&&!/^[+\d][\d\s-]{5,}$/.test(val)){showError(group,'Enter a valid phone number');return false;}
  clearError(group);return true;
}

/* Live validation */
document.querySelectorAll('.contact-form, #modal form, #leadForm').forEach(form=>{
  form.querySelectorAll('input,select,textarea').forEach(inp=>{
    inp.addEventListener('input',()=>{if(inp.closest('.form-group').classList.contains('invalid'))validateField(inp);});
    inp.addEventListener('blur',()=>validateField(inp));
  });
});

function handleEnquiry(e,context){
  e.preventDefault();
  const form=e.target;
  let ok=true;
  form.querySelectorAll('input,select,textarea').forEach(inp=>{if(!validateField(inp))ok=false;});
  if(!ok)return false;
  let lines=['*New Enquiry — Jaladhi Setu Travel*'];
  if(context)lines.push('Regarding: '+context);
  form.querySelectorAll('.form-group').forEach(g=>{
    const field=g.querySelector('input,select,textarea');const label=g.querySelector('label');
    if(field&&label&&(field.value||'').trim()){lines.push(label.textContent.trim()+': '+field.value.trim());}
  });
  const url='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(lines.join('\n'));
  const note=form.querySelector('.form-note');
  if(note)note.classList.add('show');
  window.open(url,'_blank');
  setTimeout(()=>{form.reset();closeModal();if(note)setTimeout(()=>note.classList.remove('show'),6000);},400);
  return false;
}

function submitInquiry(e){return handleEnquiry(e,e.target.dataset.context||'');}

function enquireCollection(name){
  const url='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent('Hi JST, I\'d like to explore your "'+name+'" collection. Please share details.');
  window.open(url,'_blank');
}

function quickSearch(e){
  e.preventDefault();
  const d=document.getElementById('qsDest').value,t=document.getElementById('qsType').value,n=document.getElementById('qsTrav').value;
  const url='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent('Hi JST, I\'m searching for a trip.\nDestination: '+d+'\nTravel Type: '+t+'\nTravelers: '+n);
  window.open(url,'_blank');
  document.getElementById('packages').scrollIntoView({behavior:'smooth'});
  return false;
}

document.getElementById('year').textContent=new Date().getFullYear();
