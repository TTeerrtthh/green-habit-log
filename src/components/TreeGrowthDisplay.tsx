import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TreeGrowthDisplayProps {
  day: number;
  isEarned: boolean;
  isCurrentDay: boolean;
  onClick?: () => void;
}

export const TreeGrowthDisplay = ({ day, isEarned, isCurrentDay, onClick }: TreeGrowthDisplayProps) => {
  const getTreeStage = (dayNumber: number) => {
    const stages = {
      1: { icon: '🌱', title: 'Seed Sprout', message: 'Your eco-journey begins!' },
      2: { icon: '🌿', title: 'First Leaf', message: 'Small steps, big impact!' },
      3: { icon: '🪴', title: 'Young Plant', message: 'Growing stronger!' },
      4: { icon: '🌳', title: 'Small Sapling', message: 'Taking root!' },
      5: { icon: '🌲', title: 'Young Tree', message: 'Reaching new heights!' },
      6: { icon: '🌴', title: 'Mature Tree', message: 'Almost there!' },
      7: { icon: '🏞️', title: 'Forest Tree', message: 'Week complete!' }
    };
    return stages[dayNumber as keyof typeof stages] || stages[1];
  };

  const stage = getTreeStage(day);

  return (
    <Card 
      className={`
        flip-card h-24 w-full cursor-pointer transition-all duration-300
        ${isEarned ? 'bg-gradient-eco shadow-eco-strong' : 
          isCurrentDay ? 'border-2 border-primary animate-pulse' : 
          'opacity-60 hover:opacity-80'}
      `}
      onClick={onClick}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front p-3 flex flex-col items-center justify-center text-center">
          <div className="text-2xl mb-1">{stage.icon}</div>
          <div className="text-xs font-semibold text-white">Day {day}</div>
          {isEarned && (
            <Badge className="mt-1 text-xs bg-white/20 text-white border-white/30">
              Earned!
            </Badge>
          )}
        </div>

        {/* Back */}
        <div className="flip-card-back p-3 flex flex-col items-center justify-center text-center text-white">
          <div className="text-sm font-bold mb-1">{stage.title}</div>
          <div className="text-xs opacity-90">{stage.message}</div>
          {isCurrentDay && !isEarned && (
            <div className="text-xs mt-1 opacity-75">Complete habits today!</div>
          )}
        </div>
      </div>
    </Card>
  );
};