import Receipt, { ReceiptData } from "./receipt";
export interface ReceiptListProps {
    showImg?: boolean;
    data: ReceiptData[] | undefined;
    showProcess?: boolean;
};
export default function ReceiptList(props: ReceiptListProps) {

    if (!props.data) return <p>Loading...</p>
    return <ul>
        {props.data.map(data => <Receipt data={data} showImg={props.showImg} showProcess={props.showProcess} />)}
    </ul>;
};
