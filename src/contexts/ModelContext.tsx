"use client";

import { useContext, createContext, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ModelContextType {
  modelConfig: Record<string, number>;
  inputConfigs: InputConfig[]; 
  exportModelConfig: () => string;
  updateModelConfig: (values: Record<string, number>) => void;
  importModelConfig: (config: string) => void;

}

interface InputConfig {
  id: string
  label: string
  min: number
  max: number
  step: number
  decimalPlaces: number
}
const ModelContext = createContext<ModelContextType | null>(null);

const inputConfigs = [
  { id: 'temperature', label: 'Temperature', min: 0, max: 1, step: 0.01, decimalPlaces: 2 },
  { id: 'topPSampling', label: 'Top-p Sampling', min: -1, max: 0, step: 0.01, decimalPlaces: 2 },
  { id: 'frequencyPenalty', label: 'Frequency Penalty', min: -1, max: 1, step: 0.01, decimalPlaces: 2 },
  { id: 'presencePenalty', label: 'Presence Penalty', min: -1, max: 1, step: 0.01, decimalPlaces: 2 },
]

export const useModelConfig = () => {
  
  const context = useContext(ModelContext);

  if (context === null) {
    throw new Error(" must be used within a SettingsProvider");
  }
  return context;
};

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modelConfig, setModelConfig] =  useState<Record<string, number>>({});

  const updateModelConfig = (value) => {
    setModelConfig((oldValue) => {
      return {
        ...oldValue,
        ...value
      }
    })
  }

  const exportModelConfig = () => {
    return JSON.stringify(modelConfig);
  }

  const importModelConfig = (modelConfig: string) => {
    try {
      const parsedModelConfig = JSON.parse(modelConfig)
      updateModelConfig(parsedModelConfig)
      toast({
        title: "Model config imported",
        description: "Your model config have been successfully imported.",
      })
    } catch(error) {
      toast({
        title: "Import failed",
        description: "There was an error importing your settings. Please check the format and try again.",
        variant: "destructive",
      })
    }
  }
  return (
    <ModelContext.Provider value={{ modelConfig, updateModelConfig, inputConfigs, exportModelConfig, importModelConfig }}>
      {children}
    </ModelContext.Provider>
  )
}


