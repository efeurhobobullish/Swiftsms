import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ghost, 
  Copy, 
  Share2, 
  Settings, 
  LogOut, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Inbox
} from "lucide-react";
import { Pattern } from "@/components/ui";

// Define interfaces for data types
interface Message {
  id: number;
  content: string;
  time: string;
  isNew: boolean;
  color: string;
}

interface User {
  username: string;
  link: string;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Mock User Data
  const user: User = {
    username: "anonymous_user",
    link: "anonymous.com/anonymous_user"
  };

  // State for messages with specific type
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessages([
        { id: 1, content: "Do you have a crush on anyone right now? 👀", time: "2m ago", isNew: true, color: "bg-red-500" },
        { id: 2, content: "I saw you at the mall today, you looked great!", time: "1h ago", isNew: true, color: "bg-purple-500" },
        { id: 3, content: "Be honest, what's your biggest regret?", time: "3h ago", isNew: false, color: "bg-blue-500" },
        { id: 4, content: "Rate our friendship 1-10", time: "5h ago", isNew: false, color: "bg-orange-500" },
        { id: 5, content: "Who is your favorite artist?", time: "1d ago", isNew: false, color: "bg-green-500" },
      ]);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.link);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (e: MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Send me an anonymous message!',
          text: 'Check out my anonymous link',
          url: 'https://' + user.link,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col font-sans text-main">

        {/* Header */}
        <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-20 sticky top-0 bg-background/80 backdrop-blur-md border-b border-line/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-main text-background rounded-xl">
               <Ghost className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-main hidden sm:block">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-secondary text-muted hover:text-main transition-colors">
              <Settings size={20} />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">

          {/* Link Section */}
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-background border border-line rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
          >
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-main/5 to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl font-bold text-main">Your Personal Link</h2>
                <p className="text-muted text-sm max-w-md">
                  Share this link on your Instagram Story, Snapchat or TikTok to get messages.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="h-12 px-4 rounded-xl bg-secondary border border-line flex items-center text-muted font-medium w-full sm:w-80 overflow-hidden whitespace-nowrap text-sm">
                  {user.link}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    onClick={handleCopy}
                    className="h-12 px-6 rounded-xl bg-main text-background font-bold hover:bg-main/90 transition-all active:scale-95 flex items-center justify-center gap-2 flex-1 sm:flex-none"
                  >
                    {copied ? <span className="text-green-400">Copied!</span> : <> <Copy size={18} /> Copy </>}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="h-12 w-12 rounded-xl border border-line bg-background text-main hover:bg-secondary transition-all active:scale-95 flex items-center justify-center"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Inbox Section */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Inbox size={24} /> Inbox 
                  <span className="text-xs bg-main text-background px-2 py-0.5 rounded-full">{messages.filter(m => m.isNew).length} new</span>
                </h3>

                {/* Filter / Sort (Visual Only) */}
                <select className="bg-transparent text-sm font-medium text-muted border-none outline-none cursor-pointer hover:text-main focus:ring-0">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
             </div>

             {/* Messages Grid */}
             <AnimatePresence mode="wait">
                {isLoading ? (
                  <div className="w-full h-64 flex flex-col items-center justify-center gap-4 text-muted">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
                    <p className="text-sm font-medium animate-pulse">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="w-full h-64 rounded-3xl border border-dashed border-line flex flex-col items-center justify-center gap-4 text-muted bg-secondary/20"
                  >
                    <MessageSquare size={48} className="opacity-20" />
                    <p>No messages yet. Share your link to get started!</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`group relative p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-48 cursor-pointer
                          ${msg.isNew 
                            ? "bg-background border-main shadow-md" 
                            : "bg-secondary/20 border-line hover:border-muted/50"
                          }
                        `}
                      >
                        {/* New Badge */}
                        {msg.isNew && (
                          <div className="absolute -top-3 -right-3 bg-main text-background text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <Sparkles size={10} /> NEW
                          </div>
                        )}

                        <div className="space-y-3">
                           <div className="flex justify-between items-start">
                             {/* Decorative dot */}
                             <div className={`w-3 h-3 rounded-full ${msg.color ? msg.color : 'bg-main'}`}></div>
                             <span className="text-xs font-mono text-muted flex items-center gap-1">
                               <Clock size={10} /> {msg.time}
                             </span>
                           </div>
                           <p className={`text-lg font-medium line-clamp-3 leading-snug ${msg.isNew ? "text-main" : "text-main/80"}`}>
                             "{msg.content}"
                           </p>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-line/50 mt-auto">
                           <span className="text-xs font-bold uppercase tracking-wider text-muted group-hover:text-main transition-colors">
                             View Reply
                           </span>
                           <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-main opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                             <ChevronRight size={16} />
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

        </main>
      </div>
    </Pattern>
  );
}