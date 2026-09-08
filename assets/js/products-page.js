"use strict";
/* ========================================== RAYANTAG.IR PRODUCTS PAGE ========================================== */
/* ========================================== ELEMENTS ========================================== */
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");
const noProducts = document.getElementById("noProducts");
/* ========================================== SAFETY CHECK ========================================== */
const allProducts = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
/* ========================================== CREATE PRODUCT CARD ========================================== */
function createCard(product) {
const featuredBadge =
    product.featured === true
        ? `
            <span class="product-badge">
                ویژه
            </span>
          `
        : "";


return `

    <div class="product-card">


        ${featuredBadge}


        <!-- FAVORITE -->

        <button
            class="wishlist"
            type="button"
            aria-label="افزودن به علاقه‌مندی‌ها">

            <i class="fa-regular fa-heart"></i>

        </button>


        <!-- PRODUCT IMAGE -->

        <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy">


        <!-- PRODUCT INFO -->

        <div class="product-info">


            <h3>
                ${product.name}
            </h3>


            <p>
                ${product.description || ""}
            </p>


            <!-- PRICE -->

            <div class="product-price">

                <span class="price">

                    ${product.price} تومان

                </span>

            </div>


            <!-- BUTTON -->

            <a
                href="product.html?id=${product.id}"
                class="btn-product">

                مشاهده محصول

            </a>


        </div>


    </div>

`;
}
/* ========================================== RENDER PRODUCTS ========================================== */
function renderProducts(list) {
if (!productsContainer) return;


/* پاک کردن محصولات قبلی */

productsContainer.innerHTML = "";


/* اگر محصولی پیدا نشد */

if (!list || list.length === 0) {

    if (noProducts) {

        noProducts.style.display = "block";

    } else {

        productsContainer.innerHTML = `

            <div class="empty-products">

                <i class="fa-solid fa-box-open"></i>

                <h3>
                    محصولی پیدا نشد
                </h3>

                <p>
                    لطفاً عبارت یا دسته‌بندی دیگری را انتخاب کنید.
                </p>

            </div>

        `;

    }

    return;

}


/* مخفی کردن پیام عدم وجود محصول */

if (noProducts) {

    noProducts.style.display = "none";

}


/* ساخت کارت محصولات */

list.forEach(product => {

    productsContainer.innerHTML +=
        createCard(product);

});
}

/* ========================================== UPDATE PRODUCTS SEARCH + FILTER + SORT ========================================== */
function updateProducts() {
let filteredProducts = [...allProducts];


/* ==========================================
   SEARCH
   ========================================== */

if (
    searchInput &&
    searchInput.value.trim() !== ""
) {

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    filteredProducts =
        filteredProducts.filter(product => {


            const productName =
                String(product.name || "")
                    .toLowerCase();


            const productDescription =
                String(product.description || "")
                    .toLowerCase();


            const productCategory =
                String(product.category || "")
                    .toLowerCase();


            return (

                productName.includes(keyword) ||

                productDescription.includes(keyword) ||

                productCategory.includes(keyword)

            );

        });

}


/* ==========================================
   CATEGORY FILTER
   ========================================== */

if (
    categoryFilter &&
    categoryFilter.value !== "all"
) {

    filteredProducts =
        filteredProducts.filter(product =>

            String(product.category).trim() ===
            String(categoryFilter.value).trim()

        );

}


/* ==========================================
   SORT PRODUCTS
   ========================================== */

if (sortProducts) {


    switch (sortProducts.value) {


        /* ارزان‌ترین */

        case "cheap":

            filteredProducts.sort((a, b) => {

                const priceA =
                    Number(
                        String(a.price)
                            .replace(/[^\d]/g, "")
                    );


                const priceB =
                    Number(
                        String(b.price)
                            .replace(/[^\d]/g, "")
                    );


                return priceA - priceB;

            });

            break;


        /* گران‌ترین */

        case "expensive":

            filteredProducts.sort((a, b) => {

                const priceA =
                    Number(
                        String(a.price)
                            .replace(/[^\d]/g, "")
                    );


                const priceB =
                    Number(
                        String(b.price)
                            .replace(/[^\d]/g, "")
                    );


                return priceB - priceA;

            });

            break;


        /* جدیدترین */

        case "new":

            filteredProducts.sort((a, b) =>

                Number(b.id) -
                Number(a.id)

            );

            break;


        /* حالت پیش‌فرض */

        default:

            filteredProducts.sort((a, b) =>

                Number(a.id) -
                Number(b.id)

            );

            break;

    }

}


/* ==========================================
   RENDER FINAL PRODUCTS
   ========================================== */

renderProducts(filteredProducts);
}

/* ========================================== EVENTS ========================================== */
/* SEARCH EVENT */
if (searchInput) {
searchInput.addEventListener(

    "input",

    function () {

        updateProducts();

    }

);
}
/* CATEGORY EVENT */
if (categoryFilter) {
categoryFilter.addEventListener(

    "change",

    function () {

        updateProducts();

    }

);
}
/* SORT EVENT */
if (sortProducts) {
sortProducts.addEventListener(

    "change",

    function () {

        updateProducts();

    }

);
}
/* ========================================== GET CATEGORY FROM URL ========================================== */
/* Example:
products.html?category=transparent-case
products.html?category=magsafe-case
products.html?category=full-glass
products.html?category=privacy-glass
products.html?category=lens-protector */
const urlParams = new URLSearchParams( window.location.search );
const selectedCategory = urlParams.get("category");
if ( selectedCategory && categoryFilter ) {
const categoryExists =
    Array.from(
        categoryFilter.options
    ).some(option =>

        option.value === selectedCategory

    );


if (categoryExists) {

    categoryFilter.value =
        selectedCategory;

}
}
/* ========================================== FIRST LOAD ========================================== */
document.addEventListener( "DOMContentLoaded",
function () {

    updateProducts();

}
);