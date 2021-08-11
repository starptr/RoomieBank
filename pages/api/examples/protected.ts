// This is an example of to protect an API route
import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../../lib/mongodb";

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getSession({ req })

    if (session) {
        const { query } = req;
        const findQuery: { [key: string]: any } = {};
        if (query.is_pending) {
            findQuery.is_reimbursed = { $exists: false };
            findQuery.is_cancelled = { $exists: false };
        } else {
            if (query.is_reimbursed) findQuery.is_reimbursed = true;
            if (query.is_cancelled) findQuery.is_cancelled = true;
        }

        let limit: number | undefined;
        if (query.limit) limit = parseInt(query.limit as string);

        const { db } = await connectToDatabase();
        let receipts = db
            .collection("main")
            .find(findQuery)
            .sort({ date: -1 });
        if (limit !== undefined) receipts = receipts.limit(limit);
        receipts = await receipts.toArray();

        return res.json(receipts);
    };

  res.send({
    error: "You must be sign in to view the protected content on this page.",
  })
}
