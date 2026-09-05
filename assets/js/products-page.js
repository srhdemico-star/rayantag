"use strict";

/* ==========================================
   SabzAbi Store
   products-page.js FINAL
========================================== */

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");

function createCard(product) {

    return `
    <div class="product-card">

        <span class="product-badge">ویژه</span>

        <button class="wishlist">❤</button>

        <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy">

        <div class="product-info">

            <div class="rating">
                ★★★★★
            </div>

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <div class="price">

                <span class="price-title">

                    شروع از

                </span>

                <span>

                    ${product.price} تومان

                </span>

            </div>

            <a href="product.html?id=${product.id}" class="btn-product">

                مشاهده محصول

            </a>

        </div>

    </div>
    `;
}

function renderProducts(list) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (list.length === 0) {

        productsContainer.innerHTML = `

        <div class="empty-products">

            محصولی پیدا نشد.

        </div>

        `;

        return;

    }

    list.forEach(product => {

        productsContainer.innerHTML += createCard(product);

    });

}

/* ==========================================
   FILTER + SEARCH + SORT
========================================== */

function updateProducts() {

    let filtered = [...PRODUCTS];

    /* ---------- Search ---------- */

    if (searchInput && searchInput.value.trim() !== "") {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        filtered = filtered.filter(product =>

            product.name
                .toLowerCase()
                .includes(keyword)

        );

    }

    /* ---------- Category ---------- */

    if (
        categoryFilter &&
        categoryFilter.value !== "all"
    ) {

        filtered = filtered.filter(product =>

            String(product.category).trim() ===
            String(categoryFilter.value).trim()

        );

    }

    /* ---------- Sort ---------- */

    if (sortProducts) {

        switch (sortProducts.value) {

            case "cheap":

                filtered.sort((a, b) =>

                    parseInt(
                        String(a.price).replace(/,/g, "")
                    )

                    -

                    parseInt(
                        String(b.price).replace(/,/g, "")
                    )

                );

                break;

            case "expensive":

                filtered.sort((a, b) =>

                    parseInt(
                        String(b.price).replace(/,/g, "")
                    )

                    -

                    parseInt(
                        String(a.price).replace(/,/g, "")
                    )

                );

                break;

            case "new":

                filtered.sort((a, b) =>

                    Number(b.id) - Number(a.id)

                );

                break;

        }

    }

    renderProducts(filtered);

}

/* ==========================================
   EVENTS
========================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        updateProducts
    );

}

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        updateProducts
    );

}

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        updateProducts
    );

}

/* ==========================================
   FIRST LOAD
========================================== */

/* ==========================================
   FIRST LOAD
========================================== */

const params = new URLSearchParams(window.location.search);

const selectedCategory = params.get("category");

if (selectedCategory && categoryFilter) {

    categoryFilter.value = selectedCategory;

}

updateProducts();


