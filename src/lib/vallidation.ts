import { date, string, z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signupSchema = z.object({
  displayname: requiredString.max(20, "Must be at least 20 characters"),
  email: requiredString.email("Invalid email"),
  dipartment: requiredString,
  cityR: requiredString,
  passwordHash: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: requiredString,
  passwordHash: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const formSchema = z.object({
  content: z.string().trim(),
});
export type FormValue = z.infer<typeof formSchema>;

export const calenderSchema = z.object({
  monthname: requiredString,
});

export type CalederValue = z.infer<typeof calenderSchema>;

export const serchSchema = z.object({
  username: requiredString,
  monthname: requiredString,
});

export type SerchValue = z.infer<typeof serchSchema>;

export const autoserchSchema = z.object({
  username: requiredString,
});

export type AutoSerchValue = z.infer<typeof autoserchSchema>;
export const addtaskSchema = z.object({
  username: requiredString,
  task1: z.string().trim(),
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
  task13: z.string().trim(),
  task14: z.string().trim(),
  task15: z.string().trim(),
  task16: z.string().trim(),
  task17: z.string().trim(),
  task18: z.string().trim(),
  task19: z.string().trim(),
  task20: z.string().trim(),
});

export type AddtaskValue = z.infer<typeof addtaskSchema>;

export const addtaskUsernameSchema = z.object({
  monthname: requiredString,
});

export type AddtaskUsernameValue = z.infer<typeof addtaskUsernameSchema>;

export const autoSelectSchema = z.object({
  dipartment: requiredString,
});

export type AutoselectnameValue = z.infer<typeof autoSelectSchema>;
export const presentSchema = z.object({
  atendace: requiredString,
});

export type PrensetnameValue = z.infer<typeof presentSchema>;

export const remarkSchema = z.object({
  task1: z.string().trim(),
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
  task13: z.string().trim(),
  task14: z.string().trim(),
  task15: z.string().trim(),
  task16: z.string().trim(),
  task17: z.string().trim(),
  task18: z.string().trim(),
  task19: z.string().trim(),
  task20: z.string().trim(),
});

export type RemarkValue = z.infer<typeof remarkSchema>;

export type sanameValue = z.infer<typeof autoSelectSchema>;

export const exelSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  contect:z.string().trim(),
});

export type ExelValue = z.infer<typeof exelSchema>;

export const exeadminSchema = z.object({
  userid: requiredString,
  monthname: requiredString,
});

export type ExeladminValue = z.infer<typeof exeadminSchema>;

export const receptiomSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
});

export type ReceptopValue = z.infer<typeof receptiomSchema>;

export const hdSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
  task13: z.string().trim(),
});

export type HdValue = z.infer<typeof hdSchema>;

export const medicenSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
});

export type MediceneValue = z.infer<typeof medicenSchema>;

export const doctorOfflineSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),

  task12: z.string().trim(),

  task13: z.string().trim(),
});

export type DoctorOffineValue = z.infer<typeof doctorOfflineSchema>;

export const doctorOnlineSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
});

export type DoctorOnlineValue = z.infer<typeof doctorOnlineSchema>;

export const revenutrackerSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
});

export type RevenueTrackerValue = z.infer<typeof revenutrackerSchema>;

export const desiginerSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
});

export type DesugnerValue = z.infer<typeof desiginerSchema>;

export const aSchema = z.object({
  cityname: requiredString,
  monthname: requiredString,
});

export type AValue = z.infer<typeof aSchema>;

export const mediceCHAGESchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
});

export type MedicibeValue = z.infer<typeof mediceCHAGESchema>;

export const mixerSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
});

export type MixerValue = z.infer<typeof mixerSchema>;
export const ecartSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
});

export type EcartValue = z.infer<typeof exelSchema>;

