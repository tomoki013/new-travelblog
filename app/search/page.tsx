import { Suspense } from 'react';
import { Metadata } from 'next';
import * as Elements from '@/app/components/elements/index';
import SearchPageContent from './SearchPageContent';
import { getAllPostTypes } from '@/lib/markdown';

export const metadata: Metadata = {
    title: '検索結果一覧',
    description: 'ともきちの旅行日記では、旅行に関する様々な情報を検索できます。キーワードやカテゴリーで絞り込んで、あなたの旅に役立つ情報を見つけましょう。',
    openGraph: {
        title: '検索結果一覧',
        description: 'ともきちの旅行日記では、旅行に関する様々な情報を検索できます。キーワードやカテゴリーで絞り込んで、あなたの旅に役立つ情報を見つけましょう。',
    },
    twitter: {
        title: '検索結果一覧',
        description: 'ともきちの旅行日記では、旅行に関する様々な情報を検索できます。キーワードやカテゴリーで絞り込んで、あなたの旅に役立つ情報を見つけましょう。',
    },
};

const SearchPage = () => {
    const allPosts = getAllPostTypes();

    return (
        <Suspense fallback={<Elements.LoadingAnimation />}>
            <SearchPageContent allPosts={allPosts} />
        </Suspense>
    )
}

export default SearchPage;
