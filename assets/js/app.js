/* ===========================================================
   RAYANTAG.IR
   app.js FINAL
=========================================================== */

"use strict";


/* ======================================
   SHORTCUTS
====================================== */

const $ = (selector) =>
    document.querySelector(selector);


const $$ = (selector) =>
    document.querySelectorAll(selector);


/* ======================================
   DOM READY
====================================== */

document.addEventListener("DOMContentLoaded", () => {

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

});


/* ======================================
   STICKY HEADER
====================================== */

function initHeader() {

    const header =
        $("header");

    if (!header) return;


    const handleHeader = () => {

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    };


    window.addEventListener(
        "scroll",
        handleHeader
    );


    handleHeader();

}


/* ======================================
   MOBILE MENU
====================================== */

function initMobileMenu() {

    const menuBtn =
        $(".menu-btn");

    const mobileMenu =
        $(".mobile-menu");


    if (!menuBtn || !mobileMenu) return;


    menuBtn.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle("active");

            menuBtn.classList.toggle("active");

        }
    );


    /* بستن منو بعد از کلیک روی لینک */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove("active");

                    menuBtn.classList.remove("active");

                }
            );

        });


    /* بستن منو با کلیک بیرون */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !mobileMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                mobileMenu.classList.remove("active");

                menuBtn.classList.remove("active");

            }

        }
    );

}


/* ======================================
   ACTIVE MENU
====================================== */

function initCurrentMenu() {

    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (!currentPage) {

        currentPage = "index.html";

    }


    $$("nav a, .mobile-menu a")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (href === currentPage) {

                link.classList.add("active");

            }

        });

}


/* ======================================
   SMOOTH SCROLL
====================================== */

function initSmoothScroll() {

    $$('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) return;


                    const target =
                        document.querySelector(targetId);


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        });

}

/* ======================================
   BACK TO TOP
====================================== */

function initBackToTop() {

    let btn =
        $(".back-to-top");


    if (!btn) {

        btn =
            document.createElement("button");


        btn.className =
            "back-to-top";


        btn.type =
            "button";


        btn.setAttribute(
            "aria-label",
            "بازگشت به بالا"
        );


        btn.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';


        document.body.appendChild(btn);

    }


    const handleScroll = () => {

        if (window.scrollY > 400) {

            btn.classList.add("show");

        } else {

            btn.classList.remove("show");

        }

    };


    window.addEventListener(
        "scroll",
        handleScroll
    );


    handleScroll();


    btn.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ======================================
   PRODUCT GALLERY
====================================== */

function initProductGallery() {

    const mainImage =
        $("#mainProductImage");


    const thumbs =
        $$(".thumb");


    if (
        !mainImage ||
        thumbs.length === 0
    ) return;


    thumbs.forEach(thumb => {

        thumb.addEventListener(
            "click",
            () => {

                thumbs.forEach(item => {

                    item.classList.remove("active");

                });


                thumb.classList.add("active");


                const imageSource =
                    thumb.dataset.image ||
                    thumb.src;


                mainImage.src =
                    imageSource;


                mainImage.alt =
                    thumb.alt ||
                    "محصول رایان تگ";

            }
        );

    });

}


/* ======================================
   QUANTITY
====================================== */

function initQuantity() {

    const minus =
        $("#minus");


    const plus =
        $("#plus");


    const input =
        $("#quantity");


    if (
        !minus ||
        !plus ||
        !input
    ) return;


    minus.addEventListener(
        "click",
        () => {

            let value =
                parseInt(input.value) || 1;


            if (value > 1) {

                input.value =
                    value - 1;

            }

        }
    );


    plus.addEventListener(
        "click",
        () => {

            let value =
                parseInt(input.value) || 1;


            input.value =
                value + 1;

        }
    );


    input.addEventListener(
        "change",
        () => {

            let value =
                parseInt(input.value);


            if (
                !value ||
                value < 1
            ) {

                input.value = 1;

            }

        }
    );

}


/* ======================================
   WISHLIST
====================================== */

function initWishlist() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".wishlist, .favorite, .product-favorite"
                );


            if (!button) return;


            event.preventDefault();


            button.classList.toggle("active");


            const icon =
                button.querySelector("i");


            if (icon) {

                if (
                    button.classList.contains("active")
                ) {

                    icon.classList.remove(
                        "fa-regular"
                    );


                    icon.classList.add(
                        "fa-solid"
                    );

                } else {

                    icon.classList.remove(
                        "fa-solid"
                    );


                    icon.classList.add(
                        "fa-regular"
                    );

                }

            }


            if (
                button.classList.contains("active")
            ) {

                showToast(
                    "به علاقه‌مندی‌ها اضافه شد"
                );

            } else {

                showToast(
                    "از علاقه‌مندی‌ها حذف شد"
                );

            }

        }
    );

}