export const ecaountantSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
  task13: z.string().trim(),
  task14: z.string().trim(),
  task15: z.string().trim(),
  task16: z.string().trim(),
  task17: z.string().trim(),
  task18: z.string().trim(),
  task19: z.string().trim(),
  task20: z.string().trim(),
  task21: z.string().trim(),
  task22: z.string().trim(),
  task23: z.string().trim(),
  task24: z.string().trim(),
  task25: z.string().trim(),
  task26: z.string().trim(),
  task27: z.string().trim(),
  task28: z.string().trim(),
  task29: z.string().trim(),
  task30: z.string().trim(),
  task31: z.string().trim(),
  task32: z.string().trim(),
  task33: z.string().trim(),
  task34: z.string().trim(),
  task35: z.string().trim(),
  task36: z.string().trim(),
  task37: z.string().trim(),
  task38: z.string().trim(),
  task39: z.string().trim(),
  task40: z.string().trim(),
  task41: z.string().trim(),
  task42: z.string().trim(),
  task43: z.string().trim(),
  task44: z.string().trim(),
  task45: z.string().trim(),
  task46: z.string().trim(),
  task47: z.string().trim(),
  task48: z.string().trim(),
  task49: z.string().trim(),
  task50: z.string().trim(),
  task51: z.string().trim(),
  task52: z.string().trim(),
  task53: z.string().trim(),
  task54: z.string().trim(),
  task55: z.string().trim(),
  task56: z.string().trim(),
  task57: z.string().trim(),
  task58: z.string().trim(),
  task59: z.string().trim(),
  task60: z.string().trim(),
  task61: z.string().trim(),
  task62: z.string().trim(),
  task63: z.string().trim(),
  task64: z.string().trim(),
  task65: z.string().trim(),
  task66: z.string().trim(),
  task67: z.string().trim(),
  task68: z.string().trim(),
  task69: z.string().trim(),
  task70: z.string().trim(),
  task71: z.string().trim(),
  task72: z.string().trim(),
  task73: z.string().trim(),
  task74: z.string().trim(),
  task75: z.string().trim(),
  task76: z.string().trim(),
  task77: z.string().trim(),
  task78: z.string().trim(),
  task79: z.string().trim(),
  task80: z.string().trim(),
  task81: z.string().trim(),
  task82: z.string().trim(),
  task83: z.string().trim(),
  task84: z.string().trim(),
  task85: z.string().trim(),
  task86: z.string().trim(),
  task87: z.string().trim(),
  task88: z.string().trim(),
  task89: z.string().trim(),
  task90: z.string().trim(),
  task91: z.string().trim(),
  task92: z.string().trim(),
  task93: z.string().trim(),
  task94: z.string().trim(),
  task95: z.string().trim(),
  task96: z.string().trim(),
  task97: z.string().trim(),
  task98: z.string().trim(),
  task99: z.string().trim(),
  task100: z.string().trim(),
  task101: z.string().trim(),
  task102: z.string().trim(),
  task103: z.string().trim(),
  task104: z.string().trim(),
  task105: z.string().trim(),
  task106: z.string().trim(),
  task107: z.string().trim(),
  task108: z.string().trim(),
  task109: z.string().trim(),
  task110: z.string().trim(),
  task111: z.string().trim(),
  task112: z.string().trim(),
  task113: z.string().trim(),
  task114: z.string().trim(),
  task115: z.string().trim(),
  task116: z.string().trim(),
  task117: z.string().trim(),
  task118: z.string().trim(),
  task119: z.string().trim(),
  task120: z.string().trim(),
  task121: z.string().trim(),
  task122: z.string().trim(),
  task123: z.string().trim(),
  task124: z.string().trim(),
  task125: z.string().trim(),
});

export type AccountValue = z.infer<typeof ecaountantSchema>;

