import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Target, TrendingUp, Award } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">eCO₂ Tracker</h1>
          </div>
          <Button onClick={onGetStarted} className="gradient-primary text-white border-0">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Track Your
                <span className="text-primary gradient-primary bg-clip-text text-transparent"> Carbon </span>
                Impact
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Build sustainable habits, reduce your carbon footprint, and earn rewards for your eco-friendly actions. 
                Join thousands making a difference, one habit at a time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="gradient-primary text-white border-0 shadow-eco-medium hover:shadow-eco-strong transition-all"
              >
                Start Tracking Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">CO₂ Saved (kg)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">Eco Actions</div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="habit-card shadow-eco-soft border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Set Goals</h3>
                  <p className="text-sm text-muted-foreground">Track daily eco-friendly habits</p>
                </div>
              </CardContent>
            </Card>

            <Card className="habit-card shadow-eco-soft border-border/50 mt-8">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">See Progress</h3>
                  <p className="text-sm text-muted-foreground">Visualize your impact over time</p>
                </div>
              </CardContent>
            </Card>

            <Card className="habit-card shadow-eco-soft border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Earn Rewards</h3>
                  <p className="text-sm text-muted-foreground">Get rewarded for consistency</p>
                </div>
              </CardContent>
            </Card>

            <Card className="habit-card shadow-eco-soft border-border/50 mt-8">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-warning animate-float" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Make Impact</h3>
                  <p className="text-sm text-muted-foreground">Contribute to a greener future</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">See How It Works</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Watch how easy it is to track your sustainable habits and see your positive impact on the environment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-eco-medium">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-nature rounded-lg flex items-center justify-center mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/bYb7YLsXvzg"
                    title="eCO₂ Tracker Overview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <h4 className="font-semibold text-foreground">Product Overview</h4>
                <p className="text-sm text-muted-foreground">Learn about all the features</p>
              </CardContent>
            </Card>

            <Card className="shadow-eco-medium">
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-nature rounded-lg flex items-center justify-center mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://go.screenpal.com/watch/cTQYQanDfNG"
                    title="eCO₂ Tracker Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <h4 className="font-semibold text-foreground">Live Demo</h4>
                <p className="text-sm text-muted-foreground">See the app in action</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};