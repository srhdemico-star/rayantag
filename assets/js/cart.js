"use strict";

/* ======================================
   RAYANTAG
   cart.js
====================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ======================================
   SAVE CART
====================================== */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartCounter === "function") {
        updateCartCounter();
    }
}


/* ======================================
   CART COUNT
====================================== */

function updateCartCount() {

    const counter = document.querySelector("#cartCount");

    if (!counter) return;

    const total = cart.reduce((sum, item) => {
        return sum + (Number(item.quantity) || 0);
    }, 0);

    counter.textContent = total;
}


/* ======================================
   RENDER CART
====================================== */

function showCart() {

    const container =
        document.querySelector("#cartItems");

    const totalBox =
        document.querySelector("#cartTotal");

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

        if (totalBox) {
            totalBox.textContent = "0 تومان";
        }

        return;
    }


    let total = 0;

    container.innerHTML = "";


    cart.forEach((item, index) => {

        const price =
            Number(
                String(item.price || "")
                    .replace(/[^\d]/g, "")
            ) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const rowTotal =
            price * quantity;

        total += rowTotal;


        container.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.image || ""}"
                    alt="${item.name || "محصول"}"
                >

                <div class="cart-info">

                    <h3>
                        ${item.name || "محصول"}
                    </h3>

                    <p>
                        قیمت واحد:
                        ${price.toLocaleString("fa-IR")}
                        تومان
                    </p>

                    <p class="row-total">

                        جمع این محصول:

                        <strong>
                            ${rowTotal.toLocaleString("fa-IR")}
                            تومان
                        </strong>

                    </p>

                </div>


                <div class="cart-actions">

                    <button
                        type="button"
                        class="qty-btn"
                        onclick="decreaseQty(${index})"
                    >
                        −
                    </button>


                    <span class="qty-number">
                        ${quantity}
                    </span>


                    <button
                        type="button"
                        class="qty-btn"
                        onclick="increaseQty(${index})"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeItem(${index})"
                    >
                        🗑 حذف
                    </button>

                </div>

            </div>
        `;
    });


    if (totalBox) {

        totalBox.textContent =
            total.toLocaleString("fa-IR") +
            " تومان";

    }

}


/* ======================================
   INCREASE
====================================== */

function increaseQty(index) {

    if (!cart[index]) return;

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;

    saveCart();

    updateCartCount();

    showCart();
}


/* ======================================
   DECREASE
====================================== */

function decreaseQty(index) {

    if (!cart[index]) return;

    const quantity =
        Number(cart[index].quantity) || 1;


    if (quantity > 1) {

        cart[index].quantity =
            quantity - 1;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    updateCartCount();

    showCart();
}


/* ======================================
   REMOVE
====================================== */

function removeItem(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    showCart();


    if (typeof showToast === "function") {

        showToast(
            "🗑 محصول از سبد خرید حذف شد"
        );

    }

}


/* ======================================
   CLEAR CART
====================================== */

function clearCart() {

    if (cart.length === 0) return;


    if (
        !confirm(
            "سبد خرید خالی شود؟"
        )
    ) {
        return;
    }


    cart = [];

    localStorage.removeItem("cart");

    updateCartCount();

    showCart();


    if (typeof showToast === "function") {

        showToast(
            "🗑 سبد خرید خالی شد"
        );

    }

}


/* ======================================
   WHATSAPP CHECKOUT
====================================== */

function checkoutCart() {

    if (cart.length === 0) {

        if (typeof showToast === "function") {
            showToast("سبد خرید خالی است.");
        }

        return;
    }


    let message =
        "سلام، می‌خواهم این محصولات را سفارش بدهم:\n\n";


    let total = 0;


    cart.forEach(item => {

        const price =
            Number(
                String(item.price || "")
                    .replace(/[^\d]/g, "")
            ) || 0;

        const quantity =
            Number(item.quantity) || 1;


        total +=
            price * quantity;


        message +=
            `• ${item.name} × ${quantity}\n` +
            `${price.toLocaleString("fa-IR")} تومان\n\n`;

    });


    message +=
        `جمع کل:\n${total.toLocaleString("fa-IR")} تومان`;


    const phone =
        "989032487485";


    const whatsappURL =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* ======================================
   INIT
====================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        showCart();


        const clearBtn =
            document.querySelector(
                "#clearCartBtn"
            );


        if (clearBtn) {

            clearBtn.addEventListener(
                "click",
                clearCart
            );

        }


        const checkoutBtn =
            document.querySelector(
                "#checkoutBtn"
            );


        if (checkoutBtn) {

            checkoutBtn.addEventListener(
                "click",
                checkoutCart
            );

        }

    }
);
