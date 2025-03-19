let amigos = [];

function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nombre = inputAmigo.value.trim();
    let listaAmigos = document.getElementById("listaAmigos");

    if (nombre === "" || /\d/.test(nombre)) {
        reproducirSonidoError();
        setTimeout(
            () => alert("Por favor, inserte un nombre válido (sin números)."),
            100
        );
        return;
    }

    amigos.push(nombre);
    inputAmigo.value = "";
    actualizarLista();

    reproducirSonidoAgregar();

    listaAmigos.style.display = "flex";
}

function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.classList.add("boton-nombre");

        let span = document.createElement("span");
        span.textContent = amigo;

        let botonEliminar = document.createElement("img");
        botonEliminar.src = "assets/img/delete_icon.png";
        botonEliminar.alt = "Eliminar";
        botonEliminar.classList.add("icono-eliminar");
        botonEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(span);
        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });

    if (amigos.length === 0) {
        lista.style.display = "none";
    }
}

function eliminarAmigo(index) {
    reproducirSonidoEliminar();
    amigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length === 0) {
        reproducirSonidoError();
        setTimeout(() => alert("No hay amigos en la lista para sortear."), 100);
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceAleatorio];

    reproducirSonidoVictoria();

    document.getElementById("nombre-sorteado").textContent = amigoSorteado;
    document.getElementById("popup-sorteo").style.display = "block";
}

function cerrarPopup() {
    document.getElementById("popup-sorteo").style.display = "none";
}

function reiniciarLista() {
    amigos = [];
    actualizarLista();
    document.getElementById("resultado").innerHTML = "";

    document.getElementById("listaAmigos").style.display = "none";
}

document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

function reproducirSonido() {
    let sonido = new Audio("assets/sounds/click-1119.wav");
    sonido.play();
}

document.addEventListener("DOMContentLoaded", () => {
    let botones = document.querySelectorAll("button");
    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            if (
                boton.classList.contains("error-trigger") ||
                boton.classList.contains("button-add")
            )
                return;
            reproducirSonido();
        });
    });
});

function reproducirSonidoEliminar() {
    let sonido = new Audio("assets/sounds/quit-01.mp3");
    sonido.play();
}

function reproducirSonidoError() {
    let sonido = new Audio("assets/sounds/error-01.mp3");
    sonido.play();
}

function reproducirSonidoVictoria() {
    let sonido = new Audio("assets/sounds/win-30.mp3");
    sonido.play();
}

function reproducirSonidoAgregar() {
    let sonido = new Audio("assets/sounds/add-73.wav");
    sonido.play();
}