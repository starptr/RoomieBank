import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../lib/mongodb";

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

        return res.json({ is_authorized: processers.some(({ email }) => email === session.user?.email ) });
    };

  return res.json({
    error: "You must be signed in.",
  });
}
