import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Car, Zap, Apple, Recycle, Atom, FlaskConical, TreePine, Wind, Droplets, Globe } from 'lucide-react';
import { useState } from 'react';

export const About = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const FormulaCard = ({ formula, explanation }: { formula: string; explanation: string }) => (
    <div className="bg-gradient-to-r from-primary/10 to-success/10 p-4 rounded-lg border-l-4 border-success hover:shadow-eco-soft transition-all duration-300">
      <div className="font-mono text-lg font-bold text-primary mb-2">{formula}</div>
      <p className="text-muted-foreground text-sm">{explanation}</p>
    </div>
  );

  const MoleculeAnimation = ({ formula }: { formula: string }) => (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-pulse">
      <span className="text-2xl font-mono font-bold text-primary">{formula}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-success via-primary to-accent bg-clip-text text-transparent">
            How We Calculate Your Carbon Impact
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From atoms to impact: Understanding the complete journey from molecular reactions to real-world environmental change
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-2">
            <Badge className="bg-success/20 text-success px-4 py-2">
              <FlaskConical className="w-4 h-4 mr-2" />
              Scientific Accuracy
            </Badge>
            <Badge className="bg-primary/20 text-primary px-4 py-2">
              <Atom className="w-4 h-4 mr-2" />
              Chemistry-Based
            </Badge>
            <Badge className="bg-accent/20 text-accent px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Real-World Impact
            </Badge>
          </div>
        </div>

        {/* Fundamentals Section */}
        <Card className="mb-8 shadow-eco-medium bg-gradient-to-br from-primary/10 via-success/10 to-accent/10">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center">
              <Atom className="w-8 h-8 mr-3 text-primary" />
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                Understanding Carbon from Scratch
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-background/50 p-6 rounded-lg border-2 border-primary/20">
              <h3 className="text-xl font-semibold mb-4 text-primary">What is Carbon Dioxide?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-mono font-bold text-primary">CO₂</span>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">One carbon atom (C) + Two oxygen atoms (O₂)</strong> = One molecule of carbon dioxide (CO₂)
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Molecular weight: 12g (carbon) + 32g (oxygen) = <strong className="text-primary">44 grams per mole</strong>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-destructive/10 to-warning/10 p-4 rounded-lg mt-4">
                  <p className="text-sm">
                    <strong>Why it matters:</strong> CO₂ is a greenhouse gas that traps heat in Earth's atmosphere. When we burn fossil fuels, 
                    cut down forests, or produce goods, we release CO₂ molecules that accumulate in the atmosphere for <strong>hundreds of years</strong>, 
                    gradually warming our planet.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background/50 p-6 rounded-lg border-2 border-success/20">
                <h4 className="text-lg font-semibold mb-3 text-success flex items-center">
                  <FlaskConical className="w-5 h-5 mr-2" />
                  The Combustion Reaction
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    When you burn fuel (gasoline, coal, natural gas), you're combining carbon-based molecules with oxygen:
                  </p>
                  <div className="bg-gradient-to-r from-success/10 to-primary/10 p-4 rounded text-center">
                    <span className="font-mono text-lg font-bold text-primary">Fuel + O₂ → CO₂ + H₂O + Energy</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Example:</strong> Burning 1 liter of gasoline releases approximately <strong className="text-destructive">2.31 kg</strong> of CO₂. 
                    That's because gasoline contains many carbon atoms that all become CO₂ molecules.
                  </p>
                </div>
              </div>

              <div className="bg-background/50 p-6 rounded-lg border-2 border-accent/20">
                <h4 className="text-lg font-semibold mb-3 text-accent flex items-center">
                  <Atom className="w-5 h-5 mr-2" />
                  Mass Conservation Law
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    The key to calculating CO₂ is understanding that <strong>matter cannot be created or destroyed</strong>—it only transforms.
                  </p>
                  <div className="bg-gradient-to-r from-accent/10 to-warning/10 p-3 rounded text-sm">
                    <p><strong>1 kg of fuel ≠ 1 kg of CO₂</strong></p>
                    <p className="mt-2">Because fuel combines with oxygen from the air, 1 kg of gasoline actually produces about <strong className="text-destructive">3.2 kg of CO₂</strong></p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is why your car's fuel tank empties faster than you might expect in terms of emissions!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-success/5 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-primary">How We Calculate Your Impact</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">1</span>
                  <p className="text-sm"><strong>Identify the activity:</strong> Driving a car, using electricity, eating food, etc.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">2</span>
                  <p className="text-sm"><strong>Measure the quantity:</strong> Kilometers driven, kWh used, kg of food consumed</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">3</span>
                  <p className="text-sm"><strong>Apply emission factor:</strong> Each activity has a scientifically-measured factor (e.g., 0.12 kg CO₂ per km)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">4</span>
                  <p className="text-sm"><strong>Calculate total CO₂:</strong> Quantity × Emission Factor = Your carbon footprint</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real World Impact Section */}
        <Card className="mb-8 shadow-eco-medium bg-gradient-to-br from-success/10 via-emerald-500/10 to-green-500/10">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center">
              <Globe className="w-8 h-8 mr-3 text-success" />
              <span className="bg-gradient-to-r from-success to-emerald-600 bg-clip-text text-transparent">
                Real World Impact: What Does It Actually Mean?
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-background/50 p-6 rounded-lg border-2 border-success/20">
              <h3 className="text-xl font-semibold mb-4 text-success">Visualizing Your Savings</h3>
              <p className="text-muted-foreground mb-4">
                When you save 1 kg of CO₂, here's what you're actually preventing from entering our atmosphere:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gradient-to-br from-success/20 to-emerald-500/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-success mb-2">509m³</div>
                  <p className="text-sm text-muted-foreground">Volume of CO₂ gas at room temperature (enough to fill a small house)</p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.5 km</div>
                  <p className="text-sm text-muted-foreground">Average car driving distance producing 1 kg CO₂</p>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-orange-500/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-accent mb-2">1.2 kWh</div>
                  <p className="text-sm text-muted-foreground">Electricity from coal plants needed to emit 1 kg CO₂</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background/50 p-6 rounded-lg border-2 border-emerald-500/20">
                <h4 className="text-lg font-semibold mb-3 text-success flex items-center">
                  <TreePine className="w-5 h-5 mr-2" />
                  Tree Equivalent Impact
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>1 mature tree absorbs approximately 21 kg of CO₂ per year</strong>
                  </p>
                  <div className="bg-gradient-to-r from-success/10 to-emerald-500/10 p-4 rounded-lg space-y-2">
                    <p className="text-sm">✓ <strong>Save 100 kg CO₂</strong> = Equivalent to planting <strong className="text-success">5 trees</strong> for a year</p>
                    <p className="text-sm">✓ <strong>Save 500 kg CO₂</strong> = Equivalent to planting <strong className="text-success">24 trees</strong> for a year</p>
                    <p className="text-sm">✓ <strong>Save 1,000 kg CO₂</strong> = Equivalent to planting <strong className="text-success">48 trees</strong> for a year</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Note: Young trees grow faster and absorb more CO₂ initially, while older trees store more carbon long-term.
                  </p>
                </div>
              </div>

              <div className="bg-background/50 p-6 rounded-lg border-2 border-blue-500/20">
                <h4 className="text-lg font-semibold mb-3 text-primary flex items-center">
                  <Wind className="w-5 h-5 mr-2" />
                  Atmospheric Impact
                </h4>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    CO₂ stays in the atmosphere for <strong>300-1,000 years</strong>, continually trapping heat.
                  </p>
                  <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-4 rounded-lg space-y-2">
                    <p className="text-sm"><strong>Every kg of CO₂ you prevent:</strong></p>
                    <p className="text-sm">✓ Avoids <strong className="text-primary">0.0005°C</strong> of atmospheric warming (per trillion kg)</p>
                    <p className="text-sm">✓ Reduces ocean acidification</p>
                    <p className="text-sm">✓ Helps prevent extreme weather events</p>
                    <p className="text-sm">✓ Protects coral reefs and ecosystems</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Small actions add up: humanity emits ~36 billion tons of CO₂ annually. Every kg matters.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-success/5 to-emerald-500/5 p-6 rounded-lg border-2 border-success/30">
              <h4 className="text-lg font-semibold mb-4 text-success flex items-center">
                <Droplets className="w-5 h-5 mr-2" />
                Tangible Benefits of Your Actions
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground">Health Benefits</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Cleaner air quality in your community</li>
                    <li>✓ Reduced respiratory illnesses</li>
                    <li>✓ Lower particulate matter (PM2.5) exposure</li>
                    <li>✓ Decreased heat-related health risks</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground">Economic Benefits</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Lower energy bills from efficiency</li>
                    <li>✓ Reduced healthcare costs</li>
                    <li>✓ Job creation in renewable sector</li>
                    <li>✓ Avoided climate damage costs</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground">Environmental Benefits</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Preserved biodiversity and habitats</li>
                    <li>✓ Protected polar ice and glaciers</li>
                    <li>✓ Healthier oceans and marine life</li>
                    <li>✓ More stable weather patterns</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground">Social Benefits</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Inspire others through leadership</li>
                    <li>✓ Support sustainable communities</li>
                    <li>✓ Preserve resources for future generations</li>
                    <li>✓ Contribute to global climate goals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-success/10 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-primary">The Compound Effect</h4>
              <p className="text-muted-foreground mb-4">
                Your individual actions multiply when others join you:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-2">1 Person</div>
                  <p className="text-sm text-muted-foreground">Saves ~500 kg CO₂/year with sustainable habits</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">100 People</div>
                  <p className="text-sm text-muted-foreground">= 50,000 kg CO₂/year (equivalent to 2,381 trees)</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-2">1,000 People</div>
                  <p className="text-sm text-muted-foreground">= 500,000 kg CO₂/year (equivalent to 23,810 trees)</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center italic">
                By tracking your habits and sharing your progress, you become part of a global movement making measurable change.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Transportation Section */}
        <Card className="mb-8 shadow-eco-soft hover:shadow-eco-medium transition-all duration-300">
          <Collapsible>
            <CollapsibleTrigger
              className="w-full"
              onClick={() => toggleSection('transport')}
            >
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Car className="h-8 w-8 text-destructive" />
                    <span>Transportation Calculations</span>
                  </div>
                  <ChevronDown className={`h-6 w-6 transition-transform ${openSections.transport ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <FormulaCard 
                  formula="CO₂ (kg) = Distance (km) × Emission Factor (kg CO₂/km)"
                  explanation="Basic formula for calculating transportation emissions based on distance traveled and vehicle type."
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-destructive flex items-center">
                    <Atom className="w-5 h-5 mr-2" />
                    Combustion Chemistry
                  </h4>
                    <div className="bg-gradient-to-r from-destructive/10 to-orange-500/10 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-4">
                        <MoleculeAnimation formula="C₈H₁₈ + 12.5O₂ → 8CO₂ + 9H₂O" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Octane (gasoline) combustion produces 8 molecules of CO₂ for every molecule of fuel burned.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Emission Factors by Fuel Type</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-destructive/10 rounded">
                        <span className="font-medium">Petrol</span>
                        <span className="text-destructive font-bold">2.31 kg CO₂/L</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded">
                        <span className="font-medium">Diesel</span>
                        <span className="text-orange-600 font-bold">2.68 kg CO₂/L</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-success/10 rounded">
                        <span className="font-medium">Electric (India Grid)</span>
                        <span className="text-success font-bold">0.82 kg CO₂/kWh</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-success/5 p-6 rounded-lg">
                  <h5 className="font-semibold mb-3 text-primary">Physics of Energy Conversion</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm mb-2"><strong>Internal Combustion Engine:</strong></p>
                      <p className="text-xs text-muted-foreground">~25-30% thermal efficiency. Most energy lost as heat, contributing to emissions.</p>
                    </div>
                    <div>
                      <p className="text-sm mb-2"><strong>Electric Motor:</strong></p>
                      <p className="text-xs text-muted-foreground">~85-95% efficiency. Lower emissions depend on grid energy source.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Energy Consumption Section */}
        <Card className="mb-8 shadow-eco-soft hover:shadow-eco-medium transition-all duration-300">
          <Collapsible>
            <CollapsibleTrigger
              className="w-full"
              onClick={() => toggleSection('energy')}
            >
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-8 w-8 text-warning" />
                    <span>Energy Consumption</span>
                  </div>
                  <ChevronDown className={`h-6 w-6 transition-transform ${openSections.energy ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <FormulaCard 
                  formula="CO₂ = kWh × Grid Emission Factor"
                  explanation="India's grid emission factor: ~0.82 kg CO₂/kWh (varies by region and energy mix)"
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-warning flex items-center">
                    <Atom className="w-5 h-5 mr-2" />
                    Coal Power Chemistry
                  </h4>
                    <div className="bg-gradient-to-r from-warning/10 to-destructive/10 p-4 rounded-lg">
                      <div className="flex items-center justify-center mb-4">
                        <MoleculeAnimation formula="C + O₂ → CO₂" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Direct carbon-oxygen reaction. Molecular weight: 12g C + 32g O₂ → 44g CO₂
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Energy Source Comparison</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-destructive/10 rounded">
                        <span className="font-medium">Coal Power</span>
                        <span className="text-destructive font-bold">0.95 kg CO₂/kWh</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-warning/10 rounded">
                        <span className="font-medium">Natural Gas</span>
                        <span className="text-warning font-bold">0.49 kg CO₂/kWh</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-success/10 rounded">
                        <span className="font-medium">Solar/Wind</span>
                        <span className="text-success font-bold">0.02-0.05 kg CO₂/kWh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Food & Diet Section */}
        <Card className="mb-8 shadow-eco-soft hover:shadow-eco-medium transition-all duration-300">
          <Collapsible>
            <CollapsibleTrigger
              className="w-full"
              onClick={() => toggleSection('food')}
            >
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Apple className="h-8 w-8 text-success" />
                    <span>Food & Diet Impact</span>
                  </div>
                  <ChevronDown className={`h-6 w-6 transition-transform ${openSections.food ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-orange-600 flex items-center">
                    <Atom className="w-5 h-5 mr-2" />
                    Methane Conversion
                  </h4>
                    <FormulaCard 
                      formula="CH₄ × 25 = CO₂ equivalent"
                      explanation="Methane has 25x the global warming potential of CO₂ over 100 years (GWP-100 factor)"
                    />
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Livestock digestion produces methane (CH₄), which is converted to CO₂ equivalent using the Global Warming Potential factor.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Food Production Emissions</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-destructive/10 rounded">
                        <span className="font-medium">Beef</span>
                        <span className="text-destructive font-bold">60 kg CO₂/kg</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded">
                        <span className="font-medium">Chicken</span>
                        <span className="text-orange-600 font-bold">6 kg CO₂/kg</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-success/10 rounded">
                        <span className="font-medium">Vegetables</span>
                        <span className="text-success font-bold">2 kg CO₂/kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-success/5 p-6 rounded-lg">
                  <h5 className="font-semibold mb-3 text-primary">Agricultural Process Emissions</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm mb-2"><strong>N₂O from Fertilizers:</strong></p>
                      <p className="text-xs text-muted-foreground">Nitrous oxide has 298x warming potential of CO₂. Released from nitrogen fertilizer breakdown.</p>
                    </div>
                    <div>
                      <p className="text-sm mb-2"><strong>Land Use Change:</strong></p>
                      <p className="text-xs text-muted-foreground">Deforestation for agriculture releases stored carbon and reduces CO₂ absorption capacity.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Waste Management Section */}
        <Card className="mb-8 shadow-eco-soft hover:shadow-eco-medium transition-all duration-300">
          <Collapsible>
            <CollapsibleTrigger
              className="w-full"
              onClick={() => toggleSection('waste')}
            >
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Recycle className="h-8 w-8 text-accent" />
                    <span>Waste Management</span>
                  </div>
                  <ChevronDown className={`h-6 w-6 transition-transform ${openSections.waste ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-accent flex items-center">
                    <Atom className="w-5 h-5 mr-2" />
                    Decomposition Chemistry
                  </h4>
                    <div className="bg-gradient-to-r from-accent/10 to-warning/10 p-4 rounded-lg">
                      <FormulaCard 
                        formula="Organic Waste → CH₄ + CO₂"
                        explanation="Anaerobic decomposition in landfills produces both methane and carbon dioxide"
                      />
                      <p className="text-sm text-muted-foreground mt-3">
                        Landfills create oxygen-free conditions leading to methane production with 25x warming potential.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Recycling Benefits</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-success/10 rounded">
                        <span className="font-medium">Aluminum Can</span>
                        <span className="text-success font-bold">95% energy saved</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded">
                        <span className="font-medium">Paper</span>
                        <span className="text-primary font-bold">60% energy saved</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-accent/10 rounded">
                        <span className="font-medium">Plastic</span>
                        <span className="text-accent font-bold">70% energy saved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Summary Section */}
        <Card className="shadow-eco-medium bg-gradient-to-br from-success/5 via-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <span className="bg-gradient-to-r from-success via-primary to-accent bg-clip-text text-transparent">
                Scientific Foundation
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <FlaskConical className="w-12 h-12 text-success mx-auto" />
                <h4 className="font-semibold text-success">Chemistry-Based</h4>
                <p className="text-sm text-muted-foreground">
                  All calculations based on molecular reactions and stoichiometric principles
                </p>
              </div>
              <div className="space-y-3">
                <Atom className="w-12 h-12 text-primary mx-auto" />
                <h4 className="font-semibold text-primary">Physics-Driven</h4>
                <p className="text-sm text-muted-foreground">
                  Energy conversion efficiencies and thermodynamic principles guide our models
                </p>
              </div>
              <div className="space-y-3">
                <Atom className="w-12 h-12 text-accent mx-auto" />
                <h4 className="font-semibold text-accent">Data-Verified</h4>
                <p className="text-sm text-muted-foreground">
                  Emission factors sourced from IPCC, EPA, and peer-reviewed research
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Every habit you track is backed by <span className="text-success font-medium">rigorous science</span> and 
                <span className="text-primary font-medium"> real-world data</span>, ensuring your impact measurements are 
                <span className="text-accent font-medium"> accurate and meaningful</span>. 🌱
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};