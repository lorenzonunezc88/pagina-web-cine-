/*-----------------------------------------------------------Metodos Genericos--------------------------------------------------------------------*/ 
const ApiKey = '0d8e2aa515fb6fc83d1215a07293dadb'
const metodoMoviePopular = 'movie/popular';
const metodoMovieUpcomming = 'movie/upcoming';
const metodoGenreList = 'genre/movie/list';


function getImagen (tamanno, imagen)
{
    var url = "https://image.tmdb.org/t/p/"+tamanno+"/"+imagen+"";
    return url;

}

//Get API ESPAÑOL
function URLAPI(metodo)
{
    var url = "https://api.themoviedb.org/3/" + metodo + "?api_key=" + ApiKey + "&=json&language=es-ES";
    //console.log(url);
    return url;
}

function URLAPI_EN(metodo){
    var url = "https://api.themoviedb.org/3/" + metodo + "?api_key=" + ApiKey + "&=json";
    //console.log(url);
    return url;
}



async function getMovies(metodo) {
    try {

        var url = URLAPI(metodo)
        const response =  await fetch(url)
        if (!response.ok) {
            throw new Error('Error es ${response.status}')
        }else{
            return await response.json()
        }
    } catch(error) {
        return await console.error(error)
    }
}

async function getVideos(metodo) {
    try 
    {
        var url = URLAPI_EN(metodo)
        const response =  await fetch(url)
        if (!response.ok) {
            throw new Error('Error es ${response.status}')
        }else{
            return await response.json()
        }
    }
    catch(error)
    {
        return await console.error(error)
    }
}
getVideos
/*-----------------------------------------------------------Fin de metodos Genericos--------------------------------------------------------------------*/ 
//Lleno los generos y los guardo en un localstorage
async function LlenarGeneros()
{
    let DatosGeneros = await getMovies(metodoGenreList);//Vamos al API PARA obtener los generos - le pasamos el metodo definido de la API
    var MoviesGeneros = DatosGeneros.genres;
    //console.log(MoviesGeneros);
    localStorage.setItem('Generos', JSON.stringify(MoviesGeneros));

}

//Lleno los generos y los guardo en un localstorage
async function GetVideosYoutube(id_pelicula)
{
    
    let DatosVideos = await getVideos("movie/" + id_pelicula +"/videos");//Vamos al API PARA obtener los generos - le pasamos el metodo definido de la API
    var MoviesVideos = DatosVideos;
    //console.log(MoviesVideos);
    return MoviesVideos;

}

//Llena las peliculas populares
async function Llenar_Movies_Populares()
{
    let DatosMovies = await getMovies(metodoMoviePopular);//Vamos al API PARA obtener las peliculas - le pasamos el metodo definido de la API
    var MoviesPopular = DatosMovies.results //Obtenemos los resultados en un ARRAY
    var html_ = ""; //VARIABLE QUE SE LLENA CON LA VISTA
    localStorage.setItem('PeliculasPopulares', JSON.stringify(MoviesPopular));
    //Genero Arrays list para guardar los elementos en la sessionStorage
    var  SessionPeliculas = [];

     //Recorro las peliculas para obtener el id, titulo e imagen de cada uno 
    for (let index = 0; index < MoviesPopular.length; index++) 
    {
        //Obtenego los valores de las peliculas
        var IDPelicula = MoviesPopular[index].id;
        var NombrePelicula = MoviesPopular[index].title;
        var ImagenPelicula  = MoviesPopular[index].poster_path;
        var DescripcionPelicula  = MoviesPopular[index].overview;    
       
        var  generos = [];
        //Recorro los generos y los guardo 1 a 1
         for (let index2 = 0; index2 <  MoviesPopular[index].genre_ids.length; index2++)
        {
            var  Objectogeneros = {};
            const element = MoviesPopular[index].genre_ids[index2];
            Objectogeneros.id = IDPelicula; //Agrego el id de la pelicula con el genero
            Objectogeneros.genero = element;       
            generos.push(Objectogeneros);//Guarmos el obejcto en el array
        }
       
        //Guardamos el objecto
       var ObjectoPeliculas = {'IDPelicula'  : IDPelicula,'NombrePelicula'  : NombrePelicula, 'DescripcionPelicula'  : DescripcionPelicula, 'generos' : generos}
        
        //Vamos a Obtener la imagen de la pelicula 
        var imagen = getImagen("w300",ImagenPelicula );
         html_ = html_ + "<div class='pelicula'> <a href='#mdlValoraciones' data-toggle='modal' data-target='#mdlValoraciones' data-movie-id='"+ IDPelicula +"' data-movie-modal='Populares'><img src='" + imagen + "' alt='450px'></a></div>";
        
         SessionPeliculas.push(ObjectoPeliculas);
    }
    sessionStorage.setItem('DatosPeliculas', JSON.stringify(SessionPeliculas));
    
    $('#Carrousel-container').html(html_);
    call_Carrousel_method(); //LLAMA AL METODO DE carrosell.js para asi poder agregar el hover y paginación una vez obtenido la view
    
}


