import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { sendContactNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (process.env.DATABASE_URL) {
      await db.insert(contactMessages).values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company || null,
        projectType: data.projectType,
        message: data.message,
      });
    } else {
      console.log("Contact form submission (no DB):", data);
    }

    try {
      await sendContactNotification(data);
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
