import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader, Mail, CheckCircle, } from "lucide-react";
import { ButtonWithLoader } from "@/components/ui";
import { useThemeStore } from "@/store";

export default function Verify() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-colour.svg";

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsVerified(true);
      toast.success("Email verified successfully!");
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Verification email sent!");
    } catch (error) {
      toast.error("Failed to send verification email.");
    } finally {
      setIsResending(false);
    }
  };

  if (token && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-orange-500" size={32} />
          <p className="text-muted-foreground">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16">
            <img src={logoPath} alt="GameSquad" className="w-full h-full" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {isVerified ? (
            <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
          ) : (
            <Mail className="mx-auto mb-4 text-orange-500" size={64} />
          )}
          
          <h1 className="text-2xl font-bold mb-2">
            {isVerified ? "Email Verified!" : "Verify Your Email"}
          </h1>
          
          <p className="text-muted-foreground mb-6">
            {isVerified 
              ? "Your email has been successfully verified. You can now access all features."
              : "We've sent a verification link to your email address."
            }
          </p>

          {!isVerified && (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Please check your inbox and click the verification link to activate your account.
              </p>
              
              <div className="space-y-3">
                <ButtonWithLoader
                  loading={isResending}
                  initialText="Resend Verification Email"
                  loadingText="Sending..."
                  onClick={resendVerification}
                  className="w-full py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors"
                />
                
                <Link to="/login" className="block">
                  <button className="w-full py-3 text-muted-foreground hover:text-foreground rounded-lg font-medium transition-colors">
                    Back to Login
                  </button>
                </Link>
              </div>
            </>
          )}
          
          {isVerified && (
            <Link to="/auth/login" className="block">
              <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-medium transition-all hover:shadow-lg">
                Continue to Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}