$( document ).ready(function() {
    Llenar_Movies_Populares();
    LlenarGeneros();
    Llenar_Movies_Upcomming();
    $('#mdlValoraciones').on('show.bs.modal', function(e) {
        var MovieID = $(e.relatedTarget).data('movie-id');
        var Tipo_movie = $(e.relatedTarget).data('movie-modal');
        var result = { id: MovieID, pelicula: Tipo_movie}
        CargarModal(result);
      });


    

});




   // CAMBIA LOS DATOS DEL MODAL - segun el ID de la pelicula
async function CargarModal(result)
{ //Traemos los datos del localstorage y los cambiamos 
    //Cargamos la info del modal con lo guardado en la session donde le id resultante sea el mismo
    if(result.id == undefined)
    {
        var modal = $('#mdlValoraciones');
        modal.modal('show');
        modal.find('.modal-title').html("Error");
        modal.find('.modal-body').html(" <div class='alert alert-warning alert-with-icon' data-notify='container'>"+
        "<div class='container'> "+
         " <div class='alert-wrapper'>"+
          "  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
          "  <i class='nc-icon nc-simple-remove'></i>"+
          " </button>"+
          "    <div class='message'><i class='nc-icon nc-bell-55'></i> Error al cargar la información</div>"+
          " </div>"+
          " </div>"+
          "  </div>");
    }
    else
    {
        try {
        var id_Pelicula = result.id; //Peliculas a buscar
        //Realizamos y agregamos la vista al modal
        //buscamos el ID de la pelicula que queremos mostrar en la variable de session 
        var arrayPeliculas;
        if(result.pelicula === "Upcoming"){
            arrayPeliculas = sessionStorage.getItem("DatosPeliculasProximas");
            //Ocultamos la valoracion
        }
        else
        {
            arrayPeliculas = sessionStorage.getItem("DatosPeliculas");
        }
       
        var arrayGeneros = localStorage.getItem("Generos");
        var Pelicula  = JSON.parse(arrayPeliculas);
        var Generos  = JSON.parse(arrayGeneros);
      
        //Busco en el array la infomación

        var Pelicula_A_Mostrar = Pelicula.find(Peli => Peli.IDPelicula === id_Pelicula); // propiedad find para buscar dentro de un array https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        //console.log(Object.keys(Pelicula_A_Mostrar.IDPelicula).length);
        
        //Si la encontro uno la vamos a mostrar en el modal
        
            
        
        if(Object.keys(Pelicula_A_Mostrar).length > 0)
        {
               var modal = $('#mdlValoraciones');
               modal.modal('show');
               modal.find('.modal-title').html(Pelicula_A_Mostrar.NombrePelicula);


               var string_genero = "";
               //me voy a traer el nombre de los generos
               for (let index = 0; index < Object.keys(Pelicula_A_Mostrar.generos).length; index++) {
                   const element = Pelicula_A_Mostrar.generos[index];
                  //console.log(element);
                   var id_genero = element.genero;
                   
                   //Voy a colocar aqui el metodo para buscar el genero por id
                    var name_genero = Generos.find(genre => genre.id === id_genero); // propiedad find para buscar dentro de un array https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find
                    

                    if(string_genero == ""){
                        string_genero =  name_genero.name  ;
                    }
                    else
                    {
                        string_genero = string_genero + ", " + name_genero.name  ;
                    }
                
                }

                var link_you_tube = "https://www.youtube.com/watch?v="

                //Traer el codigo de video de youtube
                var VideosElement = await GetVideosYoutube(Pelicula_A_Mostrar.IDPelicula);   
                var MoviesPopular = VideosElement;
                var cod_video = MoviesPopular.results[0].key;
                
                if(cod_video == undefined || cod_video == ""){
                    link_you_tube = "https://www.youtube.com/";
                }
                else
                {
                    link_you_tube = link_you_tube + cod_video;
                }

              //Consulto en el local storage si hay alguna pelicula con valoracion
              var arrayPeliculas = localStorage.getItem("InformacionPeliculas");
              var InformacionPeliculas  = JSON.parse(arrayPeliculas);
              try {
                var Pelicula_Repetidas = InformacionPeliculas.find(Peli => Peli.id === id_Pelicula);
              }catch (error) 
              {
                  
             }
             var valoracion = 0;
                //Preguntamos si encontro datos de Pelicula con valoracion
              if(Pelicula_Repetidas != null || Pelicula_Repetidas != undefined)
              {
                  //ENTRO ENTONCES VERIFICO SI ES MAYOR A 0
                if(Object.keys(Pelicula_Repetidas).length > 0)
                {
                    //Obtengo la valoracion
                    valoracion  = Pelicula_Repetidas.valoracion;
                }

            }
               //Para el body voy a cargar los generos y la descripción para eso voy a usar class = row
               var html_body = 
               "<div class ='row'>"+
               "<div class = 'col-md-12'>"+
                  "<h6 style='color: white; '>Descripción:</h6>"+
                  "<p style='color: white;'>"+ Pelicula_A_Mostrar.DescripcionPelicula+"</p>"+
                 "</div>"+
                "</div>"+
                "<div class ='row'>"+
                "<div class = 'col-md-12'>"+
                   "<h6 style='color: white; '>Generos:</h6>"+
                   "<p style='color: white; '>" + string_genero + "</p>"+
                  "</div>"+
                 "</div>"+
                 "<div class ='row'>"+
                "<div class = 'col-md-12' id='Valoracion_div'>"+
                   "<h6 style='color: white; '>Valoración:</h6>"+
                   "<p class='clasificacion'>"+
                    "<input id='radio1' type='radio' name='estrellas' value='5'>"+
                    "<label for='radio1'>★</label>"+
                    "<input id='radio2' type='radio' name='estrellas' value='4'>"+
                    "<label for='radio2'>★</label>"+
                    "<input id='radio3' type='radio' name='estrellas' value='3'>"+
                    "<label for='radio3'>★</label>"+
                    "<input id='radio4' type='radio' name='estrellas' value='2'>"+
                    "<label for='radio4'>★</label>"+
                    "<input id='radio5' type='radio' name='estrellas' value='1'>"+
                    "<label for='radio5'>★</label>"+
                  "</p>"+
                  "</div>"+
                 "</div>";

                 var html_footer = "<div class='left-side'>"+
                 "<a  href='" + link_you_tube + "' target='_blank' class='btn btn-default btn-link' style='color: white; '>Ver Tráiler</a>"+
                 "</div>"+
                 "<div class='divider'></div>" +
                 "<div class='right-side'>" +
                 "<button type='button' class='btn btn-danger btn-link' id='btn_GuardaValoracion'onclick='GuardarValoracion("+Pelicula_A_Mostrar.IDPelicula+")' >Guardar Valoración</button>" +
                 "<button type='button' class='btn btn-danger btn-link' id = 'btn_Cerrar' data-dismiss='modal' >Cerrar</button>" +
                 "</div>";
                 "</div>";

                 modal.find('.modal-body').html(html_body);
                 modal.find('.modal-footer').html(html_footer);
                 //Pasamos al input el valor de la valoracion asiganada anteriormente
                 if(result.pelicula === "Upcoming"){
                  
                    //Ocultamos la valoracion
                    var x = document.getElementById("Valoracion_div");
                    x.style.display = "none";
                    var btn_Cerrar = document.getElementById("btn_Cerrar");
                    btn_Cerrar.style.display = "block";
                    var btn_GuardaValoracion = document.getElementById("btn_GuardaValoracion");
                    btn_GuardaValoracion.style.display = "none";
                }
                else
                {
                    //Muestra la valoracion
                    var x = document.getElementById("Valoracion_div");
                    x.style.display = "block";
                    var btn_Cerrar = document.getElementById("btn_Cerrar");
                    btn_Cerrar.style.display = "none";
                    var btn_GuardaValoracion = document.getElementById("btn_GuardaValoracion");
                    btn_GuardaValoracion.style.display = "block";
                    //Carga la valoracion si tiene en las estrellas
                    $('input:radio[name=estrellas][value='+valoracion+']').click();

                }

                
               



        }
        else
        {
            var modal = $('#mdlValoraciones');
            modal.modal('show');
            modal.find('.modal-title').html("Error");
            modal.find('.modal-body').html(" <div class='alert alert-warning alert-with-icon' data-notify='container'>"+
            "<div class='container'> "+
             " <div class='alert-wrapper'>"+
              "  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
              "  <i class='nc-icon nc-simple-remove'></i>"+
              " </button>"+
              "    <div class='message'><i class='nc-icon nc-bell-55'></i> Error al cargar la información</div>"+
              " </div>"+
              " </div>"+
              " </div>");
            
       
        }

    } catch (error) {
        var modal = $('#mdlValoraciones');
        modal.modal('show');
        modal.find('.modal-title').html("Error");
        modal.find('.modal-body').html(" <div class='alert alert-warning alert-with-icon' data-notify='container'>"+
        "<div class='container'> "+
         " <div class='alert-wrapper'>"+
          "  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
          "  <i class='nc-icon nc-simple-remove'></i>"+
          " </button>"+
          "    <div class='message'><i class='nc-icon nc-bell-55'></i> Error al cargar la información</div>"+
          " </div>"+
          " </div>"+
          " </div>");
    }

    }

}// fin 



