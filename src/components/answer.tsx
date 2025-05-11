export default async function Answer({ answer }) {
    return (
        <div>
            <p>{answer.userId}</p>
            <p>{answer.createdAt.toString()}</p>
            <p>{answer.answer}</p>
        </div>
    );
}
