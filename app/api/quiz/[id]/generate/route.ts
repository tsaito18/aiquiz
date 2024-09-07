import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export async function GET() {
  // request: Request,
  // { params: { id } }: { params: { id: string } },
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction:
      'あなたはプロのクイズ作問者です。\n今からクイズのトピックと難易度を指定するので、クイズの質問と、4つの選択肢を10セット作成してください。',
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
                4: {
                  type: SchemaType.OBJECT,
                  properties: {
                    text: { type: SchemaType.STRING },
                    isAnswer: { type: SchemaType.BOOLEAN },
                  },
                  required: ['text', 'isAnswer'],
                },
              },
              required: ['1', '2', '3', '4'],
            },
          },
          required: ['question', 'answers'],
        },
      },
    },
  });

  const prompt = '縄文時代に関する難しいクイズを作成してください。';

  const result = await model.generateContent(prompt);
  return Response.json(JSON.parse(result.response.text()));
}
