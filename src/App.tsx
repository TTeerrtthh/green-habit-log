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
import { LogOut, Leaf, Target, BarChart3, Home } from 'lucide-react';

function AppContent() {
  const [showLoading, setShowLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'habits' | 'dashboard'>('home');
  const { user, loading: authLoading, signOut } = useAuth();

  useEffect(() => {
    if (!showLoading && !user && !authLoading) {
      setShowHero(true);
    } else {
      setShowHero(false);
    }
  }, [showLoading, user, authLoading]);

  const handleLoadingComplete = () => setShowLoading(false);
  const handleGetStarted = () => {
    setShowHero(false);
    setCurrentView('habits');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showLoading) return <LoadingScreen onComplete={handleLoadingComplete} />;
  if (authLoading) return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <Leaf className="h-8 w-8 text-primary animate-pulse" />
        <span className="text-lg text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
  if (!user) {
    if (showHero) return <HeroSection onGetStarted={handleGetStarted} />;
    return <Auth />;
  }

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
                variant={currentView === 'home' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('home');
                  scrollToTop();
                }}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button 
                variant={currentView === 'habits' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(scrollToHowItWorks, 100);
                }}
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
                variant={currentView === 'home' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('home');
                  scrollToTop();
                }}
                size="sm"
                className="gap-1"
              >
                <Home className="h-3 w-3" />
                Home
              </Button>
              <Button 
                variant={currentView === 'habits' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(scrollToHowItWorks, 100);
                }}
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
            </div>
          </div>
        </div>
      </header>
      <main>
        {currentView === 'home' && (
          <>
            <HeroSection onGetStarted={() => setCurrentView('habits')} />
            <div id="green-insights" className="container mx-auto px-4 py-16">
              <GreenInsights />
            </div>
          </>
        )}
        {currentView === 'habits' && (
          <div className="container mx-auto px-4 py-8">
            <HabitTracker />
          </div>
        )}
        {currentView === 'dashboard' && (
          <div className="container mx-auto px-4 py-8">
            <Dashboard />
          </div>
        )}
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