const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const today = new Date().toISOString().slice(0, 10);
const plusDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const heroImages = [
  'photos/kashmir.jpg',
  'photos/kashmir1.jpg',
  'photos/kashmir2.jpg',
  'photos/karela.jpg',
  'photos/manali.jpg',
  'photos/manali1.jpg',
  'photos/shimla.jpg',
  'photos/nainital.jpg'
];

const destinationNames = [
  'Delhi', 'Agra', 'Jaipur', 'Ayodhya', 'Varanasi', 'Haridwar', 'Rishikesh',
  'Amritsar', 'Shimla', 'Manali', 'Kashmir', 'Nainital', 'Kerala', 'Munnar',
  'Alleppey', 'Kochi', 'Ooty', 'Madurai', 'Rameswaram', 'Kanyakumari', 'Coimbatore'
];

const destinationOptions = destinationNames.map((name) => `<option>${name}</option>`).join('');

const offersData = [
  ['photos/kashmir.jpg', 'tour-packages', 'North India Discovery 22D', 'Flights, hotels, visa and guided sightseeing.', 'MUR 88,000'],
  ['photos/karela.jpg', 'tour-packages', 'South India Experience 12D', 'Kerala backwaters, temples and culture.', 'MUR 75,000'],
  ['photos/banaras.jpg', 'pilgrimage', 'Sacred Pilgrimage Tour', 'Spiritual India with expert support.', 'MUR 80,000'],
  ['photos/manali.jpg', 'tour-packages', 'Manali Winter Escape 11D', 'Snowy mountains and scenic valleys.', 'MUR 80,000'],
  ['photos/kashmir1.jpg', 'flights', 'Sri Lanka Holiday 8D', 'Island getaway with curated comfort.', 'MUR 67,266'],
  ['photos/indiagate.jpg', 'visa', 'Hassle Free India Visa', 'Documents, guidance and application help.', 'Get Quote']
];

const northDestinations = 'Delhi 45k,Agra 50k,Jaipur 48k,Ayodhya 46k,Varanasi 47k,Haridwar 45k,Rishikesh 45k,Amritsar 48k,Shimla 52k,Manali 55k,Kashmir 65k,Nainital 50k'.split(',');
const southDestinations = 'Kerala 60k,Munnar 58k,Alleppey 59k,Kochi 57k,Ooty 55k,Madurai 52k,Rameswaram 50k,Kanyakumari 51k,Coimbatore 48k'.split(',');

const packagesData = [
  ['photos/kashmir2.jpg', 'BESTSELLER', 'North India Discovery', '22D', 'Delhi · Agra · Jaipur · Kashmir', 'MUR 88,000', ''],
  ['photos/karela.jpg', 'POPULAR', 'South India Experience', '12D', 'Kerala · Munnar · Alleppey', 'MUR 75,000', 'blue'],
  ['photos/manali2.jpg', 'WINTER SPECIAL', 'Manali Escape', '11D', 'Delhi · Shimla · Manali', 'MUR 80,000', ''],
  ['photos/alleppey.jpg', 'INTERNATIONAL', 'Sri Lanka', '8D', 'Colombo · Kandy · Bentota', 'MUR 67,266', 'green']
];

function field(label, value = '', type = 'text', options = '') {
  const input = options
    ? `<select required>${options}</select>`
    : `<input type="${type}" value="${value}" required>`;
  const helper = label === 'From' ? '<small>Port Louis MU / MRU</small>' : '';
  return `<label class="field">${label}${input}${helper}</label>`;
}

