"use client";

import { TravelPlan } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ClockIcon, LandmarkIcon, InfoIcon, DollarSignIcon, MapPinIcon } from "lucide-react";


interface ItineraryTabProps {
  days: TravelPlan['itinerary']['days'];
}

export default function ItineraryTab({ days }: ItineraryTabProps) {
  return (
    <Accordion type="single" collapsible defaultValue="day-1" className="w-full">
      {days.map((day) => (
        <AccordionItem key={day.day} value={`day-${day.day}`}>
          <AccordionTrigger>
            <div className="flex w-full items-center justify-between pr-4">
              <span className="font-semibold">{`Day ${day.day}: ${day.title}`}</span>
              <span className="text-sm text-muted-foreground">{formatCurrency(day.budget)}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"><ClockIcon className="h-4 w-4 inline-block mr-1" />時間</TableHead>
                  <TableHead><LandmarkIcon className="h-4 w-4 inline-block mr-1" />アクティビティ</TableHead>
                  <TableHead><InfoIcon className="h-4 w-4 inline-block mr-1" />詳細</TableHead>
                  <TableHead><MapPinIcon className="h-4 w-4 inline-block mr-1" />場所</TableHead>
                  <TableHead className="text-right"><DollarSignIcon className="h-4 w-4 inline-block mr-1" />費用</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {day.schedule.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.time}</TableCell>
                    <TableCell>{item.activity}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.details}</TableCell>
                    <TableCell>{item.location.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.cost)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}