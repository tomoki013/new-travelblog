// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { PartyPopper, List, Trash2 } from 'lucide-react';
// import Link from 'next/link';
// import * as Elements from '@/app/components/elements/index'; 

// // export const metadata: Metadata = {
// //     title: '旅費計算ツール',
// //     description: 'グループ旅行の費用を簡単に割り勘計算できる無料ツール。カテゴリー別に管理して、公平な費用分担を実現。旅行計画や予算管理に最適です。',
// //     openGraph: {
// //         title: '旅費計算ツール',
// //         description: 'グループ旅行の費用を簡単に割り勘計算できる無料ツール。カテゴリー別に管理して、公平な費用分担を実現。旅行計画や予算管理に最適です。',
// //     },
// //     twitter: {
// //         title: '旅費計算ツール',
// //         description: 'グループ旅行の費用を簡単に割り勘計算できる無料ツール。カテゴリー別に管理して、公平な費用分担を実現。旅行計画や予算管理に最適です。',
// //     },
// // }

// // ProjectMetaの型定義をここに移動
// interface ProjectMeta {
//     id: string;
//     name: string;
//     createdAt: string;
// }

// const ExpensePage = () => {
//     const [projectName, setProjectName] = useState('');
//     const [projects, setProjects] = useState<ProjectMeta[]>([]);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [popupContent, setPopupContent] = useState({ title: '', description: '' });
//     const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

//     const router = useRouter();

//     useEffect(() => {
//         const projectIdsString = localStorage.getItem('expense-project-keys');
//         if (projectIdsString) {
//             try {
//                 const projectIds = JSON.parse(projectIdsString);
//                 const projectMetas = projectIds.map((id: string) => {
//                     const projectData = localStorage.getItem(id);
//                     if (projectData) {
//                         const parsedData = JSON.parse(projectData);
//                         return {
//                             id: parsedData.id,
//                             name: parsedData.name,
//                             createdAt: parsedData.createdAt || new Date().toISOString(),
//                         };
//                     }
//                     return null;
//                 }).filter(Boolean);
//                 setProjects(projectMetas);
//             } catch (error) {
//                 console.error("プロジェクトリストの読み込みに失敗しました。", error);
//                 localStorage.removeItem('expense-project-keys');
//             }
//         }
//     }, []);

//     const showPopup = (title: string, description: string) => {
//         setPopupContent({ title, description });
//         setIsPopupOpen(true);
//     };

//     const handleCreateProject = () => {
//         if (!projectName.trim()) {
//             showPopup('エラー', 'プロジェクト名を入力してください。');
//             return;
//         }

//         const today = new Date();
//         const dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
        
//         const sanitizedProjectName = projectName.trim().replace(/[\s/?#&%]/g, '-');
//         const projectId = `${dateString}-${sanitizedProjectName}`;
        
//         // 新しいプロジェクトのメタデータを作成
//         const newProjectData = {
//             id: projectId,
//             name: projectName.trim(),
//             createdAt: today.toISOString(),
//             members: [],
//             payments: [],
//         };
        
//         // ローカルストレージに新しいプロジェクトデータを保存
//         localStorage.setItem(projectId, JSON.stringify(newProjectData));

//         // プロジェクトIDの一覧を更新
//         const projectIdsString = localStorage.getItem('expense-project-keys');
//         const projectIds = projectIdsString ? JSON.parse(projectIdsString) : [];
//         if (!projectIds.includes(projectId)) {
//             projectIds.push(projectId);
//             localStorage.setItem('expense-project-keys', JSON.stringify(projectIds));
//         }
        
//         // 作成したプロジェクトページに遷移
//         router.push(`/calculator/expense/${encodeURIComponent(projectId)}`);
//     };

//     const confirmDelete = (projectId: string) => {
//         setProjectToDelete(projectId);
//         showPopup('プロジェクトの削除', '本当にこのプロジェクトを削除しますか？この操作は元に戻せません。');
//     };

//     const handleDeleteProject = () => {
//         if (!projectToDelete) return;

//         const updatedProjects = projects.filter(p => p.id !== projectToDelete);
//         setProjects(updatedProjects);

//         const updatedProjectIds = updatedProjects.map(p => p.id);
//         localStorage.setItem('expense-project-keys', JSON.stringify(updatedProjectIds));
//         localStorage.removeItem(projectToDelete);

//         setProjectToDelete(null);
//         setIsPopupOpen(false);
//     };

//     return (
//         <>
//             <div className="container py-12">
//                 <div className="mb-12 text-center">
//                     <h1 className="mb-4 text-4xl font-bold">旅の割り勘を、もっとスマートに</h1>
//                     <p className="mx-auto max-w-2xl text-muted-foreground">
//                         新しいプロジェクトを作成して、旅行の費用をメンバーと簡単に精算しましょう。
//                     </p>
//                 </div>
//                 <div className="mx-auto max-w-xl grid gap-12">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center gap-2">
//                                 <PartyPopper className="h-5 w-5" />
//                                 新しいプロジェクトを作成
//                             </CardTitle>
//                             <CardDescription>
//                                 旅行の名前や目的などを入力してください。
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                              <Input
//                                 id="project-name"
//                                 placeholder="例: 沖縄旅行2025"
//                                 value={projectName}
//                                 onChange={(e) => setProjectName(e.target.value)}
//                                 onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
//                             />
//                         </CardContent>
//                         <CardFooter>
//                             <Button onClick={handleCreateProject} className="w-full">
//                                 プロジェクトを作成して開始
//                             </Button>
//                         </CardFooter>
//                     </Card>

//                     {projects.length > 0 && (
//                         <Card>
//                              <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <List className="h-5 w-5" />
//                                     保存したプロジェクト
//                                 </CardTitle>
//                                  <CardDescription>
//                                     過去に作成したプロジェクトをここから開くことができます。
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <ul className="space-y-3">
//                                     {projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(project => (
//                                         <li key={project.id} className="flex items-center justify-between gap-2 p-3 border rounded-lg hover:bg-accent">
//                                             <Link href={`/calculator/expense/${encodeURIComponent(project.id)}`} className="flex-grow">
//                                                 <p className="font-semibold">{project.name}</p>
//                                                 <p className="text-xs text-muted-foreground">作成日: {new Date(project.createdAt).toLocaleDateString()}</p>
//                                             </Link>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     confirmDelete(project.id);
//                                                 }}
//                                                 aria-label={`${project.name}を削除`}
//                                             >
//                                                 <Trash2 className="h-4 w-4 text-destructive" />
//                                             </Button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </CardContent>
//                         </Card>
//                     )}
//                 </div>
//             </div>

//             <Elements.Popup
//                 buttonType="none"
//                 modalState={isPopupOpen}
//                 onClose={() => setIsPopupOpen(false)}
//             >
//                 <div className="text-center p-4">
//                     <h3 className="text-lg font-bold mb-2">{popupContent.title}</h3>
//                     <p className="text-sm text-muted-foreground mb-6">{popupContent.description}</p>
//                     {projectToDelete ? (
//                          <div className="flex justify-center gap-4">
//                             <Button variant="outline" onClick={() => setIsPopupOpen(false)}>キャンセル</Button>
//                             <Button variant="destructive" onClick={handleDeleteProject}>削除する</Button>
//                         </div>
//                     ) : (
//                         <Button onClick={() => setIsPopupOpen(false)}>閉じる</Button>
//                     )}
//                 </div>
//             </Elements.Popup>
//         </>
//     );
// };

// export default ExpensePage;

const ExpensePage = () => {
    return (
        <p>このページは作成中です</p>
    )
}

export default ExpensePage;
