import { useEffect, useState } from 'react';
import ecoLogo from '@/assets/eco-logo.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 300); // Small delay for fade out
    }, 2500); // Show loading for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-eco transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center space-y-6">
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Stationary footprint icon */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img 
              src={ecoLogo} 
              alt="eCO₂ Tracker Logo" 
              className="w-16 h-16"
            />
          </div>
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/60 border-r-white/40 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-white/30 border-l-white/20 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">eCO₂ Tracker</h1>
          <p className="text-white/90 text-lg">Loading your eco journey...</p>
        </div>
        
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="w-full h-full bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};