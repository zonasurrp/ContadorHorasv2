function calcularTiempoServicio() {
    const logInput = document.getElementById("logInput").value;
    const resultadosTable = document.getElementById("resultados");
    resultadosTable.innerHTML = "";
    console.log("PUTO EL QUE LEE")
    const registros = {};
    const regex = /(\w+ \w+) \[steam:([^\]]+)\]\s+Hora de Entrada: (.+?)\s+\(ART\)\s+Hora de Salida: (.+?)\s+\(ART\)/g;
    let match;
//
//      GAY EL QUE LEE ESTO POR INSPECCIONAR ELEMENTOS
//
    while ((match = regex.exec(logInput)) !== null) {
        const nombre = match[1];
        const steamId = match[2];
        const horaEntradaTexto = match[3];
        const horaSalidaTexto = match[4];

        const horaEntrada = convertirFecha(horaEntradaTexto);
        const horaSalida = convertirFecha(horaSalidaTexto);

        if (horaEntrada && horaSalida) {
            const diferenciaMs = horaSalida - horaEntrada;
            const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
            const minutos = Math.floor((diferenciaMs % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenciaMs % (1000 * 60)) / 1000);

            if (!registros[steamId]) {
                registros[steamId] = {
                    nombre: nombre,
                    horas: 0,
                    minutos: 0,
                    segundos: 0
                };
            }

            registros[steamId].horas += horas;
            registros[steamId].minutos += minutos;
            registros[steamId].segundos += segundos;
        }
    }

//
//      GAY EL QUE LEE ESTO POR INSPECCIONAR ELEMENTOS
//
    for (const steamId in registros) {
        let { horas, minutos, segundos } = registros[steamId];
        minutos += Math.floor(segundos / 60);
        segundos = segundos % 60;
        horas += Math.floor(minutos / 60);
        minutos = minutos % 60;

        const nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `
            <td>${registros[steamId].nombre}</td>
            <td>${steamId}</td>
            <td>${horas}h ${minutos}m ${segundos}s</td>
        `;
        resultadosTable.appendChild(nuevaFila);

     
        registros[steamId].horas = horas;
        registros[steamId].minutos = minutos;
        registros[steamId].segundos = segundos;
    }

    // Convertir el objeto de registros a un arreglo de datos para enviar como JSON
    const datos = Object.keys(registros).map(steamId => ({
        nombre: registros[steamId].nombre,
        steamId: steamId,
        horas: registros[steamId].horas,
        minutos: registros[steamId].minutos,
        segundos: registros[steamId].segundos
    }));

    const jsonData = JSON.stringify(datos);

}
//
//      GAY EL QUE LEE ESTO POR INSPECCIONAR ELEMENTOS
//
function convertirFecha(textoFecha) {
    // Se espera un formato "Sat Mar 1 at 12:14 AM (ART)"
    const [diaSemana, mes, dia, at, hora, min, ampm] = textoFecha.split(/[\s:]+/);

    let hora24 = parseInt(hora);
    if (ampm === "PM" && hora24 < 12) hora24 += 12;
    if (ampm === "AM" && hora24 === 12) hora24 = 0;

    const year = new Date().getFullYear();
    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(mes);

    return new Date(year, monthIndex, parseInt(dia), hora24, parseInt(min), 0);
}

//
//      GAY EL QUE LEE ESTO POR INSPECCIONAR ELEMENTOS
//

document.addEventListener("DOMContentLoaded", () => {
    const logos = document.querySelectorAll(".logo");
    const container = document.querySelector(".logo-container");

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    let speeds = [];

    // Inicializar posiciones y velocidades aleatorias
    logos.forEach((logo, index) => {
        let speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1);
        let speedY = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1);

        let x = Math.random() * (containerWidth - 80);
        let y = Math.random() * (containerHeight - 80);

        speeds.push({ x, y, speedX, speedY });

        logo.style.transform = `translate(${x}px, ${y}px)`;
    });
//
//      GAY EL QUE LEE ESTO POR INSPECCIONAR ELEMENTOS
//
    function moveLogos() {
        logos.forEach((logo, index) => {
            let { x, y, speedX, speedY } = speeds[index];

            x += speedX;
            y += speedY;

            // Rebote en los bordes
            if (x <= 0 || x >= containerWidth - 80) {
                speedX *= -1;
            }
            if (y <= 0 || y >= containerHeight - 80) {
                speedY *= -1;
            }

            speeds[index] = { x, y, speedX, speedY };

            logo.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(moveLogos);
    }
//
//      GAY EL QUE LEE ESTO POR INSPECCIONAR ELEMENTOS
//
    moveLogos();
});
