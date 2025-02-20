import {supabase} from "./supabase";
import {Database} from "@/types/supabase";

type VolunteerHours = Database["public"]["Tables"]["volunteer_hours"]["Row"];

export async function logHours(data: {
  user_id: string;
  date: Date;
  description: string;
  hours: number;
}) {
  const { data: result, error } = await supabase
    .from("volunteer_hours")
    .insert({
      user_id: data.user_id,
      date: data.date.toISOString(),
      description: data.description,
      hours: data.hours,
    })
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getRecentHours(user_id: string, limit = 5) {
  const { data, error } = await supabase
    .from("volunteer_hours")
    .select("*")
    .eq("user_id", "lars")
    .order("date", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getLeaderboard(timeRange: { start: Date; end: Date }) {
    const { data, error } = await supabase
        .from("volunteer_hours")
        .select("user_id, hours")
        .gte("date", timeRange.start.toISOString())
        .lte("date", timeRange.end.toISOString())
        .order("hours", { ascending: false });

    if (error) throw error;

    const aggregatedHours = data.reduce((acc, curr) => {
        acc[curr.user_id] = (acc[curr.user_id] || 0) + curr.hours;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(aggregatedHours).map(([user_id, hours]) => ({
        user_id,
        hours,
    })).sort((a, b) => b.hours - a.hours);
}
