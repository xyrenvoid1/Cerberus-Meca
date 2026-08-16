// ==========================================
// CALCULADORA DEL MECÁNICO
// ==========================================

// BOTONES DE NAVEGACIÓN

const habitualBtn = document.getElementById("habitualBtn");
const completaBtn = document.getElementById("completaBtn");
const infoBtn = document.getElementById("infoBtn");

const habitual = document.getElementById("habitual");
const completa = document.getElementById("completa");
const info = document.getElementById("info");


// ==========================================
// CAMBIAR ENTRE VISTAS
// ==========================================

habitualBtn.addEventListener("click", () => {

    habitual.classList.remove("hidden");
    completa.classList.add("hidden");
    info.classList.add("hidden");

    habitualBtn.classList.add("active");
    completaBtn.classList.remove("active");
    infoBtn.classList.remove("active");

});


completaBtn.addEventListener("click", () => {

    habitual.classList.add("hidden");
    completa.classList.remove("hidden");
    info.classList.add("hidden");

    habitualBtn.classList.remove("active");
    completaBtn.classList.add("active");
    infoBtn.classList.remove("active");

});


infoBtn.addEventListener("click", () => {

    habitual.classList.add("hidden");
    completa.classList.add("hidden");
    info.classList.remove("hidden");

    habitualBtn.classList.remove("active");
    completaBtn.classList.remove("active");
    infoBtn.classList.add("active");

});


// ==========================================
// FORMATO DE DINERO
// ==========================================

function dinero(numero) {

    return "$" + numero.toLocaleString("es-CL");

}


// ==========================================
// CALCULAR UNA VISTA
// ==========================================

function calcularVista(contenedor) {

    const items = contenedor.querySelectorAll(".item");

    let total = 0;

    items.forEach(item => {

        const precio = Number(item.dataset.price);

        const input = item.querySelector("input");

        let cantidad = Number(input.value);

        if (cantidad < 0 || isNaN(cantidad)) {
            cantidad = 0;
            input.value = 0;
        }

        const resultado = precio * cantidad;

        const totalElemento = item.querySelector("strong");

        totalElemento.textContent = dinero(resultado);

        total += resultado;

    });

    return total;

}


// ==========================================
// CALCULAR DESCUENTOS
// ==========================================

function calcularDescuentos(total, elementos) {

    elementos.forEach((elemento, index) => {

        const porcentaje = [5, 10, 15][index];

        const descuento = total * (porcentaje / 100);

        const resultado = total - descuento;

        elemento.textContent = dinero(resultado);

    });

}


// ==========================================
// ACTUALIZAR TODO
// ==========================================

function actualizarCalculadora() {

    // VISTA HABITUAL

    const totalHabitual = calcularVista(habitual);

    document.getElementById("totalHabitual").textContent =
        dinero(totalHabitual);


    const descuentosHabitual = [
        document.getElementById("discount5"),
        document.getElementById("discount10"),
        document.getElementById("discount15")
    ];

    calcularDescuentos(
        totalHabitual,
        descuentosHabitual
    );


    // VISTA COMPLETA

    const totalCompleta = calcularVista(completa);

    document.getElementById("totalCompleta").textContent =
        dinero(totalCompleta);


    const descuentosCompleta = [
        document.getElementById("fullDiscount5"),
        document.getElementById("fullDiscount10"),
        document.getElementById("fullDiscount15")
    ];

    calcularDescuentos(
        totalCompleta,
        descuentosCompleta
    );

}


// ==========================================
// DETECTAR CAMBIOS EN LAS CANTIDADES
// ==========================================

document.querySelectorAll(".item input").forEach(input => {

    input.addEventListener("input", () => {

        actualizarCalculadora();

    });

});


// ==========================================
// BOTÓN LIMPIAR TODO
// ==========================================

document.getElementById("clearBtn").addEventListener("click", () => {

    document.querySelectorAll(".item input").forEach(input => {

        input.value = 0;

    });

    actualizarCalculadora();

});


// ==========================================
// FULL TUNING
// ==========================================

document.getElementById("fullTuning").addEventListener("click", () => {

    const confirmado = confirm(
        "¿Quieres añadir un Full Tuning por $110.000?"
    );

    if (!confirmado) {
        return;
    }

    const totalActual = calcularVista(completa);

    const nuevoTotal = totalActual + 110000;

    document.getElementById("totalCompleta").textContent =
        dinero(nuevoTotal);


    document.getElementById("fullDiscount5").textContent =
        dinero(nuevoTotal * 0.95);

    document.getElementById("fullDiscount10").textContent =
        dinero(nuevoTotal * 0.90);

    document.getElementById("fullDiscount15").textContent =
        dinero(nuevoTotal * 0.85);

});


// ==========================================
// INICIAR CALCULADORA
// ==========================================

actualizarCalculadora();
