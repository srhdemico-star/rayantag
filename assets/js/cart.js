"use strict";

let cartPageItems =
    JSON.parse(localStorage.getItem("cart")) || [];


/* ================================
   دریافت محصولات اصلی
================================ */

function getProductsList() {

    return (
        typeof PRODUCTS !== "undefined" &&
        Array.isArray(PRODUCTS)
    )
        ? PRODUCTS
        : [];

}


/* ================================
   پیدا کردن محصول بر اساس ID
================================ */

function getProductById(id) {

    const products = getProductsList();

    return products.find(
        function (product) {
            return Number(product.id) === Number(id);
        }
    ) || null;

}


/* ================================
   تبدیل قیمت به عدد
================================ */

function getProductPrice(product) {

    if (!product) {
        return 0;
    }

    return (
        Number(
            String(
                product.price || ""
            ).replace(
                /[^\d]/g,
                ""
            )
        ) || 0
    );

}


/* ================================
   اطلاعات کامل آیتم سبد
================================ */

function getCartItemData(item) {

    const product =
        getProductById(item.id);

    const price =
        getProductPrice(product);

    return {

        product: product,

        name:
            product?.name ||
            item.name ||
            "محصول",

        image:
            product?.image ||
            item.image ||
            "",

        price:
            price ||
            Number(
                String(
                    item.price || ""
                ).replace(
                    /[^\d]/g,
                    ""
                )
            ) ||
            0,

        quantity:
            Number(
                item.quantity
            ) || 1

    };

}


/* ================================
   دریافت سبد خرید
================================ */

function getCartPageItems() {

    return (
        JSON.parse(
            localStorage.getItem("cart")
        ) || []
    );

}


/* ================================
   ذخیره سبد خرید
================================ */

function saveCartPage() {

    localStorage.setItem(
        "cart",
        JSON.stringify(
            cartPageItems
        )
    );

    if (
        typeof updateCartCounter ===
        "function"
    ) {

        updateCartCounter();

    }

}


/* ================================
   فرمت قیمت
================================ */

function formatPrice(price) {

    return Number(price || 0)
        .toLocaleString("fa-IR");

}


