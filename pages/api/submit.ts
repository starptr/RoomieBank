import { Long } from 'mongodb';
import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../lib/mongodb";

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getSession({ req })

    if (session) {
        const { query } = req;
        const doc = {
            cost: Long.fromString(query.cost as string),
            date: new Date(Date.now()),
            ...query,
        };
        const { db } = await connectToDatabase();
        let result = await db
            .collection("main")
            .insertOne(doc);

        return res.json({ is_success: result.acknowledged, doc });
    };

    return res.json({
        error: "You must be signed in.",
    });
}
