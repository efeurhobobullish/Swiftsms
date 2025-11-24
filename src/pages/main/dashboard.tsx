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
import { Pattern, ModeToggle } from "@/components/ui";

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
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const user: User = {
    username: "anonymous_user",
    link: "anonymous.com/anonymous_user"
  };

  useEffect(() => {
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
      <div className="min-h-screen flex flex-col font-sans text-main">
        
        {/* Header */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-line/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-main text-background rounded-xl center">
                <Ghost className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold hidden sm:block">Dashboard</span>
            </div>

            <div className="flex items-center gap-3">
              <ModeToggle />
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
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto p-6 space-y-8">
          
          {/* Link Card */}
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-background border border-line rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-main/5 to-transparent rounded-bl-full" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left space-y-3">
                <h2 className="text-2xl font-bold">Your Personal Link</h2>
                <p className="text-muted max-w-md">
                  Share this link on your social media to receive anonymous messages
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <div className="h-12 px-4 rounded-xl bg-secondary border border-line flex items-center text-muted font-medium w-full sm:w-80 overflow-hidden text-sm">
                  {user.link}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    onClick={handleCopy}
                    className="h-12 px-6 rounded-xl bg-main text-background font-bold hover:bg-main/90 transition-all flex items-center gap-2 flex-1 sm:flex-none"
                  >
                    {copied ? "Copied!" : <><Copy size={18} /> Copy</>}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="h-12 w-12 rounded-xl border border-line bg-background hover:bg-secondary transition-all center"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Inbox Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Inbox size={24} />
                Inbox
                <span className="text-xs bg-main text-background px-2 py-1 rounded-full">
                  {messages.filter(m => m.isNew).length} new
                </span>
              </h3>

              <select className="bg-transparent text-sm text-muted border-none outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
            </div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="h-64 center flex-col gap-4 text-muted">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main" />
                  <p className="text-sm animate-pulse">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-64 rounded-3xl border border-dashed border-line center flex-col gap-4 text-muted bg-secondary/20"
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
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-48 cursor-pointer
                        ${message.isNew 
                          ? "bg-background border-main shadow-md" 
                          : "bg-secondary/20 border-line hover:border-muted/50"
                        }
                      `}
                    >
                      {message.isNew && (
                        <div className="absolute -top-3 -right-3 bg-main text-background text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles size={10} /> NEW
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className={`w-3 h-3 rounded-full ${message.color}`} />
                          <span className="text-xs text-muted flex items-center gap-1">
                            <Clock size={10} /> {message.time}
                          </span>
                        </div>
                        <p className={`text-lg font-medium line-clamp-3 leading-snug ${message.isNew ? "text-main" : "text-main/80"}`}>
                          "{message.content}"
                        </p>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-line/50 mt-auto">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted group-hover:text-main transition-colors">
                          View Reply
                        </span>
                        <div className="w-8 h-8 rounded-full bg-secondary center text-main opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>
      </div>
    </Pattern>
  );
}