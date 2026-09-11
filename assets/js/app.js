/* ==========================================
   RAYANTAG.IR
   APP.JS
========================================== */

(function () {
    "use strict";

    /* ==========================================
       HELPERS
    ========================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* ==========================================
       PRODUCTS SAFE ACCESS
    ========================================== */

    const getProducts = () => {
        return (
            typeof PRODUCTS !== "undefined" &&
            Array.isArray(PRODUCTS)
        )
            ? PRODUCTS
            : [];
    };


    /* ==========================================
       HEADER
    ========================================== */

    function initHeader() {

        const header = $(".header");

        if (!header) return;

        const handleScroll = () => {

            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );
    }


    /* ==========================================
       MOBILE MENU
    ========================================== */

    function initMobileMenu() {

        const menuButton = $(".menu-btn");
        const mobileMenu = $(".mobile-menu");

        if (!menuButton || !mobileMenu) return;

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");
            menuButton.classList.toggle("active");

            const expanded =
                mobileMenu.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                expanded ? "true" : "false"
            );
        });

        $$(".mobile-menu a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


    /* ==========================================
       BACK TO TOP
    ========================================== */

    function initBackToTop() {

        const button = $("#backToTop");

        if (!button) return;

        const update = () => {

            if (window.scrollY > 500) {
                button.classList.add("show");
            } else {
                button.classList.remove("show");
            }
        };

        update();

        window.addEventListener(
            "scroll",
            update,
            { passive: true }
        );

        button.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    function initSmoothScroll() {

        $$('a[href^="#"]').forEach(link => {

            link.addEventListener("click", event => {

                const href = link.getAttribute("href");

                if (
                    !href ||
                    href === "#" ||
                    href.length < 2
                ) {
                    return;
                }

                const target = $(href);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }


    /* ==========================================
       CURRENT MENU
    ========================================== */

    function initCurrentMenu() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() || "index.html";

        $$(".header nav a").forEach(link => {

            const href = link.getAttribute("href");

            if (!href) return;

            const linkPage =
                href.split("?")[0]
                    .split("#")[0]
                    .split("/")
                    .pop();

            if (
                linkPage === currentPage &&
                !href.startsWith("#")
            ) {
                link.classList.add("active");
            }
        });
    }


    /* ==========================================
       PRODUCT GALLERY
    ========================================== */

    function initProductGallery() {

        const mainImage = $("#productImage");

        if (!mainImage) return;

        $$(".product-thumbnail").forEach(thumbnail => {

            thumbnail.addEventListener("click", () => {

                const image =
                    thumbnail.getAttribute("data-image") ||
                    thumbnail.getAttribute("src");

                if (!image) return;

                mainImage.src = image;

                $$(".product-thumbnail").forEach(item => {
                    item.classList.remove("active");
                });

                thumbnail.classList.add("active");
            });
        });
    }


    /* ==========================================
       QUANTITY
    ========================================== */

    function initQuantity() {

        const minus = $("#minus");
        const plus = $("#plus");
        const quantity = $("#quantity");

        if (!minus || !plus || !quantity) return;

        const normalize = () => {

            let value =
                parseInt(quantity.value, 10);

            if (!Number.isFinite(value)) {
                value = 1;
            }

            value = Math.max(1, Math.min(99, value));

            quantity.value = value;

            return value;
        };

        minus.addEventListener("click", () => {

            const value = normalize();

            quantity.value = Math.max(
                1,
                value - 1
            );
        });

        plus.addEventListener("click", () => {

            const value = normalize();

            quantity.value = Math.min(
                99,
                value + 1
            );
        });

        quantity.addEventListener("input", normalize);
        quantity.addEventListener("change", normalize);
    }


    /* ==========================================
       WISHLIST
    ========================================== */

    function initWishlist() {

        const buttons = $$(".wishlist");

        if (!buttons.length) return;

        let wishlist = [];

        try {
            wishlist =
                JSON.parse(
                    localStorage.getItem("wishlist")
                ) || [];
        } catch {
            wishlist = [];
        }

        if (!Array.isArray(wishlist)) {
            wishlist = [];
        }

        buttons.forEach(button => {

            const id =
                String(button.dataset.id || "");

            if (!id) return;

            if (wishlist.includes(id)) {
                button.classList.add("active");
            }

            button.addEventListener("click", event => {

                event.preventDefault();
                event.stopPropagation();

                const index =
                    wishlist.indexOf(id);

                if (index === -1) {

                    wishlist.push(id);
                    button.classList.add("active");

                    showToast(
                        "محصول به علاقه‌مندی‌ها اضافه شد."
                    );

                } else {

                    wishlist.splice(index, 1);
                    button.classList.remove("active");

                    showToast(
                        "محصول از علاقه‌مندی‌ها حذف شد."
                    );
                }

                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(wishlist)
                );
            });
        });
    }


    /* ==========================================
       CART STORAGE
    ========================================== */

    function getCart() {

        try {

            const cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

            return Array.isArray(cart)
                ? cart
                : [];

        } catch {

            return [];
        }
    }


    function saveCart(cart) {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }


    /* ==========================================
       ADD TO CART
    ========================================== */

    window.addToCart = function (
        productId,
        quantity = 1
    ) {

        const products = getProducts();

        const id = Number(productId);

        const product =
            products.find(
                item => Number(item.id) === id
            );

        if (!product) {

            showToast(
                "محصول پیدا نشد."
            );

            return false;
        }

        let qty =
            parseInt(quantity, 10);

        if (!Number.isFinite(qty)) {
            qty = 1;
        }

        qty = Math.max(
            1,
            Math.min(99, qty)
        );

        const cart = getCart();

        const existing =
            cart.find(
                item => Number(item.id) === id
            );

        if (existing) {

            existing.quantity =
                Math.min(
                    99,
                    Number(existing.quantity || 0) + qty
                );

        } else {

            cart.push({
                id: id,
                quantity: qty
            });
        }

        saveCart(cart);

        updateCartCounter();

        pulseCartCounter();

        showToast(
            "محصول به سبد خرید اضافه شد."
        );

        return true;
    };


    /* ==========================================
       CART BUTTON
    ========================================== */

    function initCartButton() {

        $$(".add-cart").forEach(button => {

            button.addEventListener("click", event => {

                event.preventDefault();

                const productId =
                    button.dataset.id;

                if (!productId) return;

                let quantity = 1;

                const quantityInput =
                    $("#quantity");

                if (quantityInput) {

                    const value =
                        parseInt(
                            quantityInput.value,
                            10
                        );

                    if (
                        Number.isFinite(value) &&
                        value > 0
                    ) {
                        quantity = value;
                    }
                }

                window.addToCart(
                    productId,
                    quantity
                );
            });
        });
    }


    /* ==========================================
       CART COUNTER
    ========================================== */

    function updateCartCounter() {

        const cart = getCart();

        const count =
            cart.reduce(
                (total, item) =>
                    total +
                    Math.max(
                        0,
                        Number(item.quantity) || 0
                    ),
                0
            );

        $$("#cartCount").forEach(counter => {
            counter.textContent = count;
        });
    }


    function pulseCartCounter() {

        $$("#cartCount").forEach(counter => {

            counter.classList.remove(
                "cart-count-pulse"
            );

            void counter.offsetWidth;

            counter.classList.add(
                "cart-count-pulse"
            );
        });
    }


    /* ==========================================
       FEATURED PRODUCTS
    ========================================== */

    function renderFeaturedProducts() {

        const container =
            $("#featuredProducts");

        if (!container) return;

        const products = getProducts();

        if (!products.length) {

            container.innerHTML = "";

            return;
        }

        const featured =
            products.slice(0, 4);

        container.innerHTML =
            featured.map(product => {

                const price =
                    Number(
                        String(product.price || "")
                            .replace(/[^\d]/g, "")
                    ) || 0;

                const formattedPrice =
                    price.toLocaleString("fa-IR");

                const image =
                    product.image ||
                    "assets/products/transparent-case.webp";

                const title =
                    product.name ||
                    "محصول رایان تگ";

                const description =
                    product.description ||
                    "";

                return `
                    <article class="product-card">

                        <a
                            href="product.html?id=${encodeURIComponent(product.id)}"
                            aria-label="${escapeHTML(title)}"
                        >
                            <img
                                src="${escapeHTML(image)}"
                                alt="${escapeHTML(title)}"
                                loading="lazy"
                            >
                        </a>

                        <button
                            type="button"
                            class="wishlist"
                            data-id="${product.id}"
                            aria-label="افزودن به علاقه‌مندی"
                        >
                            ♡
                        </button>

                        <div class="product-info">

                            <h3>
                                ${escapeHTML(title)}
                            </h3>

                            <p>
                                ${escapeHTML(description)}
                            </p>

                            <div class="product-price">
                                ${formattedPrice}
                                <span>تومان</span>
                            </div>

                            <a
                                href="product.html?id=${encodeURIComponent(product.id)}"
                                class="btn-product"
                            >
                                مشاهده محصول
                            </a>

                        </div>

                    </article>
                `;

            }).join("");

        initWishlist();
    }


    /* ==========================================
       REVEAL ANIMATION
    ========================================== */

    function initRevealAnimation() {

        const elements =
            $$(".reveal");

        if (!elements.length) return;

        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(element => {
                element.classList.add("active");
            });

            return;
        }

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12
                }
            );

        elements.forEach(element => {
            observer.observe(element);
        });
    }


    /* ==========================================
       RIPPLE BUTTONS
    ========================================== */

    function initRippleButtons() {

        $$(".btn, .btn-outline, .btn-product").forEach(button => {

            button.addEventListener(
                "click",
                function (event) {

                    const rect =
                        this.getBoundingClientRect();

                    const ripple =
                        document.createElement("span");

                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );

                    ripple.style.position = "absolute";
                    ripple.style.width = `${size}px`;
                    ripple.style.height = `${size}px`;
                    ripple.style.left =
                        `${event.clientX - rect.left - size / 2}px`;
                    ripple.style.top =
                        `${event.clientY - rect.top - size / 2}px`;
                    ripple.style.borderRadius = "50%";
                    ripple.style.background =
                        "rgba(255,255,255,.25)";
                    ripple.style.pointerEvents = "none";
                    ripple.style.transform = "scale(0)";
                    ripple.style.transition =
                        "transform .5s ease, opacity .5s ease";
                    ripple.style.opacity = "1";

                    this.appendChild(ripple);

                    requestAnimationFrame(() => {

                        ripple.style.transform =
                            "scale(1)";
                        ripple.style.opacity = "0";
                    });

                    setTimeout(() => {
                        ripple.remove();
                    }, 550);
                }
            );
        });
    }


    /* ==========================================
       COUNTERS
    ========================================== */

    function initCounters() {

        const counters =
            $$(".counter");

        if (!counters.length) return;

        if (
            !("IntersectionObserver" in window)
        ) {
            counters.forEach(counter => {
                counter.textContent =
                    counter.dataset.target || "0";
            });
            return;
        }

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.target
                            ) || 0;

                        let current = 0;

                        const duration = 1200;
                        const start =
                            performance.now();

                        function animate(time) {

                            const progress =
                                Math.min(
                                    (time - start) /
                                        duration,
                                    1
                                );

                            current =
                                Math.floor(
                                    progress * target
                                );

                            counter.textContent =
                                current.toLocaleString(
                                    "fa-IR"
                                );

                            if (
                                progress < 1
                            ) {
                                requestAnimationFrame(
                                    animate
                                );
                            }
                        }

                        requestAnimationFrame(
                            animate
                        );

                        observer.unobserve(counter);
                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }


    /* ==========================================
       TOAST
    ========================================== */

    let toastTimer = null;

    function showToast(message) {

        let toast = $(".toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 2500);
    }

    window.showToast = showToast;


    /* ==========================================
       HTML ESCAPE
    ========================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* ==========================================
       INITIALIZE
    ========================================== */

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            initHeader();
            initMobileMenu();
            initBackToTop();
            initSmoothScroll();
            initCurrentMenu();

            initProductGallery();
            initQuantity();

            initWishlist();
            initCartButton();

            initRevealAnimation();
            initRippleButtons();
            initCounters();

            updateCartCounter();
            renderFeaturedProducts();
        }
    );


})();
