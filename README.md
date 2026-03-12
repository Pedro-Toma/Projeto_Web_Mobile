# Projeto_Web_Mobile

## Integrantes:

Gabriel Fuentes - 10408876
Guilherme Florio - 10409698
Pedro Toma - 10390171

## Processo de Ideação
Consideramos a ideia de rastrabilidade de preços, ficamos em dúvida entre 2 nichos: produtos de mercado e produtos eletrônicos.
A ideia é que o usuário consiga comparar preços e saber o melhor local físico ou virtual onde ele possa comprar.
Optamos por abordar os produtos de mercado, porque preferimos abordar um público mais geral, como nem todos são ligados à produtos tecnológicos. Além do mais, conseguimos identificar uma necessidade mais clara acerca do assunto.

## Caráter Extensionista
A proposta é poder facilitar a consulta de produtos, para que as pessoas possam economizar nas suas compras e tomar uma decisão mais eficiente com relação ao local, podendo escolher um lugar mais próximo a sua casa, sem perder um desconto ou valor.

## Imagens do Wireframes

### Desktop
<img width="1024" height="487" alt="image" src="https://github.com/user-attachments/assets/9921f288-3476-4719-855e-57b47989bd03" />

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
  <section>
    <article>Produtos </article>
    <span> Categorias </span>
    <span> Categorias </span>
    <span> Categorias </span>
    <span> Categorias </span>
    <span> Categorias </span>
    <span> Categorias </span>
    <span> Categorias </span>
  </section>
  <section>
    <span> Produtos </span>
    <span> Produtos </span>
    <span> Produtos </span>
    <span> Produtos </span>
    <span> Produtos </span>
    <span> Produtos </span>
    <span> Produtos </span>
  </section>
  <article>Minha Lista </article>
  <button style="margin-left: px;">Adicinoa Itens na Lista</button>    
</main>
```

Link para imagem de localização.
``` 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
```
### Mobile
<img width="775" height="708" alt="image" src="https://github.com/user-attachments/assets/75eca272-1433-4548-b752-b40e38b034bf" />
