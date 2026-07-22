import {
  Pizza,
  Beef,
  Drumstick,
  CupSoda,
  Salad,
  UtensilsCrossed,
  Flame,
} from "lucide-react";

export const IMG = {
  heroBurger: "/food/photo-1568901346375-23c9450c58cd.jpg",
  burger1: "/food/photo-1550547660-d9450f859349.jpg",
  burger2: "/food/photo-1586190848861-99aa4a171e90.jpg",
  burger3: "/food/photo-1610440042657-612c34d95e9f.jpg",
  fries: "/food/photo-1630384060421-cb20d0e0649d.jpg",
  chickenFingers: "/food/photo-1562967914-608f82629710.jpg",
  nuggets: "/food/photo-1619881590738-a111d176d906.jpg",
  broast: "/food/photo-1626645738196-c2a7c87a8f58.jpg",
  tempura: "/food/photo-1608039755401-742074f0548d.jpg",
  wings: "/food/photo-1567620832903-9fc6debc209f.jpg",
  grilled: "/food/photo-1598103442097-8b74394b95c6.jpg",
  pizza1: "/food/photo-1513104890138-7c749659a591.jpg",
  pizza2: "/food/photo-1565299624946-b28f40a0ae38.jpg",
  pizza3: "/food/photo-1574071318508-1cdbab80d002.jpg",
  pizza4: "/food/photo-1571407970349-bc81e7e96d47.jpg",
  cola: "/food/photo-1554866585-cd94860890b7.jpg",
  juice: "/food/photo-1600271886742-f049cd451bba.jpg",
  coffee: "/food/photo-1461023058943-07fcbe16d735.jpg",
  shake: "/food/photo-1572490122747-3968b75cc699.jpg",
  sauce1: "/food/photo-1472476443507-c7a5948772fc.jpg",
  sauce2: "/food/photo-1607013251379-e6eecfffe234.jpg",
  combo1: "/food/photo-1610440042657-612c34d95e9f.jpg",
  combo2: "/food/photo-1626645738196-c2a7c87a8f58.jpg",
  rider: "/food/photo-1526367790999-0150786686a2.jpg",
  ingredients: "/food/photo-1571091718767-18b5b1457add.jpg",
};

export const BANNERS = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
  "/banners/banner4.jpg",
];

