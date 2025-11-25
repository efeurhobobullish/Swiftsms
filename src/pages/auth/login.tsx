import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowLeft,
  Zap,
  Smartphone
} from "lucide-react";
import { ButtonWithLoader, Pattern } from "@/components/ui";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle successful login
      console.log("Login successful", formData);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      setErrors({ submit: "Invalid email or password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@swift.com",
      password: "demopassword123",
      rememberMe: false
    });
  };

  return (
    <Pattern>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted hover:text-main transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-line rounded-2xl p-8 shadow-sm"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center text-card">
                  <Zap size={24} fill="currentColor" />
                </div>
                <span className="text-2xl font-bold text-main">SWIFT</span>
              </div>
              <h1 className="text-2xl font-bold text-main mb-2">Welcome back</h1>
              <p className="text-muted">Sign in to your account to continue</p>
            </div>

            {/* Demo Login Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleDemoLogin}
              className="w-full mb-6 p-3 rounded-xl bg-secondary border border-line hover:border-primary/30 transition-all flex items-center justify-center gap-3 group"
            >
              <Smartphone size={20} className="text-muted group-hover:text-primary transition-colors" />
              <span className="text-main font-medium">Try Demo Account</span>
            </motion.button>

            {/* Divider */}
            <div className="mb-6 flex items-center">
              <div className="flex-1 h-px bg-line"></div>
              <span className="px-4 text-sm text-muted">or sign in with email</span>
              <div className="flex-1 h-px bg-line"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-main mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" 
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full h-12 pl-10 pr-4 rounded-xl bg-background border ${
                      errors.email ? "border-red-500" : "border-line"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-main placeholder:text-muted/50`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-main">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock 
                    size={20} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" 
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full h-12 pl-10 pr-12 rounded-xl bg-background border ${
                      errors.password ? "border-red-500" : "border-line"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-main placeholder:text-muted/50`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-main transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-line text-primary focus:ring-primary/20 focus:ring-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-muted">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <ButtonWithLoader
                type="submit"
                loading={isLoading}
                initialText="Sign In"
                loadingText="Signing in..."
                className="w-full h-12 rounded-xl bg-primary text-card font-semibold hover:bg-primary/90 active:scale-95 transition-all"
              />

              {errors.submit && (
                <p className="text-red-500 text-sm text-center">
                  {errors.submit}
                </p>
              )}
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-muted">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-muted max-w-sm mx-auto">
              Your data is securely encrypted. We never share your information with third parties.
            </p>
          </motion.div>
        </div>
      </div>
    </Pattern>
  );
}