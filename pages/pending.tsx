import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'
import ReceiptList from '../components/receiptList';
import { reqDataAndSet } from '../lib/utils';

export const Page = (reqParamObj: any) => () => {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()

  // Fetch content from protected route
  useEffect(()=>{
      reqDataAndSet(setContent, new URLSearchParams(reqParamObj));
  },[session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

    return <Layout>
        <h1>Pending</h1>
        <ReceiptList data={content} showImg />
    </Layout>;
};

export default Page({ is_pending: "1" });
