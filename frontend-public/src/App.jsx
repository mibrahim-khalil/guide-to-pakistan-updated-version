import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRouter from "./app/router/router";
import CartDrawer from "./features/shop/components/CartDrawer";
import CartFloatingButton from "./features/shop/components/CartFloatingButton";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <CartDrawer />
      <CartFloatingButton />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}