# Projeto_Web_Mobile

## Integrantes:

Gabriel Fuentes - 10408876
Guilherme Florio - 10409698
Pedro Toma - 10390171

## Processo de Ideação
Consideramos a ideia de rastreabilidade de preços, ficamos em dúvida entre 2 nichos: produtos de mercado e produtos eletrônicos.
A ideia é que o usuário consiga comparar preços e saber o melhor local físico ou virtual onde ele possa comprar.
Optamos por abordar os produtos de mercado, porque preferimos abordar um público mais geral, como nem todos são ligados à produtos tecnológicos. Além do mais, conseguimos identificar uma necessidade mais clara acerca do assunto.

## Caráter Extensionista
A proposta é poder facilitar a consulta de produtos, para que as pessoas possam economizar nas suas compras e tomar uma decisão mais eficiente com relação ao local, podendo escolher um lugar mais próximo a sua casa, sem perder um desconto ou valor.

## Imagens do Wireframes

### Desktop
<img width="744" height="338" alt="image" src="https://github.com/user-attachments/assets/360808f8-07a2-4718-8605-d2b4e67ce169" />

### Mobile
<img width="362" height="315" alt="image" src="https://github.com/user-attachments/assets/0d814ffd-8b7c-4beb-a3d8-ff2a666cdcd8" />


##### Home Page - HTML

Criação de header com placeholder para logo "Lista Barata", localização e barra de pesquisa.
``` Header
<header>
  <h3> Lista Barata </h3>
  <i class="fa solid fa-location-dot"></i>
  <h3> São Paulo </h3>
  <div id="Pesquisa">
    <i class="fa fa-search icon"></i>
    <input type="text" placeholder="Pesquisar...">
  </div>
</header>
```

Criação de seção de categorias, produtos e botão de adicionar itens à "Minha Lista".
``` Main
<main class="conteudo">
  <section>
    <article>Produtos Mais Populares</article>
    <section class="categories">
      <span> Categorias </span>
      <span> Categorias </span>
      <span> Categorias </span>
      <span> Categorias </span>
      <span> Categorias </span>
      <span> Categorias </span>
      <span> Categorias </span>
    </section>
    <section class="products">
      <span class="product"> 
        <img src="https://andinacocacola.vtexassets.com/arquivos/ids/157652-100-auto?v=638404083624500000&width=100&height=auto&aspect=true">
        <p> Coca-Cola </p>
        <p> R$ 5,00 </p>
      </span>
      <span class="product"> 
        <img src="https://andinacocacola.vtexassets.com/arquivos/ids/157652-100-auto?v=638404083624500000&width=100&height=auto&aspect=true">
        <p> Coca-Cola </p>
      </span>
      <span class="product"> 
        <img src="https://andinacocacola.vtexassets.com/arquivos/ids/157652-100-auto?v=638404083624500000&width=100&height=auto&aspect=true">
        <p> Coca-Cola </p>
      </span>
      <span class="product"> 
        <img src="https://andinacocacola.vtexassets.com/arquivos/ids/157652-100-auto?v=638404083624500000&width=100&height=auto&aspect=true">
        <p> Coca-Cola </p>
      </span>
      <span class="product"> 
        <img src="https://andinacocacola.vtexassets.com/arquivos/ids/157652-100-auto?v=638404083624500000&width=100&height=auto&aspect=true">
        <p> Coca-Cola </p>
      </span>
      <span class="product"> 
        <img src="https://andinacocacola.vtexassets.com/arquivos/ids/157652-100-auto?v=638404083624500000&width=100&height=auto&aspect=true">
        <p> Coca-Cola </p>
      </span>
      <span class="product"> 
        <img src="https://andinacocacola.vtexassets.com/arquivos/ids/157652-100-auto?v=638404083624500000&width=100&height=auto&aspect=true">
        <p> Coca-Cola </p>
      </span>
    </section>
    <article>Minha Lista </article>
    <div id="lista-container">
      <p class="vazio">Adicione Itens à Lista...</p>
    </div>
  </section>
  <section class="minhaLista">
    <button>MinhaLista</button>
    <div class="lista"></div>
  </section>
</main>
```

Link para imagem de localização.
``` 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
```

Conexão do html com o style.css e cssReset.css (para remover estilização padrão).
``` 
<link rel="stylesheet" href="cssReset.css">
<link rel="stylesheet" href="style.css">
```

