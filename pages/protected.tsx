import { useState, useEffect, FormEvent } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

enum Result { NA, SUCCESS, FAIL };

export default function Page() {
  const [session, loading] = useSession();
  const [result, setResult] = useState(Result.NA);
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<string>("");

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <Layout><AccessDenied /></Layout> }

  const submitReceipt = async (event: FormEvent | any) => {
    event.preventDefault();

    const params = {
      name: session.user?.name,
      cost: event.target.cost.value,
      desc: event.target.desc.value,
      img: "",
    };

    const res = await fetch(`/api/submit?${new URLSearchParams(params as Record<string, string>).toString()}`);
    const resData = await res.json();
    if (resData.is_success) {
      setResult(Result.SUCCESS);
      setInput1(0);
      setInput2("");
    } else {
      setResult(Result.FAIL);
    }
  };

  const handleInputChange = (setter: any, event: FormEvent | any) => {
    setter(event.target.value);
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Submit a Reimbursement</h1>
      <form onSubmit={submitReceipt}>
        <label>Cost (¢) </label>
        <input value={input1} onChange={event => handleInputChange(setInput1, event)} id="cost" type="number" required /><br /><br />
        <label>Description </label>
        <input value={input2} onChange={event => handleInputChange(setInput2, event)} id="desc" type="text" /><br />
        <br />
        <button type="submit">Submit</button>
      </form>
      {result === Result.SUCCESS && <p>✅ Successfully submitted!</p>}
      {result === Result.FAIL && <p>❌ Failed to submit!</p>}
    </Layout>
  );
}
