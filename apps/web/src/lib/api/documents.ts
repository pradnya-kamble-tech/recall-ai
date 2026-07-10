
export interface Document {
    id: string;
    title: string;
    summary: string;
    owner: string;
    date: string;
}

export async function getDocuments(): Promise<Document[]> {
    const response = await fetch("http://127.0.0.1:8000/api/v1/documents");

    if (!response.ok) {
        throw new Error("Failed to fetch documents");
    }

    return response.json();
}