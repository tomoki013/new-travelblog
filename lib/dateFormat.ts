// In lib/utils.ts (または新しい lib/formatters.ts など)
import { Post } from '../types/types'; // Post型をインポート

export function getDatePrefix(postType: Post['type']): string {
    switch (postType) {
        case 'diary':
        case 'itinerary':
            return '旅行日：';
        case 'tourism':
            return '更新日：';
        default:
            return '';
    }
}