function initHero() {
  let index = new Date().getHours() % heroImages.length;
  let activeHero = $('#heroA');
  $('#heroA').style.backgroundImage = `url('${heroImages[index]}')`;
  $('#heroDots').innerHTML = heroImages.map((_, dotIndex) => `<span class="dot ${dotIndex === index ? 'active' : ''}"></span>`).join('');

  setInterval(() => {
    const nextIndex = new Date().getHours() % heroImages.length;
    if (nextIndex === index) return;
    index = nextIndex;
    const nextHero = activeHero.id === 'heroA' ? $('#heroB') : $('#heroA');
    nextHero.style.backgroundImage = `url('${heroImages[index]}')`;
    nextHero.classList.add('active');
    activeHero.classList.remove('active');
    activeHero = nextHero;
    $$('.dot').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
  }, 60000);
}

function initTabs() {
  const services = [
    ['Flights', '✈️', flightPanel()],
    ['Hotels', '🏨', hotelsPanel()],
    ['Visa Assistance', '🛂', visaPanel()],
    ['Tour Packages', '🧳', tourPanel()],
    ['Travel Insurance', '🛡️', insurancePanel()],
    ['Airport Transfers', '🚕', transferPanel()]
  ];

  $('#tabs').innerHTML = services.map((service, index) => `
    <button class="tab ${index === 0 ? 'active' : ''}" data-index="${index}">
      <span class="tab-icon">${service[1]}</span>
      <span>${service[0]}</span>
    </button>
  `).join('');

  $('#panels').innerHTML = services.map((service, index) => `
    <div class="panel ${index === 0 ? 'active' : ''}">${service[2]}</div>
  `).join('');

  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = Number(tab.dataset.index);
      $$('.tab').forEach((item) => item.classList.remove('active'));
      $$('.panel').forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      $$('.panel')[index].classList.add('active');
      bindForms();
    });
  });

  bindForms();
}

function flightPanel() {
  return `<div class="trip-row"><div class="radio-row"><label><input type="radio" checked> One Way</label><label><input type="radio"> Round Trip</label><label><input type="radio"> Multi City</label></div><a class="blue-link">Book International and Domestic Flights</a></div><form class="js-form"><div class="form-grid">${field('From','Port Louis')}${field('To','', 'text', destinationOptions)}${field('Departure',today,'date')}${field('Travellers & Class','1 Traveller, Economy')}</div><div class="fares"><span class="fare active">Regular</span><span class="fare">Student</span><span class="fare">Armed Forces</span><span class="fare">Senior Citizen</span><span class="fare">Doctor & Nurses</span></div><button class="btn full">SEARCH</button></form>`;
}

function hotelsPanel() {
  return `<form class="js-form"><div class="form-grid">${field('City/property')}${field('Check-in',today,'date')}${field('Check-out',plusDays(1),'date')}${field('Rooms & Guests','1 Room, 2 Adults')}</div><br><button class="btn full">Search Hotels</button></form>`;
}

function visaPanel() {
  return `<form class="js-form"><div class="form-grid three">${field('Name')}${field('Email','','email')}${field('Phone')}${field('Passport Country','Mauritius')}${field('Destination','', 'text', destinationOptions)}${field('Travel Date','', 'date')}</div><br><button class="btn gold full">Submit</button></form>`;
}

function tourPanel() {
  return `<form class="js-form"><div class="form-grid three">${field('From City')}${field('Destination','', 'text', destinationOptions)}${field('Travel Month','', 'month')}${field('No. of Travelers','1','number')}${field('Contact')}</div><br><button class="btn gold full">Submit</button></form>`;
}

function insurancePanel() {
  return `<form class="js-form"><div class="form-grid three">${field('Name')}${field('Destination')}${field('Start Date','', 'date')}${field('End Date','', 'date')}${field('Travelers','1','number')}${field('Email','','email')}</div><br><button class="btn full">Get Quote</button></form>`;
}

function transferPanel() {
    return `<form class="js-form"><div class="form-grid three">${field('Pickup City')}${field('Drop City')}${field('Date','', 'date')}${field('Time','', 'time')}${field('Passengers','1','number')}${field('Contact')}</div><br><button class="btn full">Book Transfer</button></form>`;
}