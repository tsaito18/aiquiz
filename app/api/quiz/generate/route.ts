import { db } from '@/database';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// export const revalidate = 0;
export const revalidate = 3600;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const quizId = searchParams.get('quiz_id');

  const quizData = await db
    .selectFrom('quizzes')
    .selectAll()
    .where('quiz_id', '=', quizId)
    .executeTakeFirst();

  if (!quizData) {
    return NextResponse.json(
      { error: '指定された ID のクイズは存在しません。' },
      { status: 404 },
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction:
      'あなたはプロのクイズ作問者です。\n今からクイズのトピックと難易度を指定するので、「クイズの質問、4つの選択肢、解説」のセットを5つ作成してください。\nなお、クイズの選択肢は10文字以内におさめてください。',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            question: { type: SchemaType.STRING },
            answers: {
              type: SchemaType.OBJECT,
              properties: {
                0: {
                  type: SchemaType.OBJECT,
                  properties: {
                    text: { type: SchemaType.STRING },
                    isAnswer: { type: SchemaType.BOOLEAN },
                  },
                  required: ['text', 'isAnswer'],
                },
                1: {
                  type: SchemaType.OBJECT,
                  properties: {
                    text: { type: SchemaType.STRING },
                    isAnswer: { type: SchemaType.BOOLEAN },
                  },
                  required: ['text', 'isAnswer'],
                },
                2: {
                  type: SchemaType.OBJECT,
                  properties: {
                    text: { type: SchemaType.STRING },
                    isAnswer: { type: SchemaType.BOOLEAN },
                  },
                  required: ['text', 'isAnswer'],
                },
                3: {
                  type: SchemaType.OBJECT,
                  properties: {
                    text: { type: SchemaType.STRING },
                    isAnswer: { type: SchemaType.BOOLEAN },
                  },
                  required: ['text', 'isAnswer'],
                },
              },
              required: ['0', '1', '2', '3'],
            },
            explanation: { type: SchemaType.STRING },
          },
          required: ['question', 'answers', 'explanation'],
        },
      },
    },
  });

  const prompt = quizData.prompt;

  const result = await model.generateContent(prompt);
  return NextResponse.json(JSON.parse(result.response.text()));
}
