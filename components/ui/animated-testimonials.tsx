"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
 
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [rotations, setRotations] = useState<number[]>([]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  useEffect(() => {
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, [testimonials]);

  return (
    <div id="coaches" className="min-h-screen px-4 py-20 flex items-center justify-center font-sans bg-gradient-to-br from-black via-gray-900 to-green-900 text-white md:px-8 lg:px-12">
      <div className="max-w-6xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-wide">
          <span className="text-green-400">MEET MY COACHES</span>
        </h2>

        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 items-center">
          {/* Image Side */}
          <div>
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: rotations[index] ?? 0,
                    }}
                    animate={{
                      opacity: index === active ? 1 : 0.7,
                      scale: index === active ? 1 : 0.95,
                      z: index === active ? 0 : -100,
                      rotate: index === active ? 0 : rotations[index] ?? 0,
                      zIndex:
                        index === active
                          ? 40
                          : testimonials.length + 2 - index,
                      y: index === active ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: rotations[index] ?? 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center shadow-lg"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center text-left">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-bold text-green-400">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-gray-400">
                {testimonials[active].designation}
              </p>
              {/* <p className="text-sm text-gray-400 italic">
                {testimonials[active].experience}
              </p> */}
              <motion.p className="mt-6 text-lg text-gray-300 leading-relaxed">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            <div className="flex gap-4 pt-12">
              <button
                onClick={handlePrev}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
              >
                <IconArrowLeft className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
              >
                <IconArrowRight className="h-5 w-5 text-white group-hover/button:-rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};