import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footprints, Target, CheckCircle, BarChart3, Leaf, Zap, Users, TreePine, Award, Globe } from 'lucide-react';
import heroIllustration from '@/assets/hero-illustration.png';
import { useState, useEffect } from 'react';

interface EnhancedHeroProps {
  onGetStarted: () => void;
}

export const EnhancedHero = ({ onGetStarted }: EnhancedHeroProps) => {
  const [typewriterText, setTypewriterText] = useState('');
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number; delay: number }>>([]);
  
  const fullText = 'Track Your Carbon Impact, Grow Your Green Habits';
  
  useEffect(() => {
    // Typewriter effect
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    // Generate floating particles
    const particles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticlePositions(particles);

    return () => clearInterval(timer);
  }, []);

  const impactStats = [
    { value: '500kg+', label: 'CO₂ Saved Monthly', icon: Leaf, color: 'text-success' },
    { value: '1,200+', label: 'Eco Actions Logged', icon: CheckCircle, color: 'text-primary' },
    { value: '95%', label: 'User Satisfaction', icon: Users, color: 'text-accent' },
    { value: '50+', label: 'Habit Types', icon: Target, color: 'text-warning' }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((particle, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-success/30 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '6s'
            }}
          />
        ))}
      </div>

      {/* Navigation Header with Quick Links */}
      <nav className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Footprints className="h-8 w-8 text-success" />
              <span className="text-xl font-bold text-success">eCO₂ Tracker</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a 
                href="#home" 
                className="text-sm font-medium text-success hover:text-success/80 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Footprints className="h-4 w-4" />
                Home
              </a>
              <a 
                href="#how-it-works" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Target className="h-4 w-4" />
                How It Works
              </a>
              <a 
                href="#impact" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <BarChart3 className="h-4 w-4" />
                Real Impact
              </a>
              <a 
                href="#get-started" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Zap className="h-4 w-4" />
                Get Started
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
              <Button onClick={onGetStarted} variant="vibrant" className="px-6 glow-effect">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-subtle relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight min-h-[200px]">
                  <span className="inline-block hover-scale">{typewriterText}</span>
                  <span className="text-success animate-pulse">|</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Join thousands reducing CO₂ emissions through daily habit tracking. Track{' '}
                  <span className="text-success font-medium story-link">sustainable habits</span>, measure real{' '}
                  <span className="text-success font-medium story-link">impact</span>, and build{' '}
                  <span className="text-primary font-medium story-link">lasting change</span> for our planet.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button 
                  onClick={onGetStarted}
                  size="lg" 
                  className="bg-success hover:bg-success/90 text-white px-8 py-3 text-lg hover-scale"
                >
                  Start Tracking Today
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-success text-success hover:bg-success/10 px-8 py-3 text-lg hover-scale transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative group">
                <img 
                  src={heroIllustration} 
                  alt="People riding bikes in a sustainable environment"
                  className="w-full h-auto rounded-3xl shadow-eco-strong group-hover:scale-105 transition-transform duration-500 hover-scale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-success/20 via-transparent to-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card 
                key={index} 
                className="text-center p-6 shadow-eco-soft hover:shadow-eco-medium hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="space-y-3">
                  <stat.icon className={`w-12 h-12 mx-auto ${stat.color} animate-pulse`} />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Understand Your Impact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-success">Understand</span> Your Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the science behind carbon footprint reduction and the power of{' '}
              <span className="text-success font-medium">collective action</span>.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-eco-strong">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/8q7_aV8eLUE"
                title="What is a CARBON FOOTPRINT? How to calculate and reduce it? | Climate change"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
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
            {/* Card 1 - Track Daily Activities */}
            <Card className="text-center p-8 shadow-eco-soft border-border/50 bg-card hover:shadow-eco-strong hover:-translate-y-2 hover:rotate-1 transition-all duration-500 group">
              <CardContent className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success/20 to-success/40 rounded-full flex items-center justify-center mb-6 group-hover:animate-bounce">
                  <Target className="h-10 w-10 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">1. Choose Habits</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Select from a curated list of sustainable actions.
                </p>
                <Badge className="bg-success/20 text-success">Easy Setup</Badge>
              </CardContent>
            </Card>

            {/* Card 2 - Get Insights */}
            <Card className="text-center p-8 shadow-eco-soft border-border/50 bg-card hover:shadow-eco-strong hover:-translate-y-2 hover:-rotate-1 transition-all duration-500 group">
              <CardContent className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mb-6 group-hover:animate-pulse">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">2. Track Daily</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Log your completed habits with a single click and watch your impact grow.
                </p>
                <Badge className="bg-primary/20 text-primary">One-Click Logging</Badge>
              </CardContent>
            </Card>

            {/* Card 3 - Make Impact */}
            <Card className="text-center p-8 shadow-eco-soft border-border/50 bg-card hover:shadow-eco-strong hover:-translate-y-2 hover:scale-110 transition-all duration-500 group">
              <CardContent className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/20 to-accent/40 rounded-full flex items-center justify-center mb-6 group-hover:animate-spin">
                  <BarChart3 className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">3. See Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  View your CO₂ savings on a personal dashboard.
                </p>
                <Badge className="bg-accent/20 text-accent">Visual Progress</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Make a Real Difference Section */}
      <section id="impact" className="py-20 bg-gradient-to-br from-success/5 to-primary/5">
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
                <Card className="p-6 bg-gradient-to-br from-success/10 to-success/20 shadow-eco-soft border-success/20 hover:shadow-eco-medium hover:bg-gradient-to-br hover:from-success/20 hover:to-success/30 transition-all duration-300 group">
                  <CardContent className="text-center space-y-2">
                    <div className="text-4xl font-bold text-success mb-2 group-hover:scale-110 transition-transform">25kg</div>
                    <div className="text-muted-foreground">
                      Monthly CO₂ <span className="text-success font-medium">Saved</span>
                    </div>
                    <Leaf className="w-6 h-6 text-success mx-auto animate-pulse" />
                  </CardContent>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/20 shadow-eco-soft border-primary/20 hover:shadow-eco-medium hover:bg-gradient-to-br hover:from-primary/20 hover:to-primary/30 transition-all duration-300 group">
                  <CardContent className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">95%</div>
                    <div className="text-muted-foreground">
                      User <span className="text-primary font-medium">Satisfaction</span>
                    </div>
                    <Award className="w-6 h-6 text-primary mx-auto animate-bounce" />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-eco rounded-2xl p-6 shadow-eco-strong hover:shadow-2xl hover:scale-105 transition-all duration-500">
                <div className="bg-card rounded-xl p-4">
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <TreePine className="w-16 h-16 text-success mx-auto animate-bounce" />
                      <h3 className="text-xl font-bold text-foreground">Dashboard Preview</h3>
                      <p className="text-muted-foreground">Watch your virtual forest grow as you complete sustainable habits!</p>
                      <Button variant="outline" className="glow-effect">
                        <Globe className="w-4 h-4 mr-2" />
                        View Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-20 bg-success relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Start Your{' '}
              <span className="text-warning">Sustainability Journey</span>?
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Join thousands worldwide in tracking measurable{' '}
              <span className="text-warning font-medium">environmental impact</span> and building a{' '}
              <span className="text-warning font-medium">sustainable future</span> together.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="px-12 py-4 text-xl font-semibold bg-[hsl(142,76%,45%)] hover:bg-[hsl(142,76%,40%)] text-white hover:scale-105 transition-all duration-300"
              >
                Start Your Impact Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-success" />
                <span className="text-xl font-bold text-success">eCO₂ Tracker</span>
              </div>
              <p className="text-muted-foreground">
                Making a <span className="text-success font-medium">measurable difference</span> for our planet, one sustainable habit at a time. Join the{' '}
                <span className="text-success font-medium">movement</span> towards a greener future.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <a 
                  href="#home" 
                  className="text-muted-foreground hover:text-success transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-success transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetStarted();
                  }}
                >
                  Track Habits
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-success transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetStarted();
                  }}
                >
                  Dashboard
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-success transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetStarted();
                  }}
                >
                  Green Insights
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-success transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onGetStarted();
                  }}
                >
                  About
                </a>
              </nav>
            </div>

            {/* Impact Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Our Impact</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold text-success">500kg+</div>
                  <div className="text-sm text-muted-foreground">CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success">1,200+</div>
                  <div className="text-sm text-muted-foreground">Actions Logged</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};