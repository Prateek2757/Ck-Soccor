
import {
  Box,
  Lock,
  Star,
} from "lucide-react";

const Index = () => {
  const trainingPrograms = [
    {
      id: 1,
      title: "Youth Development Program",
      subtitle: "Ages 8-16 • Building Future Stars",
      description:
        "Comprehensive training focused on fundamental skills, teamwork, and character development for young athletes.",
      cost: "$120/month",
      schedule: "Mon/Wed/Fri 4-6 PM",
      icon: Box,
      backgroundImage:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center",
            gradient: "from-blue-/90 to-purple-900/90"
    },
    {
      id: 2,
      title: "Elite Performance Training",
      subtitle: "Advanced • High School & College Prep",
      description:
        "Intensive training program designed for serious players preparing for competitive high school and college soccer.",
      cost: "$200/month",
      schedule: "Tue/Thu/Sat 6-8 PM",
      icon: Star,
      backgroundImage:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop&crop=center",
      gradient: "from-black/40 via-black/30 to-black/60"
    },
    {
      id: 3,
      title: "Goalkeeper Academy",
      subtitle: "Specialized • All Skill Levels",
      description:
        "Expert goalkeeper training focusing on reflexes, positioning, distribution, and mental toughness.",
      cost: "$150/month",
      schedule: "Wed/Sat 5-7 PM",
      icon: Lock,
      backgroundImage:
        "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=600&fit=crop&crop=center",
      gradient: "from-gray-300 via-black/30 to-black/60"
    },
  
  ];

  return (
    <div id="programs" className="min-h-screen bg-black text-white p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Ck Soccer Academy
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Transform your game with professional training programs designed for every skill level.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {trainingPrograms.map((program, index) => {
          const Icon = program.icon;

          // Define custom grid spans
          const gridClass =
            index === 0
              ? "md:col-span-4"
              : index === 1
              ? "md:col-span-4"
              : "md:col-span-4";

          return (
            <div
              key={program.id}
              className={`relative ${gridClass} rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-transform duration-300 hover:scale-[1.02] group`}
              style={{
                backgroundImage: `url(${program.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} z-0`} />
              <div className="relative z-10 p-5 flex flex-col justify-between h-full min-h-[300px] backdrop-blur-sm">
                <div className="mb-4">
                  <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                    <Icon className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold leading-tight text-white">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-300">{program.subtitle}</p>
                  <p className="text-sm bg-gradient-to-r text-gray-200 px-2  line-clamp-3">
                    {program.description}
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className=" bg-gradient-to-r rounded-lg text-gray-900 px-4 from-gray-300 via-gray-300 to-gray-400">Cost</span>
                    <span className="font-semibold bg-gradient-to-r rounded-2xl text-gray-900 px-4 from-gray-300 via-gray-300 to-gray-400 ">{program.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Schedule</span>
                    <span className="text-gray-200">{program.schedule}</span>
                  </div>
                  <a href="signupform">
                  <button
                   className="w-full mt-3 py-2 bg-gradient-to-r from-emerald-200 via-gray-300 to-emerald-200 border border-white/20 rounded-lg text-gray-600 font-bold hover:bg-white/20 transition">
                    Join Program
                  </button>
                  </a>
                
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-16">
        <div className="inline-block p-8 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-2">Ready to Elevate Your Game?</h2>
          <p className="text-gray-300 max-w-lg mx-auto text-sm mb-4">
            Join thousands of players who have transformed their skills with our proven training methods.
          </p>
          <a href="signupform" className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition">
            Start Your Journey Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;