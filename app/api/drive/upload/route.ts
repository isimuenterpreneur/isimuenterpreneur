import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

function getDriveClient() {
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!clientEmail || !privateKey || !folderId) {
    throw new Error("Google Drive credentials are not configured.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  return { auth, folderId };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = (file as File).name || "upload";

    const { auth, folderId } = getDriveClient();
    const drive = google.drive({ version: "v3", auth });

    const uploaded = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: (file as File).type || "application/octet-stream",
        parents: [folderId],
      },
      media: {
        mimeType: (file as File).type || "application/octet-stream",
        body: Readable.from(buffer),
      },
    });

    await drive.permissions.create({
      fileId: uploaded.data.id!,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const shareLink = `https://drive.google.com/uc?export=view&id=${uploaded.data.id}`;

    return NextResponse.json({ url: shareLink, fileId: uploaded.data.id });
  } catch (error) {
    console.error("Drive upload error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}

import { Readable } from "stream";
