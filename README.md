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

## Imagens dos Wireframes

### Desktop
#### Página Incial (Seção de "Produtos Mais Populares" e seção de "Mercados")
<img width="1083" height="630" alt="image" src="https://github.com/user-attachments/assets/89555e8c-a491-434e-bf2a-89ac77f2268e" />

#### Página de Produto (Lista de mercados onde o produto está disponível)
<img width="1082" height="627" alt="image" src="https://github.com/user-attachments/assets/8cf2834f-8418-4b98-b90e-7588b3857bbc" />

#### Página de Mercado (Lista de produtos disponíveis no mercado)
<img width="1081" height="633" alt="image" src="https://github.com/user-attachments/assets/3f8a6cbe-8176-41f1-be37-4600ac68ddf0" />

#### Seção Lateral (Lista de produtos adicionados pelo usuário)
<img width="1083" height="629" alt="image" src="https://github.com/user-attachments/assets/07ecc994-2a40-44fb-9c8c-76067a1a4fb7" />

### Mobile

#### Página Incial
<img width="330" height="711" alt="image" src="https://github.com/user-attachments/assets/cf339015-77f6-4437-93e2-ef8c11cdf80a" />

#### Página de Produto
<img width="326" height="713" alt="image" src="https://github.com/user-attachments/assets/0d031a2c-900e-449c-9f39-85d960ca032c" />

#### Página de Mercado
<img width="320" height="717" alt="image" src="https://github.com/user-attachments/assets/65c1db79-b83b-4b1b-8142-fcebc0a5cccf" />

#### Modal (Posição da lista modificada para versão mobile)
<img width="322" height="711" alt="image" src="https://github.com/user-attachments/assets/cd17ccd1-7e17-492c-ae9f-35950dd04b25" />

##### Sobre o Desenvolvimento

Optamos por utilizar uma estrutura html única e alterar apenas o conteúdo renderizado na tela, seguindo o modelo Single Page Application (SPA).

### HTML

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
  <form id="Pesquisa" class="pesquisa-desktop">
    <i class="fa fa-search icon"></i>
    <input type="text" placeholder="Pesquisar...">
  </form>
</header>
~~~

Criação de barra de pesquisa para a versão mobile.
~~~html
<form id="Pesquisa-Mobile" class="pesquisa-mobile">
  <i class="fa fa-search icon"></i>
  <input type="text" placeholder="Pesquisar...">
</form>
~~~

Criação seção main para adicionar conteúdo via JS.
~~~html
<main class="conteudo">
</main>
~~~

Seção de barra lateral fixa para lista de itens
~~~html
<aside class="secao-lateral">
  <button id="toggle-lista"> 
    <i class="fa-solid fa-chevron-left"></i> 
    Lista
  </button>
  <section class="lista">
    <ul id="lista-itens">
    </ul>
    <footer class="rodape-lista">
      <p id="preco-total"></p>
    </footer>
  </section>
</aside>
~~~

