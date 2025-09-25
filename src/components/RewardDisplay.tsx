interface RewardDisplayProps {
  day: number;
  isEarned: boolean;
  isCurrentDay: boolean;
  onClick?: () => void;
}

const getRewardData = (day: number) => {
  const rewards = {
    1: {
      icon: "🌱",
      title: "Seed Stage",
      message: "Planted your sustainability seed!",
      description: "Small brown seed with tiny green sprout emerging"
    },
    2: {
      icon: "🌿",
      title: "Sprout",
      message: "Your eco-efforts are sprouting!",
      description: "Small green shoot with first leaf"
    },
    3: {
      icon: "🪴",
      title: "Seedling", 
      message: "Growing stronger every day!",
      description: "Young plant with 2-3 leaves, visible stem"
    },
    4: {
      icon: "🌳",
      title: "Sapling",
      message: "Your impact is taking root!",
      description: "Small tree with thin brown trunk, multiple leaves"
    },
    5: {
      icon: "🌲",
      title: "Young Tree",
      message: "Almost there - your forest is growing!",
      description: "Taller tree with fuller foliage, stronger trunk"
    },
    6: {
      icon: "🌴",
      title: "Mature Tree",
      message: "One day from your weekly forest!",
      description: "Well-developed tree with dense canopy"
    },
    7: {
      icon: "🏞️",
      title: "Full Forest Tree",
      message: "Week completed! Your forest is thriving!",
      description: "Large, mature tree with extensive canopy"
    }
  };
  
  return rewards[day as keyof typeof rewards] || rewards[1];
};

export const RewardDisplay = ({ day, isEarned, isCurrentDay, onClick }: RewardDisplayProps) => {
  const reward = getRewardData(day);
  
  return (
    <div
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
        ${isEarned 
          ? 'bg-primary/10 border-primary shadow-eco celebrate' 
          : isCurrentDay 
          ? 'bg-secondary border-primary/50 shadow-soft animate-pulse' 
          : 'bg-muted/50 border-border opacity-60'
        }
        hover:scale-105 hover:shadow-lg
      `}
      onClick={onClick}
    >
      <div className="text-center space-y-2">
        <div className={`text-4xl transition-transform duration-300 ${isEarned ? 'tree-grow' : ''}`}>
          {reward.icon}
        </div>
        <h3 className="font-semibold text-sm">{reward.title}</h3>
        <p className="text-xs text-muted-foreground">Day {day}</p>
        {isEarned && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        )}
        {isCurrentDay && !isEarned && (
          <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
            →
          </div>
        )}
      </div>
    </div>
  );
};