"use client";

import { create } from "zustand";

interface CreditState {
    credits: number | null;
    isPremium: boolean;
    setCreditsData: (credits: number, isPremium: boolean) => void;
    decrementCredit: () => void;
}

export const useCreditStore = create<CreditState>((set) => ({
    credits: null,
    isPremium: false,
    setCreditsData: (credits, isPremium) => set({ credits, isPremium }),
    decrementCredit: () => set((state) => ({ 
        credits: state.credits !== null && state.credits > 0 ? state.credits - 1 : state.credits 
    })),
}));
