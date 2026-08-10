import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages, messageReplies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Delete replies first (foreign key constraint)
    await db
      .delete(messageReplies)
      .where(eq(messageReplies.contactMessageId, id));

    await db
      .delete(contactMessages)
      .where(eq(contactMessages.id, id));

    logger.info("Admin: message deleted", { contactMsgId: id });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    logger.apiError("/api/admin/messages/[id]", "DELETE", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
