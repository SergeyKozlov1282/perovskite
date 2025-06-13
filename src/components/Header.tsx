import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900/90 text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl md:text-2xl font-bold">
              Инструмент моделирования ПСЭ
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8 text-lg">
            <a
              href="#explorer"
              className="py-2 border-b-2 border-transparent hover:border-yellow-400 transition-colors"
            >
              Исследование конфигураций
            </a>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden mt-3 ${isMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#explorer"
            className="block py-2 px-4 text-sm hover:bg-white/10 rounded transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Исследование конфигураций
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
