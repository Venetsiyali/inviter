// ─── Cloudflare R2 Storage Helper ───────────────────────────
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const R2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT || "",
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});

const BUCKET = process.env.R2_BUCKET_NAME || "inviter-photos";
const PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

/**
 * Upload a file to R2
 * @returns Public URL of uploaded file
 */
export async function uploadToR2(params: {
    key: string;
    body: Buffer;
    contentType: string;
}): Promise<string> {
    await R2.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: params.key,
            Body: params.body,
            ContentType: params.contentType,
        })
    );
    return `${PUBLIC_URL}/${params.key}`;
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(key: string): Promise<void> {
    await R2.send(
        new DeleteObjectCommand({
            Bucket: BUCKET,
            Key: key,
        })
    );
}

/**
 * Generate a unique file key for uploads
 */
export function generateFileKey(prefix: string, filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}/${timestamp}-${random}.${ext}`;
}
