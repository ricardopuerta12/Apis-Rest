// Configuración de URLs
const URL_REST_USERS = 'https://jsonplaceholder.typicode.com/users';

const grid = document.getElementById('user-grid');

// Función para limpiar la pantalla y mostrar qué estamos cargando
const prepararPantalla = (mensaje) => {
    grid.innerHTML = `<div class="loader">${mensaje}...</div>`;
};

// --- CONSULTA 1: API REST (Usuarios Ficticios) ---
const obtenerUsuariosRest = async () => {
    try {
        const res = await fetch(URL_REST_USERS);
        const data = await res.json();
        
        data.slice(0, 6).forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <span class="badge" style="background: #4ade80; color: #064e3b;">API REST</span>
                <h3 class="user-name">${user.name}</h3>
                <span class="user-email">${user.email}</span>
                <div class="info-row"><i class="fas fa-globe"></i><span>${user.website}</span></div>
            `;
            grid.appendChild(card);
        });
    } catch (e) { console.error("Error REST:", e); }
};

// URL oficial de Instituciones Educativas del Atlántico
const URL_SODA_COLOMBIA = 'https://www.datos.gov.co/resource/7tec-5fhs.json?$limit=6';

const obtenerDatosSoda = async () => {
    try {
        const res = await fetch(URL_SODA_COLOMBIA);
        if (!res.ok) throw new Error("Error al cargar datos del Atlántico");

        const data = await res.json();
        
        data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.style.borderLeft = "4px solid #004a99"; 
    
    // IMPORTANTE: Asegúrate de usar los nombres exactos de las columnas del dataset
    card.innerHTML = `
        <span class="badge" style="background: #e11d48; color: white;">ATLÁNTICO</span>
        <h3 class="user-name">${item.nombre_establecimiento || 'Institución'}</h3>
        <span class="user-email">${item.municipio || 'Atlántico'} - Sede: ${item.nombre_sede || 'Principal'}</span>
        
        <div class="info-row">
            <i class="fas fa-university"></i>
            <span>Sector: ${item.sector || 'Oficial'}</span>
        </div>
        <div class="info-row">
            <i class="fas fa-map-marker-alt"></i>
            <span>Dirección: ${item.direccion || 'No registra'}</span>
        </div>
    `;
    grid.appendChild(card);
});
    } catch (e) {
        console.error("Error en datos del Atlántico:", e);
    }
};
// --- FUNCIÓN MAESTRA: Ejecuta ambas ---
const cargarTodo = async () => {
    prepararPantalla("Consultando múltiples APIs");
    grid.innerHTML = ''; // Limpiamos el cargador
    
    // Ejecutamos ambas en paralelo para mayor velocidad
    await Promise.all([obtenerUsuariosRest(), obtenerDatosSoda()]);
    
    // Actualizamos el contador total
    document.getElementById('user-count').textContent = grid.children.length;
};

cargarTodo();