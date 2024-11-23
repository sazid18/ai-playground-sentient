"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModelConfigContent } from "./ModelConfigContent";

export function ModelConfigPanel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          style={{
            position: "absolute",
            top: "0",
            zIndex: "99",
            right: "0",
            margin: "10px",
          }}
          variant="outline"
        >
          Model Control Center
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Model Parameters</DialogTitle>
        </DialogHeader>
        <ModelConfigContent />
      </DialogContent>
    </Dialog>
  );
}
