import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Car, Zap, Apple, Recycle, Atom, FlaskConical } from 'lucide-react';
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
            Science-backed methodology using <span className="text-success font-medium">physics</span>,{' '}
            <span className="text-primary font-medium">chemistry</span>, and{' '}
            <span className="text-accent font-medium">environmental data</span>
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-success/20 text-success px-4 py-2">
              <FlaskConical className="w-4 h-4 mr-2" />
              Scientific Accuracy
            </Badge>
            <Badge className="bg-primary/20 text-primary px-4 py-2">
              <Atom className="w-4 h-4 mr-2" />
              Chemistry-Based
            </Badge>
            <Badge className="bg-accent/20 text-accent px-4 py-2">
              <Molecule className="w-4 h-4 mr-2" />
              Real-World Data
            </Badge>
          </div>
        </div>

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