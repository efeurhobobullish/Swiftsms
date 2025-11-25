import { useState } from "react";
import { 
  Bell, 
  Search, 
  Plus,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  Wallet,
  Car,
  ChevronRight,
  Clock,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/layouts/BottomNav"; // Importing your new Nav
import { ModeToggle } from "@/components/ui";

const SERVICES = [
  { id: "wa", name: "WhatsApp", price: 0.50, icon: MessageCircle, color: "bg-green-500" },
  { id: "tg", name: "Telegram", price: 0.45, icon: Send, color: "bg-blue-400" },
  { id: "ig", name: "Instagram", price: 0.15, icon: Instagram, color: "bg-pink-500" },
  { id: "fb", name: "Facebook", price: 0.20, icon: Facebook, color: "bg-blue-600" },
  { id: "pp", name: "PayPal", price: 0.60, icon: Wallet, color: "bg-blue-800" },
  { id: "ub", name: "Uber", price: 0.25, icon: Car, color: "bg-black" },
];

export default function Dashboard() {
  const [balance] = useState(12.50);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-line px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-main to-muted flex items-center justify-center text-background font-bold text-lg">
              U
            </div>
            <div>
              <p className="text-xs text-muted font-medium">Welcome back,</p>
              <h2 className="text-sm font-bold">User882</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <button className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-main hover:bg-secondary/80 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 pt-6 space-y-8">
        
        {/* Balance Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-main text-background rounded-[2rem] p-6 shadow-xl relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Total Balance</p>
                <h1 className="text-4xl font-bold tracking-tight">${balance.toFixed(2)}</h1>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-2">
                <Plus size={16} /> Top Up
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-white/60 text-xs font-mono bg-black/20 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              ID: 882-991-002
            </div>
          </div>
        </motion.div>

        {/* Search & Active Order */}
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Find a service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary/50 border border-line rounded-2xl py-4 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all"
            />
          </div>

          {/* Active Order Card (Static Example) */}
          <div className="bg-background border border-line rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Waiting for SMS
              </h3>
              <span className="text-xs font-mono text-muted bg-secondary px-2 py-1 rounded-md">14:20</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-main">WhatsApp</p>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <MapPin size={10} /> USA
                  </div>
                </div>
                <p className="text-lg font-mono font-medium tracking-wide text-main/80">+1 (555) 012-3456</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Popular Services</h3>
            <button className="text-sm text-muted hover:text-main flex items-center gap-1 transition-colors">
              See All <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((service) => (
              <motion.button 
                key={service.id}
                whileTap={{ scale: 0.98 }}
                className="bg-background border border-line p-4 rounded-3xl flex flex-col gap-3 hover:border-main/50 transition-colors text-left group"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-2xl ${service.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <service.icon size={20} />
                  </div>
                  <span className="bg-secondary text-main text-xs font-bold px-2 py-1 rounded-lg">
                    ${service.price.toFixed(2)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-main">{service.name}</p>
                  <p className="text-xs text-muted">1.2k+ numbers</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="pb-4">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-transparent hover:border-line transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-main">Telegram Verification</p>
                  <p className="text-xs text-muted">Yesterday at 2:30 PM</p>
                </div>
                <span className="text-sm font-bold text-red-500">-$0.45</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* The Floating Navigation */}
      <BottomNav />
    </div>
  );
}
