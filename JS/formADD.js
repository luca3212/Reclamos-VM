function ADD(){
    alert("seleccione un punto del mapa...");
	map.on('click', onMapClick);
}

function cerrar_form(){
    document.getElementById("F_LAT").value = "";
    document.getElementById("F_LON").value = "";
    document.getElementById("F_DESC").value = "";
    document.getElementById("F_TIPO").value = "";
    document.getElementById("F_FECHA").value= "";

    map.closePopup(popup);
    map.off('click');
}

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Coordenadas:<br> " +  e.latlng.lat.toString() + "," +  e.latlng.lng.toString()) 
        .openOn(map);  
            
        var lat = e.latlng.lat.toString();
		var lng = e.latlng.lng.toString();
              
        document.getElementById("F_LAT").value = e.latlng.lat.toString();
        document.getElementById("F_LON").value = e.latlng.lng.toString();
}


var gedData = function(){
    //cerramos el popup de ubicacion seleccionado
    map.closePopup(popup);
    map.off('click');

    //variables del formulario de ingreso
    var latitud =  document.getElementById("F_LAT").value;
    var longitud =  document.getElementById("F_LON").value;
    var descripcion =  document.getElementById("F_DESC").value.toLowerCase();
    var empresa =  document.getElementById("F_TIPO").value;
    var fecha =  document.getElementById("F_FECHA").value;

    //control q no haya campos vacios
    if(latitud == ""){
        document.getElementById("F_LAT").focus();    
    }else{
        if(longitud == ""){
            document.getElementById("F_LON").focus();    
        }else{
            if(descripcion == ""){
                document.getElementById("F_DESC").focus();    
            }else{
                if(empresa == ""){
                    document.getElementById("F_TIPO").focus();    
                }else{
                    if(fecha == ""){
                        document.getElementById("F_FECHA").focus();    
                    }else{
                        reclamo = {
                            "LATITUD": latitud,
                            "LONGITUD": longitud,
                            "EMP_E": empresa,
                            "DESCRIPCION": descripcion,
                            "ESTADO": "en espera",
                            "FECHA": fecha
                        };  
                        
                        fetch("https://api-conect.herokuapp.com/api/puntos/add",{
                            method: 'POST',
                            body: JSON.stringify(reclamo),
                            headers: {'Content-Type': 'application/json'}
                        })
                        .then(response=>response.json())
                        .then(t => {
                            //limpiamos la capa de los marcadores
                            limpiarMapa();
                            //actualizamos el mapa
                            updateMapa();
                            //limpiar el formulario y lo oculta (reset)
                            cerrar_form();
                            //reset al acordion del menu
                            cerrarAcordion();
                        })
                        .catch(err => console.error(err))
                  
                    }
                }
            }
        }
    }
}