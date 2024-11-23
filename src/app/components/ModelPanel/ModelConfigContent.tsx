"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useModelConfig } from "@/contexts/ModelContext";

export function ModelConfigContent() {
  const {
    modelConfig,
    updateModelConfig,
    inputConfigs,
    exportModelConfig,
    importModelConfig,
  } = useModelConfig();
  const [values, setValues] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const initialValues = inputConfigs.reduce((acc, input) => {
      acc[input.id] = modelConfig[input.id];
      return acc;
    }, {} as Record<string, number>);
    setValues(initialValues);
  }, [inputConfigs, modelConfig]);

  const handleInputChange = (
    id: string,
    newValue: string,
    min: number,
    max: number,
    decimalPlaces: number
  ) => {
    if (newValue === "") {
      updateValue(id, min);
      return;
    }

    const regex = new RegExp(`^-?\\d*\\.?\\d{0,${decimalPlaces}}$`);
    if (regex.test(newValue)) {
      const numValue = Number(newValue);
      if (numValue >= min && numValue <= max) {
        updateValue(id, numValue);
      }
    }
  };

  const handleSliderChange = (id: string, newValue: number[]) => {
    updateValue(id, newValue[0]);
  };

  const updateValue = (id: string, newValue: number) => {
    setValues((prev) => {
      const updated = { ...prev, [id]: newValue };
      setIsChanged(true);
      return updated;
    });
  };

  const handleSave = () => {
    updateModelConfig(values);
    setIsChanged(false);
  };

  const formatValue = (value: number, decimalPlaces: number) => {
    return value.toFixed(decimalPlaces);
  };

  const handleExport = () => {
    try {
      const modelConfigString = exportModelConfig();
      const blob = new Blob([modelConfigString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ModelConfig-${new Date()
        .toLocaleTimeString()
        .replaceAll(":", "-")}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result;
        if (typeof contents === "string") {
          importModelConfig(contents);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="grid gap-6">
        {inputConfigs.map((input) => (
          <div key={input.id} className="grid gap-2">
            <Label htmlFor={input.id}>{input.label}</Label>
            <div className="flex items-center gap-4">
              <Input
                type="text"
                id={input.id}
                inputMode="decimal"
                value={formatValue(
                  values[input.id] || input.min,
                  input.decimalPlaces
                )}
                onChange={(e) =>
                  handleInputChange(
                    input.id,
                    e.target.value,
                    input.min,
                    input.max,
                    input.decimalPlaces
                  )
                }
                className="w-24"
              />
              <Slider
                min={input.min}
                max={input.max}
                step={input.step}
                value={[values[input.id] || input.min]}
                onValueChange={(newValue) =>
                  handleSliderChange(input.id, newValue)
                }
                className="flex-1"
              />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button onClick={handleExport} className="mr-2">
            Export Settings
          </Button>
          <Button onClick={() => fileInputRef.current?.click()}>
            Import Settings
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            style={{ display: "none" }}
          />
        </div>
        <Button onClick={handleSave} disabled={!isChanged}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