export const intervewSchema = z.object({
  task1: requiredString,
  task2: requiredString,
  task3: requiredString,
  task4: requiredString,
  task5: requiredString,
  task6: requiredString,
  task7: requiredString,
  task8: z.string().trim(),
  task9: requiredString,
  task10: requiredString,
  task11: requiredString,
  task12: z.string().trim(),
  task13: requiredString,
  task14: requiredString,
  task15: requiredString,
  task16: requiredString,
  task17: requiredString,
  task18: requiredString,
  task19: z.string().trim(),
  task20: z.string().trim(),
  task21: requiredString,
  task22: requiredString,
  task23: z.string().trim(),
  task24: z.string().trim(),
  task25: requiredString,
  task26: requiredString,
  task27: z.string().trim(),
  task28: z.string().trim(),
  task29: requiredString,
  task30: requiredString,
  task31: z.string().trim(),
  task32: z.string().trim(),
  task33: requiredString,
  task34: requiredString,
  task35: z.string().trim(),
  task36: z.string().trim(),
  task37: requiredString,
  task38: z.string().trim(),
  task39: requiredString,
  task40: z.string().trim(),
  task41: requiredString,
  task42: z.string().trim(),
  task43: requiredString,
  task44: z.string().trim(),
  task45: requiredString,
  task46: z.string().trim(),
  task47: z.string().trim(),
  task48: z.string().trim(),
  task49: requiredString,
  task50: z.string().trim(),
  task51: z.string().trim(),
  task52: z.string().trim(),
  task53: requiredString,
  task54: z.string().trim(),
  task55: z.string().trim(),
  task56: z.string().trim(),
  task57: requiredString,
  task58: z.string().trim(),
  task59: z.string().trim(),
  task60: z.string().trim(),

  task61: requiredString,
  task62: z.string().trim(),
  task63: z.string().trim(),
  task64: z.string().trim(),
  task65: requiredString,
  task66: requiredString,
  task67: requiredString,
  task68: requiredString,
  task69: requiredString,
  items1: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items2: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items3: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items4: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items5: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items6: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items7: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items8: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items9: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items10: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items11: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items12: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items13: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items14: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),
  items15: z.boolean().refine((val) => val === true, {
    message: "You must check this checkbox to proceed.",
  }),

  reco1: requiredString,
  reco2: requiredString,
  reco3: requiredString,
  reco4: requiredString,

  ex1: requiredString,
  ex2: requiredString,
  ex3: requiredString,
});

export type IntervewValue = z.infer<typeof intervewSchema>;

export const alreportSchema = z.object({
  month: requiredString,
  year: requiredString,
});

export type AllreportValue = z.infer<typeof alreportSchema>;

export const platformSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
  task12: z.string().trim(),
});

export type PlatFormValue = z.infer<typeof platformSchema>;

export const citySchema = z.object({
  cityname: z.string().trim(),
});

export type CityValue = z.infer<typeof citySchema>;

export const drplatformSchema = z.object({
  date: z.string().trim(),
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
  task7: z.string().trim(),
  task8: z.string().trim(),
  task9: z.string().trim(),
  task10: z.string().trim(),
  task11: z.string().trim(),
});

