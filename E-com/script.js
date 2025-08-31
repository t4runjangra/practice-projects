document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCart = document.getElementById("empty-cart")
    const cardTotal = document.getElementById("cart-total")
    const totalPrice = document.getElementById("total-price")
    const checkoutBtn = document.getElementById("checkout-btn")
    let products = [
        {id:1,name:"Product 1",price:29.99},
        {id:2,name:"Product 2",price:19.99},
        {id:3,name:"Product 3",price:49.99}
    ]
    const cart = []
    products.forEach(product => {
        const div = document.createElement("div")
        div.classList.add("product")
        div.innerHTML= `
        <span> ${product.name} - $${product.price}</span>
        <button data-id = ${product.id}>add to cart</button>
        `
        productList.appendChild(div)
    })
    productList.addEventListener("click", (e)=>{
        if (e.target.tagName === "BUTTON") {
           const productiD =  parseInt(e.target.getAttribute("data-id"))
           const product =products.find((p) => p.id=== productiD)
           cart.push(product)
           console.log(cart);
        }
    })
    
})