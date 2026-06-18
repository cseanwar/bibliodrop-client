"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-7">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Light Logo */}
            <Image
              src="/logo.png"
              alt="BiblioDrop"
              width={220}
              height={60}
              className="block dark:hidden"
            />

            {/* Dark Logo */}
            <Image
              src="/logo-light.png"
              alt="BiblioDrop"
              width={220}
              height={60}
              className="hidden dark:block"
            />

            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Connecting readers with local libraries and independent book
              providers through a simple and convenient delivery platform.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-5 text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {footerLinks[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-lg font-semibold mb-5 text-slate-900 dark:text-white">
              Newsletter
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Stay updated with new books, libraries and special offers.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-white
                  dark:bg-slate-900
                  border
                  border-slate-300
                  dark:border-slate-700
                  text-slate-900
                  dark:text-white
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:border-blue-500
                  transition
                "
              />

              <button
                type="button"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  transition
                  py-3
                  rounded-xl
                  font-medium
                  mt-3
                "
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-lg font-semibold mb-5 text-slate-900 dark:text-white">
              Follow Us
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-5">
              Join our reading community and stay connected.
            </p>

            <div className="flex gap-4">
              {[
                FaFacebookF,
                FaInstagram,
                FaLinkedinIn,
                FaYoutube,
                FaXTwitter,
              ].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                  }}
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    dark:bg-slate-900
                    border
                    border-slate-300
                    dark:border-slate-700
                    flex
                    items-center
                    justify-center
                    text-slate-700
                    dark:text-slate-300
                    hover:bg-blue-600
                    hover:text-white
                    hover:border-blue-600
                    transition
                  "
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="
            border-t
            border-slate-300
            dark:border-slate-800
            mt-12
            pt-6
            text-center
          "
        >
          <p className="text-slate-600 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} BiblioDrop. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
