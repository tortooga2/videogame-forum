import prisma from "@/lib/prisma";

export default async function getAnswersByQuestion(questionId: string) {
    const answers = await prisma.answer.findMany({
        where: {
            questionId: questionId,
        },
    });

    console.log("answers", answers);

    if (!answers) {
        return [];
    }

    return answers;
}
