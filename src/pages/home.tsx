import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  Zap, 
  Globe, 
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X, 
  Moon, 
  Sun,
  ShieldCheck,
  CreditCard,
  Search,
  MessageSquare,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import CountUp from 'react-countup';

/**
 * UI COMPONENTS
 */

const ModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-main hover:bg-line transition-colors"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const Pattern = ({ children }) => (
  <div className="relative w-full min-h-screen bg-background text-main overflow-x-hidden font-sans selection:bg-main selection:text-background">
    <div className="fixed inset-0 z-0 opacity-[0.4] pointer-events-none" 
      style={{
        backgroundImage: `radial-gradient(var(--line) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 text-sm md:text-base";
  const styles = {
    primary: "bg-main text-background hover:bg-main/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    outline: "border-2 border-line bg-transparent hover:bg-secondary text-main",
    ghost: "bg-transparent hover:bg-secondary text-muted hover:text-main"
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

/**
 * PAGE SECTIONS
 */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-[1280px] w-[90%] mx-auto h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-main text-background rounded-xl flex items-center justify-center shadow-md">
            <Zap size={22} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-main">SwiftPlug</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`} 
              className="text-sm font-medium text-muted hover:text-main transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" className="px-4">Log in</Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-main">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-line bg-background overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  onClick={() => setIsOpen(false)} 
                  className="text-lg font-medium text-main"
                >
                  {item}
                </a>
              ))}
              <hr className="border-line" />
              <Button variant="outline" className="w-full">Log in</Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 w-full max-w-[1280px] mx-auto min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Badge */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-secondary/50 backdrop-blur-md text-sm font-medium text-muted mb-8"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span>
           <CountUp end={4532} separator="," duration={3} />+ active numbers online
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-main leading-[1.05] mb-8 max-w-5xl"
      >
        Get your <span className="text-muted">virtual number</span><br />
        running in minutes.
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Empower your online presence. Seamlessly receive verification codes from top platforms like WhatsApp, Google Voice, and more.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-20"
      >
        <Button className="h-14 px-8 text-lg rounded-2xl w-full sm:w-auto min-w-[180px]">
          Get Number 🚀
        </Button>
        <Button variant="outline" className="h-14 px-8 text-lg rounded-2xl w-full sm:w-auto min-w-[180px]">
          View Pricing
        </Button>
      </motion.div>

      {/* Mock Interface */}
      <motion.div 
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-4xl mx-auto"
      >
        {/* Abstract Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[80px] rounded-full -z-10" />
        
        {/* Main Card */}
        <div className="relative bg-background border border-line rounded-[2rem] p-6 md:p-8 shadow-2xl">
           <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Col: Selection */}
              <div className="space-y-4 text-left">
                 <div className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Select Service</div>
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
                    <input type="text" placeholder="Search service..." className="w-full h-12 pl-12 pr-4 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-main/10 transition-all font-medium" disabled />
                 </div>
                 
                 <div className="space-y-2 mt-4">
                    {[
                      { name: 'WhatsApp', price: '$0.50', color: 'bg-green-500' },
                      { name: 'Google', price: '$0.80', color: 'bg-blue-500' },
                      { name: 'Telegram', price: '$0.45', color: 'bg-sky-400' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary cursor-pointer border border-transparent hover:border-line transition-all group">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-white`}>
                              {item.name[0]}
                            </div>
                            <span className="font-bold">{item.name}</span>
                         </div>
                         <span className="text-sm font-medium text-muted bg-secondary px-2 py-1 rounded-md group-hover:bg-white dark:group-hover:bg-black transition-colors">{item.price}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Right Col: SMS Receiver */}
              <div className="bg-secondary/50 rounded-2xl border border-line p-5 relative overflow-hidden flex flex-col justify-between min-h-[250px]">
                 <div className="flex justify-between items-center mb-6">
                    <div className="text-xs font-bold text-muted uppercase">Live SMS Feed</div>
                    <div className="flex gap-1">
                       <div className="w-2 h-2 rounded-full bg-red-400" />
                       <div className="w-2 h-2 rounded-full bg-yellow-400" />
                       <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                 </div>

                 {/* Simulated Message */}
                 <div className="space-y-3">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-background p-4 rounded-2xl rounded-tl-sm border border-line shadow-sm max-w-[90%]"
                    >
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-main">WhatsApp</span>
                          <span className="text-[10px] text-muted">Just now</span>
                       </div>
                       <p className="text-sm text-muted">
                          Your verification code is: <span className="text-main font-mono font-bold text-base ml-1">492-110</span>
                       </p>
                    </motion.div>
                 </div>
                 
                 <div className="mt-4 pt-4 border-t border-line/50 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-muted">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                       Waiting for SMS...
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </motion.div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Activation",
      desc: "Get your virtual US number up and running within minutes."
    },
    {
      icon: Smartphone,
      title: "Universal Compatibility",
      desc: "Our numbers work seamlessly with all major verification platforms."
    },
    {
      icon: CreditCard,
      title: "Affordable Plans",
      desc: "Choose from a variety of flexible pricing plans to suit your budget."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 border-y border-line bg-secondary/30">
      <div className="max-w-[1280px] w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-main">What SwiftPlug Offers</h2>
            <p className="text-muted text-lg">We simplify online verifications for individuals and businesses alike.</p>
          </div>
          <Button variant="ghost" className="rounded-full group">
            See all features 
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-background p-8 rounded-3xl border border-line hover:border-main transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary to-transparent opacity-50 rounded-bl-full" />
              
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-main group-hover:scale-110 transition-transform shadow-sm">
                <feat.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-main">{feat.title}</h3>
              <p className="text-muted leading-relaxed text-base">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { 
      num: "01", 
      title: "Create an Account", 
      desc: "First, you need to create an account. Log in to view your dashboard.",
      icon: ShieldCheck
    },
    { 
      num: "02", 
      title: "Top Up", 
      desc: "After logging in, top UP your account with at least ₦1,000 or $1.",
      icon: CreditCard
    },
    { 
      num: "03", 
      title: "Place Order", 
      desc: "Select the desired country and service. Copy the number and use it.",
      icon: CheckCircle2
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 max-w-[1280px] w-[90%] mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-main font-bold tracking-widest text-xs uppercase border border-line px-3 py-1 rounded-full bg-secondary">Workflow</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 text-main">How it works</h2>
        <p className="text-muted text-lg">Follow the steps below to start using SwiftPlug.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] border-t-2 border-dashed border-line z-0" />

        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="relative z-10 flex flex-col items-center text-center bg-background p-4"
          >
            <div className="w-24 h-24 rounded-3xl bg-background border-2 border-line flex items-center justify-center mb-8 shadow-sm group hover:border-main transition-colors duration-300">
               <step.icon size={32} className="text-muted group-hover:text-main transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-main">{step.title}</h3>
            <p className="text-muted text-sm px-2 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    { q: "What is a virtual number?", a: "A virtual number is a phone number that functions without a SIM card and is not linked to a specific device. Communication between participants is carried out via the Internet." },
    { q: "How to get started with us?", a: "Simply sign up for an account, deposit funds into your wallet using our secure payment gateways, and select the service you need to verify." },
    { q: "Do I have to be online whenever I place an order?", a: "Yes, you should be online to receive the OTP code immediately on your dashboard when it arrives." },
    { q: "How can I Top-Up?", a: "We support various payment methods including Credit Cards and Crypto. Navigate to the wallet section in your dashboard to add funds." },
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-secondary/20 border-t border-line">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-main">Frequently asked questions</h2>
          <p className="text-muted">We have all the answers for you!</p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={false}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-background border-main shadow-lg' : 'bg-background border-line hover:border-main/40'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className="text-lg font-bold pr-8 text-main">{item.q}</span>
                <ChevronDown className={`text-muted transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-main' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-muted leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-main text-background py-20 px-6">
    <div className="max-w-[1280px] w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-background text-main rounded-lg flex items-center justify-center">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold">SwiftPlug</span>
          </div>
          <p className="text-background/60 leading-relaxed mb-6 text-sm">
            Empower your online presence with reliable virtual numbers.
          </p>
          <div className="flex gap-4">
             {/* Social placeholders */}
             {[1,2,3].map(i => (
               <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                 <Globe size={18} />
               </div>
             ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-background/60 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Legal</h4>
          <ul className="space-y-4 text-background/60 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contact</h4>
          <ul className="space-y-4 text-background/60 text-sm">
            <li>support@swiftplug.com</li>
            <li>+1 (555) 000-0000</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-background/40 text-sm">
        <p>&copy; 2024 SwiftPlug. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function SwiftPlugApp() {
  return (
    <Pattern>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
          <HowItWorks />
          <FAQ />
        </main>
        <Footer />
      </div>
    </Pattern>
  );
}


