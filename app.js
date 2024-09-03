const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Caminhos para os arquivos JSON
const clientsFilePath = path.join(__dirname, 'clientes.json'); // Caminho para clientes
const productsFilePath = path.join(__dirname, 'produtos.json'); // Caminho para produtos
const usersFilePath = path.join(__dirname, 'usuarios.json'); // Caminho para usuários

// Função para ler os clientes do arquivo JSON
function readClients() {
    if (!fs.existsSync(clientsFilePath)) {
        return [];
    }
    const clientsData = fs.readFileSync(clientsFilePath);
    return JSON.parse(clientsData);
}

// Função para escrever os clientes no arquivo JSON
function writeClients(clients) {
    fs.writeFileSync(clientsFilePath, JSON.stringify(clients, null, 2));
}

// Função para ler os produtos do arquivo JSON
function readProducts() {
    if (!fs.existsSync(productsFilePath)) {
        return [];
    }
    const productsData = fs.readFileSync(productsFilePath);
    return JSON.parse(productsData);
}

// Função para escrever os produtos no arquivo JSON
function writeProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// Função para ler os usuários do arquivo JSON
function readUsers() {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
}

// Função para escrever os usuários no arquivo JSON
function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Endpoints para clientes
app.get('/api/clients', (req, res) => {
    const clients = readClients();
    res.json(clients);
});

app.post('/api/clients', (req, res) => {
    const clients = readClients();
    const newClient = req.body;

    const existingClient = clients.find(client => client.id === newClient.id);
    if (existingClient) {
        return res.json({ message: 'ID já está cadastrado com outro cliente.' });
    }

    clients.push(newClient);
    writeClients(clients);

    res.json({ message: 'Cliente cadastrado com sucesso!' });
});

app.put('/api/clients/:id', (req, res) => {
    const clients = readClients();
    const clientId = req.params.id;
    const updatedClient = req.body;

    const clientIndex = clients.findIndex(client => client.id === clientId);

    if (clientIndex === -1) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    clients[clientIndex] = { ...clients[clientIndex], ...updatedClient };
    writeClients(clients);

    res.json({ message: 'Cliente atualizado com sucesso!' });
});

app.delete('/api/clients/:id', (req, res) => {
    const clients = readClients();
    const clientId = req.params.id;

    const updatedClients = clients.filter(client => client.id !== clientId);

    if (clients.length === updatedClients.length) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    writeClients(updatedClients);

    res.json({ message: 'Cliente removido com sucesso!' });
});

// Endpoints para produtos
app.get('/api/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const products = readProducts();
    const newProduct = req.body;

    const existingProduct = products.find(product => product.id === newProduct.id);
    if (existingProduct) {
        return res.json({ message: 'Produto com esse código já existe!' });
    }

    products.push(newProduct);
    writeProducts(products);

    res.json({ message: 'Produto cadastrado com sucesso!' });
});

app.put('/api/products/:id', (req, res) => {
    const products = readProducts();
    const productId = req.params.id;
    const updatedProduct = req.body;

    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    writeProducts(products);

    res.json({ message: 'Produto atualizado com sucesso!' });
});

app.delete('/api/products/:id', (req, res) => {
    const products = readProducts();
    const productId = req.params.id;

    const updatedProducts = products.filter(product => product.id !== productId);

    if (products.length === updatedProducts.length) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    writeProducts(updatedProducts);

    res.json({ message: 'Produto removido com sucesso!' });
});

// Endpoints para usuários
app.get('/api/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const users = readUsers();
    const newUser = req.body;

    const existingUser = users.find(user => user.id === newUser.id);
    if (existingUser) {
        return res.json({ message: 'ID já está cadastrado com outro usuário.' });
    }

    users.push(newUser);
    writeUsers(users);

    res.json({ message: 'Usuário cadastrado com sucesso!' });
});

app.put('/api/users/:id', (req, res) => {
    const users = readUsers();
    const userId = req.params.id;
    const updatedUser = req.body;

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    users[userIndex] = { ...users[userIndex], ...updatedUser };
    writeUsers(users);

    res.json({ message: 'Usuário atualizado com sucesso!' });
});

app.delete('/api/users/:id', (req, res) => {
    const users = readUsers();
    const userId = req.params.id;

    const updatedUsers = users.filter(user => user.id !== userId);

    if (users.length === updatedUsers.length) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    writeUsers(updatedUsers);

    res.json({ message: 'Usuário removido com sucesso!' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
