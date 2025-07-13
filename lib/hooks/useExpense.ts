// import { useState, useEffect, useCallback } from 'react';
// import { Member, Payment, ExpenseProject, CalculationResult } from '@/types/types';

// // ユニークIDを生成するシンプルな関数
// const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;


// export const useExpense = (projectId: string) => {
//     const [project, setProject] = useState<ExpenseProject>({
//         id: projectId,
//         name: projectId.split('-').slice(1).join(' ').replace(/-/g, ' ') || '新しいプロジェクト',
//         createdAt: new Date().toISOString(),
//         members: [],
//         payments: [],
//     });
//     const [isLoading, setIsLoading] = useState(true);
//     const [calculationResult, setCalculationResult] = useState<CalculationResult[]>([]);

//     // ローカルストレージから特定のprojectIdのデータを読み込む
//     useEffect(() => {
//         setIsLoading(true);
//         try {
//             const savedProject = localStorage.getItem(projectId);
//             if (savedProject) {
//                 const parsedProject = JSON.parse(savedProject);
//                 // プロジェクトIDと名前がURLと一致しているか確認し、必要であれば更新
//                 if (parsedProject.id !== projectId || !parsedProject.name) {
//                     parsedProject.id = projectId;
//                     parsedProject.name = projectId.split('-').slice(1).join(' ').replace(/-/g, ' ') || '新しいプロジェクト';
//                 }
//                 setProject(parsedProject);

//             } else {
//                  const initialProject: ExpenseProject = {
//                     id: projectId,
//                     name: projectId.split('-').slice(1).join(' ').replace(/-/g, ' ') || '新しいプロジェクト',
//                     createdAt: new Date().toISOString(),
//                     members: [],
//                     payments: [],
//                 };
//                 setProject(initialProject);
//                 localStorage.setItem(projectId, JSON.stringify(initialProject));
//             }
//         } catch (error) {
//             console.error("プロジェクトの読み込みに失敗しました:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [projectId]);

//     const calculateSettlement = useCallback((currentProject: ExpenseProject) => {
//         if (!currentProject || currentProject.members.length === 0) {
//             setCalculationResult([]);
//             return;
//         }

//         const balances: { [key: string]: number } = {};
//         currentProject.members.forEach(m => balances[m.id] = 0);

//         currentProject.payments.forEach(p => {
//             if (p.paidFor.length === 0) return;
//             const amountPerPerson = p.amount / p.paidFor.length;
//             if (balances[p.paidBy] !== undefined) {
//                 balances[p.paidBy] += p.amount;
//             }
//             p.paidFor.forEach(memberId => {
//                 if (balances[memberId] !== undefined) {
//                     balances[memberId] -= amountPerPerson;
//                 }
//             });
//         });

//         const debtors = Object.entries(balances).filter(([, balance]) => balance < 0).map(([id, balance]) => ({ id, amount: -balance }));
//         const creditors = Object.entries(balances).filter(([, balance]) => balance > 0).map(([id, balance]) => ({ id, amount: balance }));

//         debtors.sort((a, b) => a.amount - b.amount);
//         creditors.sort((a, b) => a.amount - b.amount);

//         const results: CalculationResult[] = [];

//         while (debtors.length > 0 && creditors.length > 0) {
//             const debtor = debtors[0];
//             const creditor = creditors[0];
//             const amount = Math.min(debtor.amount, creditor.amount);

//             const fromName = currentProject.members.find(m => m.id === debtor.id)?.name;
//             const toName = currentProject.members.find(m => m.id === creditor.id)?.name;

//             if (fromName && toName && amount > 0.01) {
//                  results.push({
//                     from: fromName,
//                     to: toName,
//                     amount: Math.round(amount)
//                 });
//             }

//             debtor.amount -= amount;
//             creditor.amount -= amount;

//             if (debtor.amount < 0.01) debtors.shift();
//             if (creditor.amount < 0.01) creditors.shift();
//         }

//         setCalculationResult(results);

//     }, []);

//     const updateProject = (updater: (prev: ExpenseProject) => ExpenseProject) => {
//         setProject(prevProject => {
//             const newProjectState = updater(prevProject);
//             if (!isLoading) {
//                  try {
//                     localStorage.setItem(projectId, JSON.stringify(newProjectState));
//                     calculateSettlement(newProjectState);
//                 } catch (error) {
//                     console.error("プロジェクトの保存に失敗しました:", error);
//                 }
//             }
//             return newProjectState;
//         });
//     };

//     const setProjectName = (name: string) => {
//         updateProject(p => ({ ...p, name }));
//     };

//     const addMember = (name: string) => {
//         updateProject(p => {
//             if (p.members.some(m => m.name === name)) {
//                 return p;
//             }
//             const newMember: Member = { id: generateId(), name };
//             return { ...p, members: [...p.members, newMember] };
//         });
//     };

//     const removeMember = (id: string) => {
//         updateProject(p => ({
//             ...p,
//             members: p.members.filter(m => m.id !== id),
//             payments: p.payments
//                 .map(payment => ({
//                     ...payment,
//                     paidFor: payment.paidFor.filter(pfId => pfId !== id)
//                 }))
//                 .filter(payment => payment.paidBy !== id && payment.paidFor.length > 0)
//         }));
//     };

//     const addPayment = (amount: number, description: string, paidBy: string, paidFor: string[]) => {
//         const newPayment: Payment = { id: generateId(), amount, description, paidBy, paidFor };
//         updateProject(p => ({ ...p, payments: [newPayment, ...p.payments] }));
//     };

//     const removePayment = (id: string) => {
//         updateProject(p => ({ ...p, payments: p.payments.filter(payment => payment.id !== id) }));
//     };
    
//     useEffect(() => {
//         if (!isLoading) {
//             calculateSettlement(project);
//         }
//     }, [isLoading, project, calculateSettlement]);

//     return {
//         project,
//         setProjectName,
//         addMember,
//         removeMember,
//         addPayment,
//         removePayment,
//         calculationResult,
//         isLoading,
//     };
// };
