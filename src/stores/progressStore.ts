import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  CriterionEvidence,
  ExerciseId,
  ExerciseProgressRecord,
} from "../types";

type ProgressState = {
  readonly records: Readonly<
    Record<ExerciseId, ExerciseProgressRecord>
  >;

  recordPracticeSession: (
    exerciseId: ExerciseId,
    practicedAt?: string,
  ) => void;

  setCriterionEvidence: (
    exerciseId: ExerciseId,
    criterionKey: string,
    evidence: CriterionEvidence,
  ) => void;

  setExerciseNotes: (
    exerciseId: ExerciseId,
    notes: string,
  ) => void;

  clearExerciseProgress: (
    exerciseId: ExerciseId,
  ) => void;

  clearAllProgress: () => void;
};

function createEmptyRecord(
  exerciseId: ExerciseId,
  now: string,
): ExerciseProgressRecord {
  return {
    exerciseId,
    sessionsCompleted: 0,
    criterionEvidence: {},
    updatedAt: now,
  };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      records: {},

      recordPracticeSession: (
        exerciseId,
        practicedAt = new Date().toISOString(),
      ) => {
        set((state) => {
          const currentRecord =
            state.records[exerciseId] ??
            createEmptyRecord(
              exerciseId,
              practicedAt,
            );

          const nextRecord: ExerciseProgressRecord = {
            ...currentRecord,
            sessionsCompleted:
              currentRecord.sessionsCompleted + 1,
            lastPracticedAt: practicedAt,
            updatedAt: practicedAt,
          };

          return {
            records: {
              ...state.records,
              [exerciseId]: nextRecord,
            },
          };
        });
      },

      setCriterionEvidence: (
        exerciseId,
        criterionKey,
        evidence,
      ) => {
        const now = new Date().toISOString();

        set((state) => {
          const currentRecord =
            state.records[exerciseId] ??
            createEmptyRecord(exerciseId, now);

          const nextRecord: ExerciseProgressRecord = {
            ...currentRecord,
            criterionEvidence: {
              ...currentRecord.criterionEvidence,
              [criterionKey]: evidence,
            },
            updatedAt: now,
          };

          return {
            records: {
              ...state.records,
              [exerciseId]: nextRecord,
            },
          };
        });
      },

      setExerciseNotes: (exerciseId, notes) => {
        const now = new Date().toISOString();

        set((state) => {
          const currentRecord =
            state.records[exerciseId] ??
            createEmptyRecord(exerciseId, now);

          const nextRecord: ExerciseProgressRecord = {
            ...currentRecord,
            notes,
            updatedAt: now,
          };

          return {
            records: {
              ...state.records,
              [exerciseId]: nextRecord,
            },
          };
        });
      },

      clearExerciseProgress: (exerciseId) => {
        set((state) => {
          const nextRecords = {
            ...state.records,
          };

          delete nextRecords[exerciseId];

          return {
            records: nextRecords,
          };
        });
      },

      clearAllProgress: () => {
        set({
          records: {},
        });
      },
    }),
    {
      name: "baregains-progress",
      version: 1,
      partialize: (state) => ({
        records: state.records,
      }),
    },
  ),
);