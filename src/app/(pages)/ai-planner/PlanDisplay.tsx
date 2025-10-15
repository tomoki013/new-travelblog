"use client";

import { TravelPlan } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItineraryTab from "./ItineraryTab";
import BudgetTab from "./BudgetTab";
import MapPlaceholder from "./MapPlaceholder";
import { formatCurrency } from "@/lib/utils";
import { CalendarDaysIcon, PiggyBankIcon, MapIcon, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert"


interface PlanDisplayProps {
  plan: TravelPlan;
  isFallbackMode: boolean;
}

export default function PlanDisplay({ plan, isFallbackMode }: PlanDisplayProps) {
  const { itinerary, budgetSummary } = plan;

  return (
    <div className="space-y-6">
       {isFallbackMode && (
        <Alert variant="default" className="bg-yellow-100 border-yellow-400 text-yellow-800">
          <TriangleAlert className="h-4 w-4" color="#c8a30a"/>
          <AlertDescription>
            詳細なプランの生成中に問題が発生しました。代わりにプランの骨子と概算の予算を表示しています。内容が簡略化されている点にご注意ください。
          </AlertDescription>
        </Alert>
      )}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h1 className="text-3xl font-bold tracking-tight">{itinerary.title}</h1>
        <p className="mt-2 text-muted-foreground">{itinerary.description}</p>
        <div className="mt-4 rounded-md bg-primary/10 p-4 text-center text-primary">
          <span className="text-sm">合計予算</span>
          <p className="text-2xl font-bold">
            {budgetSummary ? formatCurrency(budgetSummary.total) : '計算中...'}
          </p>
        </div>
      </div>

      {/* Mobile View (Tabs) */}
      <div className="block md:hidden">
        <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className={`grid w-full ${budgetSummary ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <TabsTrigger value="itinerary">
              <CalendarDaysIcon className="mr-2 h-4 w-4" />
              日程
            </TabsTrigger>
            {budgetSummary && (
              <TabsTrigger value="budget">
                <PiggyBankIcon className="mr-2 h-4 w-4" />
                予算
              </TabsTrigger>
            )}
            <TabsTrigger value="map">
              <MapIcon className="mr-2 h-4 w-4" />
              地図
            </TabsTrigger>
          </TabsList>
          <TabsContent value="itinerary" className="mt-4">
            <ItineraryTab days={itinerary.days} />
          </TabsContent>
          {budgetSummary && (
            <TabsContent value="budget" className="mt-4">
              <BudgetTab budgetSummary={budgetSummary} />
            </TabsContent>
          )}
          <TabsContent value="map" className="mt-4">
            <MapPlaceholder />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View (2-column) */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-6">
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className={`grid w-full ${budgetSummary ? 'grid-cols-2' : 'grid-cols-1'}`}>
              <TabsTrigger value="itinerary">
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                日程
              </TabsTrigger>
              {budgetSummary && (
                <TabsTrigger value="budget">
                  <PiggyBankIcon className="mr-2 h-4 w-4" />
                  予算
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="itinerary" className="mt-4">
              <ItineraryTab days={itinerary.days} />
            </TabsContent>
            {budgetSummary && (
              <TabsContent value="budget" className="mt-4">
                <BudgetTab budgetSummary={budgetSummary} />
              </TabsContent>
            )}
          </Tabs>
        </div>
        <div className="md:col-span-2">
          <MapPlaceholder />
        </div>
      </div>
    </div>
  );
}