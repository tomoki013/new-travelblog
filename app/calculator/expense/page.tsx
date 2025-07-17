"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PartyPopper, List, Trash2 } from 'lucide-react';
import Link from 'next/link';
import * as Elements from '@/app/components/elements/index'; 

// ProjectMetaの型定義をここに移動
interface ProjectMeta {
    id: string;
    name: string;
    createdAt: string;
}

const ExpensePage = () => {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState<ProjectMeta[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({ title: '', description: '' });
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

    const router = useRouter();

    // プロジェクトリストを読み込む関数
    const loadProjects = () => {
        const projectIdsString = localStorage.getItem('expense-project-keys');
        if (projectIdsString) {
            try {
                const projectIds = JSON.parse(projectIdsString);
                const projectMetas = projectIds.map((id: string) => {
                    const projectData = localStorage.getItem(id);
                    if (projectData) {
                        try {
                            const parsedData = JSON.parse(projectData);
                            return {
                                id: parsedData.id || id, // idが存在しない場合はキーを使用
                                name: parsedData.name || '名前未設定',
                                createdAt: parsedData.createdAt || new Date().toISOString(),
                            };
                        } catch (parseError) {
                            console.error(`プロジェクトデータの解析に失敗しました (${id}):`, parseError);
                            return null;
                        }
                    }
                    return null;
                }).filter(Boolean) as ProjectMeta[];
                
                setProjects(projectMetas);
            } catch (error) {
                console.error("プロジェクトリストの読み込みに失敗しました。", error);
                localStorage.removeItem('expense-project-keys');
                setProjects([]);
            }
        } else {
            setProjects([]);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const showPopup = (title: string, description: string) => {
        setPopupContent({ title, description });
        setIsPopupOpen(true);
    };

    const handleCreateProject = () => {
        if (!projectName.trim()) {
            showPopup('エラー', 'プロジェクト名を入力してください。');
            return;
        }

        const today = new Date();
        const dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
        
        const sanitizedProjectName = projectName.trim().replace(/[\s/?#&%]/g, '-');
        const projectID = `${dateString}-${sanitizedProjectName}`;
        
        // 既存のプロジェクトIDと重複しないかチェック
        const existingProject = projects.find(p => p.id === projectID);
        if (existingProject) {
            showPopup('エラー', 'このプロジェクト名は既に存在します。別の名前を入力してください。');
            return;
        }
        
        // 新しいプロジェクトのメタデータを作成
        const newProjectData = {
            id: projectID,
            name: projectName.trim(),
            createdAt: today.toISOString(),
            members: [],
            payments: [],
        };
        
        try {
            // ローカルストレージに新しいプロジェクトデータを保存
            localStorage.setItem(projectID, JSON.stringify(newProjectData));

            // プロジェクトIDの一覧を更新
            const projectIdsString = localStorage.getItem('expense-project-keys');
            const projectIds = projectIdsString ? JSON.parse(projectIdsString) : [];
            if (!projectIds.includes(projectID)) {
                projectIds.push(projectID);
                localStorage.setItem('expense-project-keys', JSON.stringify(projectIds));
            }
            
            // 作成したプロジェクトページに遷移
            router.push(`/calculator/expense/${encodeURIComponent(projectID)}`);
        } catch (error) {
            console.error('プロジェクトの作成に失敗しました:', error);
            showPopup('エラー', 'プロジェクトの作成に失敗しました。もう一度お試しください。');
        }
    };

    const confirmDelete = (projectID: string) => {
        const project = projects.find(p => p.id === projectID);
        setProjectToDelete(projectID);
        showPopup(
            'プロジェクトの削除', 
            `"${project?.name || 'Unknown'}"を削除しますか？この操作は元に戻せません。`
        );
    };

    const handleDeleteProject = () => {
        if (!projectToDelete) return;

        try {
            // プロジェクトデータをローカルストレージから削除
            localStorage.removeItem(projectToDelete);

            // プロジェクトIDリストから削除
            const projectIdsString = localStorage.getItem('expense-project-keys');
            if (projectIdsString) {
                const projectIds = JSON.parse(projectIdsString);
                const updatedProjectIds = projectIds.filter((id: string) => id !== projectToDelete);
                localStorage.setItem('expense-project-keys', JSON.stringify(updatedProjectIds));
            }

            // 状態を更新
            const updatedProjects = projects.filter(p => p.id !== projectToDelete);
            setProjects(updatedProjects);

            // ポップアップを閉じる
            setProjectToDelete(null);
            setIsPopupOpen(false);

            // 成功メッセージを表示
            setTimeout(() => {
                showPopup('削除完了', 'プロジェクトが正常に削除されました。');
            }, 100);

        } catch (error) {
            console.error('プロジェクトの削除に失敗しました:', error);
            showPopup('エラー', 'プロジェクトの削除に失敗しました。もう一度お試しください。');
        }
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        setProjectToDelete(null);
    };

    return (
        <>
            <div className="container py-12">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">旅の割り勘を、もっとスマートに</h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        新しいプロジェクトを作成して、旅行の費用をメンバーと簡単に精算しましょう。
                    </p>
                </div>
                <div className="mx-auto max-w-xl grid gap-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PartyPopper className="h-5 w-5" />
                                新しいプロジェクトを作成
                            </CardTitle>
                            <CardDescription>
                                旅行の名前や目的などを入力してください。
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Input
                                id="project-name"
                                placeholder="例: 沖縄旅行2025"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleCreateProject} className="w-full">
                                プロジェクトを作成して開始
                            </Button>
                        </CardFooter>
                    </Card>

                    {projects.length > 0 && (
                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <List className="h-5 w-5" />
                                    保存したプロジェクト ({projects.length})
                                </CardTitle>
                                 <CardDescription>
                                    過去に作成したプロジェクトをここから開くことができます。
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(project => (
                                        <li key={project.id} className="flex items-center justify-between gap-2 p-3 border rounded-lg hover:bg-accent">
                                            <Link href={`/calculator/expense/${encodeURIComponent(project.id)}`} className="flex-grow">
                                                <p className="font-semibold">{project.name}</p>
                                                <p className="text-xs text-muted-foreground">作成日: {new Date(project.createdAt).toLocaleDateString()}</p>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    confirmDelete(project.id);
                                                }}
                                                aria-label={`${project.name}を削除`}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            <Elements.Popup
                buttonType="none"
                dialogTitle={popupContent.title}
                dialogDescription={popupContent.description}
                modalState={isPopupOpen}
                onClose={handlePopupClose}
            >
                <div className="text-center p-4">
                    {projectToDelete ? (
                         <div className="flex justify-center gap-4">
                            <Button variant="outline" onClick={handlePopupClose}>キャンセル</Button>
                            <Button variant="destructive" onClick={handleDeleteProject}>削除する</Button>
                        </div>
                    ) : (
                        <Button onClick={handlePopupClose}>閉じる</Button>
                    )}
                </div>
            </Elements.Popup>
        </>
    );
};

export default ExpensePage;
