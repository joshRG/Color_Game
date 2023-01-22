//nodeLists
var cuadrados = document.querySelectorAll('.cuadrado'); //se eligen los cuadrados a modificar
var colorDisplay = document.getElementById('colorDisplay'); //Se elige la seccion de texto a manipularññ
var mensajeEnPantalla = document.querySelector('#message');
var resetButton = document.querySelector('#reset');
var modoBtn = document.querySelectorAll('.modo');
var h1 = document.querySelector('h1');
//arrays
var colors = [];
//variables o pointers
var colorElegido;
var numeroDeCuadrados = 6;
//funciones
function init() {
	aplicaDificultad(); //define la dificultad (mas detalle en la funcion)

	defineLosCuadrados(); //define y configura los cuadrados (mas detalle en la funcion)

	reset(); //se llama otra vez para que actualize los cuadrados otra vez
}
function generaUnColor() {
	//intensidad del rojo
	var r = Math.floor(Math.random() * 256);
	//intensidad del verde
	var g = Math.floor(Math.random() * 256);
	//intensidad del azul
	var b = Math.floor(Math.random() * 256);
	//retorna en formato RGB
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
function generaColoresAleatorios(num) {
	var arr = []; //se crea el array donde se almacenaran los colores
	for (var i = 0; i < num; i++) {
		arr.push(generaUnColor()); //se llama la funcion y se almacena uno por uno las veces que sea llamada en el array.
	}
	return arr;
}
function cambiaElColor(color) {
	for (var i = 0; i < cuadrados.length; i++) {
		//cambia el color de cada cuadrado para resaltar el color correcto.
		cuadrados[i].style.backgroundColor = color;
	}
}
function eligeUnColor() {
	var random = Math.floor(Math.random() * colors.length);
	//genera un numero randomly en un intervalo tan grande como el array colors para luego usarse como juego
	return colors[random];
}
function aplicaDificultad() {
	for (var i = 0; i < modoBtn.length; i++) {
		modoBtn[i].addEventListener('click', function() {
			//se elimina la clase de ambos botones no importa si lo tienen o no.
			modoBtn[0].classList.remove('seleccionado');
			modoBtn[1].classList.remove('seleccionado');
			//se le pone la clase al boton que se esta clickeando
			this.classList.add('seleccionado');

			//se arregla la variable numero de cuadrados que ayuda al boton de reset
			//a saber cuantos cuadros va a generar
			if (this.textContent === 'Facil') {
				numeroDeCuadrados = 3;
			} else {
				numeroDeCuadrados = 6;
			}

			//se llama la funcion reset otra vez para generar los colores
			reset();
		});
	}
}
function defineLosCuadrados() {
	//iteracion entre cada cuadrado con un loop
	for (var contador = 0; contador < cuadrados.length; contador++) {
		//evento
		cuadrados[contador].addEventListener('click', function() {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === colorElegido) {
				mensajeEnPantalla.textContent = 'Excelente!';
				cambiaElColor(clickedColor); //cambia todos los colores al correcto elegido
				h1.style.background = clickedColor; //resalta el color correcto en el fondo del h1
				resetButton.textContent = 'Repetir?'; //cambia el texto del boton
			} else {
				//'desaparece' el cuadrado poniendolo del mismo color del fondo
				this.style.backgroundColor = '#232323';

				//Mensaje indicador de que no eligio el correcto
				mensajeEnPantalla.textContent = 'Intenta otra vez.';
			}
		}); //se le da un evento
	} //se les otorga un color a cada cuadrado mostrado en la pagina y se le agrega un click Listener.
}
function reset() {
	colors = generaColoresAleatorios(numeroDeCuadrados); //genera 6 colores mas con ayuda de la variable numero de cuadrados ya antes evaluada

	colorElegido = eligeUnColor(); //Actualiza la meta con el nuevo color

	colorDisplay.textContent = colorElegido; //Actualiza el html que indica al usuario el color a adivinar

	mensajeEnPantalla.textContent = '';
	//se reflejan los colores nuevos
	for (var i = 0; i < cuadrados.length; i++) {
		if (colors[i]) {
			cuadrados[i].style.display = 'block';
			cuadrados[i].style.background = colors[i];
		} else {
			cuadrados[i].style.display = 'none';
		}
	}

	//vuelve el texto del boton a la normalidad
	resetButton.textContent = 'Nuevos Colores';
	//vuelve el background del h1 a su normalidad
	h1.style.background = 'blueviolet';
}

//Funciones aplicadas
window.setTimeout(function() {
	init();
	//ir a funciones
	resetButton.addEventListener('click', function() {
		reset();
	});
}, 500);
