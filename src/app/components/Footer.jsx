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
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="BiblioDrop"
              width={180}
              height={60}
              className="w-auto h-14 object-contain"
            />

            <p className="mt-4 text-slate-400 leading-relaxed">
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
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3">
              {footerLinks[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition"
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
            <h3 className="text-lg font-semibold mb-5">Newsletter</h3>

            <p className="text-slate-400 mb-4">
              Stay updated with new books, libraries and special offers.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />

              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-medium"
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
            <h3 className="text-lg font-semibold mb-5">Follow Us</h3>

            <p className="text-slate-400 mb-5">
              Join our reading community and stay connected.
            </p>

            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -3 }}
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaFacebookF />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -3 }}
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaInstagram />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -3 }}
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaLinkedinIn />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -3 }}
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaYoutube />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -3 }}
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaXTwitter />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-slate-800 mt-12 pt-6 text-center"
        >
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} BiblioDrop. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
