//Configuracion Mapa
var map = L.map("map", {center: [-33.67492567436574, -65.46117782592773], zoom: 13, zoomControl: false}); //VM
L.control.zoom({position: "bottomright"}).addTo(map);

var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors',
        maxZoom: 17,
        minZoom: 10,
        zoomControl: false
});



var capaBN = L.tileLayer('https://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 10,
        zoomControl: false
});
capaBN.addTo(map);

/* Mapping Variables */
//var markers = new L.layerGroup();

var ObrasS = new L.layerGroup();
var DefCiv = new L.layerGroup();
var ObrasP = new L.layerGroup();


var baseMaps = {
    "Mapa BN": capaBN,
    "Mapa Base": osmLayer
};
var overlayMaps = {
    "Obras Sanitarias <i style='background:#ff6347;opacity:0.8;'></i>": ObrasS,
    "Defensa Civil <i style='background:#ffff00;opacity:0.8;'></i>":  DefCiv,
    "Obras Publicas <i style='background:#2cc52a;opacity:0.8;'></i>": ObrasP
};

var leyenda = L.control.layers(baseMaps,overlayMaps,{
    position: 'bottomleft', // 'topleft', 'bottomleft', 'bottomright'
    collapsed: false // true
}).addTo(map);


//Carga inicial - recupero datos de la BD y muestro los puntos
window.onload = function(){
    updateMapa();
};

function updateMapa(){
   
    fetch("https://api-conect.herokuapp.com/api/puntos")
    .then(response => response.json())
	.then(point =>{
        point.forEach(p=>addPunto(p));
    });	
}

function limpiarMapa(){
    ObrasS.clearLayers();
    DefCiv.clearLayers();
    ObrasP.clearLayers();
}

