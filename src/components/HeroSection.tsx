import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Target, CheckCircle, BarChart3, Play } from 'lucide-react';
import heroIllustration from '@/assets/hero-illustration.png';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Track Your Carbon Impact,{' '}
                  <span className="text-success">Grow Your Green Habits</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Join thousands reducing CO₂ emissions through daily habit tracking. Track{' '}
                  <span className="text-success font-medium">sustainable habits</span>, measure real{' '}
                  <span className="text-success font-medium">impact</span>, and build{' '}
                  <span className="text-primary font-medium">lasting change</span> for our planet.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg" 
                  variant="glow"
                  className="px-8 py-3 text-lg"
                >
                  Start Tracking Today
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg glow-effect"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroIllustration} 
                alt="People riding bikes in a sustainable environment"
                className="w-full h-auto rounded-3xl shadow-eco-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Understand Your Impact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-success">Understand</span> Your Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the science behind carbon footprint reduction and the power of{' '}
              <span className="text-success font-medium">collective action</span>.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-eco-strong bg-card">
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/bYb7YLsXvzg"
              title="What's a CARBON FOOTPRINT? How to calculate and reduce it?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-success">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              A simple 3-step approach to track and visualize your{' '}
              <span className="text-success font-medium">environmental impact</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <Card className="text-center p-8 shadow-eco-soft border-border/50 bg-card hover:shadow-eco-medium transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">1. Choose Habits</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Select from a curated list of sustainable actions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-eco-soft border-border/50 bg-card hover:shadow-eco-medium transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">2. Track Daily</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Log your completed habits with a single click.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-eco-soft border-border/50 bg-card hover:shadow-eco-medium transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">3. See Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  View your CO₂ savings on a personal dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Make a Real Difference Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Make a <span className="text-success">Real Difference</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                This isn't just about numbers. It's about building life-long{' '}
                <span className="text-success font-medium">sustainable habits</span>. Every action tracked contributes to
                measurable CO₂ <span className="text-primary font-medium">reduction</span> and creates lasting{' '}
                <span className="text-warning font-medium">positive change</span> for our planet.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-xl shadow-eco-soft border border-border/50">
                  <div className="text-4xl font-bold text-success mb-2">25kg</div>
                  <div className="text-muted-foreground">
                    Monthly CO₂ <span className="text-success font-medium">Saved</span>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-eco-soft border border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">
                    User <span className="text-primary font-medium">Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-success rounded-2xl p-6 shadow-eco-strong">
                <div className="bg-card rounded-xl p-4">
                  <iframe
                    width="100%"
                    height="300"
                    src="https://go.screenpal.com/watch/cTQYQanDfNG"
                    title="eCO₂ Tracker Dashboard Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-success">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Start Your{' '}
              <span className="text-warning">Sustainability Journey</span>?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands worldwide in tracking measurable{' '}
              <span className="text-warning font-medium">environmental impact</span> and building a{' '}
              <span className="text-warning font-medium">sustainable future</span> together.
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg"
              variant="glow"
              className="px-12 py-4 text-xl font-semibold rounded-full"
            >
              Start Your Impact Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-success" />
                <span className="text-lg font-bold text-success">eCO Tracker</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Making a <span className="text-success font-medium">measurable difference</span> for our planet, one sustainable habit at a
                time. Join the <span className="text-success font-medium">movement</span> towards a greener future.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-success transition-colors">Home</a>
                <a href="#" className="block text-muted-foreground hover:text-success transition-colors">Track Habits</a>
                <a href="#" className="block text-muted-foreground hover:text-success transition-colors">Dashboard</a>
                <a href="#" className="block text-muted-foreground hover:text-success transition-colors">Green Insights</a>
                <a href="#" className="block text-muted-foreground hover:text-success transition-colors">About</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Our Impact</h3>
              <div className="space-y-4">
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

          <div className="border-t border-border/50 mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 eCO₂Tracker. All <span className="text-success">rights reserved</span>.
            </p>
            <p className="text-muted-foreground mt-2">
              Building <span className="text-success font-medium">sustainable habits</span> for a{' '}
              <span className="text-success font-medium">better tomorrow</span> 🌱
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};