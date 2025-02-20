import React, { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import HoursForm from "./HoursForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { logHours } from "@/lib/volunteer.ts";

interface HoursLoggingSectionProps {
  onSubmit?: (data: any) => void;
}

const HoursLoggingSection = ({
                               onSubmit = async (data) => {
                                 try {
                                   await logHours({
                                     user_id: "temp-user-id", // Replace with actual user ID from auth
                                     date: data.date,
                                     description: data.description,
                                     hours: Number(data.hours),
                                   });
                                 } catch (error) {
                                   console.error("Error logging hours:", error);
                                 }
                               },
                             }: HoursLoggingSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Card className="w-full max-w-[450px] h-[600px] bg-white p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Volunteer Hours</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Log Hours
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Log Volunteer Hours</DialogTitle>
              </DialogHeader>
              <HoursForm onSubmit={(data) => {
                onSubmit(data);
                setIsOpen(false);
              }} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="recent" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="stats">Your Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="flex-1">
            <div className="space-y-4 mt-4">
              {[
                {
                  date: "March 15, 2024",
                  activity: "Coach Assistant",
                  hours: 3,
                },
                {
                  date: "March 12, 2024",
                  activity: "Equipment Management",
                  hours: 2,
                },
                {
                  date: "March 10, 2024",
                  activity: "Event Setup",
                  hours: 4,
                },
              ].map((entry, index) => (
                  <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-medium">{entry.activity}</p>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>{entry.date}</span>
                      <span>{entry.hours} hours</span>
                    </div>
                  </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="flex-1">
            <div className="space-y-6 mt-4">
              <div className="text-center p-6 border rounded-lg">
                <h3 className="text-3xl font-bold text-primary">24</h3>
                <p className="text-gray-600">Total Hours This Month</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="text-xl font-bold text-primary">8</h4>
                  <p className="text-sm text-gray-600">Activities</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="text-xl font-bold text-primary">#5</h4>
                  <p className="text-sm text-gray-600">Current Rank</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Monthly Progress</h4>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                      className="h-full bg-primary"
                      style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
  );
};

export default HoursLoggingSection;