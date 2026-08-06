export interface TimeShift {
  start: string; // e.g., "09:00"
  end: string;   // e.g., "12:00"
}

export interface DaySchedule {
  day: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  isOpen: boolean;
  shifts: TimeShift[];
}

export type WorkingHoursConfig = DaySchedule[];

export const DEFAULT_WORKING_HOURS: WorkingHoursConfig = [
  { day: 0, isOpen: true, shifts: [{ start: "09:00", end: "21:00" }] },
  { day: 1, isOpen: true, shifts: [{ start: "09:00", end: "21:00" }] },
  { day: 2, isOpen: true, shifts: [{ start: "09:00", end: "21:00" }] },
  { day: 3, isOpen: true, shifts: [{ start: "09:00", end: "21:00" }] },
  { day: 4, isOpen: true, shifts: [{ start: "09:00", end: "21:00" }] },
  { day: 5, isOpen: true, shifts: [{ start: "09:00", end: "21:00" }] },
  { day: 6, isOpen: true, shifts: [{ start: "09:00", end: "21:00" }] },
];
