import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-5 md:py-5 px-6 lg:px-[7rem] bg-[#eef2f3]">

      <div className="flex items-center justify-between text-[13px] text-[#6b7280]">

        <p>© 2025 Knowledge Vault. All rights reserved.</p>

        <div className="flex items-center gap-5">
          <Twitter size={16} />
          <Github size={16} />
          <Linkedin size={16} />
        </div>

      </div>

    </footer>
  );
};

export default Footer;