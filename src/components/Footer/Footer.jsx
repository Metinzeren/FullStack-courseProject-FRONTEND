import React from "react";
import "primeicons/primeicons.css";
const Footer = () => {
  return (
    <div className="bg-white p-1 flex justify-around items-center">
      <div>
        <p className="text-sm text-gray-500">Metin Zeren</p>
      </div>
      <div className="gap-2 flex">
        <a
          href="https://github.com/Metinzeren?tab=repositories"
          rel="noopener noreferrer"
          target="_blank"
          alt="Github"
        >
          <i
            className="pi pi-github"
            style={{ color: "black", fontSize: "20px" }}
          ></i>
        </a>
        <a
          href="https://www.linkedin.com/in/metin-zeren-568528177/"
          rel="noopener noreferrer"
          target="_blank"
          alt="Linkedin"
        >
          <i
            className="pi pi-linkedin"
            style={{ color: "black", fontSize: "20px" }}
          ></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
