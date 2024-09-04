//Function Llenar con los que se modifico las valoraciones el card
function llenarCard()
{
     var card = 'card-body'   
     var arrayPeliculas = localStorage.getItem("InformacionPeliculas");//Obtiene Local Store SON VALORACIONES POR ID
     var InformacionPeliculas  = JSON.parse(arrayPeliculas); //Json

     var arrayPeliculasPopulares = localStorage.getItem("PeliculasPopulares");//Obtiene Local Store 
     var InformacionPeliculasPopulares  = JSON.parse(arrayPeliculasPopulares); //Json
     
     var hmtl_ = "";
     if(InformacionPeliculas.length > 0){  
     //imagen = getImagen("w500",ImagenPelicula );
     for (let index = 0; index < InformacionPeliculas.length; index++) {
        //var  Objectolocal = {};//Creamos un nuevo objecto
       var valoracion = InformacionPeliculas[index].valoracion;
        //TENEMOS QUE BUSCAR LA PELICULAS QUE ESTAN EN FAVORITOS, OSEA QUE TIENEN VALORACION

        for (let i = 0; i < InformacionPeliculasPopulares.length; i++) {
         var IDPelicula = InformacionPeliculasPopulares[i].id;
         var NombrePelicula = InformacionPeliculasPopulares[i].title;
         var ImagenPelicula  = InformacionPeliculasPopulares[i].poster_path;
         var DescripcionPelicula  = InformacionPeliculasPopulares[i].overview;    
        var imagen = getImagen("w500",ImagenPelicula );

          if (IDPelicula === InformacionPeliculas[index].id)
          {
          //MUESTRELO EN HTML  
          hmtl_ = hmtl_ +      
           "<div class='col-md-4 clearfix d-none d-md-block'> "+ 
          "<h4  style = 'margin-bottom:10px'>" + NombrePelicula + "</h4>" +
          ""+"<img src='" + imagen  + "' height='750px'>" + 
          
                  "<h6 style='color: white; margin-top: 10px;'>Valoración:</h6>"+
                 
                  "<p class='clasificacion'>"+

                   "<label>★ "+valoracion+"</label>"+

                 "</p>"+
                
                 "<a class=btn btn-danger btn-primary style='color: white; margin-bottom: 10px;' onclick= 'BorrarValoracion("+IDPelicula+")'>Eliminar valoracion</a>"
              +"</div>";

          }

        }
     }
    }
    else
    {
      $.notify({
        title: '<strong>Sin Valoraciones</strong>',
        message: 'No se encontraron, valoraciones asignadas!'
          },
          {
              type: 'info'
          });
    }
    $("#Div_card").html(hmtl_); 
}


function BorrarValoracion(ID_PELICULA)
{
  var arrayPeliculas = localStorage.getItem("InformacionPeliculas");//Obtiene Local Store
       var InformacionPeliculas  = JSON.parse(arrayPeliculas); //Json

       //if(InformacionPeliculas == def || InformacionPeliculas == undefined)
       //Si la encontro uno la vamos a mostrar en el modal
       if(InformacionPeliculas.length >=1)
       {
        localStorage.removeItem("InformacionPeliculas"); //Eliminamos los Items
        //Creamos los nuevos elementos
        var array = [];
       
        //Mensaje de guardado
        for (let index = 0; index < InformacionPeliculas.length; index++) {
          var  Objectolocal = {};//Creamos un nuevo objecto
              if(InformacionPeliculas[index].id != ID_PELICULA)
              {
                  //Si no esta repetido entonces muestrelo
                  Objectolocal.id = InformacionPeliculas[index].id;
                  Objectolocal.valoracion = InformacionPeliculas[index].valoracion;     
                  array.push(Objectolocal);//Se lo insertamos al array
              }
            
         }
         localStorage.setItem('InformacionPeliculas', JSON.stringify(array));
         llenarCard();
         $.notify({
          title: '<strong>Se eliminó éxito!</strong>',
          message: 'La valoración fue removida!'
      },{
          type: 'success'
      });
       }
       

}

    $(document).ready(function(){
        llenarCard();
    });


     