// Função para atualizar a interface da página inicial
function updateHomePage(user) {
  // Selecionar os elementos onde os dados serão exibidos
  const userNameLoginElement = document.getElementById('userNameLogin');
  const bemVindoElement = document.getElementById('welcome');

  // Atualizar o conteúdo com os dados do usuário
  userNameLoginElement.textContent = user.name;
  bemVindoElement.textContent = `Bem-vindo(a) ${user.name}`;
}

// Função para atualizar a interface da página de perfil
function updateUserProfile(user) {
  // Selecionar os elementos onde os dados serão exibidos
  const profileNameElement = document.getElementById('profileName');
  const fullNameElement = document.getElementById('fullName');
  const emailElement = document.getElementById('email');
  const usernameElement = document.getElementById('username');

  // Atualizar o HTML da interface
  profileNameElement.innerHTML = `
      <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
          <img src="../img/profile-img.jpg" alt="Profile" class="rounded-circle">
          <h2>${user.name}</h2>
      </div>
  `;
  fullNameElement.textContent = user.name;
  emailElement.textContent = user.email;
  usernameElement.textContent = user.username;
}

// Atualizar a interface ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const currentUsername = localStorage.getItem('currentUser');

  // Recuperar a lista de usuários
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === currentUsername);

  if (path.endsWith('src/views/home-page.html')) {
      if (user) {
          updateHomePage(user);
      } else {
          alert("Nenhum usuário encontrado. Por favor, faça login.");
          window.location.href = "../../index.html";
      }
  } else if (path.endsWith('src/views/users-profile.html')) {
      if (user) {
          updateUserProfile(user);
      } else {
          alert("Nenhum usuário encontrado. Por favor, faça login.");
          window.location.href = "../../index.html";
      }
  }
});