/* ======================================
   TOAST MESSAGE
====================================== */

function showToast(message) {

    let toast =
        $("#toast");


    if (!toast) {

        toast =
            document.createElement("div");


        toast.id =
            "toast";


        document.body.appendChild(toast);

    }


    toast.textContent =
        message;


    toast.classList.add(
        "active"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "active"
            );

        }, 2500);

}


/* ======================================
   ADD TO CART
====================================== */

function initCartButton() {

    const button =
        $(".add-cart");


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const productId =
                button.dataset.id;


            if (!productId) {

                showToast(
                    "اطلاعات محصول پیدا نشد"
                );

                return;

            }


            const quantityInput =
                $("#quantity");


            const quantity =
                quantityInput
                    ? parseInt(quantityInput.value) || 1
                    : 1;


            addToCart(
                productId,
                quantity
            );

        }
    );

}


/* ======================================
   ADD PRODUCT TO CART
====================================== */

function addToCart(
    productId,
    quantity = 1
) {

    if (
        typeof PRODUCTS === "undefined"
    ) {

        showToast(
            "اطلاعات محصولات بارگذاری نشد"
        );

        return;

    }


    const product =
        PRODUCTS.find(item =>

            String(item.id) ===
            String(productId)

        );


    if (!product) {

        showToast(
            "محصول موردنظر پیدا نشد"
        );

        return;

    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(item =>

            String(item.id) ===
            String(product.id)

        );


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: quantity

        });

    }


    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    updateCartCounter();


    showToast(
        "محصول به سبد خرید اضافه شد"
    );

}


/* ======================================
   CART COUNTER
====================================== */

function updateCartCounter() {

    const counters =
        $$("#cartCount");


    if (!counters.length) return;


    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let total = 0;


    cart.forEach(item => {

        total +=
            Number(item.quantity) || 0;

    });


    counters.forEach(counter => {

        counter.textContent =
            total;

    });

}


/* ======================================
   GET CART
====================================== */

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


/* ======================================
   SAVE CART
====================================== */

function saveCart(cart) {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    updateCartCounter();

}


/* ======================================
   REMOVE FROM CART
====================================== */

function removeFromCart(productId) {

    let cart =
        getCart();


    cart =
        cart.filter(item =>

            String(item.id) !==
            String(productId)

        );


    saveCart(cart);


    showToast(
        "محصول از سبد خرید حذف شد"
    );

}


/* ======================================
   CLEAR CART
====================================== */

function clearCart() {

    localStorage.removeItem(
        "cart"
    );


    updateCartCounter();

}

/* ======================================
   FEATURED PRODUCTS
====================================== */

