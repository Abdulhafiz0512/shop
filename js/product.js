const container = document.querySelector(".container");

async function fetchProduct(id){
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();

    return product;
}

function getProductIdAndTitle(){
     const urlParams = new URLSearchParams(window.location.search);
     const productId = urlParams.get("id")
     const productTitle =urlParams.get("title")

     return {productId, productTitle}
}
 function renderProduct(product){
    
    const div =  document.createElement("div")
    div.classList.add("card")
    const img = document.createElement("img");
    img.src = product.image; 
    div.insertAdjacentHTML("afterbegin", `<h1>${product.title}</h1>`)
    div.append(img)
    

    const cost_info = document.createElement("div");

    const info = document.createElement("p");
    info.textContent = "Headphones";
    cost_info.append(info);

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    cost_info.append(price);
    cost_info.classList.add("cost_info")
    div.append(cost_info);

    const ratingContainer = document.createElement("div");
    ratingContainer.style.display = 'flex';
    ratingContainer.style.gap = '1rem';
    ratingContainer.style.alignItems = 'center';

    const starsContainer = document.createElement("div");
    starsContainer.insertAdjacentHTML(
      "beforeend",
      "<span>⭐️</span>".repeat(Math.round(product.rating.rate))
    );
    ratingContainer.append(starsContainer);

    const ratingCount = document.createElement("div");
    ratingCount.textContent = `(${product.rating.count})`;
    ratingContainer.append(ratingCount);

    div.append(ratingContainer)

    container.append(div)
 }

(async function(){
    const object = getProductIdAndTitle();
    const {productId: id, productTitle: title} = object;
    
    const product = await fetchProduct(id);
    document.title=title;
    renderProduct(product)
    
})()
