const AboutSection = () => {
    return (
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-black text-white"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side – Text Content */}
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-green-400 to-purple-200 bg-clip-text text-transparent">
                  Legacy
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Since 1990, Elite Football Club has been the cornerstone of athletic excellence,
                shaping the future of football through innovative training methodologies and
                unwavering commitment to player development.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our mission transcends the field – we build character, instill discipline,
                and forge champions who carry the spirit of excellence into every aspect of their lives.
              </p>
            </div>
  
            {/* Right Side – Stats Boxes */}
            <div className="space-y-6">
              {/* Box 1 */}
              <div className="rounded-xl p-6 border border-green-500/30 bg-gradient-to-br from-green-800/20 to-green-500/10 shadow-md">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
                    33+
                  </div>
                  <div className="text-gray-300 uppercase tracking-wide">Years of Excellence</div>
                </div>
              </div>
  
              {/* Box 2 */}
              <div className="rounded-xl p-6 border border-green-400/30 bg-gradient-to-br from-green-600/20 to-green-700/10 shadow-md">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-green-400 z-10 to-green-600 bg-clip-text text-transparent mb-2">
                    2,000+
                  </div>
                  <div className="text-gray-300 uppercase tracking-wide">Athletes Trained</div>
                </div>
              </div>
  
              {/* Box 3 */}
              <div className="rounded-xl p-6 border border-green-600/30 bg-gradient-to-br from-green-900/20 to-green-500/10 shadow-md">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
                    150+
                  </div>
                  <div className="text-gray-300 uppercase tracking-wide">Championships Won</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;