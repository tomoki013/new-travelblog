import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface HeadsUpProps {
    dates: string[];
}

const HeadsUp = ({ dates }: HeadsUpProps) => {
    const formattedDates = dates.map(date => {
        const parsedDate = new Date(date);
        return format(parsedDate, 'yyyy年M月d日', { locale: ja });
    });

    return (
        <div className='m-8 rounded-md bg-yellow-200 flex justify-center items-center border border-muted-foreground p-2 text-black'>
            <p>この記事は<span className='border-b-2 border-red-500'>{formattedDates.join('～')}</span>現在の情報です。最新情報に注意して旅行をしてください。</p>
        </div>
    );
}

export default HeadsUp;
