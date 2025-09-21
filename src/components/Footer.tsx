import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-success">eco Tracker</span>
            </div>
            <p className="text-muted-foreground">
              Making a <span className="text-success font-medium">measurable difference</span> for our planet, one sustainable habit at a time. Join the <span className="text-success font-medium">movement</span> towards a greener future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-success transition-colors">
                Home
              </Link>
              <Link to="/track" className="block text-muted-foreground hover:text-success transition-colors">
                Track Habits
              </Link>
              <Link to="/dashboard" className="block text-muted-foreground hover:text-success transition-colors">
                Dashboard
              </Link>
              <Link to="/insights" className="block text-muted-foreground hover:text-success transition-colors">
                Green Insights
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-success transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Our Impact */}
          <div>
            <h3 className="font-semibold mb-4">Our Impact</h3>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-success">500kg+</div>
                <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">1,200+</div>
                <div className="text-sm text-muted-foreground">Actions Logged</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 eCO₂Tracker. All <span className="text-success">rights reserved</span>.
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Building <span className="text-success">sustainable habits</span> for a <span className="text-success">better tomorrow</span> 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}