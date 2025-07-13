// "use client";

// import { useExpense } from '@/lib/hooks/useExpense';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';
// import { Trash2, UserPlus, DollarSign, Users, List, Calculator, PlusCircle } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
// import * as Elements from '@/app/components/elements/index';

// const ExpenseClient = ({ projectId }: { projectId: string }) => {
//     const {
//         project,
//         setProjectName,
//         addMember,
//         removeMember,
//         addPayment,
//         removePayment,
//         calculationResult,
//         isLoading,
//     } = useExpense(projectId);

//     const [newMemberName, setNewMemberName] = useState('');
//     const [paymentAmount, setPaymentAmount] = useState('');
//     const [paymentDesc, setPaymentDesc] = useState('');
//     const [paidBy, setPaidBy] = useState('');
//     const [paidFor, setPaidFor] = useState<string[]>([]);
    
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [newProjectNameForModal, setNewProjectNameForModal] = useState('');
//     const router = useRouter();

//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [popupContent, setPopupContent] = useState({ title: '', description: '' });

//     // 初回表示時に注意書きポップアップを表示
//     useEffect(() => {
//         const hasShownWarning = sessionStorage.getItem(`expense-warning-${projectId}`);
//         if (!hasShownWarning) {
//              showPopup(
//                 '⚠️ 注意事項',
//                 'このページの情報はお使いのブラウザにのみ保存されます。URLを共有しても他の人は内容を見れません。個人情報は入力しないでください。'
//              );
//              sessionStorage.setItem(`expense-warning-${projectId}`, 'true');
//         }
//     }, [projectId]);

//     const showPopup = (title: string, description: string) => {
//         setPopupContent({ title, description });
//         setIsPopupOpen(true);
//     };

//     const handleAddMember = () => {
//         if (!newMemberName.trim()) {
//             showPopup('エラー', 'メンバー名を入力してください。');
//             return;
//         }
//         if (project.members.some(m => m.name === newMemberName.trim())) {
//             showPopup('エラー', '同じ名前のメンバーが既に存在します。');
//             return;
//         }
//         addMember(newMemberName.trim());
//         setNewMemberName('');
//     };

//     const handleAddPayment = () => {
//         if (!paymentAmount || !paymentDesc || !paidBy || paidFor.length === 0) {
//             showPopup('エラー', '支払いの詳細（金額、内容、支払者、対象者）をすべて入力してください。');
//             return;
//         }
//         addPayment(Number(paymentAmount), paymentDesc, paidBy, paidFor);
//         setPaymentAmount('');
//         setPaymentDesc('');
//         setPaidBy('');
//         setPaidFor([]);
//     };

//     const handleCreateNewProject = () => {
//         if (!newProjectNameForModal.trim()) {
//             showPopup('エラー', '新しいプロジェクト名を入力してください。');
//             return;
//         }

//         const today = new Date();
//         const dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
//         const sanitizedProjectName = newProjectNameForModal.trim().replace(/[\s/?#&%]/g, '-');
//         const newProjectId = `${dateString}-${sanitizedProjectName}`;
        
//         const projectMeta = { id: newProjectId, name: newProjectNameForModal.trim(), createdAt: today.toISOString() };
//         const projectIdsString = localStorage.getItem('expense-project-keys');
//         const projectIds = projectIdsString ? JSON.parse(projectIdsString) : [];
//         if (!projectIds.includes(newProjectId)) {
//             projectIds.push(newProjectId);
//             localStorage.setItem('expense-project-keys', JSON.stringify(projectIds));
//         }
//         const newProjectData = { ...projectMeta, members: [], payments: [] };
//         localStorage.setItem(newProjectId, JSON.stringify(newProjectData));

//         setIsCreateModalOpen(false);
//         setNewProjectNameForModal('');
//         router.push(`/calculator/expense/${newProjectId}`);
//     };

//     if (isLoading) {
//         return <div>プロジェクトを読み込んでいます...</div>;
//     }

//     return (
//         <>
//             <div className="space-y-8">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                     <Input
//                         value={project.name}
//                         onChange={(e) => setProjectName(e.target.value)}
//                         className="text-2xl sm:text-3xl font-bold w-full sm:w-auto flex-grow"
//                         placeholder="プロジェクト名"
//                     />
//                     <Button onClick={() => setIsCreateModalOpen(true)} variant="outline">
//                         <PlusCircle className="mr-2 h-4 w-4" />
//                         新しいプロジェクトを作成
//                     </Button>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     <div className="lg:col-span-1 space-y-6">
//                         <Card>
//                             <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />メンバー</CardTitle></CardHeader>
//                             <CardContent className="space-y-4">
//                                 <div className="flex gap-2">
//                                     <Input
//                                         placeholder="ニックネームを追加"
//                                         value={newMemberName}
//                                         onChange={(e) => setNewMemberName(e.target.value)}
//                                         onKeyDown={(e) => e.key === 'Enter' && handleAddMember()}
//                                     />
//                                     <Button onClick={handleAddMember}><UserPlus className="h-4 w-4" /></Button>
//                                 </div>
//                                 <ul className="space-y-2">
//                                     {project.members.map(member => (
//                                         <li key={member.id} className="flex justify-between items-center bg-muted p-2 rounded-md">
//                                             <span>{member.name}</span>
//                                             <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)}>
//                                                 <Trash2 className="h-4 w-4 text-destructive" />
//                                             </Button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </CardContent>
//                         </Card>

