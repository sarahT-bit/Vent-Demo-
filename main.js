// --------------------
// INITIALIZE MAP
// --------------------
const map = L.map('map', {
  zoomControl: false
}).setView([40.7128, -74.0060], 13); // NYC default

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// --------------------
// EVENT DATA
// --------------------
const events = [
  {
    title: "Community Cleanup",
    date: "March 12 • 10:00 AM",
    description: "Help clean the park and meet your neighbors.",
    location: "Central Park",
    lat: 40.785091,
    lng: -73.968285,
    radius: 350,
    link: "https://example.com/event/cleanup"
  },
  {
    title: "Food Truck Festival",
    date: "March 20 • 5:00 PM",
    description: "Food trucks, live music, and good vibes.",
    location: "Downtown",
    lat: 40.712776,
    lng: -74.005974,
    radius: 500,
    link: "https://example.com/event/food"
  }
];

// --------------------
// EVENT MODAL ELEMENTS
// --------------------
const eventOverlay = document.getElementById('eventOverlay');
const eventCloseBtn = document.getElementById('eventCloseBtn');

function openEventModal(event) {
  document.getElementById('eventTitle').textContent = event.title;
  document.getElementById('eventDate').textContent = event.date;
  document.getElementById('eventDescription').textContent = event.description;
  document.getElementById('eventLocation').textContent = `📍 ${event.location}`;
  document.getElementById('eventLink').href = event.link;

  eventOverlay.style.display = 'flex';
}

eventCloseBtn.onclick = () => {
  eventOverlay.style.display = 'none';
};

eventOverlay.onclick = (e) => {
  if (e.target === eventOverlay) {
    eventOverlay.style.display = 'none';
  }
};

// --------------------
// ADD EVENT CIRCLES
// --------------------
events.forEach(event => {
  const circle = L.circle([event.lat, event.lng], {
    radius: event.radius,
    color: '#667eea',
    fillColor: '#667eea',
    fillOpacity: 0.3,
    weight: 2
  }).addTo(map);

  circle.on('click', () => openEventModal(event));
});
