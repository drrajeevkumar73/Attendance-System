import { date, z } from "zod";

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
  task11: z.string().trim(),
  task12: z.string().trim(),
  task13: z.string().trim(),
  task14: z.string().trim(),
  task15: z.string().trim(),
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
  task12: z.string().trim(),
  task13: z.string().trim(),
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
  // task126: z.string().trim(),
  // task127: z.string().trim(),
  // task128: z.string().trim(),
  // task129: z.string().trim(),
  // task130: z.string().trim(),
  // task131: z.string().trim(),
  // task132: z.string().trim(),
  // task133: z.string().trim(),
  // task134: z.string().trim(),
  // task135: z.string().trim(),
  // task136: z.string().trim(),
  // task137: z.string().trim(),
  // task138: z.string().trim(),
  // task139: z.string().trim(),
  // task140: z.string().trim(),
  // task141: z.string().trim(),
  // task142: z.string().trim(),
  // task143: z.string().trim(),
  // task144: z.string().trim(),
  // task145: z.string().trim(),
  // task146: z.string().trim(),
  // task147: z.string().trim(),
  // task148: z.string().trim(),
  // task149: z.string().trim(),
  // task150: z.string().trim(),
  // task151: z.string().trim(),
  // task152: z.string().trim(),
  // task153: z.string().trim(),
  // task154: z.string().trim(),
  // task155: z.string().trim(),
  // task156: z.string().trim(),
  // task157: z.string().trim(),
  // task158: z.string().trim(),
  // task159: z.string().trim(),
  // task160: z.string().trim(),
  // task161: z.string().trim(),
  // task162: z.string().trim(),
  // task163: z.string().trim(),
  // task164: z.string().trim(),
  // task165: z.string().trim(),
  // task166: z.string().trim(),
  // task167: z.string().trim(),
  // task168: z.string().trim(),
  // task169: z.string().trim(),
  // task170: z.string().trim(),
  // task171: z.string().trim(),
  // task172: z.string().trim(),
  // task173: z.string().trim(),
  // task174: z.string().trim(),
  // task175: z.string().trim(),
  // task176: z.string().trim(),
  // task177: z.string().trim(),
  // task178: z.string().trim(),
  // task179: z.string().trim(),
  // task180: z.string().trim(),
  // task181: z.string().trim(),
  // task182: z.string().trim(),
});

export type AccountValue = z.infer<typeof ecaountantSchema>;





export const intervewSchema = z.object({
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


export type IntervewValue = z.infer<typeof intervewSchema>;