import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CostIcon from "./CostIcon";

// 費用内訳を表示するコンポーネント
const CostBreakdown = ({ costs }: { costs: { [key: string]: number } }) => {
    const totalCost = Object.values(costs).reduce((acc, val) => acc + val, 0);
    const costLabels: { [key: string]: string } = {
        flight: "飛行機代",
        hotel: "ホテル代",
        transport: "現地交通費",
        sightseeing: "観光費",
        food: "食費",
        other: "その他"
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>費用内訳</CardTitle>
                <CardDescription>総費用: {totalCost.toLocaleString()}円</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Object.entries(costs).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <CostIcon category={key} />
                                <span className="text-sm font-medium">{costLabels[key] || key}</span>
                            </div>
                            <span className="text-sm font-semibold">{value.toLocaleString()}円</span>
                        </div>
                    ))}
                </div>
                {/* Optional: Add a simple bar chart for visualization */}
                <div className="mt-4 space-y-2">
                    {Object.entries(costs).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                            <div className="w-24 text-xs text-muted-foreground">{costLabels[key] || key}</div>
                            <div className="flex-1 bg-muted rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(value / totalCost) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default CostBreakdown;
