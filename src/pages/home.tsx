import { useEffect, useState } from "react";
import { toast } from "sonner";
import CountUp from "react-countup";
import { 
  Loader, 
  MessageCircle, 
  Smartphone, 
  ShieldCheck, 
  Globe, 
  Phone
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate connection check
    const checkServices = async () => {
      setIsLoading(true);
      try {
        await api.get("/");
      } catch (error) {
        console.log("API check finished");
      } finally {
        setIsLoading(false);
      }
    };
    checkServices();
  }, []);

  const handleSearch = () => {
    if (!searchQuery) {
      toast.error("Please enter a service name first");
      return;
    }
    toast.success(`Searching numbers for ${searchQuery}...`);
    window.location.href = "/dashboard?service=" + searchQuery;
  };

  const steps = [
    { 
      icon: Globe, 
      title: "Select Country", 
      desc: "150+ Regions supported" 
    },
    { 
      icon: MessageCircle, 
      title: "Choose App", 
      desc: "WhatsApp, Telegram, etc" 
    },
    { 
      icon: Smartphone, 
      title: "Get Number", 
      desc: "Instant allocation" 
    },
    { 
      icon: ShieldCheck, 
      title: "Receive SMS", 
      desc: "Code appears here" 
    },
  ];

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col overflow-x-hidden font-sans text-main">
        {/* Header */}
        <header className="w-full p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-main text-background rounded-xl">
               <Phone className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <span className="text-xl font-bold tracking-tight text-main">
              VirtuNum
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
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-16 text-center w-full"
              >
                {/* Hero Section */}
                <div className="space-y-8 max-w-3xl mx-auto mt-8 md:mt-0">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-secondary/50 backdrop-blur-md text-sm font-medium text-muted"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>
                      <CountUp end={8500} separator="," duration={2.5} />+ numbers online now
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-main leading-[0.9]"
                  >
                    Get Virtual <br/>
                    <span className="text-muted">SMS Numbers</span> <br/>
                    Instantly!
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-muted text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
                  >
                    Bypass OTP verifications for WhatsApp, Telegram, and PayPal.
                    <span className="text-main font-semibold italic"> Securely</span> and privately. 
                  </motion.p>
                  
                  {/* Interactive Search Input */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto w-full pt-4"
                  >
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted font-medium">
                        Service:
                      </div>
                      <input 
                        type="text" 
                        placeholder="WhatsApp, Telegram..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 pl-[90px] pr-4 rounded-2xl bg-background border-2 border-line focus:border-main focus:ring-0 text-lg font-medium placeholder:text-muted/50 transition-all"
                      />
                    </div>
                    <ButtonWithLoader
                      loading={false}
                      initialText="Get Number"
                      loadingText=""
                      onClick={handleSearch}
                      className="h-14 px-8 rounded-2xl text-lg font-bold bg-main text-background hover:bg-main/90 transition-all w-full sm:w-auto min-w-[140px] shadow-xl hover:translate-y-[-2px] hover:shadow-2xl"
                    />
                  </motion.div>
                </div>

                {/* Social Proof / Cards */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="relative"
                >
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-500/5 via-transparent to-green-500/5 blur-3xl rounded-full -z-10" />

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
                      {/* Fake Message Card 1 */}
                      <div className="p-6 rounded-3xl bg-background border border-line text-left shadow-sm rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                            <MessageCircle size={20} fill="currentColor" />
                          </div>
                          <span className="text-xs text-muted font-mono">
                             <CountUp end={5} duration={2} />s ago
                          </span>
                        </div>
                        <p className="text-lg font-medium text-main">"PayPal: Your security code is 882-991."</p>
                      </div>

                      {/* Fake Message Card 2 */}
                      <div className="p-6 rounded-3xl bg-main text-background border border-main text-left shadow-xl scale-105 z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                            <ShieldCheck size={20} />
                          </div>
                          <span className="text-xs text-white/60 font-mono">
                            <CountUp end={2} duration={4} />s ago
                          </span>
                        </div>
                        <p className="text-lg font-medium">"WhatsApp code: 442-123. Verification complete."</p>
                      </div>

                      {/* Fake Message Card 3 */}
                      <div className="p-6 rounded-3xl bg-background border border-line text-left shadow-sm rotate-[3deg] hover:rotate-0 transition-transform duration-300">
                         <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                            <Phone size={20} />
                          </div>
                          <span className="text-xs text-muted font-mono">
                            <CountUp end={12} duration={3} />s ago
                          </span>
                        </div>
                        <p className="text-lg font-medium text-main">"Uber: Your verification code is 1124."</p>
                      </div>
                   </div>
                </motion.div>

                {/* REDESIGNED: How it Works (Compact Horizontal Cards) */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="pt-12 w-full max-w-6xl mx-auto px-4"
                >
                  {/* Title */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                     <div className="h-[1px] w-12 bg-line"></div>
                     <p className="text-muted text-xs uppercase tracking-[0.2em] font-bold">
                       How it works
                     </p>
                     <div className="h-[1px] w-12 bg-line"></div>
                  </div>

                  {/* The Grid: 2x2 on desktop, but small cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-line bg-background/50 hover:bg-secondary/20 hover:border-main/20 transition-all duration-300 text-left group"
                      >
                        {/* Smaller Icon Container */}
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-main group-hover:scale-105 group-hover:bg-main group-hover:text-background transition-all">
                          <step.icon size={20} strokeWidth={2} />
                        </div>
                        
                        {/* Text Side-by-Side */}
                        <div className="flex flex-col">
                          <h3 className="font-bold text-sm text-main">{step.title}</h3>
                          <p className="text-muted text-xs leading-tight mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Pattern>
  );
}
