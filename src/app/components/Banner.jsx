"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000",
    title: "Your Local Library, Delivered",
    description:
      "Discover thousands of books from nearby libraries and independent book owners. Request delivery right to your doorstep.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000",
    title: "Read More. Travel Less.",
    description:
      "Borrow books without leaving home. Explore fiction, science, history, education and much more.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000",
    title: "Knowledge At Your Doorstep",
    description:
      "Connect with local libraries, support book communities, and enjoy convenient book delivery.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Banner() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        loop={true}
        className="h-[85vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[85vh] overflow-hidden">
              {/* Animated Background */}
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 8,
                  ease: "easeOut",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/65" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                {/* Floating Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full blur-[120px]"
                />

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                  <motion.div
                    key={index}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl"
                  >
                    {/* Badge */}
                    <motion.span
                      variants={fadeUp}
                      transition={{ duration: 0.5 }}
                      className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-200 text-sm font-medium"
                    >
                      📚 BiblioDrop
                    </motion.span>

                    {/* Heading */}
                    <motion.h1
                      variants={fadeUp}
                      transition={{ duration: 0.7 }}
                      className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      variants={fadeUp}
                      transition={{ duration: 0.9 }}
                      className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                      variants={fadeUp}
                      transition={{ duration: 1 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                      >
                        <Link
                          href="/books"
                          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
                        >
                          Browse Books
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                      >
                        <Link
                          href="/about"
                          className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition"
                        >
                          Learn More
                        </Link>
                      </motion.div>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div
                      variants={staggerContainer}
                      className="mt-12 grid grid-cols-3 gap-8 max-w-lg"
                    >
                      <motion.div
                        variants={fadeUp}
                        whileHover={{
                          y: -5,
                        }}
                      >
                        <h3 className="text-3xl font-bold text-white">5K+</h3>
                        <p className="text-slate-300 text-sm">
                          Books Available
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        whileHover={{
                          y: -5,
                        }}
                      >
                        <h3 className="text-3xl font-bold text-white">250+</h3>
                        <p className="text-slate-300 text-sm">Libraries</p>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        whileHover={{
                          y: -5,
                        }}
                      >
                        <h3 className="text-3xl font-bold text-white">12K+</h3>
                        <p className="text-slate-300 text-sm">Readers</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
