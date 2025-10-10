"use client";

import { TravelPlan } from "@/types/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface BudgetTabProps {
  budgetSummary: TravelPlan['budgetSummary'];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="font-bold">{`${payload[0].name}`}</p>
        <p className="text-sm text-muted-foreground">{`金額: ${formatCurrency(payload[0].value)}`}</p>
        <p className="text-sm text-muted-foreground">{`割合: ${(payload[0].percent * 100).toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

export default function BudgetTab({ budgetSummary }: BudgetTabProps) {
  const { total, categories } = budgetSummary;

  return (
    <Card>
      <CardHeader>
        <CardTitle>予算概要</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">合計予算</p>
          <p className="text-4xl font-bold">{formatCurrency(total)}</p>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
                nameKey="category"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2">
          {categories.map((item, index) => (
            <li key={item.category} className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className="mr-2 inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{item.category}</span>
              </div>
              <span className="font-medium">{formatCurrency(item.amount)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
