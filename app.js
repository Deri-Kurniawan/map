let map = L.map('map');

const getPinnedLocations = () => {
  return JSON.parse(localStorage.getItem('pinnedLocation')) || [];
}

const savePinnedData = (pinnedLocation) => {
  localStorage.setItem('pinnedLocation', JSON.stringify(pinnedLocation))
}

getPinnedLocations().forEach(({longitude, langitude, title}) => {
  L.marker([langitude, longitude]).addTo(map).bindPopup(title);
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(({coords}) => {
    const zoom = 11;
    map.setView([coords.latitude, coords.longitude], zoom);
    L.marker([coords.latitude, coords.longitude]).addTo(map).bindPopup('Your position').openPopup();
  }, (error) => {
    if(error.code == 1) {
      alert('We can\'t get your location.\nPlease allow geolocation to use this app!');
    }
  });
}

map.on('dblclick', ({latlng}) => {
  const pinnedLocationData = getPinnedLocations();
  const pinTitle = prompt('Set pin name');

  L.marker([latlng.lat, latlng.lng]).addTo(map).bindPopup(pinTitle);

  pinnedLocationData.push({
    langitude: latlng.lat,
    longitude: latlng.lng,
    title: pinTitle,
  });

  savePinnedData(pinnedLocationData);
});
