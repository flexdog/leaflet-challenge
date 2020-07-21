var quakeArray = [];
function circleSize(mag) {
  return mag * 7000};
function circleColor(mg) {
  return mg >= 9.0 ? '#F7071B':
         mg >= 8.0 ? '#F50780':
         mg >= 7.0 ? '#F306E5':
         mg >= 6.0 ? '#9805F1':
				 mg >= 5.0 ? '#3104EF':
         mg >= 4.0 ? '#033BED':
         mg >= 3.0 ? '#029EEB':
				 mg >= 2.0 ? '#01E9D1':
         mg >= 1.0 ? '#00E76C':
                     '#00E507';
}
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  
  //quakeArray = [];
  for (var i = 0; i < data.features.length; i++) {
    quakeArray.push( {'location': [data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]], 'mag': data.features[i].properties.mag, 'place': data.features[i].properties.place})
  };
  console.log(quakeArray); 
    

var myMap = L.map('leaflet', {
      layers: [
        L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        })
      ],
      center: [39.8283, -98.5795],
      zoom: 4
    });

 // Loop thru quakeArray to generate circles
 for (var i = 0; i < quakeArray.length; i++) {
  L.circle(quakeArray[i].location, {
   fillOpacity: 0.40,
   color: circleColor(quakeArray[i].mag),
   fillColor: circleColor(quakeArray[i].mag),
   radius: circleSize(quakeArray[i].mag),
 }).bindPopup("<h3>" + quakeArray[i].place + "</h3> <hr> <p> Coordinates: " + quakeArray[i].location + "</p> <p>Magnitude: " + quakeArray[i].mag + "</p>").addTo(myMap);  
};


/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Magnitude</h4>";
  div.innerHTML += '<i style="background: #F7071B"></i><span>9.0 and above</span><br>';
  div.innerHTML += '<i style="background: #F50780"></i><span>8.0 - 8.9</span><br>';
  div.innerHTML += '<i style="background: #F306E5"></i><span>7.0 - 7.9</span><br>';
  div.innerHTML += '<i style="background: #9805F1"></i><span>6.0 - 6.9</span><br>';
  div.innerHTML += '<i style="background: #3104EF"></i><span>5.0 - 5.9</span><br>';
  div.innerHTML += '<i style="background: #033BED"></i><span>4.0 - 4.9</span><br>';
  div.innerHTML += '<i style="background: #029EEB"></i><span>3.0 - 3.9</span><br>';
  div.innerHTML += '<i style="background: #01E9D1"></i><span>2.0 - 2.9</span><br>';
  div.innerHTML += '<i style="background: #00E76C"></i><span>1.0 - 1.9</span><br>';
  div.innerHTML += '<i style="background: #00E507"></i><span>Below 1.0 </span><br>';
  div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>USGS</span><br>';
  return div;
};

legend.addTo(myMap);

});

