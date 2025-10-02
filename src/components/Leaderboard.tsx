import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Leaf } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  total_co2_saved: number;
  rank: number;
}

export const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  const fetchLeaderboard = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get all users with their total CO2 saved
      const { data: logs, error } = await supabase
        .from('habit_logs')
        .select('user_id, co2_saved, profiles(display_name)');

      if (error) throw error;

      // Aggregate CO2 saved per user
      const userTotals = logs.reduce((acc: any, log: any) => {
        const userId = log.user_id;
        const displayName = log.profiles?.display_name || 'Anonymous';
        
        if (!acc[userId]) {
          acc[userId] = {
            user_id: userId,
            display_name: displayName,
            total_co2_saved: 0,
          };
        }
        
        acc[userId].total_co2_saved += Number(log.co2_saved);
        return acc;
      }, {});

      // Convert to array and sort by total CO2 saved
      const sortedUsers = Object.values(userTotals)
        .sort((a: any, b: any) => b.total_co2_saved - a.total_co2_saved)
        .map((user: any, index) => ({
          ...user,
          rank: index + 1,
        }));

      setLeaderboard(sortedUsers);

      // Find current user's rank
      const currentUserRank = sortedUsers.find((u: any) => u.user_id === user.id);
      setUserRank(currentUserRank || null);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getMedalBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-white">Gold</Badge>;
      case 2:
        return <Badge className="bg-gray-400 text-white">Silver</Badge>;
      case 3:
        return <Badge className="bg-amber-600 text-white">Bronze</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User's Current Rank */}
      {userRank && (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Your Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary">#{userRank.rank}</div>
                <div>
                  <p className="font-semibold">{userRank.display_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {userRank.total_co2_saved.toFixed(2)} kg CO₂ saved
                  </p>
                </div>
              </div>
              {userRank.rank <= 3 && getMedalIcon(userRank.rank)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 3 Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Eco Warriors
          </CardTitle>
          <CardDescription>Leading the charge in reducing carbon emissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboard.slice(0, 3).map((entry) => (
              <Card
                key={entry.user_id}
                className={`${
                  entry.user_id === user?.id ? 'border-primary shadow-lg' : ''
                } ${entry.rank === 1 ? 'md:order-2' : entry.rank === 2 ? 'md:order-1' : 'md:order-3'}`}
              >
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="flex justify-center">{getMedalIcon(entry.rank)}</div>
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarFallback className="text-lg">
                      {getInitials(entry.display_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{entry.display_name}</p>
                    <p className="text-2xl font-bold text-primary">
                      {entry.total_co2_saved.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">kg CO₂ saved</p>
                  </div>
                  {getMedalBadge(entry.rank)}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Full Leaderboard</CardTitle>
          <CardDescription>All eco warriors making a difference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.user_id}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  entry.user_id === user?.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 flex justify-center">
                    {entry.rank <= 3 ? (
                      getMedalIcon(entry.rank)
                    ) : (
                      <span className="font-semibold text-muted-foreground">#{entry.rank}</span>
                    )}
                  </div>
                  <Avatar>
                    <AvatarFallback>{getInitials(entry.display_name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {entry.display_name}
                      {entry.user_id === user?.id && (
                        <Badge variant="outline" className="ml-2">You</Badge>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rank #{entry.rank}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{entry.total_co2_saved.toFixed(2)} kg</p>
                  <p className="text-xs text-muted-foreground">CO₂ saved</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
