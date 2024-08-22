// Atualizar a tabela com os dados do localStorage
function updateTable() {
    const tableBody = document.querySelector('#clientTable tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de atualizar

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.forEach((client, index) => {
        // Inserir dados capturados do formulário na tabela de clientes
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${client.name}</td>
            <td>${client.cpf}</td> 
            <td>${client.age}</td>
            <td>${client.createdAt}</td>
        `;
        tableBody.appendChild(row); // Adiciona a nova linha ao final da tabela
    });
}

// Cadastrar Cliente
document.getElementById('clientForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    let id = document.getElementById('inputId').value;
    let name = document.getElementById('inputName').value;
    let cpf = document.getElementById('inputCpf').value;
    let age = parseInt(document.getElementById('inputAge').value);
    let createdAt = document.getElementById('inputCreatedAt').value;

    let client = {
        id,
        name,
        cpf,
        age,
        createdAt
    };

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));
    alert('Cliente cadastrado com sucesso!');
    this.reset();
    // Atualiza a tabela na página 'customers.html'
    window.location.href = 'customers.html'; // Redireciona para atualizar a tabela
});

// Atualizar Cliente
document.getElementById('clientUpdateForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    let id = document.getElementById('updateId').value;
    let name = document.getElementById('updateName').value;
    let cpf = document.getElementById('updateCpf').value;
    let age = parseInt(document.getElementById('updateAge').value);

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    let clientIndex = clients.findIndex(client => client.id === id);

    if (clientIndex !== -1) {
        clients[clientIndex].name = name || clients[clientIndex].name;
        clients[clientIndex].cpf = cpf || clients[clientIndex].cpf;
        clients[clientIndex].age = age || clients[clientIndex].age;
        localStorage.setItem('clients', JSON.stringify(clients));
        alert('Cliente atualizado com sucesso!');
    } else {
        alert('Cliente não encontrado!');
    }

    this.reset();
    // Atualiza a tabela na página 'customers.html'
    window.location.href = 'customers.html'; // Redireciona para atualizar a tabela
});

// Remover Cliente
document.getElementById('clientRemoveForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    let id = document.getElementById('removeId').value;

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    let newClients = clients.filter(client => client.id !== id);

    if (clients.length !== newClients.length) {
        localStorage.setItem('clients', JSON.stringify(newClients));
        alert('Cliente removido com sucesso!');
    } else {
        alert('Cliente não encontrado!');
    }

    this.reset();
    // Atualiza a tabela na página 'customers.html'
    window.location.href = 'customers.html'; // Redireciona para atualizar a tabela
});

// Atualizar a tabela ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    updateTable();
});
