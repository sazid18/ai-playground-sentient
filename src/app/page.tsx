'use client';

import ChatPage from "./components/messages/page";
import { Toaster } from "@/components/ui/toaster";
import {Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { ModelConfigPanel } from "./components/ModelPanel/ModelConfigPanel";
import {ModelProvider} from '@/contexts/ModelContext';

// temperature (0-2), top-p sampling, frequency penalties, and presence penalties.
export default function Chat() {
  return (
    <ModelProvider>
    <main>
      <Dialog>
      <DialogTrigger asChild>
        <Button style={{position: "absolute", top: "0", zIndex: "99", right: "0", margin: "10px"}} variant="outline">Model Control Center</Button>
      </DialogTrigger>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Model Parameters</DialogTitle>
        </DialogHeader>
        <ModelConfigPanel/>
      </DialogContent>
      </Dialog>
      <Toaster />
      <ChatPage/>
    </main>
    </ModelProvider>
  );
}