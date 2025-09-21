import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Track Habits", path: "/track" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Green Insights", path: "/insights" },
    { name: "About", path: "/about" }
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-success">eco Tracker</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-success ${
                  location.pathname === item.path
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-success">
              Sign In
            </Button>
            <Button className="bg-success hover:bg-success/90 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}