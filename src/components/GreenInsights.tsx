import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lightbulb, TrendingUp, Globe, Leaf, ExternalLink, BookOpen } from 'lucide-react';

export const GreenInsights = () => {
  const insights = [
    {
      id: 1,
      category: 'Transport',
      title: 'Electric Vehicles Reach New Milestone',
      summary: 'Global EV sales surged 35% this year, with over 10 million vehicles sold worldwide.',
      impact: 'High',
      co2Impact: '2.3M tons CO₂ avoided',
      image: '🚗',
      fullContent: 'Electric vehicle adoption is accelerating globally, with countries like Norway reaching 90% EV market share for new cars. This transition is crucial for reducing transport emissions, which account for 24% of global CO₂ emissions.'
    },
    {
      id: 2,
      category: 'Energy',
      title: 'Renewable Energy Costs Hit Record Low',
      summary: 'Solar and wind power costs dropped by 13% and 9% respectively in 2024.',
      impact: 'High',
      co2Impact: '1.8M tons CO₂ reduction potential',
      image: '☀️',
      fullContent: 'The cost of renewable energy continues to plummet, making clean energy more accessible worldwide. This trend is accelerating the phase-out of fossil fuels and democratizing access to clean electricity.'
    },
    {
      id: 3,
      category: 'Food',
      title: 'Plant-Based Diet Adoption Growing',
      summary: 'Plant-based food sales increased by 27% as more people choose sustainable diets.',
      impact: 'Medium',
      co2Impact: '890K tons CO₂ saved',
      image: '🌱',
      fullContent: 'The shift toward plant-based diets is gaining momentum, driven by environmental awareness and health benefits. Agriculture accounts for 18% of global emissions, making dietary choices a powerful climate action.'
    },
    {
      id: 4,
      category: 'Technology',
      title: 'Carbon Capture Technology Advances',
      summary: 'New direct air capture facilities can now remove CO₂ at $150 per ton.',
      impact: 'Medium',
      co2Impact: '500K tons CO₂ captured',
      image: '🏭',
      fullContent: 'Breakthrough technologies in carbon capture are making it economically viable to remove CO₂ directly from the atmosphere. While still emerging, these technologies offer hope for addressing legacy emissions.'
    }
  ];

  const dailyFacts = [
    'A single tree can absorb up to 22kg of CO₂ per year',
    'Cycling 10km instead of driving saves 2.6kg of CO₂',
    'LED bulbs use 75% less energy than incandescent bulbs',
    'Food waste accounts for 8% of global greenhouse gas emissions',
    'Recycling one aluminum can saves enough energy to power a TV for 3 hours'
  ];

  const weeklyTips = [
    {
      week: 'This Week',
      tip: 'Try "Meatless Monday" - replacing one meat meal per week can save 340kg of CO₂ annually',
      action: 'Choose plant-based meals',
      icon: '🥗'
    },
    {
      week: 'Next Week',
      tip: 'Switch to cold water washing - it can reduce your washing machine\'s energy use by up to 90%',
      action: 'Use cold water setting',
      icon: '🌊'
    },
    {
      week: 'Week 3',
      tip: 'Start a small herb garden - growing your own food reduces transport emissions and plastic packaging',
      action: 'Grow herbs at home',
      icon: '🌿'
    }
  ];

  const impactStats = [
    { label: 'Global CO₂ Levels', value: '421 ppm', trend: 'up', description: 'Atmospheric CO₂ concentration' },
    { label: 'Renewable Energy Share', value: '30%', trend: 'up', description: 'Of global electricity generation' },
    { label: 'Deforestation Rate', value: '-11%', trend: 'down', description: 'Decrease from 2022' },
    { label: 'EV Market Share', value: '18%', trend: 'up', description: 'Of new car sales globally' }
  ];

  const currentFactIndex = new Date().getDay() % dailyFacts.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Green Insights</h1>
        <p className="text-muted-foreground">
          Stay informed about environmental progress and learn how to make an even bigger impact
        </p>
      </div>

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

      {/* Environmental News */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Latest Environmental News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map(insight => (
            <Card key={insight.id} className="shadow-eco-soft hover:shadow-eco-medium transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{insight.image}</span>
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
              <CardContent>
                <p className="text-muted-foreground mb-4">{insight.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-success">{insight.co2Impact}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
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

      {/* Weekly Tips */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Weekly Green Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklyTips.map((tip, index) => (
            <Card key={index} className="shadow-eco-soft">
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

      {/* Global Impact Statistics */}
      <Card className="shadow-eco-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Global Environmental Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <TrendingUp className={`h-4 w-4 ${
                    stat.trend === 'up' ? 'text-success' : 'text-destructive'
                  } ${stat.trend === 'up' ? '' : 'rotate-180'}`} />
                </div>
                <h4 className="font-semibold">{stat.label}</h4>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
  );
};