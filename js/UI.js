class UI {
     constructor() {
 
          // Conecta con la API
          this.api = new API();

          // Crea los markers como layerGroup
          this.markers = new L.LayerGroup();

          // Iniciar el mapa
          this.mapa = this.inicializarMapa();
 
     }
 
     inicializarMapa() {
          // Inicializar y obtener la propiedad del mapa
          const map = L.map('mapa').setView([ 19.390519, -99.3739778], 6);
          const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
          L.tileLayer(
              'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; ' + enlaceMapa + ' Contributors',
              maxZoom: 18,
              }).addTo(map);
          return map;
 
     }

     mostrarEstablecimientos() {
          this.api.obtenerDatos()
               .then(datos => {
                    const resultado = datos.respuestaJSON.results;

                    // Ejecuta la función para mostrar los pines
                    this.mostrarPines(resultado)
               })
     }

     mostrarPines(datos) {
          // Limpiar los markers
          this.markers.clearLayers();

          // Recorrer los establecimientos
          datos.forEach(dato => {
               // Extrae información del API

               const {latitude, longitude, calle, regular, premium} = dato;

               // Crea PopUp
               const opcionesPopUp = L.popup().setContent(`
                    <p>Calle: ${calle}</p>
                    <p><b>Regular:</b> $ ${regular}</p>
                    <p><b>Premium:</b> $ ${premium}</p>
               `);


               // Agrega el PIN
               const marker = new L.marker([
                    parseFloat(latitude),
                    parseFloat(longitude)
               ]).bindPopup(opcionesPopUp);
               this.markers.addLayer(marker);
          });
          this.markers.addTo(this.mapa);
     }

     // Buscador
     obtenerSugerencias(busqueda) {
          this.api.obtenerDatos()
          .then(datos => {
               // Obtener los datos
               const resultados = datos.respuestaJSON.results;

               // Envia el JSON y la búsqueda para el filtrado
               this.filtrarSugerencias(resultados, busqueda);
          })
     }
     // Filtra las sugerencias en base al input

     filtrarSugerencias(resultado, busqueda) {
          // filtrar con .filter
          const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
          // mostrar los pines
          this.mostrarPines(filtro);
     }
 }