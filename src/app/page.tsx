"use client";

import { Chat } from "./components/ChatPage/Chat";
import { Toaster } from "@/components/ui/toaster";
import { ModelConfigPanel } from "./components/ModelPanel/ModelConfigPanel";
import { ModelProvider } from "@/contexts/ModelContext";

export default function AIPlayground() {
  return (
    <ModelProvider>
      <main>
        <ModelConfigPanel />
        <Toaster />
        <Chat />
      </main>
    </ModelProvider>
  );
}
