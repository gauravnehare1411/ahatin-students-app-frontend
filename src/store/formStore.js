import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set) => ({
      formData: {
        educational: {},
        studyPreferences: {},
        certifications: {},
        workExperience: {},
        financialInformation: {},
      },

      setEducational: (data) =>
        set((state) => ({
          formData: { ...state.formData, educational: data },
      })),

      setStudyPreferences: (data) =>
        set((state) => ({
          formData: { ...state.formData, studyPreferences: data },
      })),

      setCertifications: (data) =>
        set((state) => ({
          formData: { ...state.formData, certifications: data },
      })),

      setWorkExperience: (data) =>
        set((state) => ({
          formData: { ...state.formData, workExperience: data },
      })),

      setFinancialInformation: (data) =>
        set((state) => ({
          formData: { ...state.formData, financialInformation: data },
      })),
      
      resetForm: () =>
        set({
          formData: {
            educational: {},
            studyPreferences: {},
            certifications: {},
            workExperience: {},
            financialInformation: {},
        },
      }),
    }),

    {
      name: "form-storage",
      getStorage: () => localStorage,
    }
  )
)