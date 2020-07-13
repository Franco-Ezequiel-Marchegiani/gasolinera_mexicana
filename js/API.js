class API {

     async obtenerDatos() {

          const total = 1000;
          // Obtiene los datos de la API
          const datos= await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);

          // Retorna datos como JSON
          const respuestaJSON = await datos.json();

          return{
               respuestaJSON
          }
     }
}