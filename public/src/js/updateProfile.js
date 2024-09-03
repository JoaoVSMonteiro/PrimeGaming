// Função para atualizar a interface da página inicial
function updateHomePage(user) {
  // Selecionar os elementos onde os dados serão exibidos
  const userNameLoginElement = document.getElementById("userNameLogin");
  const bemVindoElement = document.getElementById("welcome");

  let msgDesconto = "";

  if (user.type === "Client") {
    // Verificar se o tipo é "Client"
    const anoCadastro = user.registrationDate;
    const anoAtual = new Date().getFullYear();
    const tempoCliente = anoAtual - anoCadastro;

    if (tempoCliente >= 2) {
      msgDesconto =
        "| Parabéns por dois anos de cadastro no nosso site, no final de qualquer compra você terá 25% desconto";
    }
  }

  // Atualizar o conteúdo com os dados do usuário e desconto
  userNameLoginElement.textContent = user.name;
  bemVindoElement.textContent = `Bem-vindo(a) ${user.name} ${msgDesconto}`;
}

async function botaoComprarCliente(productName) {
  try {
    // Recuperar a lista de produtos do servidor
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos do servidor");
    }
    const products = await response.json();

    // Encontrar o produto pelo nome
    const product = products.find((p) => p.name === productName);

    // Recuperar a lista de usuários do localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const usuarioLogado =
      JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    console.log("Usuário atual:", usuarioLogado);

    // Encontrar o usuário atual
    const user = users.find((u) => u.username === usuarioLogado.username);

    // Verificar se o produto e o usuário existem
    if (product && user) {
      let msgAtividadesRecentes;
      if (user.type === "Client") {
        // Verificar se o tipo é "Client"
        // Calcular o tempo de cliente
        let anoCadastro = user.registrationDate;
        let anoAtual = new Date().getFullYear();
        let tempoCliente = anoAtual - anoCadastro;

        // Log para verificar o valor de tempoCliente
        console.log(`Tempo de cliente: ${tempoCliente} anos`);

        // Verificar se o cliente tem 2 anos ou mais de cadastro
        if (tempoCliente >= 2) {
          // Calcular o preço com 25% de desconto
          const desconto = 0.25;
          const precoDesconto = (
            product.price_current *
            (1 - desconto)
          ).toFixed(2);

          // Exibir o alert com as informações do produto e o preço com desconto
          showModal(
            `Você comprou ${product.name} com desconto de 25% por R$${precoDesconto}`
          );
        } else {
          // Exibir o alert com o preço normal
          showModal(`Você comprou ${product.name} por R$${product.price_current}`);
        }
      } else {
        // Exibir o alert com o preço normal para usuários do tipo "User"
        showModal(`Você comprou ${product.name} por R$${product.price_current}`);
      }

      // Criar a mensagem de atividade recente
      msgAtividadesRecentes = `${user.name} comprou ${product.name}`;

      // Adicionar a mensagem de atividade na home-page.html
      const atividades = JSON.parse(localStorage.getItem("atividades")) || [];
      atividades.unshift(msgAtividadesRecentes); // Adiciona a nova atividade no início da lista
      localStorage.setItem("atividades", JSON.stringify(atividades));
    } else {
      showModal("Produto não encontrado ou usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro:", error);
    showModal("Ocorreu um erro ao processar a compra");
  }
}

// Função para atualizar a interface da página de perfil
function updateUserProfile(user) {
  // Selecionar os elementos onde os dados serão exibidos
  const profileNameElement = document.getElementById("profileName");
  const fullNameElement = document.getElementById("fullName");
  const emailElement = document.getElementById("email");
  const usernameElement = document.getElementById("username");

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
window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const usuarioLogadoname = JSON.parse(
    localStorage.getItem("usuarioLogado")
  )?.username;

  // Recuperar a lista de usuários
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === usuarioLogadoname);

  // Atualizar a interface dependendo da página
  if (path.endsWith("src/views/home-page.html")) {
    if (user) {
      updateHomePage(user);
    } else {
      showModal("Nenhum usuário encontrado. Por favor, faça login");
      window.location.href = "../../index.html";
    }
  } else if (path.endsWith("src/views/users-profile.html")) {
    if (user) {
      updateUserProfile(user);
    } else {
      showModal("Nenhum usuário encontrado. Por favor, faça login");
      window.location.href = "../../index.html";
    }
  } else if (path.endsWith("src/views/products.html")) {
    if (user) {
      updateHomePage(user);
    } else {
      showModal("Nenhum usuário encontrado. Por favor, faça login");
      window.location.href = "../../index.html";
    }
  }
});
