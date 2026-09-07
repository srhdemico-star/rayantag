const PRODUCTS = [
{
    id: 1,
    category: "transparent-case",
    name: "قاب شفاف ضدضربه آیفون",
    image: "assets/products/transparent-case.webp",
    price: "390,000",
    brand: "RayanTag",
    featured: true,

    description: "قاب شفاف با طراحی ساده، مقاوم و مناسب استفاده روزمره.",

    specs: {
        type: "قاب شفاف",
        material: "TPU + PC",
        feature: "ضد ضربه",
        magsafe: "ندارد"
    }
},

{
    id: 2,
    category: "magsafe-case",
    name: "قاب مگ‌سیف شفاف آیفون",
    image: "assets/products/magsafe-case.webp",
    price: "590,000",
    brand: "RayanTag",
    featured: true,

    description: "قاب شفاف مجهز به حلقه مگ‌سیف برای شارژ و استفاده از لوازم جانبی سازگار.",

    specs: {
        type: "قاب مگ‌سیف",
        material: "TPU + PC",
        feature: "حلقه مگ‌سیف",
        magsafe: "دارد"
    }
},

{
    id: 3,
    category: "full-glass",
    name: "گلس تمام‌صفحه فول کاور",
    image: "assets/products/full-glass.webp",
    price: "190,000",
    brand: "RayanTag",
    featured: true,

    description: "محافظ صفحه تمام‌صفحه با پوشش مناسب نمایشگر و شفافیت بالا.",

    specs: {
        type: "گلس تمام‌صفحه",
        hardness: "9H",
        coverage: "تمام‌صفحه",
        feature: "شفافیت بالا"
    }
},

{
    id: 4,
    category: "privacy-glass",
    name: "گلس حریم خصوصی ضدجاسوسی",
    image: "assets/products/privacy-glass.webp",
    price: "290,000",
    brand: "RayanTag",
    featured: true,

    description: "محافظ صفحه حریم خصوصی که دید نمایشگر از زوایای کناری را محدود می‌کند.",

    specs: {
        type: "گلس حریم خصوصی",
        hardness: "9H",
        feature: "ضد جاسوسی",
        coverage: "تمام‌صفحه"
    }
},

{
    id: 5,
    category: "lens-protector",
    name: "محافظ لنز دوربین گوشی",
    image: "assets/products/lens-protector.webp",
    price: "220,000",
    brand: "RayanTag",
    featured: true,

    description: "محافظ لنز مقاوم برای کمک به جلوگیری از خط و خش روی دوربین گوشی.",

    specs: {
        type: "محافظ لنز",
        material: "شیشه مقاوم",
        feature: "ضد خش",
        installation: "نصب آسان"
    }
},


{
    id: 6,
    category: "transparent-case",
    name: "قاب شفاف ژله‌ای ضدزردی",
    image: "assets/products/transparent-case-2.webp",
    price: "350,000",
    brand: "RayanTag",

    description: "قاب سبک و انعطاف‌پذیر با طراحی شفاف و محافظت مناسب از بدنه گوشی.",

    specs: {
        type: "قاب شفاف",
        material: "TPU",
        feature: "انعطاف‌پذیر",
        weight: "سبک"
    }
},

{
    id: 7,
    category: "magsafe-case",
    name: "قاب سیلیکونی مگ‌سیف",
    image: "assets/products/silicone-magsafe.webp",
    price: "690,000",
    brand: "RayanTag",

    description: "قاب سیلیکونی خوش‌دست با پشتیبانی از مگ‌سیف و محافظت مناسب از گوشی.",

    specs: {
        type: "قاب سیلیکونی",
        material: "Silicone",
        magsafe: "دارد",
        feature: "لمس نرم"
    }
},

{
    id: 8,
    category: "full-glass",
    name: "گلس تمام‌چسب 9D",
    image: "assets/products/9d-glass.webp",
    price: "230,000",
    brand: "RayanTag",

    description: "گلس تمام‌چسب با پوشش مناسب صفحه نمایش و حساسیت لمس مطلوب.",

    specs: {
        type: "گلس تمام‌چسب",
        hardness: "9H",
        feature: "حساسیت لمس بالا",
        coverage: "لبه تا لبه"
    }
},

{
    id: 9,
    category: "privacy-glass",
    name: "گلس پرایوسی مات",
    image: "assets/products/privacy-matte.webp",
    price: "320,000",
    brand: "RayanTag",

    description: "گلس حریم خصوصی با سطح مات برای کاهش بازتاب نور و اثر انگشت.",

    specs: {
        type: "گلس پرایوسی",
        surface: "مات",
        feature: "حریم خصوصی",
        coverage: "تمام‌صفحه"
    }
},

{
    id: 10,
    category: "lens-protector",
    name: "محافظ لنز فلزی دوربین",
    image: "assets/products/metal-lens-protector.webp",
    price: "290,000",
    brand: "RayanTag",

    description: "محافظ لنز با فریم مقاوم برای محافظت بهتر از بخش دوربین.",

    specs: {
        type: "محافظ لنز",
        material: "فلز + شیشه",
        feature: "ضد خش",
        installation: "چسبی"
    }
},



{
    id: 11,
    category: "transparent-case",
    name: "قاب شفاف مگنتی ضدضربه",
    image: "assets/products/magnetic-clear-case.webp",
    price: "490,000",
    brand: "RayanTag",

    description: "قاب شفاف مقاوم با طراحی مدرن و محافظت از گوشه‌های گوشی.",

    specs: {
        type: "قاب شفاف",
        material: "PC + TPU",
        feature: "محافظ گوشه",
        magsafe: "مگنتی"
    }
},

{
    id: 12,
    category: "magsafe-case",
    name: "قاب مگ‌سیف محافظ دوربین",
    image: "assets/products/camera-magsafe-case.webp",
    price: "750,000",
    brand: "RayanTag",

    description: "قاب مگ‌سیف با طراحی محافظ اطراف دوربین و لبه‌های گوشی.",

    specs: {
        type: "قاب مگ‌سیف",
        feature: "محافظ دوربین",
        magsafe: "دارد",
        protection: "ضد ضربه"
    }
},

{
    id: 13,
    category: "full-glass",
    name: "گلس سرامیکی ضدضربه",
    image: "assets/products/ceramic-glass.webp",
    price: "350,000",
    brand: "RayanTag",

    description: "محافظ صفحه با انعطاف‌پذیری مناسب و مقاومت بالا در استفاده روزمره.",

    specs: {
        type: "گلس سرامیکی",
        feature: "انعطاف‌پذیر",
        protection: "ضد ضربه",
        coverage: "تمام‌صفحه"
    }
},

{
    id: 14,
    category: "privacy-glass",
    name: "گلس حریم خصوصی فول کاور",
    image: "assets/products/privacy-full-glass.webp",
    price: "310,000",
    brand: "RayanTag",

    description: "گلس فول کاور برای محافظت از صفحه نمایش همراه با قابلیت حفظ حریم خصوصی.",

    specs: {
        type: "گلس حریم خصوصی",
        hardness: "9H",
        feature: "ضد جاسوسی",
        coverage: "فول کاور"
    }
},

{
    id: 15,
    category: "lens-protector",
    name: "محافظ لنز شفاف کامل",
    image: "assets/products/clear-lens-protector.webp",
    price: "180,000",
    brand: "RayanTag",

    description: "محافظ شفاف لنز برای کمک به جلوگیری از خط و خش بدون تغییر محسوس ظاهر دوربین.",

    specs: {
        type: "محافظ لنز شفاف",
        material: "شیشه",
        feature: "شفافیت بالا",
        installation: "نصب آسان"
    }
}
];