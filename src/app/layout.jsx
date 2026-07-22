import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

export const metadata = {
  title: "YoosFood — Croustillant. Audacieux. Irrésistible.",
  description:
    "YoosFood — L'Excellence Culinaire à Votre Service. Burgers, shawarmas et grillades à Douala.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