function GuardarValoracion(IDPelicula)
{
    
   
    
    $("#mdlValoraciones").modal("hide");
    $('#btn_GuardaValoracion').attr("disabled", true);
    //El btn GuardarValoracion se pone bloquado
    var valoracion = getRating();
    if(valoracion === "Sin calificación")
    {
        //Notificacion no se puede guardar
        console.log("Error");
    }
    else
    {

       var arrayPeliculas = localStorage.getItem("InformacionPeliculas");//Obtiene Local Store
       var InformacionPeliculas  = JSON.parse(arrayPeliculas); //Json

       
       //Si la encontro uno la vamos a mostrar en el modal
       if(InformacionPeliculas == null || InformacionPeliculas == undefined)
       {
        var array = [];
        var  Objectogenerados = {};
        Objectogenerados.id = IDPelicula;
        Objectogenerados.valoracion = valoracion;     
        array.push(Objectogenerados);
        localStorage.setItem('InformacionPeliculas', JSON.stringify(array));
        //Mensaje de guardado
       }
       else
       {
        localStorage.removeItem("InformacionPeliculas"); //Eliminamos los Items
        //Creamos los nuevos elementos
        var array = [];
        var  Objectogenerados = {};//Se crea un objecto
        Objectogenerados.id = IDPelicula;
        Objectogenerados.valoracion = valoracion;     
        array.push(Objectogenerados);//Los insertamos en el array


           for (let index = 0; index < InformacionPeliculas.length; index++) {
            var  Objectolocal = {};//Creamos un nuevo objecto
                if(InformacionPeliculas[index].id != IDPelicula)
                {
                    //Si no esta repetido entonces muestrelo
                    Objectolocal.id = InformacionPeliculas[index].id;
                    Objectolocal.valoracion = InformacionPeliculas[index].valoracion;     
                    array.push(Objectolocal);//Se lo insertamos al array
                }
           }

        localStorage.setItem('InformacionPeliculas', JSON.stringify(array)); // Creamos EL local storage con el nuevo array
        //Mensaje de guardado y cerrar modal
       }
     
    }

    $('#btn_GuardaValoracion').attr("disabled", false);

    $.notify({
        title: '<strong>Guardado con éxito!</strong>',
        message: 'Se Añadio la valoración!'
    },{
        type: 'success'
    });


}