Feature JavaScript - adicionar e remover itens de uma lista do usuário (renderizada na tela)
adicionar event listener aos botões da classe adicionar. Ao clicar o produto é adicionado à lista
(com informações passadas via atributos da tag) e a remoção é feita pelo atributo onClick usando o índice do produto na lista.
``` 
<script>
  let minhaLista = [];
  const botoesAdicionar = document.querySelectorAll('.adicionar');

  botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', function() {
      const nomeProduto = this.getAttribute('data-nome');
      const precoProduto = this.getAttribute('data-preco');
      const imagemProduto = this.getAttribute('data-imagem');

      const produto = {
        nome: nomeProduto,
        preco: precoProduto,
        imagem: imagemProduto,
      };

      adicionarNaLista(produto);
    });
  });

  function adicionarNaLista(produto) {
    const itemAdicionado = minhaLista.some((produtoLista) => produtoLista.nome === produto.nome);

    if (itemAdicionado) {
      alert(`Produto: ${produto.nome} já adicionado!`)
      return
    }

    minhaLista.push(produto);
    console.log("Item adicionado:", produto);
    console.log("Lista completa:", minhaLista);
    renderizarLista();
  }

  function removerDaLista(indice) {
    minhaLista.splice(indice,1);
    console.log("Lista completa:", minhaLista);
    renderizarLista();
  }

  function renderizarLista() {
    const container = document.getElementById('lista-container');
            
    container.innerHTML = "";
            
    if (minhaLista.length === 0) {
      container.innerHTML = '<p class="vazio">Adicione Itens à Lista......</p>';
    } else {
      minhaLista.forEach((produto, indice) => {
        const itemHTML = `
          <span class="produto"> 
            <img src="${produto.imagem}">
            <p> ${produto.nome} </p>
            <p> R$ ${produto.preco} </p>
            <button class="remover" data-nome="${produto.nome}" data-preco="${produto.preco}" onclick="removerDaLista(${indice})">&minus;</button>
          </span>
        `;
        container.innerHTML += itemHTML;
      });
    }
  }
</script>
```

##### Home Page - CSS

Aplicação de fonte, altura, largure e display flex para html e body. Padding na main.
``` 
html{
    height: 100%;
    width: 100%;
}

body {
    font-family: Arial;
    padding-top: 55px;
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
}

main {
    padding: 20px;
}
```

Organização do conteúdo da página com produtos e aba de minhaLista no lado direito.
```
.conteudo {
    display: flex;
    justify-content: space-between;
}
```


Estilização do header, com itens organizados em linha, cor de fundo azul e textos em branco.
``` 
header{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: rgb(76, 108, 249);
    padding-left: 10px;
}

h3{
    width: auto;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    color: white;
}

i{
    color: white;
    margin-right: 5px;
}

input{
    background-color: rgb(76, 108, 249);
    border: none;
    color: white;
    padding: 6px;
    margin-right: 20px;
    float: right;
}

input::placeholder {
    color: white;
}

#Pesquisa{
    display: flex;
    align-items: center;
    margin-left: auto;
}
```

Ajuste de títulos das seções (produtos e minha lista)
``` 
article{
    padding: 20px 0px;
    font-size: 14pt;
    font-weight: 500;
}
```

Organização dos produtos dentro da seção, com possibilidade de scrollar horizontalmente.
``` 
.categorias{
    display: flex;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 10px;
}

.categorias > span{
    background-color: #2C3E50;
    color: white;
    font-size: 10pt;
    padding: 5px 20px;
    border-radius: 100px;
    margin-right: 15px;
    white-space: nowrap;
}

.produtos{
    height: 250px;
    max-width: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
}
```

Estilização do card de cada produto com botão de adicionar à lista.
``` 
.produto{
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: rgb(76, 108, 249);
    min-height: 190px;
    min-width: 120px;
    max-width: 120px;
    border-radius: 15px;
    margin-right: 30px;
    cursor: pointer;
    border: 1px solid rgb(76, 108, 249);
    position: relative;
}

.produto img {
    width: 100%;
    margin: 0px;
    height: 100px;
    object-fit: contain;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: rgb(255, 255, 255);
    padding: 10px 0px;
    box-shadow: 0px 1px 2px rgb(76, 108, 249);
}

.produto p {
    color: white;
    font-size: 9pt;
    margin-top: 8px;
    margin-bottom: 2px;
    padding: 0px 10px;
}

.adicionar {
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px;
    cursor: pointer;
    transition: opacity 0.15s;
}

.adicionar:hover {
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px;
    opacity: 0.8;
}
```

Estilização do botão para adicionar itens à minha lista.
``` 
.add-itens {
    padding: 10px;
    border-radius: 20px;
    border: 1px solid black;
}
```

Estilização da lista de produtos do usuário.
``` 
.lista {
    position: absolute;
    margin-right: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgb(35, 52, 129);
    height: 100%;
    width: 20px;
}

.minhaLista {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    top: 50px;
    right: 0px;
    height: 100%;
}

.minhaLista > button {
    margin-right: 10px;
    margin-top: 20px;
    border: none;
    padding: 20px 15px;
    background-color: rgb(35, 52, 129);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    color: white;
    height: 60px;
}
```

minhaLista (container) e botão "remover".
```
#lista-container {
    display: flex;
}

.remover {
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px;
    cursor: pointer;
    transition: opacity 0.15s;
}

.remover:hover {
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px;
    opacity: 0.8;
}
```
