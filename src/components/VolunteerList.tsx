import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

interface Volunteer {
  id: string;
  name: string;
  hours: number;
  rank: number;
  lastActivity: string;
}

interface VolunteerListProps {
  volunteers?: Volunteer[];
  onSort?: (field: keyof Volunteer) => void;
}

const defaultVolunteers: Volunteer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    hours: 45,
    rank: 4,
    lastActivity: "2024-03-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    hours: 38,
    rank: 5,
    lastActivity: "2024-03-14",
  },
  {
    id: "3",
    name: "Emily Davis",
    hours: 35,
    rank: 6,
    lastActivity: "2024-03-13",
  },
  {
    id: "4",
    name: "James Wilson",
    hours: 32,
    rank: 7,
    lastActivity: "2024-03-12",
  },
];

const VolunteerList = ({
  volunteers = defaultVolunteers,
  onSort = () => {},
}: VolunteerListProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("name")}>
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("hours")}>
                Hours
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("lastActivity")}>
                Last Activity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {volunteers.map((volunteer) => (
            <TableRow key={volunteer.id}>
              <TableCell className="font-medium">{volunteer.rank}</TableCell>
              <TableCell>{volunteer.name}</TableCell>
              <TableCell>{volunteer.hours}</TableCell>
              <TableCell>
                {new Date(volunteer.lastActivity).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VolunteerList;