function renderFeaturedProducts() {

    const featuredContainer =
        $("#featuredProducts");


    if (!featuredContainer) return;


    if (
        typeof PRODUCTS === "undefined" ||
        !Array.isArray(PRODUCTS)
    ) {

        return;

    }


    /*
       ابتدا محصولاتی که featured هستند
       نمایش داده می‌شوند.
       اگر کمتر از 4 محصول ویژه وجود داشت،
       از سایر محصولات استفاده می‌شود.
    */


    let featuredProducts =
        PRODUCTS.filter(product =>
            product.featured === true
        );


    if (featuredProducts.length === 0) {

        featuredProducts =
            PRODUCTS.slice(0, 4);

    } else {

        featuredProducts =
            featuredProducts.slice(0, 4);

    }


    featuredContainer.innerHTML = "";


    featuredProducts.forEach(product => {


        featuredContainer.innerHTML += `

            <div class="product-card">


                <span class="product-badge">
                    ویژه
                </span>


                <!-- FAVORITE -->

                <button
                    class="wishlist"
                    type="button"
                    aria-label="افزودن به علاقه‌مندی‌ها">

                    <i class="fa-regular fa-heart"></i>

                </button>


                <!-- IMAGE -->

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">


                <!-- INFO -->

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

                            ${formatPrice(product.price)}

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

    });

}


/* ======================================
   REVEAL ANIMATION ON SCROLL
====================================== */

function initRevealAnimation() {

    const elements = $$(
        ".section-header, .product-card, .category-card, .feature-card, .why-card, .contact-card, .about-content, .cta-box, .banner-box"
    );


    if (
        elements.length === 0
    ) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add("show");

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
                            "show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {

                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"

            }

        );


    elements.forEach(element => {

        element.classList.add(
            "reveal"
        );


        observer.observe(
            element
        );

    });

}


/* ======================================
   BUTTON RIPPLE EFFECT
====================================== */

function initRippleButtons() {

    const buttons = $$(
        ".btn, .btn-outline, .btn-product, button"
    );


    buttons.forEach(button => {


        button.addEventListener(
            "click",
            function (event) {


                const ripple =
                    document.createElement("span");


                ripple.className =
                    "ripple";


                const rect =
                    this.getBoundingClientRect();


                ripple.style.left =
                    `${event.clientX - rect.left}px`;


                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                this.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });

}


/* ======================================
   COUNTER ANIMATION
====================================== */

function initCounters() {

    const counters =
        $$(".counter-box h2");


    if (
        counters.length === 0
    ) return;


    counters.forEach(counter => {


        const originalText =
            counter.innerText;


        const number =
            parseInt(
                originalText.replace(/\D/g, "")
            );


        if (!number) return;


        let current = 0;


        const step =
            Math.max(
                1,
                Math.ceil(number / 60)
            );


        const suffix =
            originalText.replace(
                /[\d۰-۹]/g,
                ""
            );


        const timer =
            setInterval(() => {


                current += step;


                if (
                    current >= number
                ) {

                    current = number;


                    clearInterval(
                        timer
                    );

                }


                counter.innerText =
                    current.toLocaleString("fa-IR") +
                    suffix;


            }, 30);

    });

}


/* ======================================
   FORMAT PRICE
====================================== */

function formatPrice(price) {

    const numericPrice =
        Number(
            String(price || "")
                .replace(/[^\d]/g, "")
        );


    if (!numericPrice) {

        return "تماس بگیرید";

    }


    return (
        numericPrice.toLocaleString("fa-IR") +
        " تومان"
    );

}


/* ======================================
   DEBOUNCE HELPER
====================================== */

function debounce(
    func,
    delay = 300
) {

    let timer;


    return (...args) => {


        clearTimeout(
            timer
        );


        timer =
            setTimeout(() => {

                func(...args);

            }, delay);

    };

}


/* ======================================
   PAGE LOADING COMPLETE
====================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* ======================================
   PREVENT BROKEN IMAGE DISPLAY
====================================== */

document.addEventListener(
    "error",
    event => {

        const image =
            event.target;


        if (
            image.tagName === "IMG"
        ) {

            image.style.opacity = "0";


            image.setAttribute(
                "alt",
                "تصویر محصول در دسترس نیست"
            );

        }

    },

    true
);


/* ======================================
   EXTERNAL LINKS SAFETY
====================================== */

function initExternalLinks() {

    $$('a[target="_blank"]')
        .forEach(link => {

            if (
                !link.hasAttribute("rel")
            ) {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        });

}


/* ======================================
   FINAL SITE INITIALIZATION
====================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initExternalLinks();

    }
);