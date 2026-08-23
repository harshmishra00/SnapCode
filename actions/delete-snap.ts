export const DeleteSnap = async (snapId: string) => {
    const response = await fetch(`/api/snap?id=${snapId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete snap: ${response.status}`);
    }

    return await response.json();
};
