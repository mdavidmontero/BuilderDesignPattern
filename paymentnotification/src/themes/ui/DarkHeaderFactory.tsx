import { ThemeSelector } from "@/modules/home/ThemeSelector";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { BaseHeaderFactory } from "@/interfaces/BaseHeaderFactory";

export class DarkHeaderFactory implements BaseHeaderFactory {
  createContainer() {
    return (
      <header className="border-b bg-cyan-800 text-white shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between px-5 py-4 mx-auto max-w-screen-2xl gap-4">
          {this.createLogo()}
          {this.createActions()}
        </div>
      </header>
    );
  }

  createLogo() {
    return (
      <div className="w-64">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
      </div>
    );
  }

  createActions() {
    return (
      <div className="flex items-center gap-x-4">
        <ThemeSelector />
      </div>
    );
  }
}
