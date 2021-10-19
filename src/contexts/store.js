import create from "zustand";

const useStore = create((set) => ({
  masterState: {},
  setState: (newState) => set((state) => ({ masterState: newState })),
}));

export default useStore;
