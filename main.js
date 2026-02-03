// ABSOLUTE MINIMUM MAP TEST
const map = L.map('map').setView([40.7128, -74.0060], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// TEST CIRCLE (you should SEE THIS)
L.circle([40.7128, -74.0060], {
  radius: 500,
  color: 'red',
  fillOpacity: 0.3
}).addTo(map);


