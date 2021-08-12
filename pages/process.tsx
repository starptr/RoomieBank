import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Layout from '../components/layout';
import AccessDenied from '../components/access-denied';
import { Page as PageContentTemplate } from './pending';

const PageContent = PageContentTemplate({ is_pending: "1" }, { showProcesserUi: true, title: "Processer" });

export default function Page() {
    const [session, loading] = useSession()
    const [isAuthorized, setIsAuthorized] = useState()

    // Fetch content from protected route
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/authorization');
            const json = await res.json();
            setIsAuthorized(json.is_authorized);
        };
        fetchData();
    }, [session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    // If no session exists, display access denied message
    if (!session) { return <Layout><AccessDenied /></Layout> }

    if (isAuthorized) {
        return <PageContent />
    }

    // If session exists, display content
    return (
        <Layout>
            <h1>Process Pending Receipts</h1>
            <p>Email not recognized. Make sure you logged in with the right account!</p>
        </Layout>
    );
}
