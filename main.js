function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach((sec) => {
    sec.style.display = "none";
  });

  const seccionActiva = document.getElementById(id);
  if (seccionActiva) {
    if (seccionActiva.classList.contains("custom-inicio")) {
      seccionActiva.style.display = "flex";
    } else {
      seccionActiva.style.display = "block";
    }
  }
  document.getElementById("asistente").style.display =
    id === "asistente" ? "block" : "none";
  document.getElementById("camara").style.display =
    id === "camara" ? "block" : "none";

  if (id === "camara") {
    iniciarCamara();
  }
}

function toggleMenu() {
  document.querySelector("nav").classList.toggle("activo");
  document.querySelector("nav ul").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
}

function closeMenu() {
  document.querySelector("nav").classList.remove("activo");
  document.querySelector("nav ul").classList.remove("active");
  document.querySelector(".hamburger").classList.remove("active");
}

function iniciarSesion(nombre) {
  document.getElementById("userName").textContent = nombre;
  document.getElementById("userPanel").style.display = "flex";
  document.getElementById("nav-login").style.display = "none";
  mostrarSeccion("inicio");
}

function cerrarSesion() {
  document.getElementById("userPanel").style.display = "none";
  document.getElementById("nav-login").style.display = "inline";
  document.getElementById("userDropdown").style.display = "none";
}

function toggleDropdown() {
  const dropdown = document.getElementById("userDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

function procesarLogin() {
  const nombreUsuario = document.getElementById("usuarioInput").value.trim();
  if (nombreUsuario) {
    iniciarSesion(nombreUsuario);
  } else {
    alert("Por favor, ingresa un nombre de usuario válido.");
  }
}

// 🔧 Añadido: Reset del menú al volver a escritorio
window.addEventListener("resize", () => {
  const navUl = document.querySelector("nav ul");
  const hamburger = document.querySelector(".hamburger");
  if (window.innerWidth > 768) {
    navUl?.classList.remove("active");
    hamburger?.classList.remove("active");
  }
});

let stream = null;

async function encenderCamara() {
  const video = document.getElementById("video");
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("No se pudo acceder a la cámara: " + err.message);
  }
}

function apagarCamara() {
  const video = document.getElementById("video");
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
    stream = null;
  }
}

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo
    header.style.top = "-100px";
  } else {
    // Scroll hacia arriba
    header.style.top = "0";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// VALIDACION DE FORMULARIO
const form = document.querySelector('form[name="frm"]');
form.addEventListener("submit", (event) => {
  const fname = form.elements["nombres"].value;
  const flastname = form.elements["apellidos"].value;
  const fphone = form.elements["telefono"].value;
  const femail = form.elements["email"].value;

  if (!fname || !flastname || !fphone || !femail) {
    event.preventDefault();
    alert("Por favor, complete todos los campos del formulario");
  } else if (!validateEmail(femail)) {
    event.preventDefault();
    alert("Por favor, ingrese un correo valido");
  } else {
    const confirmation = confirm(
      "Esta a punto de enviar el formulario, ¿Desea Continuar?"
    );
    if (!confirmation) {
      event.preventDefault();
    }
  }
});

//CREAR FUNCION validateEmail(femail)
function validateEmail(femail) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail).toLowerCase());
}

// Lista global
let estudiantes = [];

// Evento del formulario
document.getElementById("notaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener datos
  const usuario = document.getElementById("user").value.trim();
  const nombres = document.getElementById("name").value.trim();
  const apellidos = document.getElementById("lastname").value.trim();
  const pais = document.getElementById("country").value;
  const tipo = document.getElementById("tcoment").value;
  const notaStr = document.getElementById("note").value;
  const nota = Number(notaStr);
  const comentario = document.getElementById("coment").value.trim();
  // Validación
  if (
    usuario === "" ||
    nombres === "" ||
    apellidos === "" ||
    pais === "" ||
    tipo === "" ||
    notaStr === "" ||
    comentario === "" ||
    isNaN(nota) ||
    nota < 0 ||
    nota > 20
  ) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  // Agregar alumno
  const nuevo = { usuario, nombres, apellidos, pais, tipo, nota, comentario };
  estudiantes.push(nuevo);

  // Orden descendente
  estudiantes.sort((a, b) => b.nota - a.nota);

  // Mostrar resultado
  mostrarRanking();

  // Limpiar formulario
  this.reset();
});

// Mostrar lista ordenada con barra
function mostrarRanking() {
  const lista = document.getElementById("listaEstudiantes");
  lista.innerHTML = "";

  estudiantes.forEach((est) => {
    const li = document.createElement("li");
    li.className = "barra-progreso";

    const barra = document.createElement("div");
    barra.className = "progreso";
    barra.style.width = `${(est.nota / 20) * 100}%`;

    const texto = document.createElement("span");
    //texto.textContent = ` Usuario: ${est.usuario} ${est.nombres} ${est.apellidos} (${est.pais}) (${est.tipo}) – Nota: ${est.nota} ${est.comentario}`;
    texto.innerHTML = `
  <strong>Usuario:</strong> ${est.usuario}<br>
  <strong>Ubicación:</strong> ${est.pais}<br>
  <strong>Tipo de comentario:</strong> ${est.tipo}<br>
  <strong>Valoración:</strong> ${est.nota} / 5 <br>
  <strong>Comentario:</strong> ${est.comentario}
`;
    li.appendChild(barra);
    li.appendChild(texto);
    lista.appendChild(li);
  });
}

function togglePassword() {
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}
