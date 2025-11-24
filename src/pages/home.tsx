"use client";

import { useState, useEffect } from "react";
import ModeToggle from "@/components/ui/mode-toggle";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background text-main font-sans selection:bg-primary/20 overflow-x-hidden">

      {/* --- Floating Navbar --- */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <nav className={`
          w-full max-w-[1200px] rounded-full transition-all duration-500 ease-out border
          flex items-center justify-between px-6 py-3
          ${scrolled 
            ? "bg-background/80 backdrop-blur-xl border-line/50 shadow-sm" 
            : "bg-transparent border-transparent"
          }
        `}>
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer font-bold text-lg">
            NovaAI
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <a href="/login" className="px-5 py-2 text-sm font-medium hover:bg-secondary rounded-full transition-colors">
              Log in
            </a>
            <a href="/signup" className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:shadow-lg transition-all active:scale-95">
              Sign Up
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ModeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-main">
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden animate-in slide-in-from-top-10">
          <div className="flex flex-col gap-6 text-center">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium">Features</a>
            <a href="/login" className="btn border border-line h-12 rounded-xl">Log In</a>
            <a href="/signup" className="btn btn-primary h-12 rounded-xl text-white">Sign Up</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 text-center px-4 relative">
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Talk to your AI assistant
          </h1>
          <p className="text-lg md:text-xl text-muted/80 leading-relaxed">
            Ask questions, get answers, brainstorm ideas, or just have a conversation with your AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a href="/signup" className="h-14 px-8 rounded-full bg-primary text-white font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center">
              Get Started
            </a>
            <a href="#features" className="h-14 px-8 rounded-full border border-line bg-background/50 hover:bg-secondary/50 font-medium transition-all flex items-center justify-center">
              See Features
            </a>
          </div>
        </div>

        {/* Hero Chat Preview */}
        <div className="mt-24 relative h-[360px] w-full max-w-[400px] mx-auto md:mx-0 md:absolute md:left-[50%] md:-translate-x-1/2">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl flex flex-col p-4">
            <div className="flex-1 flex flex-col justify-end space-y-3">
              <div className="self-start bg-secondary p-3 rounded-2xl text-sm">
                Hello! How can I help you today?
              </div>
              <div className="self-end bg-primary text-white p-3 rounded-2xl text-sm">
                Can you explain quantum computing in simple terms?
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="p-8 bg-background/80 rounded-2xl border border-line hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">Instant Answers</h3>
          <p className="text-muted text-sm">Get accurate responses instantly on any topic.</p>
        </div>
        <div className="p-8 bg-background/80 rounded-2xl border border-line hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">Creative Assistance</h3>
          <p className="text-muted text-sm">Generate text, ideas, or content with ease.</p>
        </div>
        <div className="p-8 bg-background/80 rounded-2xl border border-line hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-2">Learning & Research</h3>
          <p className="text-muted text-sm">Use AI to explore and learn new concepts quickly.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to try NovaAI?</h2>
          <p className="text-lg text-muted/80">Start chatting with your personal AI assistant today.</p>
          <a href="/signup" className="h-14 px-10 rounded-full bg-primary text-white font-bold flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
            Sign Up Now
          </a>
        </div>
      </section>

    </div>
  );
}