export type UploadStatus = "uploading" | "scanning" | "extracting" | "embedding" | "ready" | "failed";
export type UploadType = "Meeting Recording" | "Document" | "PDF" | "Audio" | "Video" | "Text Note" | "Image" | "URL";

export interface MockUpload {
    id: string;
    fileName: string;
    type: UploadType;
    size: string;
    status: UploadStatus;
    progress: number;
    owner: string;
    timestamp: string;
}

export const mockUploads: MockUpload[] = [
    { id: "1", fileName: "Q3_Product_Roadmap_Final.pdf", type: "PDF", size: "2.4 MB", status: "ready", progress: 100, owner: "Alex Chen", timestamp: "10 mins ago" },
    { id: "2", fileName: "Design_Sync_2026-07-06.mp4", type: "Meeting Recording", size: "450 MB", status: "embedding", progress: 85, owner: "Sarah Jenkins", timestamp: "Just now" },
    { id: "3", fileName: "Customer_Interview_Acme.wav", type: "Audio", size: "85 MB", status: "extracting", progress: 45, owner: "David Kim", timestamp: "5 mins ago" },
    { id: "4", fileName: "Architecture_Diagram.png", type: "Image", size: "4.1 MB", status: "ready", progress: 100, owner: "Alex Chen", timestamp: "1 hour ago" },
    { id: "5", fileName: "Engineering_Standup_Notes.docx", type: "Document", size: "1.2 MB", status: "ready", progress: 100, owner: "Emily Davis", timestamp: "2 hours ago" },
    { id: "6", fileName: "Competitor_Analysis.pdf", type: "PDF", size: "5.6 MB", status: "ready", progress: 100, owner: "Sarah Jenkins", timestamp: "3 hours ago" },
    { id: "7", fileName: "Brainstorming_Session_V3", type: "Text Note", size: "12 KB", status: "ready", progress: 100, owner: "David Kim", timestamp: "Yesterday" },
    { id: "8", fileName: "Weekly_All_Hands.mp4", type: "Meeting Recording", size: "1.2 GB", status: "failed", progress: 32, owner: "Emily Davis", timestamp: "Yesterday" },
    { id: "9", fileName: "Onboarding_Guide.md", type: "Document", size: "45 KB", status: "ready", progress: 100, owner: "Alex Chen", timestamp: "Yesterday" },
    { id: "10", fileName: "Figma_Mocks_v4.pdf", type: "PDF", size: "12.8 MB", status: "ready", progress: 100, owner: "Sarah Jenkins", timestamp: "2 days ago" },
    { id: "11", fileName: "User_Testing_Session_2.mp4", type: "Video", size: "620 MB", status: "ready", progress: 100, owner: "David Kim", timestamp: "2 days ago" },
    { id: "12", fileName: "API_Documentation_Draft", type: "Text Note", size: "24 KB", status: "uploading", progress: 15, owner: "Alex Chen", timestamp: "Just now" },
    { id: "13", fileName: "https://recallai.com/blog", type: "URL", size: "N/A", status: "scanning", progress: 10, owner: "Sarah Jenkins", timestamp: "2 mins ago" },
    { id: "14", fileName: "Marketing_Campaign_Assets.pdf", type: "PDF", size: "18.5 MB", status: "ready", progress: 100, owner: "Emily Davis", timestamp: "3 days ago" },
    { id: "15", fileName: "Q2_Financials.xlsx", type: "Document", size: "3.2 MB", status: "ready", progress: 100, owner: "David Kim", timestamp: "3 days ago" },
    { id: "16", fileName: "Interview_Candidate_John.m4a", type: "Audio", size: "45 MB", status: "ready", progress: 100, owner: "Alex Chen", timestamp: "4 days ago" },
    { id: "17", fileName: "Product_Landing_Page.png", type: "Image", size: "8.4 MB", status: "ready", progress: 100, owner: "Sarah Jenkins", timestamp: "4 days ago" },
    { id: "18", fileName: "Security_Audit_Report.pdf", type: "PDF", size: "1.5 MB", status: "ready", progress: 100, owner: "Emily Davis", timestamp: "5 days ago" },
    { id: "19", fileName: "https://example.com/competitor", type: "URL", size: "N/A", status: "ready", progress: 100, owner: "David Kim", timestamp: "5 days ago" },
    { id: "20", fileName: "Quick_Ideas", type: "Text Note", size: "2 KB", status: "ready", progress: 100, owner: "Alex Chen", timestamp: "6 days ago" },
];
