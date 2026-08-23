export const UpdateSnap = async (snapId: string, code: string) => {
    const response = await fetch("/api/snap", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            snapId,
            code,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update snap: ${response.status}`);
    }

    return await response.json();
};
