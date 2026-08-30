import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#3f3f3f] bg-[#212121] text-[#b4b4b4]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
        
        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-[#ececec]">
            VirtuaLord
          </span>
          . All rights reserved.
        </p>

        {/* Creator */}
        <p className="text-sm">
          Made with <span className="text-[#ececec]">♥</span> by{" "}
          <span className="font-medium text-[#ececec]">
            Aditya
          </span>
        </p>

      </div>
    </footer>
  );
};

export default Footer;
