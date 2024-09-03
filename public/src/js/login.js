document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("yourPassword").value.trim();
  const userTypeUser = document.getElementById("userTypeUser").checked;
  const userTypeClient = document.getElementById("userTypeClient").checked;

  // Validação dos campos obrigatórios
  if (!username) {
      showModal("Insira um 'Nome de usuário'");
      return;
  }

  if (!password) {
      showModal("Insira uma 'Senha'");
      return;
  }

  if (!userTypeUser && !userTypeClient) {
      showModal("Selecione o tipo de usuário");
      return;
  }

  // Recuperar a lista de usuários
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
      (user) => user.username === username && user.password === password
  );

  if (user) {
      // Armazenar o nome de usuário atual no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify(user));

      if (userTypeUser) {
          user.type = "User"; // Marcar como usuário do tipo User
          localStorage.setItem("usuarioLogado", JSON.stringify(user));
          window.location.href = "src/views/home-page.html";
      } else if (userTypeClient) {
          user.type = "Client"; // Marcar como cliente
          const cadastroDate = document.getElementById("cadastroDate").value;
          const cadastroYear = cadastroDate
              ? new Date(cadastroDate).getFullYear()
              : new Date().getFullYear();
          user.registrationDate = cadastroYear;

          // Atualizar a lista de usuários no localStorage
          const updatedUsers = users.map((u) =>
              u.username === username ? user : u
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          localStorage.setItem("usuarioLogado", JSON.stringify(user));

          window.location.href = "src/views/products.html";
      }
  } else {
      showModal("Usuário ou senha incorretos");
  }
});

async function showModal(message) {
  // Atualizar o conteúdo da mensagem do modal
  document.getElementById('modal-message').innerText = message;

  // Mostrar o modal usando o Bootstrap
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
  myModal.show();

  // // Função para os usuários fecharem a box no X 

  document.querySelector('.btn-close').addEventListener('click', function () {
      myModal.hide();
  });

  // Espera 2 segundos e meio antes de fechar automaticamente
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Fechar o modal automaticamente após 2 segundos e meio
  myModal.hide();

}
