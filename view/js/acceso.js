var boton = $('.logon');
var erroneo = $('#incorrecto');

$(document).ready(function(){
    $.getJSON('content/usuarios.json', function(data) {
    // Removing duplicates from the array
    let uniqueData = [...new Set(data)];

    // Storing the array in localStorage
    localStorage.setItem('usuarios', JSON.stringify(uniqueData));
    });
});

$("#access-form").submit(function(e){
    e.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();
    if (password.match(/[!"#%&'+,-./:;<=>¿?@_`\{\[\\\]\$\^\*\(\)]/)){
        alert("¡La contraseña no puede contener símbolos!"); 
        location.reload();
    }
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));

    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].usuario === username && usuarios[i].contraseña === password){
            window.open("view/interface.html", "_blank", "width=1184,height=860,menubar=no,scrollbars=yes,status=yes,toolbar=no");
            return;
        }
    }
    accesologin();
});

function accesologin() {
    boton.css("background-color", "red");
    erroneo.html('<h2>USUARIO NO REGISTRADO</h2>');
} 