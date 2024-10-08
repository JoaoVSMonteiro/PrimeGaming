document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('yourName').value;
    const email = document.getElementById('yourEmail').value;
    const username = document.getElementById('yourUsername').value;
    const password = document.getElementById('yourPassword').value;

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !username || !password) {
        showModal('Preencha todos os campos');
        return;
    }

    // Validação do formato do email usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showModal('Por favor, insira um email válido');
        return;
    }

    // Recuperar a lista de usuários existente
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o nome de usuário já existe
    if (users.some(user => user.username === username)) {
        showModal('Nome de usuário já existe. Escolha outro');
        return;  // Sai da função se o nome de usuário já existir
    }

    // Adicionar o novo usuário ao array
    users.push({ name, email, username, password });

    // Salvar a lista atualizada de usuários no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redireciona para a página de login (verifique o caminho)
    window.location.href = '../../index.html';
});