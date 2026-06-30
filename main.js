/* SVG STAR */
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z"/></svg>';

/* DATA */
const destinations=[
  {n:'Kashmir',p:'25,000',img:'kashmir.webp',days:'10D/9N'},
    {n:'Manali',p:'22,500',img:'https://ik.imagekit.io/g8nndpy6v/JST/manali.webp',days:'10D/9N'}
    {n:'Shimla',p:'24,500',img:'https://ik.imagekit.io/g8nndpy6v/JST/shimla.webp',days:'10D/9N'},
    {n:'Kerala',p:'24,900',img:'https://ik.imagekit.io/g8nndpy6v/JST/kerala.webp',days:'10D/9N'},
    {n:'Delhi',p:'22,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/delhi.webp',days:'8D/7N'},
    {n:'Agra',p:'24,800',img:'https://ik.imagekit.io/g8nndpy6v/JST/agra.webp',days:'8D/7N'},
    {n:'Jaipur',p:'19,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/jaipur.webp',days:'10D/9N'},
    {n:'Varanasi',p:'25,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/banaras.webp',days:'10D/9N'},
    {n:'Ayodhya',p:'19,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/ayodhya.webp',days:'8D/7N'},
    {n:'Haridwar',p:'20,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/haridwar.webp',days:'8D/7N'},
    {n:'Munnar',p:'24,900',img:'https://ik.imagekit.io/g8nndpy6v/JST/munnar.webp',days:'10D/9N'},
    {n:'Ooty',p:'24,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/ooty.webp',days:'10D/9N'},
    {n:'Nainital',p:'20,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/nainital.webp',days:'8D/7N'},
    {n:'Amritsar',p:'22,000',img:'https://ik.imagekit.io/g8nndpy6v/JST/amritsar.webp',days:'10D/9N'}
];
/* ================================================================
   MODAL SCROLLSPY DOT NAVIGATION
   Append this to your main.js. It hooks into your existing
   openPackageModal function so the dots re-init with fresh
   targets every time a package's content is loaded in.
   ================================================================ */

function initModalScrollspy() {
  const nav = document.getElementById('jstModalSpy');
  const scrollContainer = document.querySelector('.pkg-modal-content');
  if (!nav || !scrollContainer) return;

  nav.style.display = 'flex'; // show now that a package is open

  const dots = Array.from(nav.querySelectorAll('.jst-spy-dot'));
  if (!dots.length) return;

  function getTargets() {
    return dots.map(dot => scrollContainer.querySelector(dot.dataset.target));
  }

  function setActive(idx) {
    dots.forEach((d, i) => d.classList.toggle('jst-active', i === idx));
  }

  function onScroll() {
    const targets = getTargets();
    const scrollPoint = scrollContainer.scrollTop + scrollContainer.clientHeight * 0.3;

    let activeIdx = 0;
    targets.forEach((el, i) => {
      if (!el) return;
      if (scrollPoint >= el.offsetTop) activeIdx = i;
    });
    setActive(activeIdx);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const el = getTargets()[i];
      if (!el) return;
      scrollContainer.scrollTo({
        top: el.offsetTop - 16,
        behavior: 'smooth'
      });
    });
  });

  // avoid stacking duplicate listeners if a package is opened more than once
  scrollContainer.removeEventListener('scroll', scrollContainer._jstSpyHandler || (() => {}));
  scrollContainer._jstSpyHandler = onScroll;
  scrollContainer.addEventListener('scroll', onScroll, { passive: true });

  onScroll(); // set initial state
}

/* Hook into the existing openPackageModal function so the
   scrollspy initializes fresh every time a package opens
   (the itinerary/highlights content is rebuilt each time). */
if (typeof window.openPackageModal === 'function') {
  const _origOpenPackageModal = window.openPackageModal;
  window.openPackageModal = function (idx) {
    _origOpenPackageModal(idx);
    // small delay so DOM (itinerary/highlights/etc) is fully painted
    setTimeout(initModalScrollspy, 50);
  };
}

/* Hide the dot nav when the modal closes — required because the
   nav uses position:fixed and is no longer hidden automatically
   by the modal's own display:none toggle. */
if (typeof window.closePackageModal === 'function') {
  const _origClosePackageModal = window.closePackageModal;
  window.closePackageModal = function () {
    _origClosePackageModal();
    const nav = document.getElementById('jstModalSpy');
    if (nav) nav.style.display = 'none';
  };
}

