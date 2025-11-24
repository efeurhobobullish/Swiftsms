import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/API/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";
import { libraries } from "@/constants/data";
import {
  Brain,
  Zap,
  MessageSquare,
  Rocket,
  Github,
  Sparkles,
  Cpu,
  Globe
} from "lucide-react";
import { useThemeStore } from "@/store";

export default function Home() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-colour.svg";

  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        await api.get("/");
      } catch (error) {
        console.error(error);
        toast.error("Services are not available");
      } finally {
        setIsLoading(false);
      }
    };
    checkServices();
  }, []);

  const handleGetStarted = () => {
    window.location.href = "/signup";
  };

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      desc: "Access cutting-edge AI models with real-time processing and intelligent responses.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Experience sub-second response times with our optimized AI infrastructure.",
    },
    {
      icon: Cpu,
      title: "Multi-Modal AI",
      desc: "Text, image, and voice processing in one powerful platform.",
    },
    {
      icon: Globe,
      title: "Global Scale",
      desc: "Deploy AI solutions that scale seamlessly across the globe.",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "<500ms", label: "Avg Response" },
    { value: "10M+", label: "Requests/Day" },
    { value: "50+", label: "AI Models" },
  ];

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col overflow-x-hidden">
        {/* Header */}
        <header className="w-full p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <img src={logoPath} alt="AI Platform Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-main to-main/70 bg-clip-text text-transparent">
              NeuralCore
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 md:pb-20 w-full max-w-7xl mx-auto relative">
          <AnimatePresence>
            {isLoading ? (
              <div className="center gap-3 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Loader size={28} className="animate-spin text-main" />
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-main animate-pulse" />
                </div>
                <p className="text-main/80 text-sm font-medium animate-pulse">
                  Initializing AI Services...
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-12 text-center w-full"
              >
                {/* Hero Section */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="flex justify-center mb-8"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        <img src={logoPath} alt="AI Platform Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-main/20 to-main/5 rounded-full blur-xl -z-10" />
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-main via-main to-main/80 tracking-tight"
                  >
                    NeuralCore
                  </motion.h1>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-4"
                  >
                    <p className="text-muted text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Next Generation AI Platform
                      <Sparkles className="w-4 h-4" />
                    </p>
                    <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                      Build intelligent applications with our powerful AI infrastructure. 
                      <span className="block text-main font-medium mt-2">
                        Smarter, Faster, Better.
                      </span>
                    </p>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
                >
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-4 rounded-2xl bg-secondary/50 border border-line">
                      <div className="text-2xl md:text-3xl font-bold text-main mb-1">{stat.value}</div>
                      <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 w-full sm:w-auto"
                >
                  <ButtonWithLoader
                    loading={false}
                    initialText="Get Started Free"
                    loadingText=""
                    onClick={handleGetStarted}
                    className="h-12 md:h-14 px-8 md:px-10 rounded-full text-base md:text-lg min-w-[200px] shadow-xl bg-main text-background hover:bg-main/90 transition-all hover:shadow-2xl hover:scale-105"
                  />
                  <button
                    onClick={() => window.open("https://github.com/efeurhobobullish", "_blank")}
                    className="flex items-center justify-center gap-2 h-12 md:h-14 px-8 rounded-full text-sm md:text-base font-medium text-muted hover:text-main transition-all border border-line hover:border-main/50 bg-transparent w-full sm:w-auto hover:scale-105"
                  >
                    <Github size={20} /> View on GitHub
                  </button>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-20 w-full"
                >
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.9 + idx * 0.1 }}
                      className="p-6 rounded-2xl border border-line bg-background hover:bg-secondary/40 transition-all group cursor-default hover:-translate-y-2 duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-main to-main/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-main/10 to-main/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon size={24} className="text-main" />
                      </div>
                      <h3 className="font-bold text-lg mb-3 text-main">{feature.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Libraries / Tech Stack */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.1 }}
                  className="mt-16 md:mt-24 text-center space-y-6 w-full"
                >
                  <p className="text-muted text-sm uppercase tracking-widest mb-6">
                    Powered By Advanced Technology
                  </p>
                  <ul className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                    {libraries.map((library) => (
                      <li
                        key={library}
                        className="text-xs font-medium text-muted bg-secondary border border-line rounded-full px-4 py-2 hover:border-main/50 hover:text-main transition-all cursor-default hover:scale-105"
                      >
                        {library}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Pattern>
  );
}