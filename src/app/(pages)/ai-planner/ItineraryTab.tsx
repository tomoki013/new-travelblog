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
import { ClockIcon, LandmarkIcon, InfoIcon, JapaneseYen, MapPinIcon } from "lucide-react";


interface ItineraryTabProps {
  days: TravelPlan['itinerary']['days'];
}

export default function ItineraryTab({ days }: ItineraryTabProps) {
  return (
    <Accordion type="single" collapsible defaultValue="day-1" className="w-full">
      {days.map((day) => (
        <AccordionItem key={day.day} value={`day-${day.day}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex w-full items-center justify-between pr-4">
              <div className="flex flex-col text-left">
                <span className="text-sm font-normal text-muted-foreground">{`Day ${day.day}`}</span>
                <span className="text-lg font-semibold">{day.title}</span>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-sm font-normal text-muted-foreground">日予算</span>
                <span className="text-lg font-semibold">{formatCurrency(day.budget)}</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-2">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]"><ClockIcon className="h-4 w-4 inline-block mr-1" />時間</TableHead>
                    <TableHead className="min-w-[150px]"><LandmarkIcon className="h-4 w-4 inline-block mr-1" />アクティビティ</TableHead>
                    <TableHead className="min-w-[200px]"><InfoIcon className="h-4 w-4 inline-block mr-1" />詳細</TableHead>
                    <TableHead><MapPinIcon className="h-4 w-4 inline-block mr-1" />場所</TableHead>
                    <TableHead className="text-right"><JapaneseYen className="h-4 w-4 inline-block mr-1" />費用</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {day.schedule.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.time}</TableCell>
                      <TableCell>{item.activity}</TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-pre-wrap">{item.details}</TableCell>
                      <TableCell>{item.location?.name || '詳細未定'}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.cost)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}