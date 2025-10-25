import { create } from "zustand";
import { variants } from "@/utilities/variants";
import { createOrder } from "@/utilities/postgres";

const getRandomOption = (options, count) => {
  if (count === undefined) {
    const index = Math.floor(Math.random() * options.length);
    return options[index];
  }
  const result = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * options.length);
    result.push(options[index]);
  }
  return result;
};

export const useDrinkStore = create((set) => ({
  milk: "",
  base: "",
  syrup: [],
  generateRandomCoffee: () => {
    const base = getRandomOption(variants.base);
    set({ base: base.name });
    let milk = "";
    if (base.canAddMilk) {
      milk = getRandomOption(base.milkRequired ? variants.milk.slice(1) : variants.milk);
    }
    set({ milk });
    const syrupsCount = Math.floor(Math.random() * 4);
    const syrup = getRandomOption(variants.syrups, syrupsCount);
    set({ syrup });
    return { base: base.name, milk, syrup };
  },
  saveOrder: (order) => {
    createOrder({ ...order, favorite: false });
  },
}));