function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const emptyCart =
        document.getElementById(
            "emptyCart"
        );

    const cartSummary =
        document.getElementById(
            "cartSummary"
        );

    if (!container) {
        return;
    }

    cartPageItems =
        getCartPageItems();

    container.innerHTML = "";

    if (
        !cartPageItems.length
    ) {

        if (emptyCart) {
            emptyCart.style.display =
                "block";
        }

        if (cartSummary) {
            cartSummary.style.display =
                "none";
        }

        updateCartTotal();

        return;
    }

    if (emptyCart) {
        emptyCart.style.display =
            "none";
    }

    if (cartSummary) {
        cartSummary.style.display =
            "block";
    }

    cartPageItems.forEach(
        function (item, index) {

            const data =
                getCartItemData(item);

            const itemTotal =
                data.price *
                data.quantity;

            const cartItem =
                document.createElement(
                    "div"
                );

            cartItem.className =
                "cart-item";

            cartItem.dataset.index =
                index;

            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${data.image}"
                        alt="${data.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <h3>
                        ${data.name}
                    </h3>

                    <div class="cart-item-price">

                        قیمت واحد:
                        <strong>
                            ${formatPrice(data.price)}
                        </strong>
                        تومان

                    </div>

                </div>


                <div class="cart-item-quantity">

                    <button
                        type="button"
                        class="qty-btn"
                        data-action="decrease"
                        data-index="${index}"
                        aria-label="کاهش تعداد"
                    >
                        −
                    </button>

                    <span class="quantity-value">
                        ${data.quantity}
                    </span>

                    <button
                        type="button"
                        class="qty-btn"
                        data-action="increase"
                        data-index="${index}"
                        aria-label="افزایش تعداد"
                    >
                        +
                    </button>

                </div>


                <div class="cart-item-total">

                    <span>
                        جمع:
                    </span>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>

                    <span>
                        تومان
                    </span>

                </div>


                <button
                    type="button"
                    class="remove-cart-item"
                    data-index="${index}"
                    aria-label="حذف محصول"
                >
                    ×
                </button>

            `;

            container.appendChild(
                cartItem
            );

        }
    );

    updateCartTotal();

}


/* ================================
   تغییر تعداد محصول
================================ */

function changeCartQuantity(
    index,
    change
) {

    if (
        !cartPageItems[index]
    ) {
        return;
    }

    const currentQuantity =
        Number(
            cartPageItems[index]
                .quantity
        ) || 1;

    const newQuantity =
        currentQuantity +
        change;

    if (
        newQuantity <= 0
    ) {

        cartPageItems.splice(
            index,
            1
        );

    } else {

        cartPageItems[index]
            .quantity =
            newQuantity;

    }

    saveCartPage();

    renderCart();

}


/* ================================
   حذف محصول
================================ */

function removeCartItem(index) {

    if (
        !cartPageItems[index]
    ) {
        return;
    }

    cartPageItems.splice(
        index,
        1
    );

    saveCartPage();

    renderCart();

}


/* ================================
   جمع کل سبد
================================ */

function getCartTotal() {

    let total = 0;

    cartPageItems.forEach(
        function (item) {

            const data =
                getCartItemData(item);

            total +=
                data.price *
                data.quantity;

        }
    );

    return total;

}


/* ================================
   نمایش جمع کل
================================ */

function updateCartTotal() {

    const total =
        getCartTotal();

    const totalElements =
        document.querySelectorAll(
            "#cartTotal, .cart-total-price, #totalPrice"
        );

    totalElements.forEach(
        function (element) {

            element.textContent =
                formatPrice(total) +
                " تومان";

        }
    );

}


/* ================================
   کلیک روی دکمه‌های سبد
================================ */

document.addEventListener(
    "click",
    function (event) {

        const quantityButton =
            event.target.closest(
                ".qty-btn"
            );

        if (quantityButton) {

            const index =
                Number(
                    quantityButton.dataset
                        .index
                );

            const action =
                quantityButton.dataset
                    .action;

            if (
                action ===
                "increase"
            ) {

                changeCartQuantity(
                    index,
                    1
                );

            }

            if (
                action ===
                "decrease"
            ) {

                changeCartQuantity(
                    index,
                    -1
                );

            }

            return;

        }


        const removeButton =
            event.target.closest(
                ".remove-cart-item"
            );

        if (removeButton) {

            const index =
                Number(
                    removeButton.dataset
                        .index
                );

            removeCartItem(
                index
            );

        }

    }
);


/* ================================
   پاک کردن کل سبد
================================ */

function clearCartPage() {

    cartPageItems = [];

    saveCartPage();

    renderCart();

}


/* ================================
   دکمه پاک کردن سبد
================================ */

document.addEventListener(
    "click",
    function (event) {

        const clearButton =
            event.target.closest(
                "#clearCart, .clear-cart"
            );

        if (!clearButton) {
            return;
        }

        clearCartPage();

    }
);



function checkoutWhatsApp() {

    if (!cartPageItems.length) {
        return;
    }

    let message =
        "سلام، برای ثبت سفارش از سایت رایان تگ پیام می‌دهم.%0A%0A";

    let total = 0;

    cartPageItems.forEach(
        function (item, index) {

            const data =
                getCartItemData(item);

            const itemTotal =
                data.price *
                data.quantity;

            total += itemTotal;

            message +=
                (index + 1) +
                ". " +
                data.name +
                "%0A";

            message +=
                "تعداد: " +
                data.quantity +
                "%0A";

            message +=
                "قیمت واحد: " +
                formatPrice(data.price) +
                " تومان%0A";

            message +=
                "جمع: " +
                formatPrice(itemTotal) +
                " تومان%0A%0A";

        }
    );

    message +=
        "مبلغ کل: " +
        formatPrice(total) +
        " تومان%0A%0A";

    message +=
        "لطفاً برای هماهنگی سفارش با من تماس بگیرید.";

    const whatsappUrl =
        "https://wa.me/989137380652?text=" +
        message;

    window.open(
        whatsappUrl,
        "_blank"
    );

}


/* ================================
   دکمه ثبت سفارش واتساپ
================================ */

document.addEventListener(
    "click",
    function (event) {

        const checkoutButton =
            event.target.closest(
                "#checkoutWhatsApp, .checkout-whatsapp"
            );

        if (!checkoutButton) {
            return;
        }

        checkoutWhatsApp();

    }
);


/* ================================
   اجرای اولیه
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cartPageItems =
            getCartPageItems();

        renderCart();

        updateCartTotal();

    }
);


/* ================================
   هماهنگ کردن سبد بعد از تغییر
================================ */

window.renderCart =
    renderCart;

window.clearCartPage =
    clearCartPage;

window.checkoutWhatsApp =
    checkoutWhatsApp;

window.changeCartQuantity =
    changeCartQuantity;

window.removeCartItem =
    removeCartItem;
