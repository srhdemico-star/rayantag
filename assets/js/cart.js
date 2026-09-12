"use strict";

let cartPageItems =
    JSON.parse(localStorage.getItem("cart")) || [];


function getCartPageItems() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


function saveCartPage() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cartPageItems)
    );

    if (
        typeof updateCartCounter ===
        "function"
    ) {
        updateCartCounter();
    }

}


function renderCartPage() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");


    if (!container) return;


    cartPageItems =
        getCartPageItems();


    if (cartPageItems.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>
                    سبد خرید شما خالی است
                </h2>

                <p>
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                </p>

                <a
                    href="products.html"
                    class="btn"
                >
                    مشاهده محصولات
                </a>

            </div>

        `;


        if (totalElement) {

            totalElement.textContent =
                "0 تومان";

        }

        return;

    }


    let total = 0;


    container.innerHTML = "";


    cartPageItems.forEach(
        function (item, index) {


            const price =
                Number(
                    String(
                        item.price || ""
                    ).replace(
                        /[^\d]/g,
                        ""
                    )
                ) || 0;


            const quantity =
                Number(
                    item.quantity
                ) || 1;


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


                        <p class="cart-row-total">

                            جمع این محصول:

                            ${rowTotal.toLocaleString("fa-IR")}

                            تومان

                        </p>

                    </div>


                    <div class="cart-actions">


                        <button
                            type="button"
                            class="qty-btn"
                            data-action="minus"
                            data-index="${index}"
                        >
                            −
                        </button>


                        <span class="qty-number">
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            class="qty-btn"
                            data-action="plus"
                            data-index="${index}"
                        >
                            +
                        </button>


                        <button
                            type="button"
                            class="remove-btn"
                            data-action="remove"
                            data-index="${index}"
                        >
                            🗑 حذف
                        </button>


                    </div>

                </div>

            `;

        }
    );


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString("fa-IR") +
            " تومان";

    }

}


function changeCartQuantity(
    index,
    amount
) {

    if (!cartPageItems[index]) {
        return;
    }


    let quantity =
        Number(
            cartPageItems[index].quantity
        ) || 1;


    quantity += amount;


    if (quantity <= 0) {

        cartPageItems.splice(
            index,
            1
        );

    } else {

        cartPageItems[index].quantity =
            quantity;

    }


    saveCartPage();

    renderCartPage();

}


function removeCartItem(index) {

    if (!cartPageItems[index]) {
        return;
    }


    cartPageItems.splice(
        index,
        1
    );


    saveCartPage();

    renderCartPage();


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "محصول از سبد خرید حذف شد"
        );

    }

}


function clearCartPage() {

    if (
        cartPageItems.length === 0
    ) {
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


    renderCartPage();


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "سبد خرید خالی شد"
        );

    }

}


function checkoutCartPage() {

    cartPageItems =
        getCartPageItems();


    if (
        cartPageItems.length === 0
    ) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "سبد خرید خالی است"
            );

        }

        return;

    }


    let message =
        "سلام، می‌خواهم این محصولات را سفارش بدهم:\n\n";


    let total = 0;


    cartPageItems.forEach(
        function (item) {

            const price =
                Number(
                    String(
                        item.price || ""
                    ).replace(
                        /[^\d]/g,
                        ""
                    )
                ) || 0;


            const quantity =
                Number(
                    item.quantity
                ) || 1;


            total +=
                price * quantity;


            message +=
                "• " +
                item.name +
                " × " +
                quantity +
                "\n";


            message +=
                price.toLocaleString(
                    "fa-IR"
                ) +
                " تومان\n\n";

        }
    );


    message +=
        "جمع کل: " +
        total.toLocaleString(
            "fa-IR"
        ) +
        " تومان";


    const whatsapp =
        "https://wa.me/989137380652?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsapp,
        "_blank"
    );

}


document.addEventListener(
    "click",
    function (event) {


        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.dataset.action;


        const index =
            Number(
                button.dataset.index
            );


        if (action === "plus") {

            changeCartQuantity(
                index,
                1
            );

        }


        if (action === "minus") {

            changeCartQuantity(
                index,
                -1
            );

        }


        if (action === "remove") {

            removeCartItem(
                index
            );

        }

    }
);


document.addEventListener(
    "DOMContentLoaded",
    function () {


        renderCartPage();


        const clearButton =
            document.getElementById(
                "clearCartBtn"
            );


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearCartPage
            );

        }


        const checkoutButton =
            document.getElementById(
                "checkoutBtn"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkoutCartPage
            );

        }

    }
);
