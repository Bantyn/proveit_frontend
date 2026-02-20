import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ProveIt.io. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
