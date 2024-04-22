import { create } from 'zustand';

type ModalState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen })
}));
