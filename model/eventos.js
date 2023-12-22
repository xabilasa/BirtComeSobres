// document.addEventListener('DOMContentLoaded', iniciarJuego);

function movimientoProta(){
    //El prota se mueve en pixels (pos.absolute) pero también almacena las posiciones en el grid para detectar colisiones
    var gridX = 12;
    var gridY = 9; 
    var ejeX = 536;
    var ejeY= 452;
    document.addEventListener("keydown", function(event) {

        switch(event.key) {
            case "ArrowUp":
                if ((ejeY-68)%48 == 0) { //ifs preparados para ralentizar el movimiento al 25%
                    console.log("Coincide");
                    if (!checkMuros("up")){; 
                        gridY -= 1;
                        ejeY -= 48;
                        detectaSobres();
                    } 
                } 
                break;
            case "ArrowDown":
                if ((ejeY-68)%48 == 0) {
                    if (!checkMuros("down")){;
                        gridY += 1;
                        ejeY += 48;
                        detectaSobres();
                    }
                } 
                break;
            case "ArrowLeft":
                if ((ejeX-8)%48 == 0) {
                    if (!checkMuros("left")){;
                        gridX -= 1;
                        ejeX -= 48;
                        detectaSobres();
                        }
                }  
                break;
            case "ArrowRight":
                if ((ejeX-8)%48 == 0) {
                    if (!checkMuros("right")){;
                        gridX += 1;
                        ejeX += 48;
                        detectaSobres();
                    } 
                } 
                break;
        }
        actualizaPosicion(feijooDiv, ejeX, ejeY, gridX, gridY);
        console.log(feijoo);
    });
}

//Actualizar posición del prota después de moverlo
function actualizaPosicion(avatarDiv, x, y, gX, gY) {
    feijoo.setX(gX);
    feijoo.setY(gY);
    avatarDiv[0].style.top = y + 'px';
    avatarDiv[0].style.left = x + 'px';
    
}

//Función para detectar coincidencia con sobres y recogerlos
function detectaSobres(){
    let posSobreX = feijoo.getX() - 1;
    let posSobreY = feijoo.getY() - 1;
    if (array_laberinto[posSobreY][posSobreX] == 2) {
        array_laberinto[posSobreY][posSobreX] = 0;
        let posSobre = "S-" + (posSobreY + 1) + "-" + (posSobreX + 1);
        $('#' + posSobre).removeClass('sobre');
        $('#' + posSobre).addClass('celda');
        puntos++;
        puntuacion.html(puntos);
        if(puntos == 149) {
            let puertas = $('.puerta')
            puertas.removeClass('puerta');
            puertas.addClass$('celda');
        }
    }
}