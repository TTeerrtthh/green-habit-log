import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lightbulb, TrendingUp, Globe, Leaf, ExternalLink, BookOpen, Users, MapPin, Zap, Sun, Wind, Factory, Share2, Heart } from 'lucide-react';
import { useState } from 'react';

export const GreenInsights = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const dailyFacts = [
    'India is world\'s 3rd largest renewable energy producer',
    'Solar capacity grew from 2.5 GW to 94+ GW in 10 years',
    '46.3% of India\'s energy capacity is now renewable',
    'A single wind turbine can power 1,400 homes for a year',
    'LED bulbs use 75% less energy than incandescent bulbs',
    'India plans to reach 500 GW renewable capacity by 2030'
  ];

  const currentFactIndex = new Date().getDay() % dailyFacts.length;

  const categories = [
    { id: 'all', label: 'All', icon: '🌍' },
    { id: 'Transport', label: 'Transport', icon: '🚗' },
    { id: 'Innovation', label: 'Innovation', icon: '💡' },
    { id: 'Solar', label: 'Solar', icon: '☀️' }
  ];

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-success/10 via-primary/5 to-accent/10 rounded-3xl p-8 md:p-12 shadow-eco-strong">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-success/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-32 right-20 w-16 h-16 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }} />
        </div>
        
        <div className="relative z-10 text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Globe className="w-20 h-20 text-success animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-success">Green</span> Energy{' '}
            <span className="text-primary">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest in renewable energy, innovation, and sustainability
          </p>
          
          {/* Live Counter */}
          <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-sm shadow-eco-medium border-2 border-success/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-success animate-pulse" />
                <div className="text-sm text-muted-foreground">India's Renewable Energy Capacity</div>
              </div>
              <div className="text-4xl font-bold text-success mb-2">203+ GW</div>
              <Badge className="bg-success/20 text-success">
                Growing Every Day! 🌱
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Daily Eco-Fact */}
      <Card className="shadow-eco-medium bg-gradient-eco">
        <CardContent className="p-6 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb className="h-6 w-6 animate-pulse" />
            <h2 className="text-xl font-bold">Did You Know?</h2>
          </div>
          <p className="text-lg font-medium">{dailyFacts[currentFactIndex]}</p>
          <Badge className="mt-3 bg-white/20 text-white border-white/30">
            Daily Eco-Fact
          </Badge>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map(cat => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className="gap-2 shadow-eco-soft hover:shadow-eco-medium transition-all"
          >
            <span className="text-lg">{cat.icon}</span>
            <span>{cat.label}</span>
          </Button>
        ))}
      </div>

      {/* Latest News Cards */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="text-success">Latest</span> Green Energy News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInsights.map(insight => (
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
    </div>
  );
};
