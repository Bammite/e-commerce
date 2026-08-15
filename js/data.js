// Données: catégories et produits
export const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'telephone', label: 'Téléphones' },
  { id: 'audio', label: 'Audio' },
  { id: 'tablette', label: 'Tablettes' },
  { id: 'accessoire', label: 'Accessoires' }
];

export const products = [
  // ========== TÉLÉPHONES ==========
  {
    id: 1,
    name: 'iPhone 12 Pro',
    category: 'telephone',
    images: [
      './assets/produit/telephone/12pro.jpg',
      './assets/produit/telephone/12pro2.jpg',
      './assets/produit/telephone/12pro3.jpg'
    ],
    price: 550000,
    desc: 'Écran 6.1" Super Retina XDR, puce A14 Bionic, triple capteur 12MP.',
    stock: 12,
    tag: 'Populaire',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 2,
    name: 'iPhone 14 Pro Max',
    category: 'telephone',
    images: [
      './assets/produit/telephone/14promax1.jpg',
      './assets/produit/telephone/14promax2.jpg'
    ],
    price: 850000,
    desc: 'Écran 6.7" Always-On, Dynamic Island, puce A16 Bionic, 48MP.',
    stock: 8,
    tag: 'Populaire',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 3,
    name: 'iPhone 17 Pro Max',
    category: 'telephone',
    images: [
      './assets/produit/telephone/17pr0max1.jpg',
      './assets/produit/telephone/17promax2.jpg'
    ],
    price: 1150000,
    desc: 'Dernière génération, puce A19 Pro, design titane, zoom optique 10x.',
    stock: 5,
    tag: 'Populaire',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 4,
    name: 'iPhone 13 Bleu',
    category: 'telephone',
    images: [
      './assets/produit/telephone/iphone13blue.jpg',
      './assets/produit/telephone/iphone13bleu2.jpg',
      './assets/produit/telephone/iphone13bleu3.jpg'
    ],
    price: 480000,
    desc: 'Écran 6.1", puce A15 Bionic, double capteur 12MP, autonomie 19h.',
    stock: 15,
    tag: 'Promo',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 5,
    name: 'Samsung Galaxy S21',
    category: 'telephone',
    images: [
      './assets/produit/telephone/s211.jpg',
      './assets/produit/telephone/s212.jpg',
      './assets/produit/telephone/s213.jpg',
      './assets/produit/telephone/s214.jpg'
    ],
    price: 420000,
    desc: 'Écran 6.2" Dynamic AMOLED 120Hz, Exynos 2100, triple capteur 64MP.',
    stock: 10,
    tag: '',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 6,
    name: 'iPhone 15',
    category: 'telephone',
    images: [
      './assets/produit/telephone/15-1.jpg',
      './assets/produit/telephone/15-2.jpg',
      './assets/produit/telephone/15-3.jpg',
      './assets/produit/telephone/15-4.jpg'
    ],
    price: 720000,
    desc: 'Écran 6.1" Super Retina XDR, Dynamic Island, puce A16 Bionic, double capteur 48MP, USB-C.',
    stock: 20,
    tag: 'Populaire',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 7,
    name: 'iPhone SE (2022)',
    category: 'telephone',
    images: [
      './assets/produit/telephone/se-1.jpg',
      './assets/produit/telephone/se-2.jpg',
      './assets/produit/telephone/se-3.jpg'
    ],
    price: 350000,
    desc: 'Écran 4.7" Retina HD, puce A15 Bionic, Touch ID, capteur 12MP, 5G.',
    stock: 25,
    tag: 'Promo',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 8,
    name: 'Samsung Galaxy Z Fold 5',
    category: 'telephone',
    images: [
      './assets/produit/telephone/zfold1.jpg',
      './assets/produit/telephone/zfold2.jpg',
      './assets/produit/telephone/zfold3.jpg',
      './assets/produit/telephone/zfold4.jpg'
    ],
    price: 1250000,
    desc: 'Écran pliable 7.6" + 6.2", Snapdragon 8 Gen 2, triple capteur 50MP, S Pen compatible.',
    stock: 6,
    tag: 'Premium',
    icon: 'fa-solid fa-mobile-screen-button'
  },

  // ========== AUDIO ==========
  {
    id: 9,
    name: 'AirPods Pro (2ème gén.)',
    category: 'audio',
    images: [
      './assets/produit/airpod/airpod1.jpg',
      './assets/produit/airpod/airpod2.jpg'
    ],
    price: 180000,
    desc: 'Réduction de bruit active, audio spatial, autonomie 30h avec boîtier, USB-C.',
    stock: 25,
    tag: 'Populaire',
    icon: 'fa-solid fa-headphones'
  },
  {
    id: 10,
    name: 'AirPods 2ème Gén',
    category: 'audio',
    images: [
      './assets/produit/airpod/airpod1.jpg',
      './assets/produit/airpod/airpod2.jpg'
    ],
    price: 110000,
    desc: 'Puce H1, "Dis Siri", boîtier de charge sans fil, 24h autonomie.',
    stock: 30,
    tag: '',
    icon: 'fa-solid fa-headphones'
  },
  {
    id: 11,
    name: 'AirPods 3',
    category: 'audio',
    images: [
      './assets/produit/airpod/a1.jpg',
      './assets/produit/airpod/a2.jpg'
    ],
    price: 140000,
    desc: 'Audio spatial, résistance à l\'eau IPX4, autonomie 30h, boîtier MagSafe.',
    stock: 18,
    tag: 'Nouveau',
    icon: 'fa-solid fa-headphones'
  },
  {
    id: 12,
    name: 'Écouteurs Neo',
    category: 'audio',
    images: [
      './assets/produit/telephone/neo3.jpg',
      './assets/produit/telephone/ne02.jpg'
    ],
    price: 45000,
    desc: 'Bluetooth 5.3, réduction de bruit, 20h autonomie, étanche IPX4.',
    stock: 50,
    tag: 'Populaire',
    icon: 'fa-solid fa-headphones'
  },

  // ========== TABLETTES ==========
  {
    id: 13,
    name: 'iPad Pro 11" M4',
    category: 'tablette',
    images: [
      './assets/produit/telephone/ipad1.jpeg',
      './assets/produit/telephone/ipad2.jpeg',
      './assets/produit/telephone/ipad3.jpeg',
      './assets/produit/telephone/ipad4.jpeg'
    ],
    price: 750000,
    desc: 'Puce M4, écran Ultra Retina XDR 11", Apple Pencil Pro, 12MP.',
    stock: 7,
    tag: 'Populaire',
    icon: 'fa-solid fa-tablet-screen-button'
  },
  {
    id: 14,
    name: 'MacBook Air M3',
    category: 'tablette',
    images: [
      './assets/produit/telephone/macbook1.jpg'
    ],
    price: 890000,
    desc: 'Puce M3, écran Liquid Retina 13.6", 18h autonomie, design fin.',
    stock: 4,
    tag: 'Populaire',
    icon: 'fa-solid fa-laptop'
  },

  // ========== ACCESSOIRES ==========
  {
    id: 15,
    name: 'Apple Watch Series 9',
    category: 'accessoire',
    images: [
      './assets/produit/accessoires/iwatch1.jpg',
      './assets/produit/accessoires/iwatch2.jpg',
      './assets/produit/accessoires/iwatch3.jpg',
      './assets/produit/accessoires/iwatch4.jpg'
    ],
    price: 320000,
    desc: 'Puce S9, double tap, écran plus lumineux 2000 nits, santé avancée, 18h autonomie.',
    stock: 15,
    tag: 'Nouveau',
    icon: 'fa-solid fa-clock'
  },
  {
    id: 16,
    name: 'PowerBank 20000mAh',
    category: 'accessoire',
    images: [
      './assets/produit/accessoires/powerbank1.jpg',
      './assets/produit/accessoires/powerbank2.jpg',
      './assets/produit/accessoires/powerbank3.jpg'
    ],
    price: 25000,
    desc: 'Charge rapide 22.5W, 3 ports (USB-C, 2x USB-A), écran LED, compatible iPhone/Android.',
    stock: 40,
    tag: 'Best-seller',
    icon: 'fa-solid fa-battery-full'
  },
  {
    id: 17,
    name: 'Clé USB-C 128Go',
    category: 'accessoire',
    images: [
      './assets/produit/accessoires/cleusb.jpg'
    ],
    price: 12000,
    desc: 'USB 3.2 Gen 1, double connecteur USB-C / USB-A, vitesse 400 Mo/s, plug & play.',
    stock: 60,
    tag: 'Promo',
    icon: 'fa-solid fa-usb'
  }
];

export default { categories, products };