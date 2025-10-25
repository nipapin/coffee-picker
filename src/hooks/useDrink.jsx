import { create } from "zustand";
import { variants } from "@/utilities/variants";

const getRandomOption = (options, count) => {
  if (count === undefined) {
    return options.sort(() => Math.random() - 0.5)[0];
  }
  return options.sort(() => Math.random() - 0.5).slice(0, count);
};

export const useDrinkStore = create((set) => ({
  milk: "",
  base: "",
  syrup: [],
  generateRandomCoffee: () => {
    const drink = { base: "", milk: "", syrup: "" };
    const newBase = getRandomOption(variants.base);
    drink.base = newBase.name;
    set({ base: newBase.name });
    if (newBase.canAddMilk) {
      const newMilk = getRandomOption(variants.milk);
      drink.milk = newMilk;
      set({ milk: newMilk });
    } else {
      set({ milk: "" });
    }
    const syrupsCount = Math.floor(Math.random() * 4);
    const newSyrups = getRandomOption(variants.syrups, syrupsCount);
    set({ syrup: newSyrups });
    fetch("/api/history", {
      method: "POST",
      body: JSON.stringify(drink),
    });
  },
}));
