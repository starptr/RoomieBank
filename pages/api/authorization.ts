import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getSession({ req })

    if (session && session.user) {
        const { db } = await connectToDatabase();
        let processers: any[] = await db
            .collection("processers")
            .find({})
            .toArray();
        const is_authorized = processers.some(({ email }) => email === session.user?.email );

        const { query } = req;
        if (query.shouldUpdate) {
          const filter = { _id: ObjectId.createFromHexString(query._id as string) };
            let updateDoc;
            if (query.is_reimbursed) {
              updateDoc = { $set: { is_reimbursed: true }};
            } else if (query.is_cancelled) {
              updateDoc = { $set: { is_cancelled: true }};
            }

            let updateRes = await db
                .collection("main")
                .updateOne(filter, updateDoc);

            return res.json({ is_success: updateRes.modifiedCount });
        }

        return res.json({ is_authorized });
    };

  return res.json({
    error: "You must be signed in.",
  });
}
