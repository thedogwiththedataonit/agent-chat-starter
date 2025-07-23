import { ChatWithViewport } from "@/components/chat-with-viewport";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ modelId: string }>;
}) {
  const { modelId } = await searchParams;
  return <ChatWithViewport modelId={modelId} />;
}
