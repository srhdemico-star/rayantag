"use strict";


/* =========================================
   سبد خرید
========================================= */

let cartPageItems =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


/* =========================================
   دریافت لیست محصولات
========================================= */

function getProductsList() {

    if (
        typeof PRODUCTS !== "undefined" &&
        Array.isArray(PRODUCTS)
    ) {
        return PRODUCTS;
    }

    return [];

}


/* =========================================
   پیدا کردن محصول
========================================= */

function getProductById(id) {

    const products =
        getProductsList();

    return (
        products.find(
            function (product) {

                return (
                    Number(product.id) ===
                    Number(id)
                );

            }
        ) || null
    );

}


/* =========================================
   تبدیل قیمت به عدد
========================================= */

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


/* =========================================
   اطلاعات کامل محصول سبد
========================================= */

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


/* =========================================
   دریافت سبد
========================================= */

function getCartPageItems() {

    return (
        JSON.parse(
            localStorage.getItem("cart")
        ) || []
    );

}


/* =========================================
   ذخیره سبد
========================================= */

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


/* =========================================
   فرمت قیمت
========================================= */

function formatPrice(price) {

    return Number(
        price || 0
    ).toLocaleString(
        "fa-IR"
    );

}

/* =========================================
   نمایش سبد خرید
========================================= */

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


    /* سبد خالی */

    if (
        cartPageItems.length === 0
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


    /* سبد دارای محصول */

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

            const rowTotal =
                data.price *
                data.quantity;


            const cartItem =
                document.createElement(
                    "div"
                );

            cartItem.className =
                "cart-item";


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
                    >
                        +
                    </button>

                </div>


                <div class="cart-item-total">

                    <span>
                        جمع:
                    </span>

                    <strong>
                        ${formatPrice(rowTotal)}
                    </strong>

                    تومان

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


/* =========================================
   تغییر تعداد
========================================= */

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


/* =========================================
   حذف محصول
========================================= */

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


/* =========================================
   محاسبه جمع کل
========================================= */

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


/* =========================================
   نمایش جمع کل
========================================= */

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


/* =========================================
   خالی کردن کامل سبد
========================================= */

function clearCartPage() {

    if (
        cartPageItems.length === 0
    ) {
        renderCart();
        return;
    }


    const confirmed =
        window.confirm(
            "آیا مطمئن هستید که می‌خواهید سبد خرید خالی شود؟"
        );


    if (!confirmed) {
        return;
    }


    cartPageItems = [];


    localStorage.removeItem(
        "cart"
    );


    if (
        typeof updateCartCounter ===
        "function"
    ) {

        updateCartCounter();

    }


    renderCart();

}


/* =========================================
   سفارش در واتساپ
========================================= */

function checkoutCartPage() {

    cartPageItems =
        getCartPageItems();


    if (
        cartPageItems.length === 0
    ) {

        alert(
            "سبد خرید شما خالی است."
        );

        return;

    }


    let message =
        "سلام، می‌خواهم این محصولات را سفارش بدهم:\n\n";


    let total = 0;


    cartPageItems.forEach(
        function (item, index) {

            const data =
                getCartItemData(item);


            const rowTotal =
                data.price *
                data.quantity;


            total += rowTotal;


            message +=
                (index + 1) +
                ". " +
                data.name +
                "\n";


            message +=
                "تعداد: " +
                data.quantity +
                "\n";


            message +=
                "قیمت واحد: " +
                formatPrice(
                    data.price
                ) +
                " تومان\n";


            message +=
                "جمع: " +
                formatPrice(
                    rowTotal
                ) +
                " تومان\n\n";

        }
    );


    message +=
        "--------------------\n";


    message +=
        "جمع کل: " +
        formatPrice(total) +
        " تومان\n\n";


    message +=
        "لطفاً سفارش من را ثبت کنید.";


    const whatsappURL =
        "https://wa.me/989137380652?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================
   دکمه‌های + و -
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const quantityButton =
            event.target.closest(
                ".qty-btn"
            );


        if (
            quantityButton
        ) {

            const index =
                Number(
                    quantityButton
                        .dataset
                        .index
                );


            const action =
                quantityButton
                    .dataset
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


        /* حذف محصول */

        const removeButton =
            event.target.closest(
                ".remove-cart-item"
            );


        if (
            removeButton
        ) {

            const index =
                Number(
                    removeButton
                        .dataset
                        .index
                );


            removeCartItem(
                index
            );

        }

    }
);


/* =========================================
   دکمه خالی کردن سبد
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const clearButton =
            event.target.closest(
                "#clearCartBtn"
            );


        if (
            !clearButton
        ) {
            return;
        }


        clearCartPage();

    }
);


/* =========================================
   دکمه سفارش واتساپ
========================================= */

document.addEventListener(
    "click",
    function (event) {

        const checkoutButton =
            event.target.closest(
                "#checkoutBtn"
            );


        if (
            !checkoutButton
        ) {
            return;
        }


        checkoutCartPage();

    }
);


/* =========================================
   اجرای اولیه
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCart();

    }
);


