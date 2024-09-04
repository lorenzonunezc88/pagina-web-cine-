function call_Carrousel_method(){
const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});

}



/*Carrousel #2*/


function call_Carrousel_Upcoming_method(){
	const fila_ = document.querySelector('.contenedor-carousel_2');
	const peliculas = document.querySelectorAll('.pelicula_upcoming');
	
	const flechaIzquierda = document.getElementById('flecha-izquierda-upcoming');
	const flechaDerecha = document.getElementById('flecha-derecha-upcoming');
	
	// ? ----- ----- Event Listener para la flecha derecha. ----- -----
	flechaDerecha.addEventListener('click', () => {
		fila_.scrollLeft += fila_.offsetWidth;
	
		const indicadorActivo = document.querySelector('.indicadores-2 .activo');
		if(indicadorActivo.nextSibling){
			indicadorActivo.nextSibling.classList.add('activo');
			indicadorActivo.classList.remove('activo');
		}
	});
	
	// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
	flechaIzquierda.addEventListener('click', () => {
		fila_.scrollLeft -= fila_.offsetWidth;
	
		const indicadorActivo = document.querySelector('.indicadores-2 .activo');
		if(indicadorActivo.previousSibling){
			indicadorActivo.previousSibling.classList.add('activo');
			indicadorActivo.classList.remove('activo');
		}
	});
	
	// ? ----- ----- Paginacion ----- -----
	const numeroPaginas = Math.ceil(peliculas.length / 5);
	for(let i = 0; i < numeroPaginas; i++){
		const indicador = document.createElement('button');
	
		if(i === 0){
			indicador.classList.add('activo');
		}
	
		document.querySelector('.indicadores-2').appendChild(indicador);
		indicador.addEventListener('click', (e) => {
			fila_.scrollLeft = i * fila_.offsetWidth;
	
			document.querySelector('.indicadores_2 .activo').classList.remove('activo');
			e.target.classList.add('activo');
		});
	}
	
	// ? ----- ----- Hover ----- -----
	peliculas.forEach((pelicula) => {
		pelicula.addEventListener('mouseenter', (e) => {
			const elemento = e.currentTarget;
			setTimeout(() => {
				peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
				elemento.classList.add('hover');
			}, 300);
		});
	});
	
	fila_.addEventListener('mouseleave', () => {
		peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
	});
	
	}