const RAW = [
  {
    id: "pizza",
    label: "Pizza",
    Icon: Pizza,
    thumb: IMG.pizza2,
    items: [
      { name: "Margherita Classique", desc: "Sauce tomate, mozzarella, basilic frais", price: "3 500", img: IMG.pizza1, Icon: Pizza },
      { name: "Pepperoni Suprême", desc: "Pepperoni, mozzarella, origan", price: "4 500", img: IMG.pizza2, Icon: Pizza },
      { name: "BBQ Chicken", desc: "Poulet grillé, sauce BBQ, oignons rouges", price: "5 000", img: IMG.pizza3, Icon: Pizza },
      { name: "Veggie Garden", desc: "Poivrons, champignons, olives, maïs", price: "4 000", img: IMG.pizza4, Icon: Pizza },
    ],
  },
  {
    id: "burger",
    label: "Burger",
    Icon: Beef,
    thumb: IMG.heroBurger,
    items: [
      { name: "Signature Beef Burger", desc: "Bœuf 200g, cheddar vieilli, laitue, BBQ", price: "3 500", img: IMG.heroBurger, Icon: Beef },
      { name: "Double Cheese", desc: "Double steak, double cheddar, cornichons", price: "4 500", img: IMG.burger1, Icon: Beef },
      { name: "Crispy Chicken Burger", desc: "Poulet pané croustillant, sauce blanche", price: "3 000", img: IMG.burger2, Icon: Drumstick },
      { name: "Spicy BBQ Burger", desc: "Steak épicé, oignons frits, sauce BBQ", price: "3 800", img: IMG.burger3, Icon: Flame },
    ],
  },
  {
    id: "chicken",
    label: "Chicken",
    Icon: Drumstick,
    thumb: IMG.wings,
    items: [
      { name: "Golden Chicken Fingers", desc: "10 pièces poulet, sauce, frites", price: "3 500", img: IMG.chickenFingers, Icon: Drumstick },
      { name: "Chicken Nuggets", desc: "10 pièces poulet, sauce, frites", price: "3 000", img: IMG.nuggets, Icon: Drumstick },
      { name: "Chicken Broast", desc: "Poulet entier, sauce, frites moyennes", price: "6 500", img: IMG.broast, Icon: Drumstick },
      { name: "Tempura Chicken", desc: "12 pièces poulet, sauce, frites", price: "6 900", img: IMG.tempura, Icon: Drumstick },
      { name: "Buffalo Wings", desc: "8 ailes épicées, sauce ranch", price: "4 000", img: IMG.wings, Icon: Flame },
      { name: "Grilled Chicken", desc: "Poulet grillé mariné, frites maison", price: "5 500", img: IMG.grilled, Icon: Drumstick },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    Icon: CupSoda,
    thumb: IMG.juice,
    items: [
      { name: "Jus d'Orange Frais", desc: "Pressé minute, 100% naturel", price: "1 000", img: IMG.juice, Icon: CupSoda },
      { name: "Soda Glacé", desc: "Cola bien frais, glaçons", price: "800", img: IMG.cola, Icon: CupSoda },
      { name: "Iced Coffee", desc: "Café glacé, lait, caramel", price: "1 500", img: IMG.coffee, Icon: CupSoda },
      { name: "Milkshake Vanille", desc: "Onctueux, chantilly maison", price: "2 000", img: IMG.shake, Icon: CupSoda },
    ],
  },
  {
    id: "sauces",
    label: "Sauces",
    Icon: Salad,
    thumb: IMG.sauce1,
    items: [
      { name: "Sauce BBQ Maison", desc: "Fumée, légèrement sucrée", price: "500", img: IMG.sauce1, Icon: Salad },
      { name: "Garlic Mayo", desc: "Mayonnaise à l'ail crémeuse", price: "500", img: IMG.sauce2, Icon: Salad },
      { name: "Cheddar Fondu", desc: "Sauce fromagère onctueuse", price: "700", img: IMG.sauce1, Icon: Salad },
      { name: "Hot Chili", desc: "Piment fort, pour les audacieux", price: "700", img: IMG.sauce2, Icon: Flame },
    ],
  },
  {
    id: "combo",
    label: "Combo Menu",
    Icon: UtensilsCrossed,
    thumb: IMG.combo1,
    items: [
      { name: "Family Combo", desc: "4 burgers, 2 frites, 4 boissons", price: "12 000", img: IMG.combo1, Icon: UtensilsCrossed },
      { name: "Duo Combo", desc: "2 burgers, 1 frites XL, 2 sodas", price: "6 500", img: IMG.combo2, Icon: UtensilsCrossed },
      { name: "Party Bucket", desc: "12 pièces poulet, frites, 4 sauces", price: "9 500", img: IMG.broast, Icon: Drumstick },
      { name: "Solo Meal", desc: "1 burger, frites, 1 boisson", price: "3 000", img: IMG.burger1, Icon: Beef },
    ],
  },
];

export const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const CATEGORIES = RAW.map((c) => ({
  ...c,
  items: c.items.map((it) => ({
    ...it,
    slug: slugify(it.name),
    category: c.label,
    categoryId: c.id,
  })),
}));

export const ALL_PRODUCTS = CATEGORIES.flatMap((c) => c.items);

export const getProduct = (slug) => ALL_PRODUCTS.find((p) => p.slug === slug);

export const relatedProducts = (product, n = 4) =>
  ALL_PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.slug !== product.slug).slice(0, n);
