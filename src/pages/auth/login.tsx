import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ButtonWithLoader } from "@/components/ui";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onToggleMode: () => void;
}

export default function Login({ onToggleMode }: LoginProps): JSX.Element {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to your backend
      // await api.post("/auth/login", formData);
      
      toast.success("Login successful! Redirecting...");
      // Redirect to dashboard or home page
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-main text-background rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-main mb-2">Welcome Back</h1>
          <p className="text-muted">Sign in to your SwiftPlug account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-main">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-background border-2 border-line focus:border-main focus:ring-0 text-main placeholder:text-muted/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-main">
                Password
              </label>
              <button
                type="button"
                className="text-sm text-muted hover:text-main transition-colors"
                onClick={() => {/* Add forgot password logic */}}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 pl-10 pr-12 rounded-xl bg-background border-2 border-line focus:border-main focus:ring-0 text-main placeholder:text-muted/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-main transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <ButtonWithLoader
            loading={isLoading}
            initialText="Sign In"
            loadingText="Signing In..."
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl text-lg font-bold bg-main text-background hover:bg-main/90 transition-all shadow-lg hover:translate-y-[-2px] hover:shadow-xl flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight size={20} />
          </ButtonWithLoader>
        </form>

        {/* Toggle to Signup */}
        <div className="text-center mt-6">
          <p className="text-muted">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-main font-semibold hover:underline transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}