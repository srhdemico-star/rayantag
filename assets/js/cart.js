"use strict";

/* ======================================
   SabzAbi Store
   cart.js FINAL
====================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ======================================
   Save Cart
====================================== */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ======================================
   Cart Counter
====================================== */

function updateCartCount() {

    const counter = document.querySelector("#cartCount");

    if (!counter) return;

    const total = cart.reduce((sum, item) => {

        return sum + item.quantity;

    }, 0);

    counter.innerText = total;
}

/* ======================================
   Add To Cart
====================================== */

function addToCart(product) {

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            image: product.image,

            price: product.price,

            quantity: 1

        });

    }

    saveCart();

updateCartCount();

showCart();

showToast("✅ محصول به سبد خرید اضافه شد");
   
}

/* ======================================
   Show Cart
====================================== */

function showCart() {

    const container = document.querySelector("#cartItems");

    const totalBox = document.querySelector("#cartTotal");

    if (!container) return;

    if (cart.length === 0) {

        container.innerHTML = `

        <div class="empty-cart">

            <h2>سبد خرید شما خالی است</h2>

            <a href="products.html" class="btn">

                مشاهده محصولات

            </a>

        </div>

        `;

        if (totalBox)

            totalBox.innerText = "0 تومان";

        return;

    }

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const price = Number(

            item.price.toString().replace(/,/g, "")

        );

        total += price * item.quantity;

        const rowTotal = price * item.quantity;

container.innerHTML += `

<div class="cart-item">

    <img src="${item.image}" alt="${item.name}">

    <div class="cart-info">

        <h3>${item.name}</h3>

        <p>قیمت واحد: ${item.price} تومان</p>

        <p class="row-total">
            جمع این محصول:
            <strong>
                ${rowTotal.toLocaleString("fa-IR")} تومان
            </strong>
        </p>

    </div>

    <div class="cart-actions">

        <button
            class="qty-btn"
            onclick="decreaseQty(${index})">

            −

        </button>

        <span class="qty-number">

            ${item.quantity}

        </span>

        <button
            class="qty-btn"
            onclick="increaseQty(${index})">

            +

        </button>

        <button
            class="remove-btn"
            onclick="removeItem(${index})">

            🗑 حذف

        </button>

    </div>

</div>

`;

    });

    if (totalBox) {

        totalBox.innerText =

            total.toLocaleString("fa-IR") + " تومان";

    }

}

/* ======================================
   Increase Qty
====================================== */

function increaseQty(index) {

    cart[index].quantity++;

    saveCart();

    updateCartCount();

    showCart();

}

/* ======================================
   Decrease Qty
====================================== */

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    updateCartCount();

    showCart();

}

/* ======================================
   Remove Item
====================================== */

function removeItem(index){

    if(!confirm("این محصول حذف شود؟")) return;

    cart.splice(index,1);

    saveCart();

    updateCartCount();

    showCart();

    showToast("🗑 محصول حذف شد");

}


/* ======================================
   Init
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    showCart();

    const checkoutBtn = document.querySelector("#checkoutBtn");

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", () => {

            if (cart.length === 0) {

                showToast("سبد خرید خالی است.");

                return;

            }

            let message = "سلام، می‌خواهم این محصولات را سفارش بدهم:%0A%0A";

            let total = 0;

            cart.forEach(item => {

                const price = Number(item.price.replace(/,/g,""));

                total += price * item.quantity;

                message +=

                `• ${item.name} × ${item.quantity}%0A` +

                `${item.price} تومان%0A%0A`;

            });

            message +=

            `جمع کل:%0A${total.toLocaleString("fa-IR")} تومان`;

            const phone = "989032487485";

            window.open(

                `https://wa.me/${phone}?text=${message}`,

                "_blank"

            );

        });

    }

   const clearBtn = document.querySelector("#clearCartBtn");

if(clearBtn){

    clearBtn.addEventListener("click",()=>{

        if(!confirm("سبد خرید خالی شود؟")) return;

        localStorage.removeItem("cart");

        cart = [];

        updateCartCount();

        showCart();

        showToast("🗑 سبد خرید خالی شد");

    });

}


});

