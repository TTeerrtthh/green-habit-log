import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Signed out successfully",
        description: "Thanks for using eCO₂ Tracker!",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 gradient-success rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">eCO₂ Tracker</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Button>
            {user && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/dashboard")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/insights")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Insights
                </Button>
              </>
            )}
            <Button 
              variant="ghost" 
              onClick={() => navigate("/about")}
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Button>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Beta
            </Badge>
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="hidden sm:inline-flex"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className="justify-start"
              >
                Home
              </Button>
              {user && (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate("/dashboard");
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate("/insights");
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Insights
                  </Button>
                </>
              )}
              <Button 
                variant="ghost" 
                onClick={() => {
                  navigate("/about");
                  setIsMenuOpen(false);
                }}
                className="justify-start"
              >
                About
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}