//                         <Card>
//                             <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" />支払いを記録</CardTitle></CardHeader>
//                             <CardContent className="space-y-4">
//                                 <Input placeholder="金額" type="number" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} />
//                                 <Input placeholder="内容 (例: 夕食代)" value={paymentDesc} onChange={e => setPaymentDesc(e.target.value)} />
//                                 <Select value={paidBy} onValueChange={setPaidBy}>
//                                     <SelectTrigger><SelectValue placeholder="支払った人" /></SelectTrigger>
//                                     <SelectContent>{project.members.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
//                                 </Select>
//                                 <div>
//                                     <Label className="font-medium">立て替えた対象者</Label>
//                                     <div className="space-y-2 mt-2">
//                                         {project.members.map(member => (
//                                             <div key={member.id} className="flex items-center gap-2">
//                                                 <Checkbox
//                                                     id={`paidFor-${member.id}`}
//                                                     checked={paidFor.includes(member.id)}
//                                                     onCheckedChange={(checked) => setPaidFor(prev => checked ? [...prev, member.id] : prev.filter(id => id !== member.id))}
//                                                 />
//                                                 <Label htmlFor={`paidFor-${member.id}`}>{member.name}</Label>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <Button onClick={handleAddPayment} className="w-full">支払いを追加</Button>
//                             </CardContent>
//                         </Card>
//                     </div>
                    
//                     <div className="lg:col-span-2 space-y-6">
//                          <Card>
//                             <CardHeader><CardTitle className="flex items-center gap-2"><List className="h-5 w-5" />支払い一覧</CardTitle></CardHeader>
//                             <CardContent>
//                                 {project.payments.length > 0 ? (
//                                     <ul className="space-y-2">
//                                         {project.payments.map(p => (
//                                             <li key={p.id} className="flex justify-between items-center p-2 border rounded-md">
//                                                 <div>
//                                                     <p className="font-semibold">{p.description} - {p.amount.toLocaleString()}円</p>
//                                                     <p className="text-sm text-muted-foreground">
//                                                         支払: {project.members.find(m => m.id === p.paidBy)?.name} | 
//                                                         対象: {p.paidFor.map(id => project.members.find(m => m.id === id)?.name).join(', ')}
//                                                     </p>
//                                                 </div>
//                                                 <Button variant="ghost" size="icon" onClick={() => removePayment(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 ) : <p className="text-muted-foreground text-center">まだ支払いが記録されていません。</p>}
//                             </CardContent>
//                         </Card>
                        
//                         <Card className="bg-primary/5">
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" />精算結果</CardTitle>
//                                 <CardDescription>精算が最小限のやり取りで完了するように計算しました。</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                  {calculationResult.length > 0 ? (
//                                     <ul className="space-y-3">
//                                         {calculationResult.map((res, index) => (
//                                             <li key={index} className="flex items-center justify-center text-center p-3 border-2 border-primary rounded-lg">
//                                                 <span className="font-bold text-lg">{res.from}</span>
//                                                 <span className="mx-2 text-muted-foreground">さんは</span>
//                                                 <span className="font-bold text-lg">{res.to}</span>
//                                                 <span className="mx-2 text-muted-foreground">さんに</span>
//                                                 <span className="font-bold text-xl text-primary">{res.amount.toLocaleString()}円</span>
//                                                 <span className="ml-2 text-muted-foreground">支払う</span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                  ) : <p className="text-muted-foreground text-center">精算は完了しています。</p>}
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>

//             {/* 新規プロジェクト作成モーダル */}
//             <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>新しいプロジェクトを作成</DialogTitle>
//                         <DialogDescription>新しい割り勘プロジェクトの名前を入力してください。</DialogDescription>
//                     </DialogHeader>
//                     <div className="py-4">
//                         <Input
//                             placeholder="例: 北海道旅行2026"
//                             value={newProjectNameForModal}
//                             onChange={(e) => setNewProjectNameForModal(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && handleCreateNewProject()}
//                         />
//                     </div>
//                     <DialogFooter>
//                         <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>キャンセル</Button>
//                         <Button onClick={handleCreateNewProject}>作成</Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>

//              {/* 汎用通知ポップアップ */}
//              <Elements.Popup
//                 buttonType="none"
//                 modalState={isPopupOpen}
//                 onClose={() => setIsPopupOpen(false)}
//             >
//                 <div className="text-center p-4">
//                     <h3 className="text-lg font-bold mb-2">{popupContent.title}</h3>
//                     <p className="text-sm text-muted-foreground mb-6">{popupContent.description}</p>
//                     <Button onClick={() => setIsPopupOpen(false)}>閉じる</Button>
//                 </div>
//             </Elements.Popup>
//         </>
//     );
// };

// export default ExpenseClient;
