//Using Partial for objects in a temporary state
export interface Question{
    id: number;
    examId: number;
    text: string;
    options: Option[];
}

let myQuestion: Partial<Question> = {
    id: 1102,
    examId: 123,
    text: "Which of the following is a prime number"
};