/* ===== PACKAGES DATA ===== */
const packages = [
  {
    t: 'North India with Kashmir',
    d: '10D/9N',
    badge: 'Bestseller',
    price: '36,000',
    img: 'https://ik.imagekit.io/g8nndpy6v/JST/northindiawithkashmir.webp',
    overview: 'Experience the majestic beauty of Kashmir combined with iconic North Indian destinations. From the pristine valleys of Pahalgam to the snow-covered slopes of Gulmarg, this journey offers adventure, culture, and breathtaking landscapes.',
    route: 'Delhi → Jaipur → Agra → Srinagar → Pahalgam → Gulmarg',
    itinerary: [
      { day: '1-2', title: 'Arrival in Delhi', desc: 'Settle in, orientation walk, India Gate, Qutub Minar, evening at Lodhi Gardens.' },
      { day: '3', title: 'Delhi to Agra', desc: 'Drive to Agra, visit Agra Fort, sunset at Taj Mahal.' },
      { day: '4', title: 'Taj Mahal & Jaipur', desc: 'Sunrise at Taj Mahal, drive to Jaipur, settle in.' },
      { day: '5', title: 'Jaipur City Tour', desc: 'Amber Fort, City Palace, Jantar Mantar, local bazaars.' },
      { day: '6-8', title: 'Srinagar & Pahalgam', desc: 'Flight to Srinagar, houseboat stay, Shikara ride on Dal Lake, Mughal gardens, drive to Pahalgam.' },
      { day: '9-10', title: 'Pahalgam & Gulmarg', desc: 'Meadow treks, adventure activities, Gulmarg valley exploration, return journey.' }
    ],
    highlights: ['Taj Mahal at sunrise', 'Kashmir houseboat stay', 'Pahalgam meadows', 'Gulmarg skiing', 'Amber Fort tour', 'Shikara lake ride'],
    inclusions: [
      'Hotel Accommodation',
      'Private Transportation',
      'Guided Sightseeing',
      'Daily Breakfast',
      'Houseboat in Kashmir',
      'Tour Leader',
      'Entry Fees'
    ],
    reviews: [
      { stars: 5, text: 'The most amazing trip! Every moment was magical. The houseboat experience was unforgettable.', author: 'Priya R.', location: 'Port Louis' },
      { stars: 5, text: 'Perfect planning from start to finish. Kashmir is paradise, exactly as promised!', author: 'Rajesh B.', location: 'Curepipe' }
    ]
  },
  {
    t: 'South India Experience',
    d: '12D/11N',
    badge: 'Popular',
    price: '33,500',
    img: 'https://ik.imagekit.io/g8nndpy6v/JST/kerala.webp',
    overview: 'Discover the charm of South India with its pristine backwaters, lush tea plantations, hill stations, and spiritual temples. A perfect blend of nature, culture, and relaxation for the ultimate South Indian experience.',
    route: 'Kerala → Munnar → Alleppey → Kochi → Ooty → Rameswaram',
    itinerary: [
      { day: '1-2', title: 'Arrival in Kerala', desc: 'Arrive in Kochi, Fort Kochi exploration, Jewish synagogue, Chinese fishing nets.' },
      { day: '3-4', title: 'Munnar Tea Gardens', desc: 'Drive through tea plantations, spice gardens, scenic viewpoints, local tea factory.' },
      { day: '5-6', title: 'Alleppey Backwaters', desc: 'Overnight houseboat cruise, village backwaters, sunset views, local cuisine.' },
      { day: '7', title: 'Kochi Beach & Culture', desc: 'Beach relaxation, local cuisine, Kathakali dance performance.' },
      { day: '8-9', title: 'Ooty Hill Station', desc: 'Toy train journey, botanical gardens, Ooty lake, Doddabetta viewpoint.' },
      { day: '10-12', title: 'Rameswaram & Return', desc: 'Sacred pilgrimage temple, India\'s southern tip, swimming, return journey.' }
    ],
    highlights: ['Backwater houseboat', 'Tea plantation walks', 'Munnar views', 'Ooty toy train', 'Rameswaram temple', 'Beach relaxation'],
    inclusions: [
      'Hotels (3-4 Star)',
      'Breakfast Daily',
      'Transportation',
      'Sightseeing Tours',
      'Houseboat Stay',
      'Toy Train Tickets',
      'Expert Guide'
    ],
    reviews: [
      { stars: 5, text: 'South India is stunning! The backwater houseboat was a dream. Every moment felt special.', author: 'Anita G.', location: 'Rose Hill' },
      { stars: 5, text: 'Perfectly organized tour. We loved every destination. Will book again!', author: 'Vikram L.', location: 'Quatre Bornes' }
    ]
  },
  {
    t: 'Golden Triangle with Rajasthan',
    d: '16D/15N',
    badge: 'Classic',
    price: '38,500',
    img: 'https://ik.imagekit.io/g8nndpy6v/JST/goldentringle.webp',
    overview: 'Escape to the snow-covered peaks of the Himalayas. Experience thrilling winter sports, bonfire nights, and colonial charm. Perfect for adventure seekers looking to make unforgettable winter memories.',
    route: 'Delhi → Agra → Jaipur → Pushkar → Udaipur → Mount Abu → Jodhpur → Jaisalmar → Bikaner → Mandawa → Departure to Delhi',
    itinerary: [
  { day: '1', title: 'Arrival in Delhi', desc: 'Arrive in Delhi, hotel check-in, and explore India Gate, Rashtrapati Bhavan, and Connaught Place.' },
  { day: '2-3', title: 'Delhi Sightseeing', desc: 'Visit Red Fort, Jama Masjid, Qutub Minar, Humayun’s Tomb, Lotus Temple, and local markets.' },
  { day: '4-5', title: 'Delhi to Agra', desc: 'Travel to Agra and explore the Taj Mahal, Agra Fort, Mehtab Bagh, and local handicraft markets.' },
  { day: '6-8', title: 'Agra to Jaipur', desc: 'En route visit Fatehpur Sikri, then explore Jaipur’s vibrant bazaars and cultural attractions.' },
  { day: '9-10', title: 'Jaipur Exploration', desc: 'Visit Amber Fort, City Palace, Hawa Mahal, Jantar Mantar, Jal Mahal, and enjoy Rajasthani culture.' },
  { day: '11', title: 'Jaipur Leisure Day', desc: 'Free day for shopping, local food experiences, and optional cultural activities.' },
  { day: '12', title: 'Jaipur Excursion', desc: 'Visit Nahargarh Fort, Jaigarh Fort, and explore Jaipur’s heritage sites.' },
  { day: '13', title: 'Return to Delhi', desc: 'Drive back to Delhi and enjoy an evening at leisure.' },
  { day: '14', title: 'Delhi Cultural Tour', desc: 'Explore Akshardham Temple, Lodhi Garden, and Dilli Haat.' },
  { day: '15', title: 'Shopping & Leisure', desc: 'Visit Sarojini Nagar, Janpath, and Chandni Chowk for shopping and local experiences.' },
  { day: '16', title: 'Departure', desc: 'Transfer to airport/railway station for your onward journey.' }
    ],
    highlights: ['Taj Mahal visit', 'Amber Fort', 'City Palace', 'Hawa Mahal', 'Fatehpur Sikri', 'Udaipur lakes', 'Jaipur bazaars', 'Jodhpur forts', 'Desert safari', 'Rajasthani culture'],
    inclusions: [
    'Hotel Accommodation',
    'Daily Breakfast',
    'Airport Transfers',
    'Private Transportation',
    'Sightseeing Tours',
    'Desert Safari',
    'Camel Ride',
    'Tour Assistance'
    ],
    reviews: [
      { stars: 5, text: 'Amazing trip! Every day was perfectly organized and memorable.', author: 'Rahul S.', location: 'Delhi' },
      { stars: 4, text: 'Had a wonderful experience, enjoyed sightseeing and food.', author: 'Priya T.', location: 'Agra' }
    ]
  },
  {
    t: 'Best Of Thailand Tour',
    d: '11D/10N',
    badge: 'International',
    price: '39,000',
    img: 'https://ik.imagekit.io/g8nndpy6v/JST/phuket.webp',
    overview: 'Discover the best of Thailand with a perfect blend of tropical beaches, island adventures, vibrant cities, cultural landmarks, and exciting attractions. Explore Phuket, Pattaya, and Bangkok while enjoying crystal-clear waters, world-famous islands, wildlife experiences, shopping, and unforgettable entertainment.',
    route: 'Phuket → Pattaya → Bangkok',
    itinerary: [
    { day: '1', title: 'Arrival in Phuket', desc: 'Airport transfer, hotel check-in, leisure time, dinner, and overnight stay.' },
    { day: '2', title: 'Phuket City Tour', desc: 'Explore Patong, Karon, Kata Beaches, Wat Chalong, Cashew Nut Factory, and Gems Gallery.' },
    { day: '3', title: 'Phi Phi Island Tour', desc: 'Full-day island excursion with swimming, snorkelling, Maya Bay, Bamboo Island, and lunch.' },
    { day: '4', title: 'Leisure in Phuket', desc: 'Free day to relax, enjoy beaches, shopping, or optional activities.' },
    { day: '5', title: 'Phuket to Pattaya', desc: 'Transfer via Bangkok to Pattaya, hotel check-in, and evening at leisure.' },
    { day: '6', title: 'Coral Island & Alcazar Show', desc: 'Speedboat trip to Coral Island, beach activities, and evening Alcazar cultural show.' },
    { day: '7', title: 'Pattaya Exploration', desc: 'Free day for local sightseeing, shopping, or optional attractions.' },
    { day: '8', title: 'Pattaya to Bangkok', desc: 'Visit SEA Life Bangkok Ocean World and Madame Tussauds before hotel check-in.' },
    { day: '9', title: 'Safari World & Marine Park', desc: 'Enjoy wildlife encounters, animal shows, and marine attractions.' },
    { day: '10', title: 'Bangkok Leisure Day', desc: 'Explore local markets, temples, shopping malls, and city attractions.' },
    { day: '11', title: 'Departure', desc: 'Airport transfer and departure with unforgettable Thailand memories.' }
    ],
    highlights: ['Phi Phi Island Tour', 'Phuket City Tour', 'Coral Island Excursion', 'Alcazar Cultural Show', 'SEA Life Bangkok Ocean World', 'Madame Tussauds Bangkok', 'Safari World & Marine Park', 'Local Markets & Temples', 'Shopping Malls & City Attractions', 'Comfortable City & Beach Stay Experience'],
    inclusions: [
      'Hotel Accommodation',
      'Airport Transfers',
      'Daily Breakfast',
      'Guided Sightseeing Tours',
      'Transportation Services',
      'Island Excursions & City Tours',
      'Entry to Selected Attractions as per Itinerary'
    ],
    reviews: [
      { stars: 5, text: 'Thailand exceeded my expectations! Stunning islands and wonderful city life.', author: 'Ananya T.', location: 'Delhi' },
      { stars: 4, text: 'Great tour, perfect mix of beaches and urban attractions. Highly recommended.', author: 'Lucas W.', location: 'London' }
    ]
  }
];

