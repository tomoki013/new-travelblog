import { Plane, Hotel, Utensils, Landmark, ShoppingCart, CircleDollarSign, Train } from "lucide-react";

// 費用カテゴリに対応するアイコン
const CostIcon = ({ category }: { category: string }) => {
    switch (category.toLowerCase()) {
        case 'flight': return <Plane className="h-5 w-5 mr-2 text-primary" />;
        case 'train': return <Train className="h-5 w-5 mr-2 text-primary" />;
        case 'hotel': return <Hotel className="h-5 w-5 mr-2 text-primary" />;
        case 'transport': return <Plane className="h-5 w-5 mr-2 text-primary" />;
        case 'food': return <Utensils className="h-5 w-5 mr-2 text-primary" />;
        case 'sightseeing': return <Landmark className="h-5 w-5 mr-2 text-primary" />;
        case 'other': return <ShoppingCart className="h-5 w-5 mr-2 text-primary" />;
        default: return <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />;
    }
};

export default CostIcon;
