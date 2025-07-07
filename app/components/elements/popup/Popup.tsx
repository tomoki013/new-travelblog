'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState, ReactNode }
from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ChevronRight, FileText, Image as ImageIcon } from "lucide-react";

interface PopupProps {
    // モーダルを開くためのトリガーボタンの種類
    buttonType: 'section' | 'button' | 'none';
    // トリガーに表示するタイトル
    triggerTitle: string;
    // トリガーに表示する説明文
    triggerDescription: string;
    // モーダル自体のタイトル (オプション)
    dialogTitle?: string;
    // モーダル自体の説明文 (オプション)
    dialogDescription?: string;
    // モーダルの中に表示するコンテンツ (Reactコンポーネントなど)
    children: ReactNode;
    // アイコンの種類
    iconType?: 'file' | 'image';
    // モーダルの初期開閉状態
    modalState?: boolean;
}

const Popup = ({
    buttonType,
    triggerTitle,
    triggerDescription,
    dialogTitle,
    dialogDescription,
    children,
    iconType = 'file',
    modalState  = false,
}: PopupProps) => {
    // モーダルの開閉状態だけを管理
    const [open, setOpen] = useState(modalState);

    const TriggerIcon = iconType === 'image' ? ImageIcon : FileText;

    return (
        <>
            {/* セクション風誘導アイテム */}
            {buttonType === 'section' && (
                <Card
                    className="mb-8 w-full cursor-pointer hover:shadow-lg transition-shadow bg-secondary/50"
                    onClick={() => setOpen(true)}
                >
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <TriggerIcon className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{triggerTitle}</h2>
                                    <p className="text-muted-foreground">{triggerDescription}</p>
                                </div>
                            </div>
                            <Button className="cursor-pointer">
                                <span>一覧で見る</span>
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            )}

            {/* 画面固定ボタン風誘導アイテム */}
            {buttonType === 'button' && (
                 <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2">
                    <div className="bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-lg animate-bounce">
                        <p>概要はここをクリック！</p>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        className="rounded-full shadow-lg h-16 w-auto px-6 flex items-center justify-center gap-2 text-base cursor-pointer"
                        aria-label={triggerTitle}
                    >
                        <TriggerIcon className="h-6 w-6" />
                        <span>{triggerTitle}</span>
                    </Button>
                </div>
            )}

            {/* ボタン無し（直接開閉を制御する場合）*/}
            {buttonType === 'none' && null}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-7xl w-[95%] max-h-[90vh] overflow-y-auto flex flex-col items-center">
                    {/* ダイアログのタイトルと説明 */}
                    {dialogTitle && <DialogTitle className="text-2xl font-bold mb-2">{dialogTitle}</DialogTitle>}
                    {dialogDescription && <DialogDescription className="text-sm text-muted-foreground mb-4">{dialogDescription}</DialogDescription>}
                    
                    {/* childrenとして渡されたコンテンツをここに展開 */}
                    <div className="mt-4 w-full">
                        {children}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Popup;
