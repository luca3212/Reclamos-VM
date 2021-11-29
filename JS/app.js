//============= INSERCION DE PUNTOS EN EL MAPA ===============//
function addPunto(info){
    var color = colorPoint(info.EMP_E);
       
    const myIcon = L.divIcon({className: `my-div-icon ${color}`,iconSize:[15,15]});

    var punto = L.marker([info.LATITUD, info.LONGITUD], {icon: myIcon}).bindPopup(`
    <ul class="listaInfo">
        <li><h3>INFORMACIÓN</h3></li>
        <li class="listTitle">Descripcion:</li>
        <li class="listData" style="text-align: justify;">${info.DESCRIPCION}</li>
        <li class="listTitle">Ente encargado:</li>
        <li class="listData">${info.EMP_E}</li>
        <li class="listTitle">Estado:</li>
        <li class="listData">${info.ESTADO}</li>
        <li class="listTitle">Fecha del reclamo:</li>
        <li class="listData">${info.FECHA}</li>
        <li class="listBton"><button class="mod" onclick='modificarMarcador("${info._id}")'>Modificar</button><button class="delete" onclick='eliminarPunto("${info._id}")'>Eliminar</button></li>
    </ul>`);

    if(info.EMP_E === "Obras Sanitarias"){
        ObrasS.addLayer(punto).addTo(map);
    }
    if(info.EMP_E === "Defensa Civil"){
        DefCiv.addLayer(punto).addTo(map);
    }
    if(info.EMP_E === "Obras Publicas"){
        ObrasP.addLayer(punto).addTo(map);
    }
    
}

function colorPoint(empresa){
    return empresa == "Obras Sanitarias" ? 'naranja' :
    empresa == "Defensa Civil" ? 'amarillo' :
    empresa == "Obras Publicas" ? 'verde' :
    '';
}

//============= ELIMAR POR ID LLAMADO A LA API ===============//
function eliminarPunto(idDelete){
    
    url = "https://api-conect.herokuapp.com/api/puntos/delete/"+idDelete;
   
    fetch(url, {method: 'DELETE'})
    .then(response=>response.json())
    .then(t => {
        if(t.estado){
            //limpiamos la capa de los marcadores
            limpiarMapa();
            //actualizamos el mapa
            updateMapa();
            //cerramos acordio x si esta abierot
            cerrarAcordion();
        }
    })
    .catch(err => console.error(err));
}

//============= OBTENER DATOS POR ID DESDE LA API ===============//
function modificarMarcador(idMod){
    //cierra el acordion desplegados
    cerrarAcordion();

    //abre el acordion de modificar y muestra el form con los datos del marcador
    var contenido=$('#accordion_modificar').next(".accordion-content");
    contenido.slideDown(500);			
	$('#accordion_modificar').addClass("open");
    
    url = "https://api-conect.herokuapp.com/api/puntos/"+idMod;

    fetch(url)
	.then(response => response.json())
	.then(point =>{
        
            
            //carga los datos en el formulario
            document.getElementById("F_ID_MOD").value = point._id;
            document.getElementById("F_DESC_MOD").value = point.DESCRIPCION;
            document.getElementById("F_TIPO_MOD").value = point.EMP_E;
            document.getElementById("F_ESTADO_MOD").value = point.ESTADO;
            document.getElementById("F_FECHA_MOD").value = point.FECHA;
            
        
       
    });	

}

//============= GUARDAR MOD EN LA API ===============//
const btonMod = document.getElementById('btnCambio');

btonMod.addEventListener('click',function() {
    var id   = document.getElementById("F_ID_MOD").value ;
    var descrip  = document.getElementById("F_DESC_MOD").value.toLowerCase() ;
    var tipo  = document.getElementById("F_TIPO_MOD").value ;
    var fecha  = document.getElementById("F_FECHA_MOD").value ;
    var estado  = document.getElementById("F_ESTADO_MOD").value ;

    
    modificacion = {
        
        "EMP_E": tipo,
        "DESCRIPCION": descrip,
        "ESTADO": estado,
        "FECHA": fecha
    };  

    const urlUP = "https://api-conect.herokuapp.com/api/puntos/update/"+id;
    
    fetch(urlUP,{
        method: 'PUT',
        body: JSON.stringify(modificacion),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response=>response.json())
    .then(t => {
        //limpiamos la capa de los marcadores
        limpiarMapa();
        //actualizamos el mapa
        updateMapa();
        //limpio el formulario de modificaciones
        idFormModificacion.reset();
        //reset al acordion del menu
        cerrarAcordion();
        
    })
    .catch(err => console.error(err))

});

