document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos do formulário
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const cpf = document.getElementById('userCpf').value;

    // Verifica se já existe um array de usuários no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Cria um novo objeto de usuário
    const newUser = {
        id: id,
        name: name,
        cpf: cpf
    };

    // Adiciona o novo usuário ao array
    users.push(newUser);

    // Salva o array atualizado no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Limpa os campos do formulário
    document.getElementById('userForm').reset();

    alert('Usuário cadastrado com sucesso!');
});
