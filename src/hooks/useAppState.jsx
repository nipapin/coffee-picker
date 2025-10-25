import { create } from "zustand";

export const useAppState = create((set) => ({
  isGenerating: false,
  isDone: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsDone: (isDone) => set({ isDone }),
}));