export type DrPlatFormValue = z.infer<typeof drplatformSchema>;
//   date: z.string().trim(),
//   task1: z.string().trim(),
//   task2: z.boolean().default(false).optional(),
//   task3: z.string().trim(),
//   task4: z.boolean().default(false).optional(),
//   task5: z.string().trim(),
//   task6: z.boolean().default(false).optional(),
//   task7: z.string().trim(),
//   task8: z.boolean().default(false).optional(),
//   task9: z.string().trim(),
//   task10: z.boolean().default(false).optional(),
//   task11: z.string().trim(),
//   task12: z.boolean().default(false).optional(),
//   task13: z.string().trim(),
//   task14: z.boolean().default(false).optional(),
//   task15: z.string().trim(),
//   task16: z.boolean().default(false).optional(),
//   task17: z.string().trim(),
//   task18: z.boolean().default(false).optional(),
//   task19: z.string().trim(),
//   task20: z.boolean().default(false).optional(),
//   task21: z.string().trim(),
//   task22: z.boolean().default(false).optional(),
//   task23: z.string().trim(),
//   task24: z.boolean().default(false).optional(),
//   task25: z.string().trim(),
//   task26: z.boolean().default(false).optional(),
//   task27: z.string().trim(),
//   task28: z.boolean().default(false).optional(),
//   task29: z.string().trim(),
//   task30: z.boolean().default(false).optional(),
//   task31: z.string().trim(),
//   task32: z.boolean().default(false).optional(),
//   task33: z.string().trim(),
//   task34: z.boolean().default(false).optional(),
//   task35: z.string().trim(),
//   task36: z.boolean().default(false).optional(),
//   task37: z.string().trim(),
//   task38: z.boolean().default(false).optional(),
//   task39: z.string().trim(),
//   task40: z.boolean().default(false).optional(),
//   task41: z.string().trim(),
//   task42: z.boolean().default(false).optional(),
//   task43: z.string().trim(),
//   task44: z.boolean().default(false).optional(),
//   task45: z.string().trim(),
//   task46: z.boolean().default(false).optional(),
//   task47: z.string().trim(),
//   task48: z.boolean().default(false).optional(),
//   task49: z.string().trim(),
//   task50: z.boolean().default(false).optional(),
//   task51: z.string().trim(),
//   task52: z.boolean().default(false).optional(),
//   task53: z.string().trim(),
//   task54: z.boolean().default(false).optional(),
//   task55: z.string().trim(),
//   task56: z.boolean().default(false).optional(),
//   task57: z.string().trim(),
//   task58: z.boolean().default(false).optional(),
//   task59: z.string().trim(),
//   task60: z.boolean().default(false).optional(),
//   task61: z.string().trim(),
//   task62: z.boolean().default(false).optional(),
//   task63: z.string().trim(),
//   task64: z.boolean().default(false).optional(),
//   task65: z.string().trim(),
//   task66: z.boolean().default(false).optional(),
//   task67: z.string().trim(),
//   task68: z.boolean().default(false).optional(),
//   task69: z.string().trim(),
//   task70: z.boolean().default(false).optional(),
//   task71: z.string().trim(),
//   task72: z.boolean().default(false).optional(),
//   task73: z.string().trim(),
//   task74: z.boolean().default(false).optional(),
//   task75: z.string().trim(),
//   task76: z.boolean().default(false).optional(),
//   task77: z.string().trim(),
//   task78: z.boolean().default(false).optional(),
//   task79: z.string().trim(),
//   task80: z.boolean().default(false).optional(),
//   task81: z.string().trim(),
//   task82: z.boolean().default(false).optional(),
//   task83: z.string().trim(),
//   task84: z.boolean().default(false).optional(),
//   task85: z.string().trim(),
//   task86: z.boolean().default(false).optional(),
//   task87: z.string().trim(),
//   task88: z.boolean().default(false).optional(),
//   task89: z.string().trim(),
//   task90: z.boolean().default(false).optional(),
//   task91: z.string().trim(),
//   task92: z.boolean().default(false).optional(),
//   task93: z.string().trim(),
//   task94: z.boolean().default(false).optional(),
//   task95: z.string().trim(),
//   task96: z.boolean().default(false).optional(),
//   task97: z.string().trim(),
//   task98: z.boolean().default(false).optional(),
//   task99: z.string().trim(),
//   task100: z.boolean().default(false).optional(),
//   task101: z.string().trim(),
//   task102: z.boolean().default(false).optional(),
//   task103: z.string().trim(),
//   task104: z.boolean().default(false).optional(),
//   task105: z.string().trim(),
//   task106: z.boolean().default(false).optional(),
//   task107: z.string().trim(),
//   task108: z.boolean().default(false).optional(),
//   task109: z.string().trim(),
//   task110: z.boolean().default(false).optional(),
//   task111: z.string().trim(),
//   task112: z.boolean().default(false).optional(),
//   task113: z.string().trim(),
//   task114: z.boolean().default(false).optional(),
//   task115: z.string().trim(),
//   task116: z.boolean().default(false).optional(),
//   task117: z.string().trim(),
//   task118: z.boolean().default(false).optional(),
//   task119: z.string().trim(),
//   task120: z.boolean().default(false).optional(),
//   task121: z.string().trim(),
//   task122: z.boolean().default(false).optional(),
//   task123: z.string().trim(),
//   task124: z.boolean().default(false).optional(),
//   task125: z.string().trim(),
//   task126: z.boolean().default(false).optional(),
//   task127: z.string().trim(),
//   task128: z.boolean().default(false).optional(),
//   task129: z.string().trim(),
//   task130: z.boolean().default(false).optional(),
//   task131: z.string().trim(),
//   task132: z.boolean().default(false).optional(),
//   task133: z.string().trim(),
//   task134: z.boolean().default(false).optional(),
//   task135: z.string().trim(),
//   task136: z.boolean().default(false).optional(),
//   task137: z.string().trim(),
//   task138: z.boolean().default(false).optional(),
//   task139: z.string().trim(),
//   task140: z.boolean().default(false).optional(),
//   task141: z.string().trim(),
//   task142: z.boolean().default(false).optional(),
//   task143: z.string().trim(),
//   task144: z.boolean().default(false).optional(),
//   task145: z.string().trim(),
//   task146: z.boolean().default(false).optional(),
// });

// export type MangerValue = z.infer<typeof managerSchema>;

