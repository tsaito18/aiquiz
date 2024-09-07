export interface Question {
  question: string;
  answers: {
    0: {
      text: string;
      isAnswer: boolean;
    };
    1: {
      text: string;
      isAnswer: boolean;
    };
    2: {
      text: string;
      isAnswer: boolean;
    };
    3: {
      text: string;
      isAnswer: boolean;
    };
  };
  explanation: string;
}
