import { z } from "zod";

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
  task1: requiredString,
  task2: z.string().trim(),
  task3: z.string().trim(),
  task4: z.string().trim(),
  task5: z.string().trim(),
  task6: z.string().trim(),
 
});

export type ExelValue = z.infer<typeof exelSchema>;



export const exeadminSchema = z.object({
 userid:requiredString,
 monthname:requiredString,
 dipartment:requiredString
 
});

export type ExeladminValue = z.infer<typeof exeadminSchema>;