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
<main>
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
  <button class="add-itens">Adicione Itens na Lista</button>
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

##### Home Page - CSS

Aplicação de margem em filhos do body, exceto o header.
``` 
body :not(header) {
    margin: 10px;
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
    margin-left: auto;
}
```

Ajuste de títulos das seções (produtos e minha lista)
``` 
article{
    margin: 10px;
    padding: 20px 10px;
    font-size: 16pt;
    font-weight: 500;
}
```

Organização dos produtos dentro da seção, com possibilidade de scrollar horizontalmente.
``` 
.categories{
    height: 50px;
    max-width: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 30px;
}

.categories > span{
    background-color: darkgrey;
    padding: 5px 20px;
    border-radius: 100px;
    margin-right: 15px;
}

.products{
    height: 250px;
    max-width: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 30px;
}

.product{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(216, 216, 216);
    height: 200px;
    padding: 5px 10px;
    border-radius: 15px;
    margin-right: 30px;
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
