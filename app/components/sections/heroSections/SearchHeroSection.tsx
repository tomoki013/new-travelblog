import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const SearchHeroSection = () => {
    return (
        <div className="container relative z-10">
            <div className="mb-10">
                <div className="rounded-xl bg-background/80 backdrop-blur-lg shadow-lg p-8 border">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold mb-2">記事を探す</h2>
                        <p className="text-muted-foreground">
                            旅行日記、観光情報、費用レポートなど、すべての記事から検索できます
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-12">
                        <div className="relative md:col-span-6">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="キーワードを入力..."
                                className="pl-10"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="カテゴリー" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">すべて</SelectItem>
                                    <SelectItem value="diary">旅行日記</SelectItem>
                                    <SelectItem value="tourism">観光情報</SelectItem>
                                    <SelectItem value="itinerary">旅程＆費用レポート</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-3">
                            <Button className="w-full">検索</Button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <p className="text-sm text-muted-foreground">人気のキーワード：</p>
                        {['京都', '温泉', 'グルメ', '格安旅行', '週末旅行', '海外'].map((tag) => (
                            <Button key={tag} variant="outline" size="sm">
                                {tag}
                            </Button>
                        ))}
                    </div>
                  </div>
            </div>
        </div>
    )
}

export default SearchHeroSection;
