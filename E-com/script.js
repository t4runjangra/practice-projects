document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCart = document.getElementById("empty-cart")
    const cardTotal = document.getElementById("cart-total")
    const totalPrice = document.getElementById("total-price")
    const checkoutBtn = document.getElementById("checkout-btn")
    let products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 49.99 }
    ]
   let cart = JSON.parse(localStorage.getItem("items")) || []

    products.forEach(product => {
        const div = document.createElement("div")
        div.classList.add("product")
        div.innerHTML = `
        <span> ${product.name} - $${product.price}</span>
        <button data-id = ${product.id}>add to cart</button>
        `
        productList.appendChild(div)
        
    })
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productiD = parseInt(e.target.getAttribute("data-id"))
            const product = products.find((p) => p.id === productiD)
            cart.push(product)
            saveTask();
            renderTask();
        }
    })
    function renderTask() {
        cartItems.innerHTML = "";
        let totalPriceOfItems = 0
        if (cart.length > 0) {
            emptyCart.classList.add("hidden")
            cardTotal.classList.remove("hidden")
            cart.forEach((item, index) => {
                totalPriceOfItems += item.price
                const cartItemDiv = document.createElement("div")
                cartItemDiv.classList.add("cartList")
                cartItemDiv.innerHTML = `
                   <span> ${item.name} - $${item.price} </span>
                   <button data-id ="${index}" class="RemoveProduct"> Remove </button>
                   `
                   cartItems.appendChild(cartItemDiv)
                   cartItemDiv.querySelector(".RemoveProduct").addEventListener("click", (e) => {
                       e.stopPropagation();
                       cart = cart.filter(items => items.id != cart.id) 
                       cart.splice(index,1)
                       cartItemDiv.remove();
                    totalPriceOfItems = (totalPriceOfItems-item.price).toFixed(2)
                    totalPrice.textContent = `$${totalPriceOfItems}`
                    saveTask();
                    
                })
                totalPrice.textContent = `$${totalPriceOfItems.toFixed(2)}`
                
            })
        }
        else {
            emptyCart.classList.remove("hidden")
            cardTotal.classList.add("hidden")
            totalPrice.textContent = `$0.00`
        }
    }

    
    checkoutBtn.addEventListener("click", () => {
        cart.length = 0
        saveTask()
        alert("Confirm Checkout")
        renderTask()
    })


    function saveTask(){
        localStorage.setItem("items", JSON.stringify(cart))
    }
    renderTask()
})