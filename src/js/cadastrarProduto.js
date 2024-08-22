document.addEventListener('DOMContentLoaded', function() {
    // Carrega e atualiza os produtos quando a página é carregada
    loadProducts();
});

// Função para carregar e atualizar a tabela de produtos
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.querySelector('table tbody');

    tableBody.innerHTML = ''; // Limpa o corpo da tabela

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row"><a><img src="../img/product-1.jpg" alt=""></a></th>
            <td><a href="#" class="text-primary fw-bold">${product.name}</a></td>
            <td>R$${product.price_current}</td>
            <td class="fw-bold">R$${product.price_promotion}</td>
            <td>${product.type}</td>
            <td>${product.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para cadastrar um produto
function cadastrarProduto() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price_current = document.getElementById('productPriceCurrent').value;
    const price_promotion = document.getElementById('productPricePromotion').value;
    const type = document.getElementById('productType').value;
    const description = document.getElementById('productDescription').value;
    const created_at = document.getElementById('productCreatedAt').value;
    const updated_at = document.getElementById('productUpdatedAt').value;

    const product = {
        id,
        name,
        price_current,
        price_promotion,
        type,
        description,
        created_at,
        updated_at
    };

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const existingProductIndex = products.findIndex(p => p.id === id);

    if (existingProductIndex !== -1) {
        alert('Produto com esse ID já existe!');
        return;
    }

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Produto cadastrado com sucesso!');
}

// Função para atualizar um produto existente
function atualizarProduto() {
    const id = document.getElementById('productId').value;
    const productIndex = JSON.parse(localStorage.getItem('products'))?.findIndex(product => product.id === id);

    if (productIndex !== -1) {
        const products = JSON.parse(localStorage.getItem('products'));
        products[productIndex].name = document.getElementById('productName').value;
        products[productIndex].price_current = document.getElementById('productPriceCurrent').value;
        products[productIndex].price_promotion = document.getElementById('productPricePromotion').value;
        products[productIndex].type = document.getElementById('productType').value;
        products[productIndex].description = document.getElementById('productDescription').value;
        products[productIndex].updated_at = document.getElementById('productUpdatedAt').value;

        localStorage.setItem('products', JSON.stringify(products));
        alert('Produto atualizado com sucesso!');
    } else {
        alert('Produto não encontrado!');
    }
}
 
// Função para remover um produto
function removerProduto() {
    const id = document.getElementById('productId').value;
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = products.filter(product => product.id !== id);
    
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    alert('Produto removido com sucesso!');
}

// Função principal para decidir qual ação tomar com base no botão clicado
function handleFormAction(action) {
    if (action === 'cadastrar') {
        cadastrarProduto();
    } else if (action === 'atualizar') {
        atualizarProduto();
    } else if (action === 'remover') {
        removerProduto();
    }

    loadProducts(); // Atualiza a tabela de produtos após a ação
    document.getElementById('productForm').reset(); // Limpa o formulário
}

// Adiciona os ouvintes de eventos para os botões do formulário
document.getElementById('cadastrarBtn').addEventListener('click', function() {
    handleFormAction('cadastrar');
});

document.getElementById('atualizarBtn').addEventListener('click', function() {
    handleFormAction('atualizar');
});

document.getElementById('removerBtn').addEventListener('click', function() {
    handleFormAction('remover');
});
