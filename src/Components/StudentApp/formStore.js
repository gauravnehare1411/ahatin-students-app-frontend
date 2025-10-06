import { create } from "zustand";

export const useFormStore = create((set) => ({
  formData: {
    educational: {},
    studyPreferences: {},
    certifications: {},
    workExperience: {},
    financialInformation: {},
  },

  setEducational: (data) => set((state) => ({
    formData: { ...state.formData, educational: data }
  })),

  setStudyPreferences: (data) => set((state) => ({
    formData: { ...state.formData, studyPreferences: data }
  })),

  setCertifications: (data) => set((state) => ({
    formData: { ...state.formData, certifications: data }
  })),

  setWorkExperience: (data) => set((state) => ({
    formData: { ...state.formData, workExperience: data }
  })),

  setFinancialInformation: (data) => set((state) => ({
    formData: { ...state.formData, financialInformation: data }
  })),

}));
