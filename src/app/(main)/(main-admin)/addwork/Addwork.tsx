"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  addtaskSchema,
  AddtaskValue,
  AutoselectnameValue,
  autoSelectSchema,
} from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import LodingButton from "@/components/LodingButton";
export default function Addwork() {
  const { toast } = useToast();

  const [allTodo, setalltodo] = useState({
    task1: "",
    task2: "",
    task3: "",
    task4: "",
    task5: "",
    task6: "",
    task7: "",
    task8: "",
    task9: "",
    task10: "",
    task11: "",
    task12: "",
    task13: "",
    task14: "",
    task15: "",
    task16: "",
    task17: "",
    task18: "",
    task19: "",
    task20: "",
  });

  const form = useForm<AddtaskValue>({
    resolver: zodResolver(addtaskSchema),
    defaultValues: {
      username: "",
      task1: allTodo.task1,
      task2: allTodo.task1,
      task3: allTodo.task3,
      task4: allTodo.task4,
      task5: allTodo.task5,
      task6: allTodo.task6,
      task7: allTodo.task7,
      task8: allTodo.task8,
      task9: allTodo.task9,
      task10: allTodo.task10,
      task11: allTodo.task11,
      task12: allTodo.task12,
      task13: allTodo.task13,
      task14: allTodo.task14,
      task15: allTodo.task15,
      task16: allTodo.task16,
      task17: allTodo.task17,
      task18: allTodo.task18,
      task19: allTodo.task19,
      task20: allTodo.task20,
    },
  });

  const form2 = useForm<AutoselectnameValue>({
    resolver: zodResolver(autoSelectSchema),
    defaultValues: {
      dipartment: "",
    },
  });

  const [count, setcount] = useState(5);
  const createInputePlushHandler = () => {
    if (count === 20) {
      setcount(20);
    } else {
      setcount(count + 5);
    }
  };
  const createInputeMinusHandler = () => {
    if (count === 5) {
      setcount(5);
    } else {
      setcount(count - 5);
    }
  };
  const [ispending, setispending] = useState(false);

  const submithandler = async (values: AddtaskValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/taskforsatff", {
        username: values.username,
        task1: allTodo.task1,
        task2: allTodo.task2,
        task3: allTodo.task3,
        task4: allTodo.task4,
        task5: allTodo.task5,
        task6: allTodo.task6,
        task7: allTodo.task7,
        task8: allTodo.task8,
        task9: allTodo.task9,
        task10: allTodo.task10,
        task11: allTodo.task11,
        task12: allTodo.task12,
        task13: allTodo.task13,
        task14: allTodo.task14,
        task15: allTodo.task15,
        task16: allTodo.task16,
        task17: allTodo.task17,
        task18: allTodo.task18,
        task19: allTodo.task19,
        task20: allTodo.task20,
      });
      setalltodo({
        task1: "",
        task2: "",
        task3: "",
        task4: "",
        task5: "",
        task6: "",
        task7: "",
        task8: "",
        task9: "",
        task10: "",
        task11: "",
        task12: "",
        task13: "",
        task14: "",
        task15: "",
        task16: "",
        task17: "",
        task18: "",
        task19: "",
        task20: "",
      });
      toast({
        description: data.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Faild to send work for staff.";
        toast({
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setispending(false);
    }
  };

  const onSubmit = async (dipartment: AutoselectnameValue) => {
    try {
      setispending(true);
      const { data } = await axios.post("/api/autofillstaffwork", {
        dipartment,
      });

      if (data.StaffWork.length >= 1) {
        setalltodo({
          task1: data.StaffWork[0].task1,
          task2: data.StaffWork[0].task2,
          task3: data.StaffWork[0].task3,
          task4: data.StaffWork[0].task4,
          task5: data.StaffWork[0].task5,
          task6: data.StaffWork[0].task6,
          task7: data.StaffWork[0].task7,
          task8: data.StaffWork[0].task8,
          task9: data.StaffWork[0].task9,
          task10: data.StaffWork[0].task10,
          task11: data.StaffWork[0].task11,
          task12: data.StaffWork[0].task12,
          task13: data.StaffWork[0].task13,
          task14: data.StaffWork[0].task14,
          task15: data.StaffWork[0].task15,
          task16: data.StaffWork[0].task6,
          task17: data.StaffWork[0].task17,
          task18: data.StaffWork[0].task18,
          task19: data.StaffWork[0].task19,
          task20: data.StaffWork[0].task10,
        });

        toast({
          description: "Data loaded. Please check your input.",
          variant: "default",
        });
      } else {
        setalltodo({
          task1: "",
          task2: "",
          task3: "",
          task4: "",
          task5: "",
          task6: "",
          task7: "",
          task8: "",
          task9: "",
          task10: "",
          task11: "",
          task12: "",
          task13: "",
          task14: "",
          task15: "",
          task16: "",
          task17: "",
          task18: "",
          task19: "",
          task20: "",
        });

        toast({
          description: "No any data is fill by admin.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        description:
          "Faild to load data for admin because in this department staff is not present.",
        variant: "destructive",
      });
    } finally {
      setispending(false);
    }
  };

  let changehandler = (event: any) => {
    let obj: any = { ...allTodo };
    obj[event.target.name] = event.target.value;
    setalltodo(obj);
  };
  return (
    <div className="space-y-5">
     
      <Form {...form2}>
        <form className="space-y-3">
          <FormField
            control={form2.control}
            name="dipartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auto fill task please select department.</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(dipartment: any) => onSubmit(dipartment)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a dipartment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Department</SelectLabel>
                        <SelectItem value="HR">1) HR</SelectItem>
                        <SelectItem value="BRANCH MANAGER / HR EXE">
                          2) BRANCH MANAGER / HR EXE
                        </SelectItem>
                        <SelectItem value="RECEPTIONS">
                          3) RECEPTIONS
                        </SelectItem>
                        <SelectItem value="CASHIER">4) CASHIER</SelectItem>
                        <SelectItem value="MEDICINE COUNTER + HD / OD">
                          5) MEDICINE COUNTER + HD / OD
                        </SelectItem>
                        <SelectItem value="(HD /OD + BOOKING) TELECALLER">
                          6) (HD /OD + BOOKING) TELECALLER
                        </SelectItem>
                        <SelectItem value="MIXER">7) MIXER</SelectItem>
                        <SelectItem value="E-COMMERCE + DIGITAL">
                          8) E-COMMERCE + DIGITAL
                        </SelectItem>
                        <SelectItem value="DOCTOR">9) DOCTOR</SelectItem>
                        <SelectItem value="MAID">10) MAID</SelectItem>
                        <SelectItem value="GUARD">11) GUARD</SelectItem>
                        <SelectItem value="DRIVER">12) DRIVER</SelectItem>
                        <SelectItem value="ACCOUNTANT / INVENTORY">
                          13) ACCOUNTANT / INVENTORY
                        </SelectItem>
                        <SelectItem value="TRUST">14) TRUST</SelectItem>
                        <SelectItem value="DIGITAL HEAD">
                          15) DIGITAL HEAD
                        </SelectItem>
                        <SelectItem value="MARKETING MANAGER">
                          16) MARKETING MANAGER
                        </SelectItem>
                        <SelectItem value="STAFF">17) STAFF</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submithandler)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel><p>Select department for give some today&lsquo;s task for staff.</p></FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a dipartment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dipartment</SelectLabel>
                        <SelectItem value="HR">1) HR</SelectItem>
                        <SelectItem value="BRANCH MANAGER / HR EXE">
                          2) BRANCH MANAGER / HR EXE
                        </SelectItem>
                        <SelectItem value="RECEPTIONS">
                          3) RECEPTIONS
                        </SelectItem>
                        <SelectItem value="CASHIER">4) CASHIER</SelectItem>
                        <SelectItem value="MEDICINE COUNTER + HD / OD">
                          5) MEDICINE COUNTER + HD / OD
                        </SelectItem>
                        <SelectItem value="(HD /OD + BOOKING) TELECALLER">
                          6) (HD /OD + BOOKING) TELECALLER
                        </SelectItem>
                        <SelectItem value="MIXER">7) MIXER</SelectItem>
                        <SelectItem value="E-COMMERCE + DIGITAL">
                          8) E-COMMERCE + DIGITAL
                        </SelectItem>
                        <SelectItem value="DOCTOR">9) DOCTOR</SelectItem>
                        <SelectItem value="MAID">10) MAID</SelectItem>
                        <SelectItem value="GUARD">11) GUARD</SelectItem>
                        <SelectItem value="DRIVER">12) DRIVER</SelectItem>
                        <SelectItem value="ACCOUNTANT / INVENTORY">
                          13) ACCOUNTANT / INVENTORY
                        </SelectItem>
                        <SelectItem value="TRUST">14) TRUST</SelectItem>
                        <SelectItem value="DIGITAL HEAD">
                          15) DIGITAL HEAD
                        </SelectItem>
                        <SelectItem value="MARKETING MANAGER">
                          16) MARKETING MANAGER
                        </SelectItem>
                        <SelectItem value="STAFF">17) STAFF</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {count === 5 ? (
            <>
              <FormField
                control={form.control}
                name="task1"
                // disabled={defauktValue?.StaffWork?.length >= 1}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 1</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 1"
                        {...field}
                        value={allTodo.task1}
                        onChange={changehandler}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 2</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 2"
                        {...field}
                        value={allTodo.task2}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 3</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 3"
                        {...field}
                        value={allTodo.task3}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 4</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 4"
                        {...field}
                        value={allTodo.task4}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task5"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 5</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 5"
                        {...field}
                        value={allTodo.task5}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : count === 10 ? (
            <>
              <FormField
                control={form.control}
                name="task6"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 6</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 6"
                        {...field}
                        value={allTodo.task6}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task7"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 7</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 7"
                        {...field}
                        value={allTodo.task7}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task8"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 8</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 8"
                        {...field}
                        value={allTodo.task8}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task9"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 9</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 9"
                        {...field}
                        value={allTodo.task9}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 10</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 10"
                        {...field}
                        value={allTodo.task10}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : count === 15 ? (
            <>
              <FormField
                control={form.control}
                name="task11"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 11</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 11"
                        {...field}
                        value={allTodo.task11}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task12"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 12</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 12"
                        {...field}
                        value={allTodo.task12}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task13"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 13</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 13"
                        {...field}
                        value={allTodo.task13}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task14"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 14</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 14"
                        {...field}
                        value={allTodo.task14}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task15"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 15</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 15"
                        {...field}
                        value={allTodo.task15}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : count === 20 ? (
            <>
              <FormField
                control={form.control}
                name="task16"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 16</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 16"
                        {...field}
                        value={allTodo.task16}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task17"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 17</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 17"
                        {...field}
                        value={allTodo.task17}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task18"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 18</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 18"
                        {...field}
                        value={allTodo.task18}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task19"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 19</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 19"
                        {...field}
                        value={allTodo.task19}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task20"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Task 20</FormLabel>
                    <FormControl>
                      <Input
                        className="border-foreground"
                        placeholder="Add Task 20"
                        {...field}
                        value={allTodo.task20}
                        onChange={changehandler}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            ""
          )}

          <LodingButton loding={ispending} type="submit" className="w-full">
            Submit
          </LodingButton>
        </form>
      </Form>

      <div className="flex gap-4">
        <Button type="button" className="" onClick={createInputePlushHandler}>
          <PlusIcon />
        </Button>
        <Button type="button" className="" onClick={createInputeMinusHandler}>
          <MinusIcon />
        </Button>
      </div>
    </div>
  );
}
