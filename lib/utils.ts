import { ReceiptData } from "../components/receipt";
export function parseMongoData(arr: any[]): ReceiptData[] {
    return arr.map(data => {
        return ({
            _id: data._id,
            name: data.name,
            date: new Date(data.date),
            img: data.img,
            cost: data.cost,
        });
    });
};

export function reqDataAndSet(setState: any, urlParams: URLSearchParams) {
    const fetchData = async () => {
      const res = await fetch(`/api/examples/protected?${urlParams.toString()}`);
      const json = await res.json();
      if (Array.isArray(json)) { setState(parseMongoData(json)) }
    };
    fetchData();
};
