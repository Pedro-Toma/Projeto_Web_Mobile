// Dados de produtos, mercados e lista do usuário

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
    {
        id: 2,
        nome: "Chocolate Kinder Joy 20g",
        imagem: "imagens-produtos/kinder-ovo.avif",
        categoria: "Doces",
        ofertas: [
            { loja: "Lojas Americanas", preco: 7.99, mercado: "imagens-mercados/mambo.webp", endereco: "R. Aurélia, 1973 - Vila Romana" },
            { loja: "Pão de Açúcar", preco: 9.20, mercado: "imagens-mercados/pao_de_acucar.png", endereco: "R. Maranhão, 875" }
        ]
    },
    {
        id: 3,
        nome: "Leite Parmalat 1L",
        imagem: "imagens-produtos/leite-parmalat.avif",
        categoria: "Padaria e Matinais",
        ofertas: [
            { loja: "Assaí Atacadista", preco: 5.49, mercado: "imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
            { loja: "Extra", preco: 5.98, mercado: "imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" }
        ]
    },
    {
        id: 4,
        nome: "Monster Branco 473ml",
        imagem: "imagens-produtos/monster-branco.avif",
        categoria: "Energéticos e Isotônicos",
        ofertas: [
            { loja: "Posto Shell", preco: 12.00, mercado: "imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" },
            { loja: "Assaí", preco: 8.69, mercado: "imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
            { loja: "Mambo", preco: 9.98, mercado: "imagens-mercados/mambo.webp", endereco: "R. Aurélia, 1973 - Vila Romana" }
        ]
    },
    {
        id: 5,
        nome: "Sabonete Dove 90g",
        imagem: "imagens-produtos/sabonete-dove.avif",
        categoria: "Higiene e Perfumaria",
        ofertas: [
            { loja: "Droga Raia", preco: 4.50, mercado: "imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
            { loja: "Carrefour", preco: 3.99, mercado: "imagens-mercados/carrefour.png", endereco: "Av. Rio Branco, 115" }
        ]
    },
    {
        id: 6,
        nome: "Bis Original 126g",
        imagem: "imagens-produtos/bis.avif",
        categoria: "Doces",
        ofertas: [
            { loja: "Assaí", preco: 7.15, mercado: "imagens-mercados/assai.png", endereco: "R. James Holland, 668" },
            { loja: "Pão de Açúcar", preco: 8.49, mercado: "imagens-mercados/pao_de_acucar.png", endereco: "R. Maranhão, 875" },
            { loja: "Americanas", preco: 7.99, mercado: "imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" }
        ]
    },
    {
        id: 7,
        nome: "Barra Cereal Nutry",
        imagem: "imagens-produtos/barra-nutry.avif",
        categoria: "Salgadinhos e Snacks",
        ofertas: [
            { loja: "Extra", preco: 1.55, mercado: "imagens-mercados/extra.png", endereco: "Av. Gen. Olímpio da Silveira, 414 - Barra Funda" },
            { loja: "Assaí Atacadista", preco: 1.38, mercado: "imagens-mercados/assai.png", endereco: "R. James Holland, 668" }
        ]
    },
];

const mercados = [];

let minhaLista = [];

// Verificar cada produto e adicionar mercados à lista de mercados

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

// Verificar cada produto e preço de cada oferta para mostrar menor preço na página "Home"

produtos.forEach((p) => {
    const melhorOferta = p.ofertas.reduce((menor, atual) => {
        return atual.preco < menor.preco ? atual : menor;
    }, p.ofertas[0]);

    p.preco = melhorOferta.preco;
});

// Renderizar Home Page

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

// Gerar categorias dos produtos
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

// Gerar seção de produtos da Home Page

function gerarCardsProdutos(categoriaFiltro = "Todos", listaBase = null) {

    let listaParaFiltrar = (listaBase !== null) ? listaBase : produtos;
    let listaFiltrada = listaParaFiltrar;

    if (categoriaFiltro !== "Todos") {
        listaFiltrada = listaParaFiltrar.filter(p => p.categoria === categoriaFiltro);
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

// Gerar seção de mercados da Home Page

function gerarCardsMercados() {
    return mercados.map(mercado => `
        <article class="mercado" onclick="renderizarPaginaMercado('${mercado.nome}')">
            <img src="${mercado.imagem}">
            <p> ${mercado.nome} </p>
            <p> ${mercado.endereco} </p>
        </article>
    `).join('');
}

// Renderizar Página de Produto

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
                Home <i class="fa-solid fa-chevron-right"></i> ${produto.nome}
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

// Gerar lista de mercados onde o produto esta disponível

function gerarMercadosDoProduto(nome) {

    //document.getElementById('Pesquisa').style.display = 'visible';
    //document.getElementById('Pesquisa-Mobile').style.display = 'visible';

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

// Renderizar Página do Mercado Específico
function renderizarPaginaMercado(nomeMercado) {
    mostrarPesquisa(true);
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
                <section class="info-mercado">
                    <img src="${mercado.imagem}">
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

    // Ativa os botões de adicionar na lista para esta nova tela
    configurarBotoesAdicionar('.adicionar-home');
    configurarFiltros(produtosNesteMercado);
    renderizarLista();
}

// Gerar cards de produtos para a página de um mercado específico
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

function mostrarPesquisa(exibir) {
    const pesquisaDesktop = document.getElementById('Pesquisa');
    const pesquisaMobile = document.getElementById('Pesquisa-Mobile');
    const estilo = exibir ? '' : 'none';

    if (pesquisaDesktop) pesquisaDesktop.style.display = estilo;
    if (pesquisaMobile) pesquisaMobile.style.display = estilo;
}

// Seleciona todos botões de adicionar com a informação do seletor (classe) e checa se
// item foi adicionado à lista

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

// Pegar todas categorias e a seção de produtos para filtrar para seleção de alguma categoria

function configurarFiltros(listaBase = null) {

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

// Adicionar itens à lista (rejeita se já foi adicionado)

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

// Remover itens da lista

function removerDaLista(indice) {
    minhaLista.splice(indice, 1);
    renderizarLista();
}

// Alterar quantidade de itens selecionado na lista

function alterarQuantidade(indice, valor) {
    if (!minhaLista[indice].quantidade) minhaLista[indice].quantidade = 1;
    
    minhaLista[indice].quantidade += valor;

    if (minhaLista[indice].quantidade < 1) {
        removerDaLista(indice);
    } else {
        renderizarLista();
    }
}

// Carregar lista com itens (barra lateral) e calcula preço total

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

// controlar a abertura da lista (barra lateral) - toggle 

const secaoLateral = document.querySelector('.secao-lateral');
const botaoMinhaLista = document.querySelector('.secao-lateral > button');

botaoMinhaLista.addEventListener('click', () => {
    secaoLateral.classList.toggle('aberto');
});

// Espera toda estrutura carregar para aplicar o JavaScript (Renderizar Home)

window.onload = () => {
    renderizarHome();
};
