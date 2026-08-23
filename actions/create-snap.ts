export const CreateSnap = async (
    values: { snapName: string; language: string; visibility: string },
    userId: string | undefined,
    code: string,
) => {
    const response = await fetch("/api/snap", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            snapName: values.snapName,
            language: values.language,
            visibility: values.visibility,
            userId,
            code,
        }),
    });

    // Ensure response is OK before parsing
    if (!response.ok) {
        throw new Error(`Failed to create snap: ${response.status}`);
    }

    // Parse and return the JSON data from the response
    return await response.json();
};
