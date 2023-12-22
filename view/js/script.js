'use strict'
//Construimos el escenario desde la matriz del laberinto
//Laberinto: 0: pasillo vacío, 1:muros, 2:pasillo con sobre, 3:salida.
var array_laberinto = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1],
    [1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1],
    [1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1],
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Variables del juego (no utilizo todas aún)
var puntos = 0;
const puntuacion = $('#puntos');
const record = $('#total');
var gameover = true;
var enJuego = false;

//variables para divs
const contenedor = $('#container');
const feijoo = new Prota ($('#prota'), 12, 9);
var feijooDiv = $('#prota');
//arrays para almacenar muros y sobres. No los utilizo aún
const murallas = new Muros;
const mordidas = new Muros;
var yolanda = $('#yolanda');
var iglesias = $('#iglesias');
var ayuso = $('#ayuso');

//variables para casillas de tablero
var celda = $('.celda');
var muro = $('.muro');

// Variables para el movimiento de los personajes.
var tiempo;

//Función para el intervalo de salida de personajes
function temporizador(funcionConRetraso, miliSeg) {
  tiempo = setTimeout(funcionConRetraso, miliSeg);
}

$( document ).ready(function() {
    // resetMarca();
    inicializaMarca();
    pintarMapa();
    temporizador(movimientoProta(), 3000);
    // movimientoProta();
    // console.log(feijoo.getX() + " / " + feijoo.getY());
});

//Recorrer la variable mapa para rellenar con una div.muro cada pieza del muro
function pintarMapa(){  
    var celdasX = 1;
    var celdasY = 1;
    for(var i = 0; i < 16; i++){ //Construye las filas
        for(var j = 0; j < 24; j++){ // Contruye columnas (rows en columnas)
            if (array_laberinto[i][j] == 1){
                var celda = document.createElement("div"); 
                let estiloDiv = "grid-colum: " + celdasX + " / " + celdasX + "; grid-row: " + celdasY + " / " + celdasY + ";";
                let idCelda = "M-" + celdasY + "-" + celdasX;
                murallas.agregarMuro(idCelda, celdasX, celdasY);
                celda.classList.add("muro");
                celda.classList.add("mapa");
                celda.id = idCelda;
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
                celdasX += 1;
            } else if (array_laberinto[i][j] == 3){
                var celda= document.createElement("div"); 
                let estiloDiv = "grid-colum: " + celdasX + " / " + celdasX + "; grid-row: " + celdasY + " / " + celdasY + ";";
                let idCelda = "P-" + celdasY + "-" + celdasX;
                celda.id = idCelda;
                celda.classList.add("puerta");
                celda.classList.add("mapa");
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
                celdasX += 1;
            } else if (array_laberinto[i][j] == 2){
                var celda= document.createElement("div"); 
                let estiloDiv = "grid-colum: " + celdasX + " / " + celdasX + "; grid-row: " + celdasY + " / " + celdasY + ";";
                let idCelda = "S-" + celdasY + "-" + celdasX;
                celda.id = idCelda;
                mordidas.agregarMuro(idCelda, celdasX, celdasY);
                celda.classList.add("sobre");
                celda.classList.add("mapa");
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
                celdasX += 1;
            } else if (array_laberinto[i][j] == 0){
                var celda= document.createElement("div"); 
                let estiloDiv = "grid-colum: " + celdasX + " / " + celdasX + "; grid-row: " + celdasY + " / " + celdasY + ";";
                let idCelda = "V-" + celdasY + "-" + celdasX;
                celda.id = idCelda;
                celda.classList.add("celda");
                celda.classList.add("mapa");
                celda.style.cssText = estiloDiv;
                document.getElementById('container').appendChild(celda);
                celdasX += 1;
            }
        }
        celdasX = 1;
        celdasY += 1;
    }
    console.log(murallas);
    console.log(mordidas);
}
//Función para borrar todas las celdas el mapa y volver a pintarlas. Se filtran por la 1a letra del Id para no borrar personajes.
function actualizaMapa(){ 
    // contenedor.empty();
    $('.mapa').remove();
    // $('#contenedor').filter(function() {
    //     return $(this).attr('id').match(/^[PMSV]/); 
    // }).remove();
    pintarMapa();
}
//Funciones para detectar muros en las cuatro direcciones que se puede mover el prota. Buscamos en el array del mapa
function checkMuros(dir){
    if (dir == "up") {
        let fila = feijoo.getX() - 1;
        let col = feijoo.getY() - 2;
        if (array_laberinto[col][fila] === 1 || array_laberinto[col][fila] === 3){
            return true;
        } else { return false;}
    } else if (dir == "down"){
        let fila = feijoo.getX() - 1;
        let col = feijoo.getY();
        if (array_laberinto[col][fila] === 1 || array_laberinto[col][fila] === 3){
            return true;
        } else { return false;}
    } else if (dir == "left"){
        let fila = feijoo.getX() - 2;
        let col = feijoo.getY() - 1;
        if (array_laberinto[col][fila] === 1 || array_laberinto[col][fila] === 3){
            return true;
        } else {return false;}
    } else if (dir == "right"){
        let fila = feijoo.getX();
        let col = feijoo.getY() - 1;
        if (array_laberinto[col][fila] === 1 || array_laberinto[col][fila] === 3){
            return true; 
        } else {return false;}        
    }
}

//Inicializar marcador
function inicializaMarca() {
    puntuacion.append(puntos);
}