import { useState, useEffect } from 'react';
import type { Member, Payment, ExpenseProject, CalculationResult } from '@/types/types';

/**
 * ユニークIDを生成するシンプルな関数
 */
const generateId = (): string => `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

/**
 * プロジェクトIDからデフォルトのプロジェクト名を生成する
 * @param projectID - プロジェクトID
 * @returns デフォルトのプロジェクト名
 */
const getDefaultProjectName = (projectID: string): string => {
    if (!projectID) return '新しいプロジェクト';
    return projectID.split('-').slice(1).join(' ').replace(/-/g, ' ') || '新しいプロジェクト';
};

/**
 * 空のプロジェクトオブジェクトを生成する
 * @param projectID - プロジェクトID
 * @param name - プロジェクト名
 * @returns 空のExpenseProjectオブジェクト
 */
const createEmptyProject = (projectID: string, name: string = '読み込み中...'): ExpenseProject => ({
    id: projectID,
    name: name,
    createdAt: new Date().toISOString(),
    members: [],
    payments: [],
});

/**
 * 割り勘プロジェクトの状態管理を行うカスタムフック
 * @param projectID - 対象のプロジェクトID
 */
export const useExpense = (projectID: string) => {
    // [修正] projectの状態をnullではなく、常にオブジェクトとして初期化
    const [project, setProject] = useState<ExpenseProject>(() => createEmptyProject(projectID || ''));
    const [isLoading, setIsLoading] = useState(true);
    const [calculationResult, setCalculationResult] = useState<CalculationResult[]>([]);

    /**
     * 精算ロジック
     */
    const calculateSettlement = (currentProject: ExpenseProject) => {
        if (currentProject.members.length === 0 || currentProject.payments.length === 0) {
            setCalculationResult([]);
            return;
        }

        const balances: { [key: string]: number } = {};
        currentProject.members.forEach(m => {
            balances[m.id] = 0;
        });

        currentProject.payments.forEach(p => {
            if (p.paidFor.length === 0) return;

            const amountPerPerson = p.amount / p.paidFor.length;
            if (balances[p.paidBy] !== undefined) {
                balances[p.paidBy] += p.amount;
            }
            p.paidFor.forEach(memberId => {
                if (balances[memberId] !== undefined) {
                    balances[memberId] -= amountPerPerson;
                }
            });
        });

        const debtors = Object.entries(balances)
            .filter(([, balance]) => balance < 0)
            .map(([id, balance]) => ({ id, amount: -balance }));

        const creditors = Object.entries(balances)
            .filter(([, balance]) => balance > 0)
            .map(([id, balance]) => ({ id, amount: balance }));

        debtors.sort((a, b) => a.amount - b.amount);
        creditors.sort((a, b) => a.amount - b.amount);

        const results: CalculationResult[] = [];
        while (debtors.length > 0 && creditors.length > 0) {
            const debtor = debtors[0];
            const creditor = creditors[0];
            const amount = Math.min(debtor.amount, creditor.amount);

            const fromName = currentProject.members.find(m => m.id === debtor.id)?.name;
            const toName = currentProject.members.find(m => m.id === creditor.id)?.name;

            if (fromName && toName && amount > 0.01) {
                results.push({
                    from: fromName,
                    to: toName,
                    amount: Math.round(amount),
                });
            }

            debtor.amount -= amount;
            creditor.amount -= amount;

            if (debtor.amount < 0.01) debtors.shift();
            if (creditor.amount < 0.01) creditors.shift();
        }
        setCalculationResult(results);
    };

    // プロジェクトの読み込みと初期化
    useEffect(() => {
        // [修正] projectIdが無効な場合は処理を停止
        if (!projectID || projectID === 'undefined' || projectID === 'null') {
            setIsLoading(false);
            setProject(createEmptyProject('', 'プロジェクトIDが無効です'));
            console.warn('無効なプロジェクトIDが渡されました:', projectID);
            return;
        }

        setIsLoading(true);
        try {
            const savedProjectJSON = localStorage.getItem(projectID);
            if (savedProjectJSON) {
                const savedProject = JSON.parse(savedProjectJSON);
                savedProject.id = projectID;
                savedProject.name = savedProject.name || getDefaultProjectName(projectID);
                setProject(savedProject);
            } else {
                const newProject = createEmptyProject(projectID, getDefaultProjectName(projectID));
                setProject(newProject);
                localStorage.setItem(projectID, JSON.stringify(newProject));
            }
        } catch (error) {
            console.error("プロジェクトの読み込みに失敗しました:", error);
            setProject(createEmptyProject(projectID, '読み込みエラー'));
        } finally {
            setIsLoading(false);
        }
    }, [projectID]);

    // プロジェクトが更新されたら精算を再計算
    useEffect(() => {
        if (!isLoading) {
            calculateSettlement(project);
        }
    }, [project, isLoading]);


    /**
     * プロジェクトの状態を更新し、ローカルストレージに保存する
     */
    const updateProject = (updater: (prevProject: ExpenseProject) => ExpenseProject) => {
        // [修正] projectIdが無効な場合は保存を行わない
        if (!projectID || projectID === 'undefined' || projectID === 'null') {
            console.warn('無効なプロジェクトIDのため、保存をスキップしました:', projectID);
            return;
        }

        setProject(prevProject => {
            const newProjectState = updater(prevProject);
            try {
                localStorage.setItem(projectID, JSON.stringify(newProjectState));
            } catch (error) {
                console.error("プロジェクトの保存に失敗しました:", error);
            }
            return newProjectState;
        });
    };

    const setProjectName = (name: string) => {
        updateProject(p => ({ ...p, name }));
    };

    const addMember = (name: string) => {
        updateProject(p => {
            if (p.members.some(m => m.name === name)) {
                return p;
            }
            const newMember: Member = { id: generateId(), name };
            return { ...p, members: [...p.members, newMember] };
        });
    };

    const removeMember = (id: string) => {
        updateProject(p => ({
            ...p,
            members: p.members.filter(m => m.id !== id),
            payments: p.payments
                .map(payment => ({
                    ...payment,
                    paidFor: payment.paidFor.filter(pfId => pfId !== id),
                }))
                .filter(payment => payment.paidBy !== id && payment.paidFor.length > 0),
        }));
    };

    const addPayment = (amount: number, description: string, paidBy: string, paidFor: string[]) => {
        const newPayment: Payment = { id: generateId(), amount, description, paidBy, paidFor };
        updateProject(p => ({ ...p, payments: [newPayment, ...p.payments] }));
    };

    const removePayment = (id: string) => {
        updateProject(p => ({ ...p, payments: p.payments.filter(payment => payment.id !== id) }));
    };

    return {
        project,
        setProjectName,
        addMember,
        removeMember,
        addPayment,
        removePayment,
        calculationResult,
        isLoading,
    };
};
