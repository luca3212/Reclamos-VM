# Reclamos-VM

Web reclamos ciudadanos

<a href="https://luca3212.github.io/Reclamos-VM/">Demo</a>

Funciones:
  - Insertar reclamo: se genera un formulario de registro de reclamo, se indica un punto el en mapa donde se obtiene los datos Longitud y Latitud,
                      se pide una descripcion de problema, seleccion del organismo encargado de su reparacion, se registra una fecha del problema.
  - Modificar reclamo: seleccionado un punto del mapa se puede modificar algunos de sus datos (Descripcion, Organismo encargado, Fecha y Estado) menos su Latitud y Longitud.
  - Eliminar reclamo: seleccionado un punto en el mapa se elimnar el reclamos de mismo y se muestra el mapa actualizado.  

Todas estas funciones conectadas a una API REST encargada de hacer de nexo entre el usuario y la Base de Datos, donde se registran los diferentes reclamos realizados. 

Tecnologias aplicadas:
  - HTML, CSS, SCSS
  - JavaScript
  - Node JS
  - MongoDB
  - Leaflet (biblioteca JavaScript de código abierto para mapas interactivos) 
