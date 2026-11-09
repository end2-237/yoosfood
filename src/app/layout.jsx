import "./globals.css";
import "./accueil.css";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

export const metadata = {
  title: "Yoss Food · Le roi du croustillant",
  description:
    "Burgers et poulet pané à la main à Bonamoussadi, Douala. Commandez en ligne, livré chaud.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mouse+Memoirs&family=Modak&family=DM+Mono:wght@400;500&family=Figtree:wght@500;700&display=swap"
        />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