/* ===========================================================
   PACKAGES — CARD RENDER + MODAL LOGIC
   (this is the part that was missing — it builds the cards
   into #pkgGrid and makes "View Details" actually open the
   modal and fill it with that package's data)
   =========================================================== */

let currentPkg = null;     // the package object currently shown in the modal
let travelerCount = 2;     // matches the default value="2" in the HTML

/* ---- 1. Build the package cards into #pkgGrid ---- */
function renderPackageCards() {
  const grid = document.getElementById('pkgGrid');
  if (!grid) return;

  grid.innerHTML = packages.map((pkg, idx) => `
    <div class="pkg-card" data-idx="${idx}">
      <div class="pkg-img">
        <span class="badge">${pkg.badge}</span>
        <img src="${pkg.img}" alt="${pkg.t}" class="pkg-img-photo" loading="lazy">
      </div>
      <div class="pkg-body">
        <h3>${pkg.t}</h3>
        <div class="pkg-meta">${pkg.d}</div>
        <div class="pkg-route">${pkg.route}</div>
        <div class="pkg-price">MUR ${pkg.price} <span>/ person</span></div>
        <div class="pkg-actions">
          <button type="button" class="btn btn-blue pkg-view-btn" data-idx="${idx}">View Details</button>
          <a class="btn btn-gold" href="https://wa.me/23059608155" target="_blank" rel="noopener">Inquire Now</a>
        </div>
      </div>
    </div>
  `).join('');

  // Click on the button OR anywhere on the card opens the modal
  grid.querySelectorAll('.pkg-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPackageModal(+btn.dataset.idx);
    });
  });
  grid.querySelectorAll('.pkg-card').forEach(card => {
    card.addEventListener('click', () => openPackageModal(+card.dataset.idx));
  });
}

