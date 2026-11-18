document.addEventListener("DOMContentLoaded", function() {
    const elementoCupos = document.getElementById("contador-cupos");
    
    // CONFIGURACIÓN DE TU CURSO
    const cuposIniciales = 50;
    const cuposMinimos = 1;

    // FECHA EXACTA DE CIERRE (Miércoles 01 de Julio a las 15:30)
    const fechaCierre = new Date(2026, 10, 19, 16, 3, 0).getTime();

    // FECHA DE INICIO DE LA CAMPAÑA (Viernes 19 de Junio a las 08:00 AM)
    const fechaInicioCampana = new Date(2026, 10, 18, 10, 3, 5).getTime();

    function actualizarCuposGlobales() {
        if (!elementoCupos) return; // Seguridad por si no encuentra el ID

        const ahora = new Date().getTime();
        
        // Antes de la campaña
        if (ahora < fechaInicioCampana) {
            elementoCupos.innerText = `${cuposIniciales} de ${cuposIniciales} CUPOS`;
            return;
        }

        const tiempoTotalCampana = fechaCierre - fechaInicioCampana;
        const tiempoTranscurrido = ahora - fechaInicioCampana;

        // Después del cierre
        if (tiempoTranscurrido >= tiempoTotalCampana) {
            elementoCupos.innerText = `${cuposMinimos} de ${cuposIniciales} CUPOS`;
            return;
        }

        let porcentajeTiempo = tiempoTranscurrido / tiempoTotalCampana;
        let factorCurva = Math.pow(porcentajeTiempo, 2.1); 

        let cuposDisponiblesParaRestar = cuposIniciales - cuposMinimos; 
        let cuposRestados = Math.floor(factorCurva * cuposDisponiblesParaRestar);

        let cuposActuales = cuposIniciales - cuposRestados;

        if (cuposActuales <= cuposMinimos) {
            cuposActuales = cuposMinimos;
        }

        // AQUÍ ESTABA EL ERROR: Usamos backticks (`) para que las variables funcionen
        elementoCupos.innerText = `${cuposActuales} de ${cuposIniciales} CUPOS`;
    }

    actualizarCuposGlobales();
    setInterval(actualizarCuposGlobales, 10000);
});


/* Estilos para el contador nativo con efecto de caída */
.flip-box {
    background: #1a1a1a;
    color: #f39c12;
    font-size: 2.5rem;
    padding: 15px 20px;
    border-radius: 6px;
    font-weight: bold;
    border: 1px solid #333;
    display: inline-block;
    min-width: 70px;
    transition: transform 0.15s ease-in-out, background-color 0.15s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

/* Efecto visual de caída/pestaña al cambiar */
.flip-box.fall {
    transform: translateY(-4px) scale(0.97);
    background: #252525;
}

.time-label {
    color: #fff;
    font-size: 0.9rem;
    margin-top: 8px;
    font-family: 'Montserrat', sans-serif;
}