### JavaScript (Single Page Application - injeção HTML)

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
    mostrarPesquisa(true);
    const main = document.querySelector('.conteudo');

    main.innerHTML = `
        <article class="titulo">Produtos Mais Populares</article>
        ${gerarCategorias()} 
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

Gerar categorias dos produtos.
~~~js
function gerarCategorias() {
    return `
        <section class="categorias-desktop">
            <ul id="categorias-filtros">
                <li data-categoria="Todos"> Todos </li>
                <li data-categoria="Higiene e Perfumaria"> Higiene e Perfumaria </li>
                <li data-categoria="Salgadinhos e Snacks"> Salgadinhos e Snacks </li>
                <li data-categoria="Padaria e Matinais"> Padaria e Matinais </li>
                <li data-categoria="Bebidas"> Bebidas </li>
                <li data-categoria="Energéticos e Isotônicos"> Energéticos e Isotônicos </li>
                <li data-categoria="Doces"> Doces </li>
            </ul>
        </section>
        <section class="categorias-mobile">
            <select id="filtros-mobile">
                <option value="Todos" selected>Todos</option>
                <option value="Higiene e Perfumaria">Higiene e Perfumaria</option>
                <option value="Salgadinhos e Snacks">Salgadinhos e Snacks</option>
                <option value="Padaria e Matinais">Padaria e Matinais</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Energéticos e Isotônicos">Energéticos e Isotônicos</option>
                <option value="Doces">Doces</option>
            </select>
        </section>
    `;
}
~~~

Geração do html para cada produto dentro da lista filtrada.
~~~js
function gerarCardsProdutos(categoriaFiltro = "Todos") {

    let listaParaFiltrar = (listaBase !== null) ? listaBase : produtos;
    let listaFiltrada = listaParaFiltrar;

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
    mostrarPesquisa(false);
    const main = document.querySelector('.conteudo');

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Produto Não Encontrado");
        return;
    }

    main.innerHTML = `
        <section class="pagina-detalhes">
            <button onclick="renderizarHome()" class="voltar">
                <span class="link-home">Home</span> <i class="fa-solid fa-chevron-right"></i> ${produto.nome}
            </button>
            <h1>${produto.nome}</h1>
            <section class="pagina-produto">
                <div class="imagem-produto">
                    <img src="${produto.imagem}">
                </div>
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

    mostrarPesquisa(true);
    const main = document.querySelector('.conteudo');

    const mercado = mercados.find(m => m.nome === nomeMercado);

    if (!mercado) {
        alert("Mercado Não Encontrado");
        return;
    }

    let produtosNesteMercado = [];
    
    produtos.forEach(produto => {
        const ofertaNoMercado = produto.ofertas.find(oferta => oferta.loja === nomeMercado);
        
        if (ofertaNoMercado) {
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
                <span class="link-home">Home</span> <i class="fa-solid fa-chevron-right"></i> ${mercado.nome}
            </button>
            <section class="pagina-mercado">
                <section class="info-mercado">
                    <div class="imagem-mercado">
                        <img src="${mercado.imagem}">
                    </div>
                    <h1>${mercado.nome}</h1>
                    <p>${mercado.endereco}</p>
                </section>
                <section class="produtos-mercado">
                    <article class="titulo">Produtos Mais Populares</article>
                    ${gerarCategorias()} 
                    <section class="produtos">
                        ${gerarCardsProdutos("Todos", produtosNesteMercado)} 
                    </section>
                </section>
            </section>
        </section>
    `;

    configurarBotoesAdicionar('.adicionar-mercado-local');
    configurarFiltros(produtosNesteMercado);
    renderizarLista();
}
~~~

Alteração da barra de pesquisa para cada versão.
~~~js
function mostrarPesquisa(exibir) {
    const pesquisaDesktop = document.getElementById('Pesquisa');
    const pesquisaMobile = document.getElementById('Pesquisa-Mobile');
    const estilo = exibir ? '' : 'none';

    if (pesquisaDesktop) pesquisaDesktop.style.display = estilo;
    if (pesquisaMobile) pesquisaMobile.style.display = estilo;
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

    const filtroDesktop = document.querySelectorAll('#categorias-filtros li');
    const filtroMobile = document.querySelector('#filtros-mobile');
    const containerProdutos = document.querySelector('.produtos');

    const executarFiltro = (categoria) => {
        containerProdutos.innerHTML = gerarCardsProdutos(categoria, listaBase);
        configurarBotoesAdicionar('.adicionar-home');
        
        if (filtroMobile) filtroMobile.value = categoria;
    };

    filtroDesktop.forEach(filtro => {
        filtro.onclick = () => {

            const jaAtivo = filtro.classList.contains('filtro-ativo');
            let categoriaFiltro;

            if (jaAtivo) {
                filtro.classList.remove('filtro-ativo');
                categoriaFiltro = "Todos"; 
            } else {
                filtroDesktop.forEach(f => f.classList.remove('filtro-ativo'));
                filtro.classList.add('filtro-ativo');
                categoriaFiltro = filtro.getAttribute('data-categoria');
            }
            if (filtroMobile) { 
                filtroMobile.value = categoriaFiltro;
            }
            executarFiltro(categoriaFiltro);
        };
    });

    if (filtroMobile) {
        filtroMobile.onchange = (e) => {
            const categoriaSelecionada = e.target.value;

            filtroDesktop.forEach(f => {
                f.classList.remove('filtro-ativo');
                if(f.getAttribute('data-categoria') === categoriaSelecionada) {
                    f.classList.add('filtro-ativo');
                }
            });

            executarFiltro(categoriaSelecionada);
        };
    }
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

        const fragmento = document.createDocumentFragment();

        minhaLista.forEach((produto, indice) => {

            const quantidade = produto.quantidade || 1;
            const subtotal = produto.preco * quantidade;

            somaTotal += subtotal;
            
            const li = document.createElement('li');
            li.className = 'produto-lista';

            li.innerHTML = `
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
            `;
            fragmento.appendChild(li);
        });
        container.appendChild(fragmento);
        
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

### CSS

Criação de variáveis globais para padronização de cores.
~~~css
:root {
    --cor-principal: rgb(76, 108, 249);
    --cor-header-lateral: rgb(35, 52, 129);
    --fonte-principal: Arial;
}
~~~

Aplicação de fonte, altura, largura e display flex para html e body. Padding na main.
~~~css
html{
    width: 100%;

body {
    font-family: var(--fonte-principal);
    padding-top: 55px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

/* VERSÂO MOBILE: adiciona espaço para barra do modal na parte inferior */
@media (max-width: 600px) {
    body {
        padding-bottom: 30px;
    }
}
~~~

Header fixo na parte superior da página.
~~~css
header{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 55px;
    background-color: var(--cor-header-lateral);
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
    background-color: var(--cor-header-lateral);
    border: none;
    color: white;
    padding: 6px;
    margin-right: 20px;
    float: right;
}

input::placeholder {
    color: white;
}

.pesquisa-desktop {
    display: flex;
    align-items: center;
    margin-left: auto;
}

.pesquisa-mobile {
    display: none;
}

/* VERSÃO MOBILE: esconde barra de pesquisa de desktop e mostra a pesquisa na versão mobile */
@media (max-width: 600px) {
    .pesquisa-desktop {
        display: none;
    }

    .pesquisa-mobile {
        display: flex;
        align-items: center;
        background-color: color-mix(in srgb, var(--cor-header-lateral), transparent 80%);
        padding: 15px 5px;
        width: 100%;
    }

    .pesquisa-mobile i {
        color: var(--cor-header-lateral);
        margin-left: 15px;
    }

    .pesquisa-mobile input {
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
        margin-left: 10px;
    }

    input::placeholder {
        color: var(--cor-header-lateral);;
    }

    input {
        color: var(--cor-header-lateral);;
    }
}
~~~

Conteúdo principal (main).
~~~css
.conteudo {
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-right: 40px;
    width: 100%;
    box-sizing: border-box;
}

/* VERSÃO MOBILE: diminui padding no lado direito da página (não existe barra fixa lateral) */
@media (max-width: 600px) {
    .conteudo {
        padding-right: 20px;
    }
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

/* VERSÃO MOBILE: ajusta barra de lista para parte inferior do site (modal) */
@media (max-width: 600px) {
    .secao-lateral {
        top: auto;
        bottom: 0px;
        width: 80%;
        height: 70vh;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        box-shadow: 0 -4px 15px var(--cor-header-lateral);
        left: 50%;
        right: auto;
        transform: translateY(100%) translateX(-50%);
    }

    .secao-lateral.aberto {
        transform: translateY(0) translateX(-50%);;
    }
}
~~~

Estilização do botão da aba lateral e rotaciona ícone chevron
~~~css
#toggle-lista i {
    transform: rotate(0deg);
    transition: transform 0.5s ease;
}

#toggle-lista:hover {
    background-color: color-mix(in srgb, var(--cor-header-lateral), white 10%);
}

.secao-lateral.aberto #toggle-lista i {
    transform: rotate(180deg);
}

.secao-lateral > button {
    display: flex;
    position: absolute;
    font-size: 16px;
    margin-top: 20px;
    margin-right: 15px;
    right: 100%;
    border: none;
    padding: 10px 15px;
    background-color: var(--cor-header-lateral);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
    height: 36px;
    cursor: pointer;
}

/* VERSÃO MOBILE: ajusta posição e textos do botão (modal) */
@media (max-width: 600px) {
    .secao-lateral > button {
        right: auto;
        top: -40px;
        left: 0;
        margin-top: 0px;
        margin-right: 0px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0px;
        width: 100%;
        height: 45px;
        padding: 20;
    }

    #toggle-lista {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #toggle-lista i {
        transform: rotate(90deg);
        transition: transform 0.5s ease;
    }

    .secao-lateral.aberto #toggle-lista i {
        transform: rotate(-90deg);
    }
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
    background-color: var(--cor-header-lateral);
}

.vazio {
    color: white;
    margin-bottom: 10px;
}

.rodape-lista {
    display: flex;
    justify-content: flex-end;
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
    background-color: var(--cor-principal); 
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

/* VERSÃO MOBILE: ajustar dimensões da lista de itens selecionados */
@media (max-width: 600px) {
    .lista {
        width: 100%;
        height: 100%; 
        padding: 20px;
        box-sizing: border-box;
    }

    .rodape-lista {
        justify-content: center;
    }
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
    background-color: var(--cor-header-lateral);
}

.controle-quantidade button:hover {
    cursor: pointer;
    background-color: color-mix(in srgb, var(--cor-header-lateral), white 10%);
}
~~~

##### Página Home

Seção de Produtos Mais Populares.
~~~css
.titulo { 
    padding: 20px 0px;
    font-size: 24pt;
}

.categorias-mobile {
    display: none;
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
    background-color: color-mix(in srgb, var(--cor-header-lateral), transparent 80%);
    color: white;
    font-size: 12pt;
    padding: 5px 20px;
    border-radius: 100px;
    margin-right: 15px;
    white-space: nowrap;
    cursor: pointer;
}

li.filtro-ativo {
    background-color: var(--cor-header-lateral);
    color: black;
}

/* VERSÃO MOBILE: diminui tamanho da fonte do título e altera seleção de categorias (dropdown menu) */
@media (max-width: 600px) {
    .titulo {
        font-size: 18pt;
    }

    .categorias-desktop{
        display: none;
    }

    .categorias-mobile {
        display: flex;
        padding-bottom: 20px;
        border: 1x solid var(--cor-header-lateral);

    }

    .categorias-mobile select {
        width: 100%;
        border-radius: 10px 10px 0px 0px;
        border: 1px solid var(--cor-header-lateral);
        background-color: color-mix(in srgb, var(--cor-principal), transparent 90%);;
        padding: 8px 10px;
        font-size: 12pt;
        color: var(--cor-header-lateral);
    }
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
    background-color: var(--cor-principal);
    min-height: 220px;
    min-width: 140px;
    max-width: 120px;
    border-radius: 15px;
    margin-right: 30px;
    padding-bottom: 5px;
    cursor: pointer;
    border: 1px solid var(--cor-principal);
    position: relative;
}

.produto img {
    width: 100%;
    margin: 0px;
    height: 100px;
    object-fit: contain;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;
    padding: 10px 0px;
    box-shadow: 0px 1px 2px var(--cor-principal);
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
    background-color: white;
    padding: 20px 10px;
    box-shadow: 0px 0px 16px var(--cor-principal);
    margin-bottom: 20px;
}

.mercado p {
    font-size: 16px;
    text-align: center;
    font-weight: 600;
}
~~~

##### Página de Produto

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

.link-home:hover  {
    cursor: pointer;
    text-decoration: underline;
}
~~~

Seção do Produto (nome e imagem).
~~~css
.pagina-detalhes > h1{
    display: flex;
    font-size: 24pt;
    font-weight: bolder;
    margin-bottom: 20px;
    white-space: normal;
    overflow-wrap: break-word;
}

.pagina-produto {
    display: flex;
    align-items: flex-start;
    flex: 1 1 0;
    gap: 5%;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

/* VERSÃO MOBILE: centraliza e diminui tamanho da fonte do título e alinha produtos no centro da página */
@media (max-width: 600px) {
    .pagina-detalhes > h1{
        font-size: 20pt;
        justify-content: center;
    }

    .pagina-produto {
        flex-direction: column;
        align-items: center;
    }
}
~~~

Imagem do produto.
~~~css
.imagem-produto {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 2px solid black;
    border-radius: 16px;
    background-color: white;
    flex: 1 2 250px;
    width: calc(100% - 320px);
    max-width: 250px;
    min-width: 100px;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
}

.imagem-produto img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
}

/* VERSÃO MOBILE: largura do container do produto pega a largura disponível da tela e alinhamento vertical de produtos */
@media (max-width: 600px) {
    .imagem-produto {
        width: 100%;
    }

    .pagina-produto {
        flex-direction: column;
        align-items: center;
    }
}
~~~

Lista de mercados com o produto disponível.
~~~css
.lista-mercados {
    display: flex;
    flex-direction: column;
    flex: 1 1 60%;
    min-width: 200px;
    gap: 10px;
    max-width: 100%;
    margin-right: 10px;
}

.produto-mercado {
    margin-bottom: 40px;
    padding: 10px 12px;
    height: auto;
    min-width: 280px;
    max-width: 800px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    background-color: color-mix(in srgb, var(--cor-principal), transparent 20%);
    color: white;
    box-shadow: 3px 4px 2px var(--cor-principal);
    position: relative;
}

/* VERSÃO MOBILE: lista de produtos dos mercados cresce verticalmente e é definida largura mínima para card */
@media (max-width: 600px) {
    .lista-mercados {
        max-height: none;
        width: 100%;
        margin-right: 5px;
        max-height: none;
        overflow-y: visible;
        flex-grow: 1;
    }

    .produto-mercado {
        flex: 1 1 auto;
        min-width: 200px;
        margin-bottom: 10px;
    }
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
    font-size: 12pt;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
}

.produto-preco {
    padding-top: 20px;
    font-size: 23pt;
}

/* VERSÃO MOBILE:  diminui tamanho da imagem do mercado no card e fonte dos textos */
@media (max-width: 600px) {
    .produto-mercado img {
        height: 50px;
        width: 50px;
    }

    .produto-conteudo {
        font-size: 10pt;
    }

    .produto-preco {
        padding-top: 14px;
        font-size: 19pt;
    }
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
    gap: 80px;
    width: 100%;
}

/* VERSÃO MOBILE: página organizada verticalmente e gap entre itens é reduzido */
@media (max-width: 600px) {
    .pagina-mercado {
        flex-direction: column;
        gap: 30px;
    }
}
~~~

Imagem e informações do mercado.
~~~css
.imagem-mercado {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 2px solid black;
    border-radius: 16px;
    background-color: white;
    flex: 1 1 250px;
    width: 250px;
    max-width: 250px;
    min-width: 100px;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
}

.imagem-mercado img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
}

.info-mercado > h1 {
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 5px;
    font-size: 20pt;
    font-weight: bold;
    max-width: 100%;
}

.info-mercado > p {
    margin-left: 5px;
    font-size: 14pt;
    max-width: 100%;
}
~~~

Categorias e lista de produtos.
~~~css
.produtos-mercado {
    flex: 1;
    min-width: 0;
    width: 100%;
}

.produtos-mercado .categorias-desktop {
    height: 60px;
    width: 100%;
    overflow-x: auto;
    max-width: 100%;
}
~~~
