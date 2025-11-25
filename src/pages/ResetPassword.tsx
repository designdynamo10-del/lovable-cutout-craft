import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  
  const { updatePassword, session, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user has a recovery session
  useEffect(() => {
    if (!loading && !session) {
      toast({
        title: "Invalid or expired link",
        description: "Please request a new password reset link.",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [session, loading, navigate, toast]);

  const validate = () => {
    const newErrors: typeof errors = {};
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await updatePassword(password);
      
      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setIsSuccess(true);
        toast({
          title: "Password updated!",
          description: "Your password has been successfully changed.",
        });
        
        // Redirect after short delay
        setTimeout(() => navigate("/"), 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | BgRemover</title>
        <meta name="description" content="Set your new password." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="w-full max-w-md px-4">
            <div className="glass-card rounded-2xl p-8">
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold mb-2">Password Updated!</h1>
                  <p className="text-muted-foreground">
                    Redirecting you to the app...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
                    <p className="text-muted-foreground text-sm">
                      Enter your new password below
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.password && (
                        <p className="text-xs text-destructive">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ResetPassword;
