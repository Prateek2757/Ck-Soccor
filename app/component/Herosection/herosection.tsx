// components/Hero.tsx
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import hero from "../../assets/image.png"
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute    inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
      <Image src={hero} alt="hero" className='relative top-6 lg:left-190 lg:top-10 '  width={600} height={200} /></div>

    
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl o mx-auto">
      <div className="h-[18rem]  top-[-40px] absolute right-1 opacity-40   flex items-center justify-center">
      <TextHoverEffect text="SOCCER" />
    </div>


        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            CK SOCCER
          </span>
          <br />
          <span className="text-white">FOOTBALL CLUB</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
          Where champions are forged through dedication, skill, and unwavering passion for the beautiful game.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="signupform"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
          >
            Join Our Programs
          </a>
          
          <a 
            href="#about"
            className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a 
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-emerald-400 animate-bounce hover:text-emerald-300 transition-colors"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}