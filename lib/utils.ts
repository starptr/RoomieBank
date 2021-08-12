import { ReceiptData } from "../components/receipt";
export function parseMongoData(arr: any[]): ReceiptData[] {
  return arr.map(data => {
    return ({
      ...data,
      date: new Date(data.date),
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

export function prettyCost(cents: number): string {
  const str = cents.toString();
  return `$${str.substring(0, str.length - 2).padStart(1, '0')}.${str.substring(str.length - 2).padStart(2, '0')}`;
};
