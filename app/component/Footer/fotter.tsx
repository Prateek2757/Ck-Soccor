"use client";
import { Mail, Phone } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: MdEmail, href: "mailto:test@example.com", label: "Email" },
    { icon: MdPhone, href: "tel:+1234567890", label: "Phone" },
  ];

  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Coaches", href: "#coaches" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className=" bg-gradient-to-t from-black via-gray-900 to-green-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-3xl font-bold text-emerald-400">CK SOCCER</div>
            <p className="text-gray-300 leading-relaxed">
              Developing champions through excellence, dedication, and the
              beautiful game.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 hover:bg-emerald-500 text-gray-300 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Youth Academy (6-12)</li>
              <li>Teen Elite (13-17)</li>
              <li>Professional Prep (18+)</li>
              <li>Adult Recreation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} className="text-emerald-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-emerald-400" />
                <span>info@fcelite.com</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-300">
                <FaFacebookF size={16} className="text-emerald-400" />
                <span>CKSOCCER</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 CKSOCCER. All rights reserved. |
            <span className="text-emerald-400">
              {" "}
              Built with passion for football
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
