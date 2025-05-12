export const fuzzySearch = async (searchString: string) => {
    const santatizedSearchString = encodeURIComponent(searchString);

    const search = await fetch(`/api/search?search=${santatizedSearchString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await search.json();
    if (search.ok) {
        return data;
    }
    return {
        message: "error",
        status: search.status,
    };
};
