// 'use client';

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Calendar, MapPin, Search } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import getAllPosts from "@/lib/markdown";

// const DiaryPage = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('all');

//     const posts = getAllPosts('diary');

//     const filteredPosts = posts.filter((post) => {
//         const matchesSearch =
//             post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.location.toLowerCase().includes(searchQuery.toLowerCase());

//         const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

//         return matchesSearch && matchesCategory;
//     });

//     const domesticPosts = filteredPosts.filter((post) => post.category === '国内旅行');
//     const internationalPosts = filteredPosts.filter((post) => post.category === '海外旅行');

//     return (
//         <div className="container py-12">
//             <div className="mb-12 text-center">
//                 <h1 className="mb-4 text-4xl font-bold">旅行日記</h1>
//                 <p className="mx-auto max-w-2xl text-muted-foreground">日本国内や世界各地を旅した記録と体験をお届けします。美しい風景、文化体験、グルメ情報など、旅の魅力を発見してください。</p>
//             </div>

//             {/* Search and Filter */}
//             <div className="mb-10 flex flex-col gap-4 sm:flex-row">
//                 <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                         placeholder="タイトル、内容、場所で検索..."
//                         className="pl-10"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 </div>
//                 <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                     <SelectTrigger className="w-full sm:w-[180px]">
//                         <SelectValue placeholder="カテゴリー" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">全て</SelectItem>
//                         <SelectItem value="国内旅行">国内旅行</SelectItem>
//                         <SelectItem value="海外旅行">海外旅行</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//             {/* Tabs */}
//             <Tabs defaultValue="all" className="mb-10">
//                 <TabsList className="grid w-full grid-cols-3">
//                     <TabsTrigger value="all">すべて</TabsTrigger>
//                     <TabsTrigger value="国内旅行">国内旅行</TabsTrigger>
//                     <TabsTrigger value="海外旅行">海外旅行</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="all">
//                     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                         {filteredPosts.map((post) => (
//                             <PostCard key={post.slug} post={post} />
//                         ))}
//                     </div>
//                     {filteredPosts.length === 0 && (
//                         <div className="mt-8 text-center text-muted-foreground">検索条件に一致する記事が見つかりませんでした。</div>
//                     )}
//                 </TabsContent>
//                 <TabsContent value="国内旅行">
//                     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                         {domesticPosts
//                             .filter(post =>
//                                 post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                                 post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                                 post.location.toLowerCase().includes(searchQuery.toLowerCase()))
//                             .map((post) => (
//                                 <PostCard key={post.slug} post={post} />
//                             ))
//                         }
//                     </div>
//                 </TabsContent>
//                 <TabsContent value="海外旅行">
//                     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                         {internationalPosts
//                             .filter(post =>
//                                 post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                                 post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                                 post.location.toLowerCase().includes(searchQuery.toLowerCase()))
//                             .map((post) => (
//                                 <PostCard key={post.slug} post={post} />
//                             ))
//                         }
//                     </div>
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }

// interface Post {
//     slug: string;
//     title: string;
//     excerpt: string;
//     image: string;
//     location: string;
//     date: string;
//     category: string;
// }

// function PostCard({ post }: { post: Post }) {
//     return (
//         <Card className='overflow-hidden transition-all hover:shadow-lg'>
//             <div className="relative h-48 w-full">
//                 <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     style={{ objectFit: 'cover' }}
//                 />
//             </div>
//             <CardContent className="p-6">
//                 <div className="mb-3 flex items-center justify-between">
//                     <Badge variant='outline'>{post.category}</Badge>
//                     <span className="flex items-center text-xs text-muted-foreground">
//                         <Calendar className="mr-1 h-3 w-3" />
//                         {post.date}
//                     </span>
//                 </div>
//                 <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
//                 <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
//                 <div className="flex items-center justify-between">
//                     <span className="flex items-center text-xs text-muted-foreground">
//                         <MapPin className="mr-1 h-3 w-3" />
//                         {post.location}
//                     </span>
//                     <Link
//                         href={`/diary/${post.slug}`}
//                         className="text-sm font-medium text-primary hover:underline"
//                     >
//                         続きを読む
//                     </Link>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// export default DiaryPage;
