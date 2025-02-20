import React from "react";
import HoursLoggingSection from "./HoursLoggingSection";
import LeaderboardSection from "./LeaderboardSection";

interface HomeProps {
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
  onPeriodChange?: (period: string) => void;
}

const Home = ({
  onDateRangeChange = (range) => console.log("Date range changed:", range),
  onPeriodChange = (period) => console.log("Period changed:", period),
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[1512px] mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Volunteer Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track your volunteer hours and see how you rank among other
            volunteers
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8">
          <HoursLoggingSection/>
          <LeaderboardSection
            onDateRangeChange={onDateRangeChange}
            onPeriodChange={onPeriodChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
