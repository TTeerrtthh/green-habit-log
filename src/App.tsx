import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/HeroSection';
import { Auth } from '@/pages/Auth';
import { HabitTracker } from '@/components/HabitTracker';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { LogOut, Leaf } from 'lucide-react';

function AppContent() {
  const [showLoading, setShowLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
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
            <Button variant="ghost" onClick={signOut} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <HabitTracker />
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