/* =========================================================== RAYANTAG.IR product.js FINAL =========================================================== */
"use strict";
/* ====================================== GET PRODUCT ID FROM URL ====================================== */
const params = new URLSearchParams( window.location.search );
const productId = params.get("id");
/* ====================================== PRODUCTS SAFETY CHECK ====================================== */
const productsList = typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS) ? PRODUCTS : [];
/* ====================================== FIND PRODUCT ====================================== */
const product = productsList.find(item =>
    String(item.id) ===
    String(productId)

);
/* ====================================== PRODUCT NOT FOUND ====================================== */
if (!product) {
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const productPage =
            $(".product-page");


        if (productPage) {

            productPage.innerHTML = `

                <div class="container">

                    <div class="empty-product">

                        <i class="fa-solid fa-box-open"></i>

                        <h2>
                            محصول موردنظر پیدا نشد
                        </h2>

                        <p>
                            ممکن است محصول حذف شده باشد یا آدرس آن اشتباه باشد.
                        </p>

                        <a
                            href="products.html"
                            class="btn">

                            مشاهده محصولات

                        </a>

                    </div>

                </div>

            `;

        }

    }
);
} else {
/* ======================================
   PAGE TITLE
====================================== */

document.title =
    product.name +
    " | رایان تگ";


/* ======================================
   META DESCRIPTION
====================================== */

const metaDescription =
    document.querySelector(
        'meta[name="description"]'
    );


if (metaDescription) {

    metaDescription.setAttribute(

        "content",

        product.description ||
        `${product.name} | فروشگاه رایان تگ`

    );

}


/* ======================================
   DOM ELEMENTS
====================================== */

const productTitle =
    $("#productTitle");


const productCategory =
    $("#productCategory");


const mainProductImage =
    $("#mainProductImage");


const productPrice =
    $("#productPrice");


const productDescription =
    $("#productDescription");


const breadcrumbProduct =
    $("#breadcrumbProduct");


const addToCartButton =
    $("#addToCartButton");


const saleBadge =
    $("#saleBadge");


/* ====================================== DISPLAY PRODUCT INFORMATION ====================================== */
if (productTitle) {

    productTitle.textContent =
        product.name || "محصول رایان تگ";

}


if (productCategory) {

    productCategory.textContent =
        product.category || "رایان تگ";

}


if (mainProductImage) {

    mainProductImage.src =
        product.image || "";


    mainProductImage.alt =
        product.name || "محصول رایان تگ";

}


if (productPrice) {

    if (
        typeof formatPrice === "function"
    ) {

        productPrice.textContent =
            formatPrice(product.price);

    } else {

        const numericPrice =
            Number(
                String(product.price || "")
                    .replace(/[^\d]/g, "")
            );


        productPrice.textContent =
            numericPrice
                ? numericPrice.toLocaleString("fa-IR") +
                  " تومان"
                : "تماس بگیرید";

    }

}


if (productDescription) {

    productDescription.textContent =
        product.description ||
        "اطلاعات این محصول به‌زودی تکمیل می‌شود.";

}


if (breadcrumbProduct) {

    breadcrumbProduct.textContent =
        product.name || "محصول";

}


/* ======================================
   FEATURED BADGE
====================================== */

if (saleBadge) {

    if (
        product.featured === true
    ) {

        saleBadge.style.display =
            "inline-flex";

    } else {

        saleBadge.style.display =
            "none";

    }

}


/* ======================================
   ADD PRODUCT ID TO CART BUTTON
====================================== */

if (addToCartButton) {

    addToCartButton.dataset.id =
        product.id;

}


/* ======================================
   UPDATE CATEGORY LINK IF EXISTS
====================================== */

const categoryLinks =
    document.querySelectorAll(
        "[data-product-category]"
    );


categoryLinks.forEach(link => {

    link.dataset.productCategory =
        product.category || "";

});


/* ======================================
   PRODUCT STOCK STATUS
====================================== */

const stockStatus =
    $("#stockStatus");


if (stockStatus) {

    const isAvailable =
        product.stock !== false;


    if (isAvailable) {

        stockStatus.classList.remove(
            "out-of-stock"
        );


        stockStatus.classList.add(
            "in-stock"
        );


        stockStatus.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>

            موجود در انبار

        `;

    } else {

        stockStatus.classList.remove(
            "in-stock"
        );


        stockStatus.classList.add(
            "out-of-stock"
        );


        stockStatus.innerHTML = `

            <i class="fa-solid fa-circle-xmark"></i>

            ناموجود

        `;


        if (addToCartButton) {

            addToCartButton.disabled =
                true;


            addToCartButton.innerHTML = `

                <i class="fa-solid fa-ban"></i>

                محصول ناموجود است

            `;

        }

    }

}


/* ====================================== RELATED PRODUCTS ====================================== */
const relatedContainer =
    $("#relatedProducts");


if (relatedContainer) {

    let relatedProducts =
        productsList.filter(item =>

            String(item.category || "").trim() ===
            String(product.category || "").trim() &&

            String(item.id) !==
            String(product.id)

        );


    relatedProducts =
        relatedProducts.slice(0, 4);


    relatedContainer.innerHTML = "";


    if (relatedProducts.length === 0) {

        relatedContainer.innerHTML = `

            <div class="empty-products">

                <i class="fa-solid fa-box-open"></i>

                <p>
                    محصول مرتبطی پیدا نشد.
                </p>

            </div>

        `;

    } else {


        relatedProducts.forEach(item => {

            const price =
                typeof formatPrice === "function"
                    ? formatPrice(item.price)
                    : `${item.price || ""} تومان`;


            relatedContainer.innerHTML += `

                <div class="product-card">


                    ${
                        item.featured === true
                            ? `
                                <span class="product-badge">
                                    ویژه
                                </span>
                              `
                            : ""
                    }


                    <button
                        class="wishlist"
                        type="button"
                        aria-label="افزودن به علاقه‌مندی">

                        <i class="fa-regular fa-heart"></i>

                    </button>


                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        loading="lazy">


                    <div class="product-info">


                        <h3>
                            ${item.name}
                        </h3>


                        <p>
                            ${item.description || ""}
                        </p>


                        <div class="product-price">

                            <span class="price">
                                ${price}
                            </span>

                        </div>


                        <a
                            href="product.html?id=${item.id}"
                            class="btn-product">

                            مشاهده محصول

                        </a>


                    </div>


                </div>

            `;

        });

    }

}


/* ======================================
   PRODUCT PAGE INITIALIZATION
====================================== */

if (typeof updateCartCounter === "function") {

    updateCartCounter();

}

// =============================== // Rayantag Product Page - Part 4 // ===============================
// نمایش مشخصات محصول const specsContainer = document.getElementById("productSpecs");
if (specsContainer && product.specs) { specsContainer.innerHTML = Object.entries(product.specs) .map(([key, value]) => <div class="spec-row"> <span class="spec-key">${key}</span> <span class="spec-value">${value}</span> </div>) .join(""); }
// تنظیم متادیتای محصول const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription && product.description) { metaDescription.setAttribute( "content", product.description ); }
// Open Graph const ogTitle = document.querySelector('meta[property="og:title"]'); const ogDescription = document.querySelector('meta[property="og:description"]'); const ogImage = document.querySelector('meta[property="og:image"]');
if (ogTitle) { ogTitle.setAttribute( "content", ${product.name} | رایان تگ ); }
if (ogDescription) { ogDescription.setAttribute( "content", product.description || product.name ); }
if (ogImage && product.image) { ogImage.setAttribute( "content", product.image ); }
// =============================== // Cart Modal // ===============================
const cartModal = document.getElementById("cartModal"); const closeCartModal = document.getElementById("closeCartModal"); const continueShopping = document.getElementById("continueShopping");
function showCartModal() { if (!cartModal) return;
const modalProductName =
    document.getElementById("modalProductName");

if (modalProductName) {
    modalProductName.textContent = product.name;
}

cartModal.classList.add("active");
document.body.classList.add("modal-open");
}
function hideCartModal() { if (!cartModal) return;
cartModal.classList.remove("active");
document.body.classList.remove("modal-open");
}
// بعد از اضافه شدن محصول توسط app.js const addButton = document.getElementById("addToCartButton");
if (addButton) { addButton.addEventListener("click", () => { setTimeout(() => { showCartModal(); }, 100); }); }
// بستن Modal if (closeCartModal) { closeCartModal.addEventListener( "click", hideCartModal ); }
if (continueShopping) { continueShopping.addEventListener( "click", hideCartModal ); }
// کلیک بیرون از Modal if (cartModal) { cartModal.addEventListener("click", (event) => { if (event.target === cartModal) { hideCartModal(); } }); }
// بستن با کلید Escape document.addEventListener("keydown", (event) => { if (event.key === "Escape") { hideCartModal(); } });
// =============================== // پایان Product Page // ===============================
}


