import { useState } from "react";
import { 
  ChevronDown,
  Search,
  CheckCircle2,
  Smartphone,
  Loader2,
  Copy,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Header from "@/layouts/Header";
import BottomNav from "@/layouts/BottomNav";
import { ButtonWithLoader, WalletCard } from "@/components/ui";

import { ALL_COUNTRIES, ALL_SERVICES } from "@/constants/data";
import type { Country, Service } from "@/constants/data";
import { useAuth } from "@/hooks/useAuth";

interface ActiveOrder {
  id: string;
  service: Service;
  country: Country;
  number: string;
  status: "waiting" | "received";
  smsCode: string | null;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [totalNumbers, setTotalNumbers] = useState(42);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(ALL_COUNTRIES[0]);
  const [selectedService, setSelectedService] = useState<Service>(ALL_SERVICES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);

  const filteredCountries = ALL_COUNTRIES.filter((c: Country) => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  
  const filteredServices = ALL_SERVICES.filter((s: Service) => 
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const handlePurchase = async () => {
    if (activeOrder) {
      toast.error("You already have an active number. Finish that first.");
      return;
    }

    if (user.wallet < selectedService.price) {
      toast.error("Insufficient balance. Please fund your wallet.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setTotalNumbers(prev => prev + 1);

    const newOrder: ActiveOrder = {
      id: Math.random().toString(36).substr(2, 9),
      service: selectedService,
      country: selectedCountry,
      number: `${selectedCountry.code} ${Math.floor(Math.random() * 800) + 100} ${Math.floor(Math.random() * 900000) + 100000}`,
      status: "waiting",
      smsCode: null,
    };

    setActiveOrder(newOrder);
    setIsLoading(false);
    toast.success("Number generated successfully!");

    // Simulate SMS reception
    setTimeout(() => {
      setActiveOrder((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          status: "received",
          smsCode: Math.floor(100000 + Math.random() * 900000).toString()
        };
      });
      toast.info("New SMS Received!");
    }, 6000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-20">
      <Header />

      <main className="main pt-16 space-y-4">
        {/* Wallet Card */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <WalletCard />
        </motion.div>

        {/* Stats Section - Smaller */}
        <div className="bg-card border border-line rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-line shadow-sm center">
              <Smartphone size={18} />
            </div>
            <div>
              <p className="text-xs text-muted font-medium">Total Numbers</p>
              <h3 className="text-xl font-bold text-main leading-tight">{totalNumbers}</h3>
            </div>
          </div>
          <button className="bg-card border border-line px-3 py-1.5 rounded-full text-xs hover:border-primary transition-colors">
            History
          </button>
        </div>

        {/* Active Order Section - Smaller */}
        <AnimatePresence>
          {activeOrder && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-line rounded-2xl p-4 relative mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-card border border-line shadow-sm center">
                      <activeOrder.service.icon size={20} className={activeOrder.service.color} />
                    </div>
                    <div>
                      <p className="text-muted text-xs font-medium uppercase tracking-wider">Active Number</p>
                      <p className="font-bold text-base">{activeOrder.service.name}</p>
                    </div>
                  </div>
                  <div className="bg-card px-2 py-1 rounded text-xs font-mono flex items-center gap-1 border border-line">
                    <Clock size={10} /> 14:32
                  </div>
                </div>

                <div className="bg-card border border-line border-dashed rounded-xl p-3 flex items-center justify-between mb-3">
                  <span className="text-lg font-mono font-bold tracking-wide">{activeOrder.number}</span>
                  <button 
                    onClick={() => copyToClipboard(activeOrder.number)}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Copy size={16} className="text-muted" />
                  </button>
                </div>

                <div className="center min-h-[50px]">
                  {activeOrder.status === "waiting" ? (
                    <div className="flex items-center gap-2 animate-pulse text-primary">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="font-bold text-sm">Waiting for SMS...</span>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8 }} 
                      animate={{ scale: 1 }} 
                      className="text-center"
                    >
                      <p className="text-muted text-xs uppercase font-bold tracking-widest mb-1">
                        Your Code
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-mono font-bold text-primary">
                          {activeOrder.smsCode}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(activeOrder.smsCode!)}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Form - Smaller */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base">New Order</h3>
            <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
              Server Online
            </span>
          </div>

          <div className="bg-secondary border border-line rounded-2xl p-1 relative z-20">
            {/* Country Selector */}
            <div className="relative">
              <button 
                onClick={() => { 
                  setIsCountryOpen(!isCountryOpen); 
                  setIsServiceOpen(false);
                  setCountrySearch("");
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-card border border-line center text-lg">
                    {selectedCountry.flag}
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium mb-0.5">Select Country</p>
                    <p className="font-bold text-sm">{selectedCountry.name}</p>
                  </div>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-muted transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isCountryOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-line mx-3"
                  >
                    <div className="relative mt-2 mb-1">
                      <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted"/>
                      <input 
                        type="text" 
                        placeholder="Search country..." 
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full bg-background border border-line rounded-lg pl-8 pr-3 py-1.5 text-sm focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="py-1 space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                      {filteredCountries.map((country: Country) => (
                        <button
                          key={country.id}
                          onClick={() => { 
                            setSelectedCountry(country); 
                            setIsCountryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                            selectedCountry.id === country.id 
                              ? 'bg-card text-main font-bold shadow-sm' 
                              : 'text-muted hover:bg-secondary'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{country.flag}</span>
                            <span className="text-xs">{country.name}</span>
                          </div>
                          {selectedCountry.id === country.id && (
                            <CheckCircle2 size={14} className="text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-[1px] bg-line mx-3 my-1" />

            {/* Service Selector */}
            <div className="relative">
              <button 
                onClick={() => { 
                  setIsServiceOpen(!isServiceOpen); 
                  setIsCountryOpen(false);
                  setServiceSearch("");
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-card border border-line center">
                    <selectedService.icon size={16} className={selectedService.color} />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium mb-0.5">Select Service</p>
                    <p className="font-bold text-sm">{selectedService.name}</p>
                  </div>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-muted transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isServiceOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-line mx-3"
                  >
                    <div className="relative mt-2 mb-1">
                      <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted"/>
                      <input 
                        type="text" 
                        placeholder="Search service..." 
                        value={serviceSearch}
                        onChange={(e) => setServiceSearch(e.target.value)}
                        className="w-full bg-background border border-line rounded-lg pl-8 pr-3 py-1.5 text-sm focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="py-1 space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                      {filteredServices.map((service: Service) => (
                        <button
                          key={service.id}
                          onClick={() => { 
                            setSelectedService(service); 
                            setIsServiceOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                            selectedService.id === service.id 
                              ? 'bg-card text-main font-bold shadow-sm' 
                              : 'text-muted hover:bg-secondary'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <service.icon size={14} className={service.color} />
                            <span className="text-xs">{service.name}</span>
                          </div>
                          <span className="text-xs font-mono">₦{service.price}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Purchase Section - Smaller */}
          <div className="bg-secondary border border-line rounded-2xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted font-medium">Total Cost</p>
              <p className="text-xl font-bold text-main">₦{selectedService.price.toFixed(2)}</p>
            </div>
            <ButtonWithLoader 
              loading={isLoading}
              initialText="Get Number"
              loadingText="Generating..."
              className="btn-primary px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 text-sm"
              onClick={handlePurchase}
            />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}