function getRating()
{
    try
    {
        let estrellas = document.querySelector('input[name=estrellas]:checked').value;
        return estrellas;
    }
    catch(error)
    {
        return "Sin calificación";
    }

}



/*************************************************** FIN PELICULAS POPULARES ********************************************************************/

async function Llenar_Movies_Upcomming()
{
    let DatosMovies = await getMovies(metodoMovieUpcomming);//Vamos al API PARA obtener las peliculas - le pasamos el metodo definido de la API
    var MoviesProximas = DatosMovies.results //Obtenemos los resultados en un ARRAY
    var html_ = ""; //VARIABLE QUE SE LLENA CON LA VISTA
    localStorage.setItem('PeliculasProximas', JSON.stringify(MoviesProximas));
    //Genero Arrays list para guardar los elementos en la sessionStorage
    var  SessionPeliculas = [];

     //Recorro las peliculas para obtener el id, titulo e imagen de cada uno 
    for (let index = 0; index < MoviesProximas.length; index++) 
    {
        //Obtenego los valores de las peliculas
        var IDPelicula = MoviesProximas[index].id;
        var NombrePelicula = MoviesProximas[index].title;
        var ImagenPelicula  = MoviesProximas[index].poster_path;
        var DescripcionPelicula  = MoviesProximas[index].overview;    
       
        var  generos = [];
        //Recorro los generos y los guardo 1 a 1
         for (let index2 = 0; index2 <  MoviesProximas[index].genre_ids.length; index2++)
        {
            var  Objectogeneros = {};
            const element = MoviesProximas[index].genre_ids[index2];
            Objectogeneros.id = IDPelicula; //Agrego el id de la pelicula con el genero
            Objectogeneros.genero = element;       
            generos.push(Objectogeneros);//Guarmos el obejcto en el array
        }
       
        //Guardamos el objecto
       var ObjectoPeliculas = {'IDPelicula'  : IDPelicula,'NombrePelicula'  : NombrePelicula, 'DescripcionPelicula'  : DescripcionPelicula, 'generos' : generos}
        
        //Vamos a Obtener la imagen de la pelicula 
         var imagen = getImagen("w300",ImagenPelicula );
         html_ = html_ + "<div class='pelicula_upcoming'> <a href='#mdlValoraciones' data-toggle='modal' data-target='#mdlValoraciones' data-movie-id='"+ IDPelicula +"' data-movie-modal='Upcoming'><img src='" + imagen + "' alt=''></a></div>";
        
         SessionPeliculas.push(ObjectoPeliculas);
    }
    sessionStorage.setItem('DatosPeliculasProximas', JSON.stringify(SessionPeliculas));
    
    $('#Carrousel-container_2').html(html_);
    call_Carrousel_Upcoming_method();
    
}