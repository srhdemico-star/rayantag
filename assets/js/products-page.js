"use strict";

/* ==========================================
   RAYANTAG.IR
   PRODUCTS PAGE
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

let productsContainer;
let searchInput;
let categoryFilter;
let sortProducts;
let noProducts;


/* ==========================================
   PRODUCTS DATA
========================================== */

const allProducts =
    typeof PRODUCTS !== "undefined" &&
    Array.isArray(PRODUCTS)
        ? PRODUCTS
        : [];


/* ==========================================
   INITIALIZE ELEMENTS
========================================== */

function initProductsPage() {

    productsContainer =
        document.getElementById("productsContainer");

    searchInput =
        document.getElementById("searchInput");

    categoryFilter =
        document.getElementById("categoryFilter");

    sortProducts =
        document.getElementById("sortProducts");

    noProducts =
        document.getElementById("noProducts");

}


/* ==========================================
   PRICE TO NUMBER
========================================== */

function getProductPrice(product) {

    return Number(
        String(product?.price || "")
            .replace(/[^\d]/g, "")
    ) || 0;

}


/* ==========================================
   CREATE PRODUCT CARD
========================================== */

function createCard(product) {

    if (!product) {
        return "";
    }


    const featuredBadge =
        product.featured === true
            ? `
                <span class="product-badge">
                    ویژه
                </span>
              `
            : "";


    return `

        <article class="product-card">

            ${featuredBadge}


            <!-- FAVORITE -->

            <button
                class="wishlist"
                type="button"
                aria-label="افزودن به علاقه‌مندی‌ها"
                data-id="${product.id}"
            >

                <i class="fa-regular fa-heart"></i>

            </button>


            <!-- PRODUCT IMAGE -->

            <a
                href="product.html?id=${product.id}"
                aria-label="مشاهده ${product.name}"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </a>


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
                    class="btn-product"
                >
                    مشاهده محصول
                </a>


            </div>

        </article>

    `;

}


/* ==========================================
   RENDER PRODUCTS
========================================== */

function renderProducts(list) {

    if (!productsContainer) {
        return;
    }


    productsContainer.innerHTML = "";


    /* NO PRODUCTS */

    if (!Array.isArray(list) || list.length === 0) {

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


    /* HIDE NO PRODUCTS */

    if (noProducts) {

        noProducts.style.display = "none";

    }


    /* CREATE CARDS */

    const cards =
        list.map(product =>
            createCard(product)
        ).join("");


    productsContainer.innerHTML = cards;

}


/* ==========================================
   SEARCH
========================================== */

function filterBySearch(list) {

    if (
        !searchInput ||
        searchInput.value.trim() === ""
    ) {

        return list;

    }


    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    return list.filter(product => {

        const name =
            String(product.name || "")
                .toLowerCase();


        const description =
            String(product.description || "")
                .toLowerCase();


        const category =
            String(product.category || "")
                .toLowerCase();


        return (
            name.includes(keyword) ||
            description.includes(keyword) ||
            category.includes(keyword)
        );

    });

}


/* ==========================================
   CATEGORY FILTER
========================================== */

function filterByCategory(list) {

    if (
        !categoryFilter ||
        categoryFilter.value === "all"
    ) {

        return list;

    }


    const selectedCategory =
        String(categoryFilter.value)
            .trim();


    return list.filter(product => {

        return (
            String(product.category || "")
                .trim() === selectedCategory
        );

    });

}


/* ==========================================
   SORT PRODUCTS
========================================== */

function sortProductList(list) {

    if (!sortProducts) {
        return list;
    }


    switch (sortProducts.value) {


        /* ==================================
           CHEAPEST
        ================================== */

        case "cheap":

            return list.sort((a, b) => {

                return (
                    getProductPrice(a) -
                    getProductPrice(b)
                );

            });


        /* ==================================
           MOST EXPENSIVE
        ================================== */

        case "expensive":

            return list.sort((a, b) => {

                return (
                    getProductPrice(b) -
                    getProductPrice(a)
                );

            });


        /* ==================================
           NEWEST
        ================================== */

        case "new":

            return list.sort((a, b) => {

                return (
                    Number(b.id || 0) -
                    Number(a.id || 0)
                );

            });


        /* ==================================
           DEFAULT
        ================================== */

        default:

            return list.sort((a, b) => {

                return (
                    Number(a.id || 0) -
                    Number(b.id || 0)
                );

            });

    }

}


/* ==========================================
   GET CATEGORY FROM URL
========================================== */

function applyCategoryFromURL() {

    if (!categoryFilter) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const selectedCategory =
        params.get("category");


    if (!selectedCategory) {
        return;
    }


    const categoryExists =
        Array.from(
            categoryFilter.options
        ).some(option => {

            return (
                option.value ===
                selectedCategory
            );

        });


    if (categoryExists) {

        categoryFilter.value =
            selectedCategory;

    }

}


/* ==========================================
   UPDATE PRODUCTS
========================================== */

function updateProducts() {

    if (!productsContainer) {
        return;
    }


    let filteredProducts =
        [...allProducts];


    /* SEARCH */

    filteredProducts =
        filterBySearch(
            filteredProducts
        );


    /* CATEGORY */

    filteredProducts =
        filterByCategory(
            filteredProducts
        );


    /* SORT */

    filteredProducts =
        sortProductList(
            filteredProducts
        );


    /* RENDER */

    renderProducts(
        filteredProducts
    );

}


/* ==========================================
   EVENTS
========================================== */

function initProductEvents() {


    /* SEARCH */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            updateProducts
        );

    }


    /* CATEGORY */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            updateProducts
        );

    }


    /* SORT */

    if (sortProducts) {

        sortProducts.addEventListener(
            "change",
            updateProducts
        );

    }

}


/* ==========================================
   START
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initProductsPage();

        applyCategoryFromURL();

        initProductEvents();

        updateProducts();

    }
);
