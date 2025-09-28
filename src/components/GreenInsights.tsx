import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lightbulb, TrendingUp, Globe, Leaf, ExternalLink, BookOpen, Users, MapPin, Zap, Sun, Wind, Factory, Share2, Heart } from 'lucide-react';
import { useState } from 'react';

export const GreenInsights = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const insights = [
    {
      id: 1,
      category: 'Transport',
      title: 'India Achieves 100 GW Solar Manufacturing Milestone',
      summary: 'India becomes world\'s 3rd largest solar manufacturer, boosting renewable energy capacity significantly.',
      impact: 'High',
      co2Impact: '2.3M tons CO₂ avoided',
      image: '☀️',
      fullContent: 'India has reached a historic milestone by achieving 100 GW of solar manufacturing capacity, positioning itself as the world\'s third-largest solar manufacturer. This achievement accelerates renewable energy adoption and significantly reduces dependency on fossil fuels.'
    },
    {
      id: 2,
      category: 'Innovation',
      title: 'IRENA NewGen 2024: Young Entrepreneurs Drive Clean Energy',
      summary: 'Young entrepreneurs are leading the charge in renewable energy innovation across India.',
      impact: 'High',
      co2Impact: '1.8M tons CO₂ reduction potential',
      image: '💡',
      fullContent: 'The IRENA NewGen 2024 program has highlighted the crucial role of young entrepreneurs in driving clean energy innovation. These innovators are developing breakthrough technologies that promise to revolutionize energy production and consumption.'
    },
    {
      id: 3,
      category: 'Solar',
      title: 'Solar Power Surge: 30x Growth Since 2014',
      summary: 'India\'s solar capacity has grown from 2.5 GW to 94+ GW in just 10 years.',
      impact: 'Medium',
      co2Impact: '890K tons CO₂ saved',
      image: '🌞',
      fullContent: 'India\'s solar energy sector has witnessed unprecedented growth, expanding from 2.5 GW in 2014 to over 94 GW today. This 30-fold increase demonstrates the country\'s commitment to renewable energy and climate action.'
    },
    {
      id: 4,
      category: 'Innovation',
      title: 'Green Hydrogen Startups Get Government Support',
      summary: 'New government initiatives support green hydrogen startups with funding and policy backing.',
      impact: 'Medium',
      co2Impact: '500K tons CO₂ captured',
      image: '⚡',
      fullContent: 'The Indian government has launched comprehensive support programs for green hydrogen startups, including financial assistance and favorable policies. This initiative is expected to accelerate the adoption of green hydrogen technology across industries.'
    }
  ];

  const youngInnovators = [
    {
      name: 'Arun Sharma',
      age: 24,
      company: 'SolarTech India',
      achievement: 'Developed low-cost solar panels for rural areas',
      impact: '50,000 homes powered',
      image: '👨‍💼'
    },
    {
      name: 'Priya Patel',
      age: 26,
      company: 'WindForce Solutions',
      achievement: 'Created micro wind turbines for urban use',
      impact: '200 MW capacity installed',
      image: '👩‍💼'
    },
    {
      name: 'Raj Kumar',
      age: 23,
      company: 'BioEnergy Systems',
      achievement: 'Biomass to energy conversion technology',
      impact: '100 villages electrified',
      image: '👨‍🔬'
    }
  ];

  const dailyFacts = [
    'India is world\'s 3rd largest renewable energy producer',
    'Solar capacity grew from 2.5 GW to 94+ GW in 10 years',
    '46.3% of India\'s energy capacity is now renewable',
    'A single wind turbine can power 1,400 homes for a year',
    'LED bulbs use 75% less energy than incandescent bulbs',
    'India plans to reach 500 GW renewable capacity by 2030'
  ];

  const weeklyTips = [
    {
      week: 'This Week',
      tip: 'Switch to renewable energy - check if your state offers solar rooftop schemes',
      action: 'Install solar panels',
      icon: '☀️'
    },
    {
      week: 'Next Week',
      tip: 'Use energy-efficient appliances with 5-star BEE ratings',
      action: 'Upgrade to efficient devices',
      icon: '⭐'
    },
    {
      week: 'Week 3',
      tip: 'Join community solar programs or renewable energy cooperatives',
      action: 'Community solar participation',
      icon: '🤝'
    }
  ];

  const stateData = [
    { state: 'Rajasthan', renewable: 45, capacity: '18.7 GW' },
    { state: 'Karnataka', renewable: 42, capacity: '16.2 GW' },
    { state: 'Tamil Nadu', renewable: 38, capacity: '14.8 GW' },
    { state: 'Gujarat', renewable: 35, capacity: '13.5 GW' },
    { state: 'Maharashtra', renewable: 32, capacity: '12.1 GW' }
  ];

  const currentFactIndex = new Date().getDay() % dailyFacts.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Rotating Earth */}
      <section className="py-20 bg-gradient-to-br from-success/10 via-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-success/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-32 right-20 w-16 h-16 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }} />
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-success/10 rounded-full animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Globe className="w-24 h-24 text-success animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-success via-primary to-accent bg-clip-text text-transparent">
              Green Insights Hub
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay informed about environmental progress, discover young innovators, and learn how to make an even bigger impact for our planet
          </p>
          
          {/* Live Counter */}
          <Card className="max-w-2xl mx-auto bg-gradient-eco text-white shadow-eco-strong">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4">
                <Zap className="w-8 h-8 animate-pulse" />
                <div className="text-center">
                  <div className="text-3xl font-bold">203+ GW</div>
                  <div className="text-lg">India's Renewable Energy Capacity</div>
                  <Badge className="bg-white/20 text-white mt-2">
                    Growing Every Day! 🌱
                  </Badge>
                </div>
                <Sun className="w-8 h-8 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Daily Eco-Fact */}
        <Card className="shadow-eco-medium bg-gradient-eco">
          <CardContent className="p-6 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lightbulb className="h-6 w-6" />
              <h2 className="text-xl font-bold">Did You Know?</h2>
            </div>
            <p className="text-lg font-medium">{dailyFacts[currentFactIndex]}</p>
            <Badge className="mt-3 bg-white/20 text-white border-white/30">
              Daily Eco-Fact
            </Badge>
          </CardContent>
        </Card>

        {/* Latest News Cards */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              Latest Green Energy News
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map(insight => (
              <Card key={insight.id} className="shadow-eco-soft hover:shadow-eco-strong hover:scale-105 transition-all duration-300 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-success/10 to-primary/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{insight.image}</span>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {insight.category}
                        </Badge>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                    </div>
                    <Badge 
                      className={
                        insight.impact === 'High' 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-warning text-warning-foreground'
                      }
                    >
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{insight.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-success">{insight.co2Impact}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="hover:bg-success hover:text-white">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="text-xl">{insight.image}</span>
                            {insight.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{insight.fullContent}</p>
                          <div className="flex items-center gap-4">
                            <Badge className="bg-success text-success-foreground">
                              {insight.co2Impact}
                            </Badge>
                            <Badge variant="outline">{insight.category}</Badge>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Young Innovators Spotlight */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Young Innovators Spotlight
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {youngInnovators.map((innovator, index) => (
              <Card key={index} className="shadow-eco-soft hover:shadow-eco-strong hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-5xl mb-4">{innovator.image}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{innovator.name}</h3>
                    <p className="text-primary font-medium">Age: {innovator.age}</p>
                    <p className="text-sm text-muted-foreground">{innovator.company}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{innovator.achievement}</p>
                    <Badge className="bg-success/20 text-success">
                      {innovator.impact}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Follow Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Map Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
              India's Renewable Energy Map
            </span>
          </h2>
          <Card className="shadow-eco-soft">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-success" />
                    State-wise Renewable Capacity
                  </h3>
                  <div className="space-y-4">
                    {stateData.map((state, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{state.state}</span>
                          <span className="text-success font-bold">{state.capacity}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-success to-primary h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${state.renewable}%` }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">{state.renewable}% renewable</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="relative w-80 h-80 bg-gradient-to-br from-success/20 to-primary/20 rounded-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Globe className="w-24 h-24 text-success mx-auto animate-pulse" />
                      <div className="text-4xl font-bold text-success">46.3%</div>
                      <div className="text-lg font-medium">Renewable Energy</div>
                      <div className="text-sm text-muted-foreground">of total capacity</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fun Facts Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">
              Amazing Green Facts
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-eco-soft hover:shadow-eco-medium transition-all duration-300 bg-gradient-to-br from-success/5 to-primary/5">
              <CardContent className="p-6 text-center">
                <Sun className="w-12 h-12 text-success mx-auto mb-4 animate-bounce" />
                <h3 className="font-bold text-lg mb-2">Solar Power</h3>
                <p className="text-sm text-muted-foreground">
                  India receives 5,000 trillion kWh of solar energy annually - 
                  enough to power the world!
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-eco-soft hover:shadow-eco-medium transition-all duration-300 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <Wind className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="font-bold text-lg mb-2">Wind Energy</h3>
                <p className="text-sm text-muted-foreground">
                  India's wind potential is 302 GW at 100m height - 
                  among world's highest!
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-eco-soft hover:shadow-eco-medium transition-all duration-300 bg-gradient-to-br from-accent/5 to-success/5">
              <CardContent className="p-6 text-center">
                <Factory className="w-12 h-12 text-accent mx-auto mb-4 animate-spin" style={{ animationDuration: '4s' }} />
                <h3 className="font-bold text-lg mb-2">Manufacturing</h3>
                <p className="text-sm text-muted-foreground">
                  India is now the 4th largest renewable energy 
                  manufacturer globally!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Tips */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Weekly Green Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weeklyTips.map((tip, index) => (
              <Card key={index} className="shadow-eco-soft hover:shadow-eco-medium transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <Badge variant="outline" className="mb-3">{tip.week}</Badge>
                  <h3 className="font-bold mb-2">{tip.action}</h3>
                  <p className="text-sm text-muted-foreground">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="shadow-eco-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-success" />
              How EcoTracker Calculates Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">CO₂ Calculation Methodology</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Transport emissions based on EPA fuel economy data</li>
                  <li>• Energy savings calculated from average household consumption</li>
                  <li>• Food impact derived from lifecycle assessment studies</li>
                  <li>• Standard emission factors from IPCC guidelines</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Why Habits Matter</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Small changes compound over time</li>
                  <li>• Individual actions inspire community change</li>
                  <li>• Measurable impact drives long-term behavior</li>
                  <li>• Every action counts toward global climate goals</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Your actions are making a real difference. Keep tracking, keep growing! 🌱
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};