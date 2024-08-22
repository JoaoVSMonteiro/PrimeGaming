document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('yourPassword').value;
    const userTypeUser = document.getElementById('userTypeUser').checked;
    const userTypeClient = document.getElementById('userTypeClient').checked;

    // Recuperar a lista de usuários
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Armazenar o nome de usuário atual no localStorage
        localStorage.setItem('currentUser', username);

        if (userTypeUser) {
            window.location.href = 'src/views/home-page.html';
        } else if (userTypeClient) {
            window.location.href = 'src/views/products.html';
        } else {
            alert('Selecione o tipo de usuário.');
        }
    } else {
        alert('Usuário ou senha incorretos.');
    }
});
