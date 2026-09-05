const PRODUCTS = [{
    id: 1,
    category: "mobile",
    name: "iPhone 16 Pro Max",
    image: "assets/products/iphone16.webp",
    price: "351,900,000",
    brand: "Apple",

    description:
        "جدیدترین پرچمدار اپل با تراشه A18 Pro، نمایشگر Super Retina XDR و دوربین حرفه‌ای.",

    specs: {
        display: "6.9 inch OLED",
        cpu: "Apple A18 Pro",
        memory: "256GB",
        ram: "8GB",
        camera: "48MP",
        battery: "4685mAh"
    }
},

{
    id: 2,
    category: "mobile",
    name: "iPhone 15 ",
    image: "assets/products/iphone15.webp",
    price: "210,500,000",
    brand: "Apple",

    description:
        "آیفون 15 پرو مکس با تراشه A17 Pro و بدنه تیتانیومی.",

    specs: {
        display: "6.7 inch OLED",
        cpu: "Apple A17 Pro",
        memory: "256GB",
        ram: "8GB",
        camera: "48MP",
        battery: "4422mAh"
    }
},

{
    id: 3,
    category: "mobile",
    name: "Samsung Galaxy S25 Ultra",
    image: "assets/products/s25ultra.webp",
    price: "265,000,000",
    brand: "Samsung",

    description:
        "پرچمدار سامسونگ با قلم S Pen و دوربین حرفه‌ای.",

    specs: {
        display: "6.9 inch AMOLED",
        cpu: "Snapdragon 8 Elite",
        memory: "256GB",
        ram: "12GB",
        camera: "200MP",
        battery: "5000mAh"
    }
},

{
    id: 4,
    category: "mobile",
    name: "Xiaomi 15",
    image: "assets/products/xiaomi15.webp",
    price: "185,200,000",
    brand: "Xiaomi",

    description:
        "پرچمدار جدید شیائومی با پردازنده Snapdragon و دوربین Leica.",

    specs: {
        display: "6.36 inch AMOLED",
        cpu: "Snapdragon 8 Elite",
        memory: "256GB",
        ram: "12GB",
        camera: "50MP Triple",
        battery: "5400mAh"
    }
},

{
    id: 5,
    category: "mobile",
    name: "POCO F7",
    image: "assets/products/pocof7.webp",
    price: "134,300,000",
    brand: "POCO",

    description:
        "گوشی قدرتمند پوکو با سخت‌افزار مناسب بازی و باتری پرظرفیت.",

    specs: {
        display: "6.67 inch AMOLED",
        cpu: "Snapdragon 8s Gen 4",
        memory: "256GB",
        ram: "12GB",
        camera: "50MP",
        battery: "6500mAh"
    }
},

{
    id: 6,
    category: "earbuds",
    name: "AirPods Pro 2",
    image: "assets/products/airpodspro2.webp",
    price: "49,900,000",
    brand: "Apple",

    description:
        "ایرپاد پرو نسل دوم با نویزکنسلینگ پیشرفته و صدای فضایی.",

    specs: {
        bluetooth: "5.3",
        battery: "30 Hours",
        charging: "USB-C",
        noiseCanceling: "Active",
        waterproof: "IP54"
    }
},

{
    id: 7,
    category: "earbuds",
    name: "Galaxy Buds 3",
    image: "assets/products/galaxybuds3.webp",
    price: "19,000,000",
    brand: "Samsung",

    description:
        "هندزفری بی‌سیم سامسونگ با کیفیت صدای عالی و ANC.",

    specs: {
        bluetooth: "5.4",
        battery: "30 Hours",
        charging: "USB-C",
        noiseCanceling: "Active",
        waterproof: "IP57"
    }
},

{
    id: 8,
    category: "earbuds",
    name: "QCY T13",
    image: "assets/products/qcyt13.webp",
    price: "2,490,000",
    brand: "QCY",

    description:
        "هندزفری اقتصادی با کیفیت صدای مناسب و شارژدهی بالا.",

    specs: {
        bluetooth: "5.1",
        battery: "40 Hours",
        charging: "USB-C",
        noiseCanceling: "ENC",
        waterproof: "IPX5"
    }
},

{
    id: 9,
    category: "earbuds",
    name: "JBL Tune",
    image: "assets/products/jbltune.webp",
    price: "8,990,000",
    brand: "JBL",

    description:
        "هندزفری JBL با صدای قدرتمند و بیس عمیق.",

    specs: {
        bluetooth: "5.3",
        battery: "48 Hours",
        charging: "USB-C",
        noiseCanceling: "ANC",
        waterproof: "IPX4"
    }
},

{
    id: 10,
    category: "earbuds",
    name: "Haylou X1",
    image: "assets/products/hayloux1.webp",
    price: "4,890,000",
    brand: "Haylou",

    description:
        "هندزفری سبک و خوش‌قیمت با کیفیت صدای مناسب.",

    specs: {
        bluetooth: "5.3",
        battery: "24 Hours",
        charging: "USB-C",
        noiseCanceling: "ENC",
        waterproof: "IPX4"
    }
},

{
    id: 11,
    category: "watch",
    name: "Apple Watch Series",
    image: "assets/products/applewatch.webp",
    price: "74,000,000",
    brand: "Apple",

    description:
        "ساعت هوشمند اپل با امکانات کامل سلامتی و ورزشی.",

    specs: {
        display: "OLED",
        battery: "18 Hours",
        waterproof: "50m",
        gps: "Yes",
        bluetooth: "5.3"
    }
},

{
    id: 12,
    category: "watch",
    name: "Galaxy Watch",
    image: "assets/products/galaxywatch.webp",
    price: "43,900,000",
    brand: "Samsung",

    description:
        "ساعت هوشمند سامسونگ با Wear OS و سنسورهای سلامتی.",

    specs: {
        display: "AMOLED",
        battery: "40 Hours",
        waterproof: "5ATM",
        gps: "Yes",
        bluetooth: "5.3"
    }
},

{
    id: 13,
    category: "watch",
    name: "Xiaomi Watch",
    image: "assets/products/xiaomiwatch.webp",
    price: "19,600,000",
    brand: "Xiaomi",

    description:
        "ساعت هوشمند شیائومی با شارژدهی بسیار بالا.",

    specs: {
        display: "AMOLED",
        battery: "14 Days",
        waterproof: "5ATM",
        gps: "Yes",
        bluetooth: "5.3"
    }
},

{
    id: 14,
    category: "watch",
    name: "Amazfit GTR",
    image: "assets/products/amazfit.webp",
    price: "16,700,000",
    brand: "Amazfit",

    description:
        "ساعت هوشمند Amazfit با باتری فوق‌العاده و GPS داخلی.",

    specs: {
        display: "AMOLED",
        battery: "21 Days",
        waterproof: "5ATM",
        gps: "Yes",
        bluetooth: "5.2"
    }
},

{
    id: 15,
    category: "watch",
    name: "Haylou Watch",
    image: "assets/products/haylouwatch.webp",
    price: "7,290,000",
    brand: "Haylou",

    description:
        "ساعت هوشمند اقتصادی با امکانات کامل سلامتی.",

    specs: {
        display: "1.95 inch",
        battery: "12 Days",
        waterproof: "IP68",
        gps: "No",
        bluetooth: "5.0"
    }
},

{
    id: 16,
    category: "powerbank",
    name: "Anker 20000",
    image: "assets/products/anker20000.webp",
    price: "4,990,000",
    brand: "Anker",

    description:
        "پاوربانک ۲۰۰۰۰ میلی‌آمپری انکر با شارژ سریع.",

    specs: {
        capacity: "20000mAh",
        output: "22.5W",
        ports: "USB-A + USB-C",
        fastCharge: "Yes",
        weight: "345g"
    }
},

{
    id: 17,
    category: "powerbank",
    name: "Baseus 20000",
    image: "assets/products/baseus20000.webp",
    price: "5,990,000",
    brand: "Baseus",

    description:
        "پاوربانک Baseus با شارژ سریع PD و QC.",

    specs: {
        capacity: "20000mAh",
        output: "22.5W",
        ports: "USB-A + USB-C",
        fastCharge: "Yes",
        weight: "360g"
    }
},

{
    id: 18,
    category: "powerbank",
    name: "Xiaomi 20000",
    image: "assets/products/xiaomi20000.webp",
    price: "3,590,000",
    brand: "Xiaomi",

    description:
        "پاوربانک اصلی شیائومی با دو خروجی USB.",

    specs: {
        capacity: "20000mAh",
        output: "18W",
        ports: "2×USB + USB-C",
        fastCharge: "Yes",
        weight: "338g"
    }
},

{
    id: 19,
    category: "powerbank",
    name: "Green Lion 20000",
    image: "assets/products/greenlion20000.webp",
    price: "6,790,000",
    brand: "Green Lion",

    description:
        "پاوربانک گرین لاین با ظرفیت ۲۰۰۰۰ میلی‌آمپر و شارژ سریع PD.",

    specs: {
        capacity: "20000mAh",
        output: "22.5W",
        ports: "USB-A + USB-C",
        fastCharge: "Yes",
        weight: "350g"
    }
},

{
    id: 20,
    category: "powerbank",
    name: "Mcdodo 20000",
    image: "assets/products/mcdodo20000.webp",
    price: "8,490,000",
    brand: "Mcdodo",

    description:
        "پاوربانک مک‌دودو با طراحی مدرن و پشتیبانی از شارژ سریع.",

    specs: {
        capacity: "20000mAh",
        output: "22.5W",
        ports: "USB-A + USB-C",
        fastCharge: "Yes",
        weight: "340g"
    }
},

{
    id: 21,
    category: "charger",
    name: "45W Fast Charger",
    image: "assets/products/charger45w.webp",
    price: "7,490,000",
    brand: "Samsung",

    description:
        "شارژر دیواری ۴۵ وات با پشتیبانی از Super Fast Charging.",

    specs: {
        power: "45W",
        port: "USB-C",
        fastCharge: "PD",
        color: "White",
        cable: "Not Included"
    }
},

{
    id: 22,
    category: "charger",
    name: "20W Fast Charger",
    image: "assets/products/charger20w.webp",
    price: "4,490,000",
    brand: "Apple",

    description:
        "شارژر ۲۰ وات مناسب آیفون و آیپد با خروجی USB-C.",

    specs: {
        power: "20W",
        port: "USB-C",
        fastCharge: "PD",
        color: "White",
        cable: "Not Included"
    }
},

{
    id: 23,
    category: "charger",
    name: "Type-C Cable 100W",
    image: "assets/products/typec.webp",
    price: "990,000",
    brand: "Baseus",

    description:
        "کابل Type-C با توان ۱۰۰ وات مناسب شارژ سریع و انتقال اطلاعات.",

    specs: {
        type: "USB-C to USB-C",
        length: "1m",
        power: "100W",
        data: "480Mbps",
        material: "Braided"
    }
},

{
    id: 24,
    category: "charger",
    name: "Lightning Cable",
    image: "assets/products/lightning.webp",
    price: "2,490,000",
    brand: "Apple",

    description:
        "کابل Lightning مناسب آیفون و آیپد با کیفیت ساخت بالا.",

    specs: {
        type: "USB-C to Lightning",
        length: "1m",
        power: "27W",
        data: "480Mbps",
        material: "PVC"
    }
},

{
    id: 25,
    category: "charger",
    name: "100W Fast Charging Cable",
    image: "assets/products/cable100w.webp",
    price: "1,250,000",
    brand: "Mcdodo",

    description:
        "کابل شارژ سریع ۱۰۰ وات مناسب لپ‌تاپ، تبلت و گوشی.",

    specs: {
        type: "USB-C to USB-C",
        length: "1.2m",
        power: "100W",
        data: "480Mbps",
        material: "Braided Nylon"
    }
}

];
