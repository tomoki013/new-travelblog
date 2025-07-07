"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // localStorageをチェックして、同意済みでなければバナーを表示
        const consent = localStorage.getItem('cookie-consent');
        if (consent !== 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        // 「同意」したことをlocalStorageに保存
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t p-4 shadow-lg animate-in slide-in-from-bottom-5 w-full">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 relative max-w-3xl">
                <button
                    aria-label="バナーを閉じる"
                    onClick={() => setIsVisible(false)}
                    className="sm:static absolute top-2 right-2 sm:top-0 sm:right-0 p-1 rounded hover:bg-muted transition-colors z-10"
                    style={{ lineHeight: 0 }}
                >
                    <X className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                        当サイトではサービスの向上とアクセス解析のためにCookieを使用しています。ブラウザの設定でCookieを拒否している場合は、同意しても情報は収集されません。詳細は
                        <Link href="/privacy" className="underline hover:text-primary">
                            プライバシーポリシー
                        </Link>
                        をご確認ください。
                    </p>
                </div>
                <div className='flex flex-wrap md:flex-nowrap items-center gap-2 w-full sm:w-auto md:flex-shrink-0 mt-2 sm:mt-0'>
                    <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/privacy#how-to-disable-cookies">
                            ブラウザの設定
                        </Link>
                    </Button>
                    <Button onClick={handleAccept} size="sm" className="w-full">
                        同意する
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
