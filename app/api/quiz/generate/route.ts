import { db } from '@/database';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// export const revalidate = 0;
export const revalidate = 3600;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const quizId = searchParams.get('quiz_id');
  const count = Number(searchParams.get('count'));

  const quizData = await db
    .selectFrom('quizzes')
    .selectAll()
    .where('quiz_id', '=', quizId)
    .executeTakeFirst();

  if (!quizData) {
    return NextResponse.json(
      { success: false, error: '指定された ID のクイズは存在しません。' },
      { status: 404 },
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction:
      'あなたはプロのクイズ作問者です。\n' +
      '今からクイズのトピックと難易度を指定するので、「クイズの質問、4つの選択肢、解説」のセットを5つ作成してください。\n' +
      'なお、答えが複数できる質問やあいまいな質問は避け、クイズの選択肢は10文字以内におさめてください。\n\n' +
      '「○○しやすい」や「○○と思われる」など、人によって受け取り方が変わるような主観的な問題も避けてください。\n\n' +
      'また、クイズの質問は、他のクイズと被らないような独創的なものにしてください。',
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

  const result = await model.generateContent(
    prompt +
      '\n\n' +
      `上記のトピックのクイズの、${count * 10 - 9}問目から${count * 10}問目を、可能な限り問題が被ったり、似通った問題を生成しないように生成してください。`,
  );
  return NextResponse.json(JSON.parse(result.response.text()));
}
