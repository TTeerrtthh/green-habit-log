import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { TrendingUp, Users, Leaf, Target, ArrowRight } from "lucide-react";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 animate-pulse" />
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen gradient-primary">
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 gradient-success rounded-full mb-6">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Track Your Carbon Impact
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Make sustainable choices every day and watch your positive environmental impact grow with our comprehensive carbon footprint tracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate(user ? "/dashboard" : "/auth")}
              >
                {user ? "Go to Dashboard" : "Start Tracking Today"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <TrendingUp className="w-8 h-8 mb-2" />
                <CardTitle>Track Progress</CardTitle>
                <CardDescription className="text-white/80">
                  Monitor your daily sustainable habits and see your environmental impact grow over time.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <Target className="w-8 h-8 mb-2" />
                <CardTitle>Set Goals</CardTitle>
                <CardDescription className="text-white/80">
                  Create personal targets for CO₂ reduction and work towards a more sustainable lifestyle.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <Users className="w-8 h-8 mb-2" />
                <CardTitle>Join Community</CardTitle>
                <CardDescription className="text-white/80">
                  Connect with like-minded individuals and share your journey towards sustainability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {!user && (
            <div className="text-center">
              <Card className="bg-white/10 border-white/20 text-white max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Ready to get started?</CardTitle>
                  <CardDescription className="text-white/80">
                    Create your free account and start tracking your sustainable habits today.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate("/auth")}
                    className="w-full bg-white text-primary hover:bg-white/90"
                  >
                    Sign Up Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
