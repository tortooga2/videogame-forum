import VoteArea from "./voteArea";

export default async function Answer({ answer }) {
    return (
        <div>
            <p>{answer.userId}</p>
            <p>{answer.createdAt.toString()}</p>
            <p>{answer.answer}</p>
            <VoteArea postId={answer.id} postType={"answer"} />
        </div>
    );
}
