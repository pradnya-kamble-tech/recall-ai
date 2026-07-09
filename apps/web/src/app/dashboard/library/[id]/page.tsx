import { memoryDetails } from "@/lib/mock/memory-detail";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function MemoryDetailPage({ params }: Props) {
    const { id } = await params;

    const memory = memoryDetails[id as keyof typeof memoryDetails];

    if (!memory) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold">{memory.title}</h1>

                <p className="text-muted-foreground mt-2">
                    {memory.type} • {memory.date} • {memory.duration}
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-semibold mb-3">Summary</h2>
                <p>{memory.summary}</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">Participants</h2>
                <div className="flex gap-2 flex-wrap">
                    {memory.participants.map((person) => (
                        <span
                            key={person}
                            className="px-3 py-1 rounded-full bg-primary/10"
                        >
                            {person}
                        </span>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">Tags</h2>
                <div className="flex gap-2 flex-wrap">
                    {memory.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full border"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">Transcript</h2>
                <p>{memory.transcript}</p>
            </section>
        </div>
    );
}