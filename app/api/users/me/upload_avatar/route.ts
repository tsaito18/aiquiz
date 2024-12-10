import { r2Client } from '@/libs/r2';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { R2_BUCKET_NAME, R2_PUBLIC_URL } = process.env;

  const formData = await request.formData();
  const file: any = formData.get('file');
  const filename = formData.get('filename') as string;

  if (!file || !filename) {
    return NextResponse.json(
      { success: false, error: 'ファイルがアップロードされていません' },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file?.arrayBuffer());
  const extension = filename.split('.').pop();
  const randomFilename = `${crypto.randomUUID()}.${extension}`;

  const uploadParams: PutObjectCommandInput = {
    Bucket: R2_BUCKET_NAME,
    Key: randomFilename,
    Body: buffer,
    ContentType: `image/${extension}`,
    ACL: 'public-read',
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await r2Client.send(command);

    const imageUrl = `${R2_PUBLIC_URL}/${randomFilename}`;
    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }
}