/* ---- 2. Open + populate the modal ---- */
function openPackageModal(idx) {
  const pkg = packages[idx];
  if (!pkg) return;
  currentPkg = pkg;
  travelerCount = 2;

  // Header
  document.getElementById('modalTitle').textContent = pkg.t;
  document.getElementById('modalRoute').textContent = pkg.route;
  document.getElementById('modalDuration').textContent = pkg.d;
  document.getElementById('modalBadge').textContent = pkg.badge;
  const hero = document.querySelector('.pkg-modal-hero');
  if (hero) hero.innerHTML = `<img src="${pkg.img}" alt="${pkg.t}" class="pkg-modal-hero-img">`;

  // Overview
  document.getElementById('modalOverview').textContent = pkg.overview;

  // Itinerary
  document.getElementById('modalItinerary').innerHTML = pkg.itinerary.map(step => `
    <div class="itinerary-item">
      <div class="day-badge">Day ${step.day}</div>
      <div>
        <h3>${step.title}</h3>
        <p>${step.desc}</p>
      </div>
    </div>
  `).join('');

  // Highlights
  document.getElementById('modalHighlights').innerHTML = pkg.highlights.map(h => `
    <div class="highlight-item">
      <span class="highlight-icon"><img src="https://img.icons8.com/dotty/80/000000/christmas-star.png" alt="Star" style="height:1em;vertical-align:middle;"></span>
      <span>${h}</span>
    </div>
  `).join('');

  // Inclusions
  document.getElementById('modalInclusions').innerHTML = pkg.inclusions.map(i => `
    <div class="inclusion-item"><span>${i}</span></div>
  `).join('');

  // Reviews
  document.getElementById('modalReviews').innerHTML = pkg.reviews.map(r => `
    <div class="review-item">
      <div class="review-stars">${'⭐'.repeat(r.stars)}</div>
      <p>"${r.text}"</p>
      <div class="review-author">${r.author} — ${r.location}</div>
    </div>
  `).join('');

  // Quick info card
  document.getElementById('modalQuickInfo').innerHTML = `
    <div class="info-item"><strong>Type:</strong> ${pkg.badge}</div>
    <div class="info-item"><strong>Days:</strong> ${pkg.d}</div>
    <div class="info-item"><strong>Route:</strong> ${pkg.route}</div>
  `;

  // Price
  document.getElementById('modalPrice').textContent = `MUR ${pkg.price}`;
  document.getElementById('travCount').value = travelerCount;
  updateModalTotal();

  // Show modal
  const modal = document.getElementById('pkgModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ---- 3. Close modal ---- */
function closePackageModal() {
  const modal = document.getElementById('pkgModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  currentPkg = null;
}

/* ---- 4. Traveler counter + live total ---- */
function updateModalTotal() {
  if (!currentPkg) return;
  const unitPrice = parseInt(currentPkg.price.replace(/,/g, ''), 10) || 0;
  const total = unitPrice * travelerCount;
  document.getElementById('modalTotal').textContent =
    `MUR ${total.toLocaleString('en-US')}`;
}

function setupTravelerControls() {
  const minus = document.getElementById('travMinus');
  const plus = document.getElementById('travPlus');
  const input = document.getElementById('travCount');
  if (!minus || !plus || !input) return;

  minus.addEventListener('click', () => {
    if (travelerCount > 1) {
      travelerCount--;
      input.value = travelerCount;
      updateModalTotal();
    }
  });

  plus.addEventListener('click', () => {
    if (travelerCount < 10) {
      travelerCount++;
      input.value = travelerCount;
      updateModalTotal();
    }
  });
}

/* ---- 5. Book Now button ---- */
function bookPackage() {
  if (!currentPkg) return;
  const msg = `Hi, I'd like to book the "${currentPkg.t}" package (${currentPkg.d}) for ${travelerCount} traveler(s). Total: MUR ${(parseInt(currentPkg.price.replace(/,/g,''),10) * travelerCount).toLocaleString('en-US')}.`;
  window.open(`https://wa.me/23059608155?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ---- 6. Close triggers: X button, overlay click, Esc key ---- */
function setupModalCloseTriggers() {
  const modal = document.getElementById('pkgModal');
  const closeBtn = document.getElementById('pkgModalClose');
  const overlay = document.querySelector('.pkg-modal-overlay');

  if (closeBtn) closeBtn.addEventListener('click', closePackageModal);
  if (overlay) overlay.addEventListener('click', closePackageModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closePackageModal();
    }
  });
}

/* ---- 7. Init on page load ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderPackageCards();
  setupTravelerControls();
  setupModalCloseTriggers();
});

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
        <div class="trip-days price">${d.days || ''}</div>
        <a class="btn btn-gold inquire" href="#contact">Inquire Now</a>
      </div>
    </div>
  </div>`).join('');

/* CAROUSEL ENGINE */
(function(){
  const track=document.getElementById('carTrack');
  if(!track) return;               // bail safely if markup isn't on the page

  // Build cards from the destinations array — only if the track is
  // currently empty, so this won't double-render if you already
  // have card-building code elsewhere.
  // Markup matches your existing CSS: .slide > .dest-card > img + .overlay
  if(track.children.length===0 && typeof destinations!=='undefined'){
    track.innerHTML=destinations.map(d=>`
      <div class="slide">
        <div class="dest-card">
          <img src="${d.img}" alt="${d.n}" loading="lazy">
          <div class="overlay">
            <h3>${d.n}</h3>
            <div class="price">From MUR ${d.p} &middot; ${d.days}</div>
            <button class="btn btn-gold inquire">Inquire Now</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  const viewport=track.parentElement;
  let perView=4, index=0, timer=null, resizeTimer=null;

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

  // debounced resize — fixes the page-freeze: without this, init()
  // (which rebuilds every dot and re-measures layout) was firing on
  // every single pixel of a window resize instead of once at the end
  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(init,150);
  });

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
/* ================================================================
   MODAL SCROLLSPY DOT NAVIGATION
   Append this to your main.js. It hooks into your existing
   openPackageModal function so the dots re-init with fresh
   targets every time a package's content is loaded in.
   ================================================================ */

function initModalScrollspy() {
  const nav = document.getElementById('jstModalSpy');
  const scrollContainer = document.querySelector('.pkg-modal-content');
  if (!nav || !scrollContainer) return;

  nav.style.display = 'flex'; // show now that a package is open

  const dots = Array.from(nav.querySelectorAll('.jst-spy-dot'));
  if (!dots.length) return;

  function getTargets() {
    return dots.map(dot => scrollContainer.querySelector(dot.dataset.target));
  }

  function setActive(idx) {
    dots.forEach((d, i) => d.classList.toggle('jst-active', i === idx));
  }

  function onScroll() {
    const targets = getTargets();
    const scrollPoint = scrollContainer.scrollTop + scrollContainer.clientHeight * 0.3;

    let activeIdx = 0;
    targets.forEach((el, i) => {
      if (!el) return;
      if (scrollPoint >= el.offsetTop) activeIdx = i;
    });
    setActive(activeIdx);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const el = getTargets()[i];
      if (!el) return;
      scrollContainer.scrollTo({
        top: el.offsetTop - 16,
        behavior: 'smooth'
      });
    });
  });

  // avoid stacking duplicate listeners if a package is opened more than once
  scrollContainer.removeEventListener('scroll', scrollContainer._jstSpyHandler || (() => {}));
  scrollContainer._jstSpyHandler = onScroll;
  scrollContainer.addEventListener('scroll', onScroll, { passive: true });

  onScroll(); // set initial state
}

/* Hook into the existing openPackageModal function so the
   scrollspy initializes fresh every time a package opens
   (the itinerary/highlights content is rebuilt each time). */
if (typeof window.openPackageModal === 'function') {
  const _origOpenPackageModal = window.openPackageModal;
  window.openPackageModal = function (idx) {
    _origOpenPackageModal(idx);
    // small delay so DOM (itinerary/highlights/etc) is fully painted
    setTimeout(initModalScrollspy, 50);
  };
}

/* Hide the dot nav when the modal closes — required because the
   nav uses position:fixed and is no longer hidden automatically
   by the modal's own display:none toggle. */
if (typeof window.closePackageModal === 'function') {
  const _origClosePackageModal = window.closePackageModal;
  window.closePackageModal = function () {
    _origClosePackageModal();
    const nav = document.getElementById('jstModalSpy');
    if (nav) nav.style.display = 'none';
  };
}
