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

##### Sobre o Desenvolvimento

Optamos por utilizar uma estrutura html única e alterar apenas o conteúdo renderizado na tela, seguindo o modelo Single Page Application (SPA).

##### HTML

Link para imagem de localização.
~~~html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
~~~

Conexão do html com o style.css e cssReset.css (para remover estilização padrão).
~~~html
<link rel="stylesheet" href="cssReset.css">
<link rel="stylesheet" href="style.css">
~~~

Criação de header com placeholder para logo "Lista Barata", localização e barra de pesquisa.
~~~html
<header>
  <h3> Lista Barata </h3>
  <i class="fa solid fa-location-dot"></i>
  <h3> São Paulo </h3>
  <div id="Pesquisa">
    <i class="fa fa-search icon"></i>
    <input type="text" placeholder="Pesquisar...">
  </div>
</header>
~~~

Criação seção main para adicionar conteúdo via JS.
~~~html
<main class="conteudo">
</main>
~~~

Seção de barra lateral fixa para lista de itens
~~~html
<aside class="secao-lateral">
  <button>Lista</button>
  <section class="lista">
    <ul id="lista-itens">
    </ul>
    <footer class="rodape-lista">
      <p id="preco-total"></p>
    </footer>
  </section>
</aside>
~~~

##### JavaScript (Single Page Application - injeção HTML)

