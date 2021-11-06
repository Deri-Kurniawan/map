var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((location) => {
    console.log(location);
    L.marker([location.coords.latitude, location.coords.longitude]).addTo(map).bindPopup('Your current location').openPopup();
  });
}

map.on('click', (e) => {
  let pinName = prompt('Set pin name');
  L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).bindPopup(pinName);
}); 