import Image from 'next/image';

export interface ReceiptData {
    name: string;
    date: Date;
    img: string;
    cost?: number;
};
export interface ReceiptProps {
    data: ReceiptData;
    showImg?: boolean;
};

export default function Receipt(props: ReceiptProps) {
    const { data, showImg } = props;
    const { name, date, img, cost } = data;
    return <li>
        <p>
            {`${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}, ${name}${cost !== undefined ? `, ${cost}¢` : ''}`}
        </p>
        {showImg && <div style={{ position: "relative", width: "100%", height: "10rem" }}><Image src={img} layout="fill" objectFit="scale-down" /></div>}
    </li>;
};
