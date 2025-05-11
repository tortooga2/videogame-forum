// app/actions/getPosts.ts

export default async function getPosts() {
    return [
        {
            id: "1",
            userId: "mock-user-1",
            title: "What's your favorite game?",
            description: "I'm curious what everyone's all-time favorite game is.",
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            userId: "mock-user-2",
            title: "Elden Ring or Dark Souls?",
            description: "Which game has the better boss fights and world design?",
            createdAt: new Date().toISOString(),
        },
        {
            id: "3",
            userId: "mock-user-3",
            title: "Favorite childhood game?",
            description: "Let's get nostalgic — what was your go-to game as a kid?",
            createdAt: new Date().toISOString(),
        },
    ];
}

