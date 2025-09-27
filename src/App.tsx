import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/HeroSection';
import { Auth } from '@/pages/Auth';
import { HabitTracker } from '@/components/HabitTracker';
import { Dashboard } from '@/components/Dashboard';
import { GreenInsights } from '@/components/GreenInsights';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { LogOut, Leaf, Target, BarChart3, Lightbulb, Home } from 'lucide-react';

function AppContent() {
  const [showLoading, setShowLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [currentView, setCurrentView] = useState<'habits' | 'dashboard' | 'insights'>('habits');
  const { user, loading: authLoading, signOut } = useAuth();

  useEffect(() => {
    if (!showLoading && !user && !authLoading) {
      setShowHero(true);
    } else {
      setShowHero(false);
    }
  }, [showLoading, user, authLoading]);

  const handleLoadingComplete = () => setShowLoading(false);
  const handleGetStarted = () => setShowHero(false);

  if (showLoading) return <LoadingScreen onComplete={handleLoadingComplete} />;
  if (authLoading) return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <Leaf className="h-8 w-8 text-primary animate-pulse" />
        <span className="text-lg text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
  if (showHero) return <HeroSection onGetStarted={handleGetStarted} />;
  if (!user) return <Auth />;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-primary">eCO₂ Tracker</h1>
                <p className="text-sm text-muted-foreground">Welcome back!</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button 
                variant={currentView === 'habits' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('habits')}
                className="gap-2"
              >
                <Target className="h-4 w-4" />
                Track Habits
              </Button>
              <Button 
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('dashboard')}
                className="gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant={currentView === 'insights' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('insights')}
                className="gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Green Insights
              </Button>
            </nav>

            <Button variant="ghost" onClick={signOut} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4">
            <div className="flex items-center justify-center space-x-2">
              <Button 
                variant={currentView === 'habits' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('habits')}
                size="sm"
                className="gap-1"
              >
                <Target className="h-3 w-3" />
                Habits
              </Button>
              <Button 
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('dashboard')}
                size="sm"
                className="gap-1"
              >
                <BarChart3 className="h-3 w-3" />
                Dashboard
              </Button>
              <Button 
                variant={currentView === 'insights' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('insights')}
                size="sm"
                className="gap-1"
              >
                <Lightbulb className="h-3 w-3" />
                Insights
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {currentView === 'habits' && <HabitTracker />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'insights' && <GreenInsights />}
      </main>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}