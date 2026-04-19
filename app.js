const userGrid = document.getElementById('user-grid');
const userCount = document.getElementById('user-count');

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Error de conexión');
        
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        userGrid.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
    }
}

function renderUsers(users) {
    userGrid.innerHTML = '';
    userCount.textContent = users.length;

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <span class="badge">ID: #${user.id}</span>
            <h3 class="user-name">${user.name}</h3>
            <span class="user-email">${user.email}</span>
            
            <div class="info-row">
                <i class="fas fa-globe"></i>
                <span>${user.website}</span>
            </div>
            <div class="info-row">
                <i class="fas fa-building"></i>
                <span>${user.company.name}</span>
            </div>
            <div class="info-row">
                <i class="fas fa-map-marker-alt"></i>
                <span>${user.address.city}</span>
            </div>
        `;
        userGrid.appendChild(card);
    });
}

fetchUsers();