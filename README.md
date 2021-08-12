# RoomieBank
A simple webapp that makes it easier to share costs between roommates

## Features
- OAuth using NextAuth
- MongoDB data storage
- Web interface to submit and approve reimbursements and to see past submissions

## Setup
1. Create a new MongoDB database and set the appropriate environment variables
2. Create the collections `main` and `processers`. The `processers` collection should have documents as described in the typescript interface:

```typescript
interface Processer {
    name: string; // Name of the person
    email: string; // email address of the person's account
}
````

This collection is used to check who has the ability to process pending receipts.
I recommend putting one person in charge so that there can be less room for error for checking pendings.

3. Upload to a hosting service. Vercel is recommended.
4. Define environment variables as described [in the NextAuth demo](https://github.com/nextauthjs/next-auth-example)
    - Make sure to only allow people with certain email addresses to sign in. The app backend does not check who can upload, as long as the user is signed in.

## Cite
Based on [NextAuth NextJS example](https://github.com/nextauthjs/next-auth-typescript-example) and the official [NextJS MongoDB example](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb)
