import { create } from 'zustand';

interface ProfileState {
  step: number;
  formData: {
    fullName: string;
    birthDate: string;
    country: string;
    nie: string;
    passport: string;
    expiryDate: string;
    phone: string;
    address: string;
  };
  setStep: (step: number) => void;
  updateFormData: (data: Partial<ProfileState['formData']>) => void;
}

export const useProfileWizardStore = create<ProfileState>((set) => ({
  step: 1,
  formData: {
    fullName: '',
    birthDate: '',
    country: '',
    nie: '',
    passport: '',
    expiryDate: '',
    phone: '',
    address: '',
  },
  setStep: (step) => set({ step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
}));
