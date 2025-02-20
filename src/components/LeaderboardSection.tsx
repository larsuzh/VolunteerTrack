import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DatePickerWithRange from "./ui/date-picker-with-range";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import PodiumDisplay from "./PodiumDisplay";
import VolunteerList from "./VolunteerList";
import { getLeaderboard } from "@/lib/volunteer";

interface LeaderboardSectionProps {
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
  onPeriodChange?: (period: string) => void;
}

const getDateRangeForPeriod = (period: string) => {
  const now = new Date();
  switch (period) {
    case "weekly":
      return { start: startOfWeek(now), end: endOfWeek(now) };
    case "monthly":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "yearly":
      return { start: startOfYear(now), end: endOfYear(now) };
    default:
      return { start: now, end: addDays(now, 7) };
  }
};

const LeaderboardSection = ({
  onDateRangeChange = () => {},
  onPeriodChange = () => {},
}: LeaderboardSectionProps) => {
  const [date, setDate] = React.useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [leaderboardData, setLeaderboardData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchLeaderboardData = async (start: Date, end: Date) => {
    setLoading(true);
    try {
      const data = await getLeaderboard({ start, end });
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const { start, end } = getDateRangeForPeriod("weekly");
    fetchLeaderboardData(start, end);
  }, []);

  const handlePeriodChange = (period: string) => {
    if (period !== "custom") {
      const { start, end } = getDateRangeForPeriod(period);
      fetchLeaderboardData(start, end);
    }
    onPeriodChange(period);
  };

  return (
    <Card className="w-full bg-gray-50 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Volunteer Leaderboard</h2>
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue="weekly"
            className="w-[400px]"
            onValueChange={handlePeriodChange}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="custom" className="mt-4">
              <DatePickerWithRange
                date={date}
                onDateChange={(newDate) => {
                  if (newDate?.from && newDate?.to) {
                    setDate(newDate);
                    onDateRangeChange(newDate);
                    fetchLeaderboardData(newDate.from, newDate.to);
                  }
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-8">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <PodiumDisplay
                topVolunteers={leaderboardData.slice(0, 3).map((v, i) => ({
                id: v.user_id,
                name: v.user_id,
                hours: v.hours,
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${v.user_id}`,
                rank: (i + 1) as 1 | 2 | 3,
              }))}
            />
            <VolunteerList
              volunteers={leaderboardData.slice(3).map((v, i) => ({
                id: v.user_id,
                name: v.user_id,
                hours: v.hours,
                rank: i + 4,
                lastActivity: new Date().toISOString(),
              }))}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default LeaderboardSection;
