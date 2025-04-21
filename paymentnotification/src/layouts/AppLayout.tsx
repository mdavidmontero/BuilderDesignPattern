import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Header from "@/themes/ui/header/Header";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <section className="p-5 mx-auto mt-10 max-w-screen-2xl">
        <Outlet />
      </section>

      <Separator className="my-10" />

      <footer className="py-5 text-muted-foreground text-center">
        Todos los derechos reservados {new Date().getFullYear()}
      </footer>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};
