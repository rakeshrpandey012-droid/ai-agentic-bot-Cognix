import { db, users} from "@/db";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  // If user already exist in DB
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, user?.primaryEmailAddress?.emailAddress ?? ''));

    // if not then insert new user
    if(existingUser.length === 0)
    {
        const newUser = await db.insert(users).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress ?? '',
        }).returning();

        return NextResponse.json({ message: "User created successfully", user: newUser[0] });
    }
    return NextResponse.json({ message: "User already exists", user: existingUser[0] });

} 

