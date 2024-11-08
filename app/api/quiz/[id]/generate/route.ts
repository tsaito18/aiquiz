import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export const revalidate = 0;

export async function GET(): Promise<Response> {
  // request: Request,
  // { params: { id } }: { params: { id: string } },
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

  const prompt = '縄文時代に関する難しいクイズを作成してください。';

  const result = await model.generateContent(prompt);
  return Response.json(JSON.parse(result.response.text()));
}
