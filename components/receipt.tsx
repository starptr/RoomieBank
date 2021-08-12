import { FormEvent, useState, useEffect } from "react";
import Image from 'next/image';
import { ObjectId } from "mongodb";

export interface ReceiptData {
    _id: string;
    name: string;
    date: Date;
    img: string;
    cost?: number;
};
export interface ReceiptProps {
    data: ReceiptData;
    showImg?: boolean;
    showProcess?: boolean;
};

export default function Receipt(props: ReceiptProps) {
    const [check, setCheck] = useState(false);
    const [checkCancel, setCheckCancel] = useState(false);
    const [processed, setProcessed] = useState(false);

    const { data, showImg } = props;
    const { name, date, img, cost } = data;

    const handleProcessing = (is_reimbursed: boolean) => async (e: FormEvent) => {
        let queryParams: Record<string, string> = {
            shouldUpdate: "1",
            _id: props.data._id,
        };
        if (is_reimbursed) {
            queryParams.is_reimbursed = "1";
        } else {
            queryParams.is_cancelled = "1";
        }
        e.preventDefault();
        const res = await fetch(`/api/authorization?${new URLSearchParams(queryParams)}`);
        const resData = await res.json();
        setProcessed(resData.is_success);
    };

    return <li>
        <p>
            {`${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}, ${name}${cost !== undefined ? `, ${cost}¢` : ''}`}
        </p>
        {showImg && img && <div style={{ position: "relative", width: "100%", height: "10rem" }}><Image src={img} layout="fill" objectFit="scale-down" /></div>}
        {props.showProcess && !processed ?
            <form>
                <label>Only check if reimbursing:</label>
                <input
                    type="checkbox"
                    name="sanityCheck"
                    checked={check}
                    onChange={e => setCheck(e.target.checked)}
                />
                <label>Only check if cancelling:</label>
                <input
                    type="checkbox"
                    name="cancelCheck"
                    checked={checkCancel}
                    onChange={e => setCheckCancel(e.target.checked)}
                />
                <button
                    disabled={!check}
                    onClick={handleProcessing(true)}
                >
                    Reimburse
                </button>
                <button
                    disabled={!checkCancel}
                    onClick={handleProcessing(false)}
                >
                    Cancel
                </button>
            </form>
            : null}
        {processed ? <p>✅ Processed</p> : null}
    </li>;
};
