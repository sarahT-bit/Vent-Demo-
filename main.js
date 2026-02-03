// --------------------
// INITIALIZE MAP
// --------------------
const map = L.map('map', {
  zoomControl: false
}).setView([40.7128, -74.0060], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
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
    link: "https://example.com/event/cleanup",
    community: "Environment",
    subCommunity: "Park Care"
  },
  {
    title: "Food Truck Festival",
    date: "March 20 • 5:00 PM",
    description: "Food trucks, live music, and good vibes.",
    location: "Downtown",
    lat: 40.712776,
    lng: -74.005974,
    radius: 500,
    link: "https://example.com/event/food",
    community: "Food",
    subCommunity: "Street Food"
  },
  {
    title: "Vegan Meetup",
    date: "March 22 • 6:00 PM",
    description: "Meet fellow vegans and share recipes.",
    location: "Brooklyn",
    lat: 40.6782,
    lng: -73.9442,
    radius: 300,
    link: "https://example.com/event/vegan",
    community: "Food",
    subCommunity: "Vegan"
  }
];

// --------------------
// EVENT MODAL
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

// --------------------
// EVENT RENDERING
// --------------------
const eventLayer = L.layerGroup().addTo(map);
const renderedEvents = [];

function renderEvents() {
  eventLayer.clearLayers();
  renderedEvents.length = 0;

  events.forEach(event => {
    const circle = L.circle([event.lat, event.lng], {
      radius: event.radius,
      color: '#667eea',
      fillColor: '#667eea',
      fillOpacity: 0.3,
      weight: 2
    });

    circle.on('click', () => openEventModal(event));

    const xMarker = L.marker([event.lat, event.lng], {
      icon: L.divIcon({
        className: 'event-x-icon',
        html: '❌',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      }),
      interactive: false
    });

    eventLayer.addLayer(circle);

    renderedEvents.push({
      event,
      circle,
      xMarker
    });
  });
}

renderEvents();

// --------------------
// COMMUNITY SEARCH + FILTER WITH ❌
// --------------------
const searchInput = document.getElementById('communitySearchInput');
const dropdown = document.getElementById('communityDropdown');

const communities = [
  ...new Set(events.flatMap(e => [e.community, e.subCommunity]))
];

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  dropdown.innerHTML = '';
  dropdown.style.display = 'none';

  if (!value) {
    // Clear all ❌ markers
    renderedEvents.forEach(({ circle, xMarker }) => {
      circle.setStyle({ fillOpacity: 0.3, color: '#667eea' });
      eventLayer.removeLayer(xMarker);
    });
    return;
  }

  const matches = communities.filter(c =>
    c.toLowerCase().includes(value)
  );

  if (matches.length) {
    dropdown.style.display = 'block';
    matches.forEach(match => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.textContent = match;

      item.onclick = () => {
        searchInput.value = match;
        dropdown.style.display = 'none';
        applyCommunityFilter(match);
      };

      dropdown.appendChild(item);
    });
  }
});

function applyCommunityFilter(filter) {
  renderedEvents.forEach(({ event, circle, xMarker }) => {
    const matches =
      event.community === filter ||
      event.subCommunity === filter;

    if (matches) {
      circle.setStyle({
        fillOpacity: 0.45,
        color: '#4caf50'
      });
      eventLayer.removeLayer(xMarker);
    } else {
      circle.setStyle({
        fillOpacity: 0.15,
        color: '#bbb'
      });
      eventLayer.addLayer(xMarker);
    }
  });
}


