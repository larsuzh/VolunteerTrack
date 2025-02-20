import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {logHours} from "@/lib/volunteer.ts";

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  description: z.string().min(1, "Please enter an activity description"),
  hours: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid number of hours",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface HoursFormProps {
  onSubmit: (data: FormData) => void;
}

const HoursForm = ({ onSubmit }: HoursFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      hours: "",
    },
  });

  return (
    <Card className="w-full max-w-md p-6 bg-white shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formSchema && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(new Date(), "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date()}
                onSelect={(date) => date && setValue("date", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Activity Description
          </label>
          <Textarea
            {...register("description")}
            placeholder="Describe your volunteer activity"
            className="min-h-[100px]"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hours Spent
          </label>
          <Input
            {...register("hours")}
            type="number"
            step="0.5"
            placeholder="Enter number of hours"
          />
          {errors.hours && (
            <p className="text-sm text-red-500">{errors.hours.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Log Hours
        </Button>
      </form>
    </Card>
  );
};

export default HoursForm;
