import React from "react";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { motion } from "framer-motion";

interface Volunteer {
  id: string;
  name: string;
  hours: number;
  avatarUrl: string;
  rank: 1 | 2 | 3;
}

interface PodiumDisplayProps {
  topVolunteers?: Volunteer[];
}

const defaultVolunteers: Volunteer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    hours: 45,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rank: 1,
  },
  {
    id: "2",
    name: "Mike Smith",
    hours: 38,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    rank: 2,
  },
  {
    id: "3",
    name: "Emma Davis",
    hours: 32,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    rank: 3,
  },
];

const PodiumDisplay = ({
  topVolunteers,
}: PodiumDisplayProps) => {
  const podiumOrder = [1, 0, 2]; // Display order: 2nd, 1st, 3rd

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg h-[400px]">
      <h2 className="text-2xl font-bold text-center mb-8">Top Volunteers</h2>
      <div className="flex justify-center items-end gap-4 top-36 bottom-0 h-[-300px-] h-[300px]">
        {podiumOrder.map((index) => {
          const volunteer = topVolunteers[index];
          const podiumHeight =
            volunteer.rank === 1
              ? "h-[160px]"
              : volunteer.rank === 2
                ? "h-[120px]"
                : "h-[100px]";

          return (
            <motion.div
              key={volunteer.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="w-[120px] p-4 flex flex-col items-center gap-2 mb-2">
                <Avatar className="w-12 h-12">
                  <img
                    src={volunteer.avatarUrl}
                    alt={volunteer.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <div className="text-center">
                  <p className="font-semibold truncate w-full">
                    {volunteer.name}
                  </p>
                  <p className="text-sm text-gray-600">{volunteer.hours} hrs</p>
                </div>
              </Card>
              <div
                className={`${podiumHeight} w-20 bg-primary rounded-t-lg flex items-center justify-center`}
              >
                <span className="text-2xl font-bold text-white">
                  #{volunteer.rank}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PodiumDisplay;