Lista de produtos (objetos).
~~~js
const produtos = [
    {
        id: 1,
        nome: "Coca-Cola 2L",
        imagem: "imagens-produtos/coca.jpg",
        categoria: "Bebidas",
        ofertas: [
            { loja: "Assaí", preco: 8.99, mercado: "imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
            { loja: "Pão de Açúcar", preco: 9.49, mercado: "imagens-mercados/pao_de_acucar.png", endereco: "R. Maranhão, 875" },
            { loja: "Carrefour", preco: 8.75, mercado: "imagens-mercados/carrefour.png", endereco: "Av. Rio Branco, 115" }
        ]
    },
~~~

Criação da lista de mercados (objetos).
~~~js
produtos.forEach(produto => {
    produto.ofertas.forEach(oferta => {
        const existe = mercados.find(m => m.endereco === oferta.endereco);
        
        if (!existe) {
            mercados.push({
                nome: oferta.loja,
                imagem: oferta.mercado,
                endereco: oferta.endereco
            });
        }
    });
});
~~~

Obteção de menor preço do produto para mostrar no card.
~~~js
produtos.forEach((p) => {
    const melhorOferta = p.ofertas.reduce((menor, atual) => {
        return atual.preco < menor.preco ? atual : menor;
    }, p.ofertas[0]);

    p.preco = melhorOferta.preco;
});
~~~

Renderizar a página Home, com lista de produtos e lista de mercados.
~~~js
function renderizarHome() {
    const main = document.querySelector('.conteudo');
    document.getElementById('Pesquisa').style.display = 'visible';

    main.innerHTML = `
        <article class="titulo">Produtos Mais Populares</article>
        <section class="categorias">
            <ul id="categorias-filtros">
                <li data-categoria="Higiene e Perfumaria"> Higiene e Perfumaria </li>
                <li data-categoria="Salgadinhos e Snacks"> Salgadinhos e Snacks </li>
                <li data-categoria="Padaria e Matinais"> Padaria e Matinais </li>
                <li data-categoria="Bebidas"> Bebidas </li>
                <li data-categoria="Energéticos e Isotônicos"> Energéticos e Isotônicos </li>
                <li data-categoria="Doces"> Doces </li>
            </ul>
        </section>
        <section class="produtos">
            ${gerarCardsProdutos()} 
        </section>
        <article class="titulo">Mercados</article>
        <section class="mercados">
            ${gerarCardsMercados()}
        </section>
    `;

    configurarBotoesAdicionar('.adicionar-home');
    configurarFiltros();
    renderizarLista();
}
~~~

Geração do html para cada produto dentro da lista filtrada.
~~~js
function gerarCardsProdutos(categoriaFiltro = "Todos") {

    let listaFiltrada = produtos;

    if (categoriaFiltro !== "Todos") {
        listaFiltrada = produtos.filter(p => p.categoria === categoriaFiltro);
    }

    if (listaFiltrada.length === 0) return "<p>Nenhum produto encontrado nesta categoria.</p>";

    return listaFiltrada.map(produto => `
        <article class="produto">
            <img src="${produto.imagem}" onclick="renderizarPaginaProduto(${produto.id})">
            <section class="info-produto">
                <p> ${produto.nome} </p>
                <p class="preco"> R$ ${produto.preco.toFixed(2).replace('.', ',')} </p>
            </section>
            <button class="adicionar-home" 
                data-nome="${produto.nome}" 
                data-preco="${produto.preco}" 
                data-imagem="${produto.imagem}">&plus;
            </button>
        </article>
    `).join('');
}
~~~

Geração do html para cada mercado.
~~~js
function gerarCardsMercados() {
    return mercados.map(mercado => `
        <article class="mercado" onclick="renderizarPaginaMercado('${mercado.nome}')">
            <img src="${mercado.imagem}">
            <p> ${mercado.nome} </p>
            <p> ${mercado.endereco} </p>
        </article>
    `).join('');
}
~~~

Renderizar a página de produto, com nome, imagem e lista de mercados com o produto disponível.
~~~js
function renderizarPaginaProduto(id) {
    const main = document.querySelector('.conteudo');

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Produto Não Encontrado");
        return;
    }

    main.innerHTML = `
        <section class="pagina-detalhes">
            <button onclick="renderizarHome()" class="voltar">
                Home <i class="fa-solid fa-chevron-right"></i> ${produto.nome}
            </button>
            <h1>${produto.nome}</h1>
            <section class="pagina-produto">
                <img src="${produto.imagem}">
                <section class="lista-mercados">
                    ${gerarMercadosDoProduto(produto.nome)}
                </section>
            </section>
        </section>
    `;

    configurarBotoesAdicionar('.adicionar-produto');
}
~~~

Geração da lista de mercados dentro da página de produto.
~~~js
function gerarMercadosDoProduto(nome) {

    const produto = produtos.find((p) => p.nome === nome);

    if (!produto || !produto.ofertas) {
        return "<p>Nenhuma oferta encontrada.</p>"
    };
    
    return produto.ofertas.map(oferta => `
        <article class="produto-mercado">
            <img src="${oferta.mercado}">
            <div class="produto-conteudo">
                <p> Endereço: ${oferta.endereco} </p>
                <p class="produto-preco"> R$ ${oferta.preco.toFixed(2).replace('.', ',')}</p>
            </div>
            <button class="adicionar-produto"
                data-nome="${produto.nome}" 
                data-preco="${oferta.preco}" 
                data-imagem="${produto.imagem}">&plus;
            </button>
        </article>
    `).join('');
}
~~~

Renderização da página de mercado
~~~js
function renderizarPaginaMercado(nomeMercado) {
    const main = document.querySelector('.conteudo');

    // Encontra os dados do mercado clicado
    const mercado = mercados.find(m => m.nome === nomeMercado);

    if (!mercado) {
        alert("Mercado Não Encontrado");
        return;
    }

    // Busca todos os produtos que possuem uma oferta neste mercado específico
    let produtosNesteMercado = [];
    
    produtos.forEach(produto => {
        const ofertaNoMercado = produto.ofertas.find(oferta => oferta.loja === nomeMercado);
        
        if (ofertaNoMercado) {
            // Criamos uma cópia do produto para não alterar o preço global,
            // definindo o preço específico que este mercado cobra.
            produtosNesteMercado.push({
                ...produto,
                precoLocal: ofertaNoMercado.preco 
            });
        }
    });

    // Renderiza a tela
    main.innerHTML = `
        <section class="pagina-detalhes">
            <button onclick="renderizarHome()" class="voltar">
                Home <i class="fa-solid fa-chevron-right"></i> ${mercado.nome}
            </button>
            <section class="pagina-mercado">
            <img src="${mercado.imagem}">   
            <section class="lista-produtos">
                ${gerarCardsProdutosLocal(produtosNesteMercado)}
            </section>
        </section>
        <h1>${mercado.nome}</h1>
        <p>${mercado.endereco}</p>
    `;

    // Ativa os botões de adicionar na lista para esta nova tela
    configurarBotoesAdicionar('.adicionar-mercado-local');
}
~~~

Geração de produtos do mercado específico
~~~js
function gerarCardsProdutosLocal(listaProdutos) {
    if (listaProdutos.length === 0) return "<p>Nenhum produto cadastrado neste mercado.</p>";

    return listaProdutos.map(produto => `
        <article class="produto-aba">
            <img src="${produto.imagem}" onclick="renderizarPaginaProduto(${produto.id})">
            <section class="produto-conteudo">
                <p> ${produto.nome} </p>
                <p class="produto-preco"> R$ ${produto.precoLocal.toFixed(2).replace('.', ',')} </p>
            </section>
            <button class="adicionar-mercado-local" 
                data-nome="${produto.nome}" 
                data-preco="${produto.precoLocal}" 
                data-imagem="${produto.imagem}">&plus;
            </button>
        </article>
    `).join('');
}
~~~

Criação de eventListener para monitorar a adição do produto na lista.
~~~js
function configurarBotoesAdicionar(seletor) {
    const botoesAdicionar = document.querySelectorAll(seletor);

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function () {
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
}
~~~

Filtragem dos produtos dentro da seção de produtos da página Home.
~~~js
function configurarFiltros() {

    const filtros = document.querySelectorAll('#categorias-filtros li');
    const containerProdutos = document.querySelector('.produtos');

    filtros.forEach(filtro => {
        filtro.onclick = () => {

            const jaAtivo = filtro.classList.contains('filtro-ativo');
            
            let categoriaFiltro;

            if (jaAtivo) {
                filtro.classList.remove('filtro-ativo');
                categoriaFiltro = "Todos"; 
            } else {
                filtros.forEach(f => f.classList.remove('filtro-ativo'));
                filtro.classList.add('filtro-ativo');
                categoriaFiltro = filtro.getAttribute('data-categoria');
            }
            containerProdutos.innerHTML = gerarCardsProdutos(categoriaFiltro);

            configurarBotoesAdicionar('.adicionar-home');
        };
    });
}
~~~

Adição do produto na lista.
~~~js
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
~~~

Remoção do produto da lista.
~~~js
function removerDaLista(indice) {
    minhaLista.splice(indice, 1);
    renderizarLista();
}
~~~

Alteração da quantidade do produto na lista.
~~~js
function alterarQuantidade(indice, valor) {
    if (!minhaLista[indice].quantidade) minhaLista[indice].quantidade = 1;
    
    minhaLista[indice].quantidade += valor;

    if (minhaLista[indice].quantidade < 1) {
        removerDaLista(indice);
    } else {
        renderizarLista();
    }
}
~~~

Renderização da lista (atualizar lista se houve mudanças).
~~~js
function renderizarLista() {

    const container = document.getElementById('lista-itens');
    const precoTotalElemento = document.getElementById('preco-total');
    
    let somaTotal = 0;
    container.innerHTML = "";
    
    if (minhaLista.length === 0) {
        container.innerHTML = '<p class="vazio">Adicione Itens à Lista......</p>';
        precoTotalElemento.innerHTML = "Total: R$ 0,00";
    } else {
        minhaLista.forEach((produto, indice) => {

            const quantidade = produto.quantidade || 1;
            const subtotal = produto.preco * quantidade;

            somaTotal += subtotal;
            
            const itemHTML = `
                <li class="produto-lista"> 
                    <img src="${produto.imagem}">
                    <article class="produto-info-lista">
                        <p> ${produto.nome} </p>
                        <p class-> R$ ${(produto.preco * quantidade).toFixed(2).replace('.', ',')} </p>
                    </article>
                    <section class="controle-quantidade">
                        <button onclick="alterarQuantidade(${indice}, 1)">&plus;</button>
                        <p> ${quantidade} </p>
                        <button onclick="alterarQuantidade(${indice}, -1)">&minus;</button>
                    </section>
                </li>
                `;
            container.innerHTML += itemHTML;
        });
        precoTotalElemento.innerHTML = `Total: R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
    }
}
~~~

Criação de eventListener para botão da lista (toggle da classe CSS para abrir e fechar a seção lateral).
~~~js
const secaoLateral = document.querySelector('.secao-lateral');
const botaoMinhaLista = document.querySelector('.secao-lateral > button');

botaoMinhaLista.addEventListener('click', () => {
    secaoLateral.classList.toggle('aberto');
});
~~~

Renderização da página Home após carregamento da estrutura HTML (aplicar JS após carregar a janela).
~~~js
window.onload = () => {
    renderizarHome();
};
~~~

##### CSS

Aplicação de fonte, altura, largura e display flex para html e body. Padding na main.
~~~css
html{
    width: 100%;

body {
    font-family: Arial;
    padding-top: 55px;
    width: 100%;
    display: flex;
    position: relative;
}
~~~

Header fixo na parte superior da página.
~~~css
header{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 55px;
    background-color: rgb(35, 52, 129);
    padding-left: 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
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
    background-color: rgb(35, 52, 129);
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
~~~

Conteúdo principal (main).
~~~css
.conteudo {
    min-height: 85vh;
    display: flex;
    flex-direction: column;
}

main {
    padding: 20px;
}
~~~

Seção lateral fixa (aside).
~~~css
.secao-lateral {
    position: fixed;
    display: flex;
    top: 50px;
    right: 0px;
    height: 100%;
    width: 320px;
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.5s ease-in-out;
}

.secao-lateral.aberto {
    transform: translateX(0);
}

.secao-lateral > button {
    position: absolute;
    font-size: 16px;
    margin-top: 20px;
    margin-right: 15px;
    right: 100%;
    border: none;
    padding: 5px 15px;
    background-color: rgb(35, 52, 129);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
    height: 36px;
}
~~~

Lista de itens selecionados (dentro da barra lateral fixa).
~~~css

.lista {
    position: absolute;
    top: 0px;
    right: 0px;
    height: calc(100vh - 55px); 
    width: 300px;
    padding: 20px;
    overflow-y: auto;
    background-color: rgb(35, 52, 129);
}

.vazio {
    color: white;
    margin-bottom: 10px;
}

.rodape-lista {
    margin-top: auto;
    padding-bottom: 20px;
    border-top: 1px solid white;
}

#preco-total {
    color: white;
    font-size: 22px;
    font-weight: bold;
    margin: 10px 0;
    text-align: right;
    display: block;
}

.produto-lista {
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 10px;
    margin-bottom: 20px;
    background-color: rgb(76, 108, 249); 
    border-radius: 16px;
    color: white;
    gap: 15px;
}

.produto-lista img {
    height: 100px;
    width: 100px;
    border-radius: 16px;
    background-color: white;
    object-fit: contain;
}

.produto-info-lista {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
~~~

Alterar quantidade de itens.
~~~css
.controle-quantidade {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.controle-quantidade button{
    font-size: 20px;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: rgb(35, 52, 129);
}
~~~

##### Página Home

Seção de Produtos Mais Populares.
~~~css
.titulo { 
    padding: 20px 0px;
    font-size: 24pt;
}

.categorias{
    height: 60px;
    width: 100%;
    overflow-x: auto;
    max-width: calc(100vw - 55px);
}

.categorias ul{
    display: flex;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 10px;
}

.categorias li{
    background-color: #2C3E50;
    color: white;
    font-size: 12pt;
    padding: 5px 20px;
    border-radius: 100px;
    margin-right: 15px;
    white-space: nowrap;
    cursor: pointer;
}

li.filtro-ativo {
    background-color: #549ee9;
    color: black;
}
~~~

Lista de produtos (seção).
~~~css
.produtos{
    height: 250px;
    width: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    max-width: calc(100vw - 55px);
    margin-bottom: 30px;
}

.produto{
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: rgb(76, 108, 249);
    min-height: 220px;
    min-width: 140px;
    max-width: 120px;
    border-radius: 15px;
    margin-right: 30px;
    padding-bottom: 10px;
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

.info-produto {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    color: white;
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 2px;
    padding: 0px 10px;
}

.info-produto .preco {
    font-size: 20px;
}
~~~

Botão para adicionar a lista (barra lateral).
~~~css
.adicionar-home {
    position: absolute;
    right: 8px;
    bottom: 5px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px;
    cursor: pointer;
    transition: opacity 0.15s;
}

.adicionar-home:hover {
    opacity: 0.8;
}

.add-itens {
    padding: 10px;
    border-radius: 20px;
    border: 1px solid black;
}
~~~

Seção de Mercados - Lista de Mercados.
~~~css

.mercados {
    height: 250px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    overflow-x: auto;
    max-width: calc(100vw - 55px);
}

.mercado {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 200px;
    width: 150px;
    margin-right: 14px;
    cursor: pointer;
    margin-top: 14px;
    margin-left: 25px;
}

.mercado img{
    margin: 0px;
    width: 120px;
    height: 100px;
    object-fit: contain;
    border-radius: 30px;
    background-color: rgb(255, 255, 255);
    padding: 20px 10px;
    box-shadow: 0px 0px 16px rgb(76, 108, 249);
    margin-bottom: 20px;
}

.mercado p {
    font-size: 16px;
    text-align: center;
    font-weight: 600;
}
~~~

##### Página do Produto

~~~css
.pagina-detalhes {
    display: flex;
    flex-direction: column;
}
~~~

(Botão) Voltar a Home Page.
~~~css
.voltar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14pt;
    line-height: 1;
    width: max-content;
    white-space: nowrap;
    margin-bottom: 20px;
    padding: 15px 0px;
    color: black;
    border: none;
    background-color: white;
}

.voltar i {
    font-size: 15px;
    padding: 0px 20px;
    margin: 0px;
    color: black;
}
~~~

Seção do Produto (nome e imagem).
~~~css
.pagina-detalhes > h1{
    font-size: 40px;
    font-weight: bolder;
    margin-bottom: 20px;
}

.pagina-produto {
    display: flex;
}

.pagina-produto > img {
    border: 2px solid black;
    max-height: 400px;
    object-fit: contain;
    max-width: 400px;
    padding: 10px;
    border-radius: 16px;
}
~~~

Lista de mercados com o produto disponível.
~~~css
.lista-mercados {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 100px;
    width: calc(25vw - 55px);
}

.produto-mercado {
    margin: 0px 20px;
    margin-bottom: 40px;
    padding: 10px 12px;
    height: 100px;
    width: 800px;
    max-width: calc(60vw - 55px);
    border-radius: 16px;
    display: flex;
    align-items: center;
    background-color: rgba(76, 108, 249, 0.8);
    color: white;
    box-shadow: 3px 4px 2px rgb(76, 108, 249);
    position: relative;
}
~~~

Imagem e informações.
~~~css
.produto-mercado img {
    height: 80px;
    width: 80px;
    margin-right: 20px;
    border-radius: 16px;
    padding: 10px;
    background-color: white;
    object-fit: contain;
}

.produto-conteudo {
    font-size: 16px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

.produto-preco {
    font-size: 32px;
}
~~~

Botão de adicionar a lista dentro da página do produto.
~~~css
.adicionar-produto {
    position: absolute;
    bottom: 10px;
    right: 10px;
    border: none;
    background-color: white;
    height: 32px;
    width: 32px;
    border-radius: 6px;
}

.adicionar-produto:hover {
    opacity: 0.8;
}
~~~

##### Página de Mercado

~~~css
.pagina-mercado {
    display: flex;
}
~~~

Imagem e lista de produtos.
~~~css
.pagina-mercado > img {
    border: 2px solid black;
    max-height: 400px;
    object-fit: contain;
    max-width: 400px;
    padding: 10px;
    border-radius: 16px;
}

.lista-produtos {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 100px;
    width: calc(25vw - 55px);
}
~~~

Imagem e informações do produto (card)
~~~css
.produto-aba {
    margin: 0px 20px;
    margin-bottom: 40px;
    padding: 10px 12px;
    height: 100px;
    width: 800px;
    max-width: calc(60vw - 55px);
    border-radius: 16px;
    display: flex;
    align-items: center;
    background-color: rgba(76, 108, 249, 0.8);
    color: white;
    box-shadow: 3px 4px 2px rgb(76, 108, 249);
    position: relative;
}

.produto-aba img {
    height: 80px;
    width: 80px;
    margin-right: 20px;
    border-radius: 16px;
    padding: 10px;
    background-color: white;
    object-fit: contain;
}
~~~

Botão de adicionar produto à lista.
~~~css
.adicionar-mercado-local {
    position: absolute;
    bottom: 10px;
    right: 10px;
    border: none;
    background-color: white;
    height: 32px;
    width: 32px;
    border-radius: 6px;
}

.adicionar-mercado-local:hover {
    opacity: 0.8;
}
~~~
