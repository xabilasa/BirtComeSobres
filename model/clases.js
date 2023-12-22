class Prota {
    constructor(id, x, y) {
        //Posición del prota
        this.id = $(id);
        this.x = x;
        this.y = y;
    } 
    //Métodos get y set
    getId() {return this.id;}
    getX() {return this.x;}
    getY() {return this.y;}

    setId(id) {this.id = id;}
    setX(x) {this.x = x;}
    setY(y) {this.y = y;}

}

class Rojos extends Prota {
    constructor(clase){
        this.clase = clase;
    }
    getClase(){return this.clase;}
    setClase(clase){this.clase = clase;}
}

class Amigui extends Prota {
    constructor(clase){
        this.clase = clase;
    }
    getClase(){return this.clase;}
    setClase(clase){this.clase = clase;}
}

class Muros {
    constructor() {
        this.arrayMuros = [];
    }

    // Método para agregar un muro al array. X e Y corresponden a posiciones del Grid
    agregarMuro(id, x, y) {
        var muro = {
            id: id,
            x: x,
            y: y
        };
        this.arrayMuros.push(muro);
    }

    // Método para recorrer el array de muros
    recorrerMuros() {
        for (var i = 0; i < this.arrayMuros.length; i++) {
            var muro = this.arrayMuros[i];
            console.log("ID: " + muro.id + ", Nombre: " + muro.nombre);
        }
    }

    //Getters para atributos de objetos Muro
    getIdPos(i) {return this.arrayMuros[i].id}
    getXPos(i) {return this.arrayMuros[i].x}
    getYPos(i) {return this.arrayMuros[i].y}
}