export const leavformSchema = z.object({
  name1: requiredString,
  subject: requiredString,
  from: requiredString,
  to: requiredString,
  deueto: requiredString,
  comforming: requiredString,
});

export type LeavFromValue = z.infer<typeof leavformSchema>;

const tasks = [
  { id: 1, name: "All Calling Process", dept: "Reception" },
  { id: 2, name: "Patient Booking Application", dept: "Reception" },
  { id: 3, name: "Follow Up Transfer", dept: "Reception" },
  { id: 4, name: "Follow Up Call", dept: "Reception" },
  { id: 5, name: "Confirmation Call", dept: "Reception" },
  { id: 6, name: "Confirmation Call Report", dept: "Reception" },
  { id: 7, name: "All Register Update", dept: "Reception" },
  { id: 8, name: "Counter Patient Handling", dept: "Reception" },
  { id: 9, name: "WhatsApp", dept: "Reception" },
  { id: 10, name: "Daily + Hourly Report", dept: "Reception" },

  { id: 11, name: "Marg Medicine", dept: "Medicine" },
  { id: 12, name: "Stock Manage", dept: "Medicine" },
  { id: 13, name: "Purchase Register Check", dept: "Medicine" },
  { id: 14, name: "Purchase File Check", dept: "Medicine" },
  { id: 15, name: "All Medicine Availability", dept: "Medicine" },
  { id: 16, name: "RW Medicine Order as per Date", dept: "Medicine" },
  { id: 17, name: "INDIAN Medicine Order as per Date", dept: "Medicine" },
  { id: 18, name: "Short Medicine Register Update", dept: "Medicine" },
  { id: 19, name: "Manual Bill Book Check", dept: "Medicine" },
  { id: 20, name: "Other Center Billing for Dispatch", dept: "Medicine" },

  { id: 21, name: "RK Requirement Check + Making", dept: "MIX" },
  { id: 22, name: "RK - Pond Availability - 2 Months", dept: "MIX" },
  { id: 23, name: "RK - Medicine Availability - 2 Months", dept: "MIX" },
  { id: 24, name: "Container Availability", dept: "MIX" },
  { id: 25, name: "Sticker Availability", dept: "MIX" },

  { id: 26, name: "Data Churn", dept: "Telly Calling" },
  { id: 27, name: "Calling Data Work", dept: "Telly Calling" },
  { id: 28, name: "Miss Call + WhatsApp Reply", dept: "Telly Calling" },
  { id: 29, name: "Call Connect + Revenue Generation", dept: "Telly Calling" },
  { id: 30, name: "Patient Numbering Book as TARGET", dept: "Telly Calling" },

  { id: 31, name: "Online Consultation", dept: "Doctor" },
  { id: 32, name: "Interkart", dept: "Doctor" },
  { id: 33, name: "Inteliticks", dept: "Doctor" },
  { id: 34, name: "Online Patient", dept: "Doctor" },
  { id: 35, name: "Online Patient Medicine Follow-Up", dept: "Doctor" },
  { id: 36, name: "Old Online Patient Follow-Up", dept: "Doctor" },
  { id: 37, name: "International Online Patient Follow-Up", dept: "Doctor" },
  { id: 38, name: "Case History", dept: "Doctor" },
  { id: 39, name: "Facebook Replying & Calling", dept: "Doctor" },
  { id: 40, name: "Instagram Replying & Calling", dept: "Doctor" },

  { id: 41, name: "Home Delivery Sale", dept: "HD & OD" },
  { id: 42, name: "Out Delivery Sale", dept: "HD & OD" },
  { id: 43, name: "Delivery Track - POD", dept: "HD & OD" },
  { id: 44, name: "Order Note + Follow-Up Order Inquiry", dept: "HD & OD" },
  {
    id: 45,
    name: "Follow-Up of Daily Online Consultation Patient",
    dept: "HD & OD",
  },

  { id: 46, name: "E-Com Product Listing", dept: "E-com" },
  { id: 47, name: "E-Com Product Sale", dept: "E-com" },
  { id: 48, name: "New E-Com Platform Enlistment", dept: "E-com" },
  { id: 49, name: "Wellness E-Com Website Promotion", dept: "E-com" },
  { id: 50, name: "Compliance Handling of E-Com", dept: "E-com" },

  { id: 51, name: "Video Create + Edit", dept: "Design" },
  { id: 52, name: "Banner & GIF Create + Edit", dept: "Design" },
  { id: 53, name: "Social Media Post on Platforms", dept: "Design" },
  { id: 54, name: "Inhouse + WhatsApp + Status Post Handling", dept: "Design" },
  { id: 55, name: "Presentation Creation", dept: "Design" },

  { id: 56, name: "ERP Maintain", dept: "Developer" },
  { id: 57, name: "ERP Updation", dept: "Developer" },
  { id: 58, name: "CRM Design", dept: "Developer" },
  { id: 59, name: "Website Design", dept: "Developer" },
  { id: 60, name: "Patient App", dept: "Developer" },

  {
    id: 61,
    name: "All Center All Department Closing Checking",
    dept: "Accounts",
  },
  {
    id: 62,
    name: "All Center All Department Closing Tracker",
    dept: "Accounts",
  },
  { id: 63, name: "All Payments (Daily + Monthly)", dept: "Accounts" },
  { id: 64, name: "CA Works", dept: "Accounts" },
  { id: 65, name: "Paper + Documents Maintain", dept: "Accounts" },

  { id: 66, name: "Closing Report", dept: "Cashier" },
  { id: 67, name: "Last Day UPI Check", dept: "Cashier" },
  { id: 68, name: "All Statement Match", dept: "Cashier" },
  { id: 69, name: "All Closing Report & Cash", dept: "Cashier" },
  { id: 70, name: "LAB + LOOSE Record Keeping", dept: "Cashier" },

  { id: 71, name: "Daily Attendance All Branch", dept: "HR" },
  { id: 72, name: "Monthly Attendance All Branch", dept: "HR" },
  { id: 73, name: "Staff Record Keeping", dept: "HR" },
  { id: 74, name: "All Department-wise Report", dept: "HR" },
  { id: 75, name: "Weekly Audit or Review Report", dept: "HR" },
  { id: 76, name: "Staff Productivity Tracker", dept: "HR" },
  { id: 77, name: "Staff Performance Tracker", dept: "HR" },
  { id: 78, name: "Doctor Performance Report", dept: "HR" },
  { id: 79, name: "Staff-wise Work Distribution", dept: "HR" },
  { id: 80, name: "All Center Daily Work Status", dept: "HR" },

  { id: 81, name: "Track on Routine Work + Pending Work", dept: "HR" },
  { id: 82, name: "Pending Work Update", dept: "HR" },
  { id: 83, name: "Pending Work Report", dept: "HR" },
  { id: 84, name: "All Manager Checklist", dept: "HR" },
  { id: 85, name: "Managers Today Work Plan", dept: "HR" },
  { id: 86, name: "Managers Tomorrow Work Plan", dept: "HR" },
  { id: 87, name: "All Department Daily SOP Follow-Up & Checking", dept: "HR" },
  { id: 88, name: "EOD Reporting", dept: "HR" },
  { id: 89, name: "Hiring Report", dept: "HR" },
  { id: 90, name: "Daily Branch Report", dept: "HR" },
  { id: 91, name: "Staff Feedback Tracker", dept: "HR" },
  { id: 92, name: "Meeting Agenda Planner", dept: "HR" },
  { id: 93, name: "Minutes of Meeting", dept: "HR" },
  { id: 94, name: "SIR Work Completion Report", dept: "HR" },
  { id: 95, name: "All Checklist Reporting", dept: "HR" },
  { id: 96, name: "All Floor Administrative Works", dept: "Floor Manager" },
  { id: 97, name: "Branch Floor Staff Management", dept: "Floor Manager" },
  { id: 98, name: "Patient Management", dept: "Floor Manager" },
  { id: 99, name: "Camp Data Report", dept: "Floor Manager" },
  { id: 100, name: "Review Collection", dept: "Floor Manager" },
];

export const managerSchema = z.object({
  date: z.string().trim(), // Date Required
  ...tasks.reduce((schema: any, task) => {
    schema[`training${task.id}`] =
      task.id % 2 !== 0
        ? z.string().trim() // Odd -> Textarea
        : z.literal("").or(z.string().trim()); // Even -> Allow empty string
    schema[`checklist${task.id}`] = z.boolean().default(false); // All -> Checkbox
    return schema;
  }, {}),
});

export type ManagerValue = z.infer<typeof managerSchema>;
