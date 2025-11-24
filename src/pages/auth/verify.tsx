import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Replace with actual API call
      // const response = await api.post('/auth/verify', { token: verificationToken });
      
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Replace with actual API call
      // const response = await api.post('/auth/resend-verification');
      
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
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Loader className="animate-spin mx-auto mb-4 text-orange-500" size={32} />
            <p className="text-muted-foreground">Verifying your email...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {isVerified ? (
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
          ) : (
            <Mail className="mx-auto mb-4 text-orange-500" size={48} />
          )}
          <CardTitle className="text-2xl font-bold">
            {isVerified ? "Email Verified!" : "Verify Your Email"}
          </CardTitle>
          <CardDescription>
            {isVerified 
              ? "Your email has been successfully verified. You can now access all features."
              : "We've sent a verification link to your email address."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {!isVerified && (
            <>
              <p className="text-sm text-muted-foreground">
                Please check your inbox and click the verification link to activate your account.
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={resendVerification}
                  disabled={isResending}
                  variant="outline"
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <Loader size={16} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </Button>
                
                <Link to="/auth/login" className="block">
                  <Button variant="ghost" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </>
          )}
          
          {isVerified && (
            <Link to="/auth/login" className="block">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Continue to Login
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}