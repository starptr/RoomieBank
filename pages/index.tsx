import Link from "next/link";
import { useSession } from 'next-auth/client'
import Layout from '../components/layout'

export default function Page() {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) return (
    <Layout>
      <h1>RoomieBank</h1>
      <p>
        Sign in to see pending purchases, upload receipts, reimbursed transactions, etc!
      </p>
    </Layout>
  );

  return <Layout>
    <h2><Link href="/pending"><a>Pending</a></Link></h2>
    <h2><Link href="/reimbursed"><a>Reimbursed</a></Link></h2>
    <h2><Link href="/cancelled"><a>Cancelled</a></Link></h2>
  </Layout>;
}
