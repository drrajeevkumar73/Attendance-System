"use client"
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
import { AutoselectnameValue, autoSelectSchema } from "@/lib/vallidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export default function Vewdata() {
     const form2 = useForm<AutoselectnameValue>({
        resolver: zodResolver(autoSelectSchema),
        defaultValues: {
          dipartment: "",
        },
      });
    
      const onSubmit=()=>{

      }
  return (
    <>
     <Form {...form2}>
        <form className="space-y-3" onSubmit={form2.handleSubmit(onSubmit)}>
          <FormField
            control={form2.control}
            name="dipartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select department</FormLabel>
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
                        <SelectItem value="CENTER OPS MANAGER">
                          CENTER MANAGER
                        </SelectItem>
                        <SelectItem value="HR"> HR</SelectItem>
                        <SelectItem value="CASHIER"> CASHIER</SelectItem>
                        <SelectItem value="RECEPTIONS"> RECEPTIONS</SelectItem>
                        <SelectItem value="MEDICINE COUNTER">
                          MEDICINE COUNTER
                        </SelectItem>
                        <SelectItem value="HD / OD"> HD / OD</SelectItem>
                        <SelectItem value="TELECALLER DEPT">
                          TELECALLER
                        </SelectItem>
                        <SelectItem value="MIXER">MIXER</SelectItem>
                        <SelectItem value="ECART"> ECART</SelectItem>
                        <SelectItem value="DESIGNER">DESIGNER</SelectItem>
                        <SelectItem value="DIGITAL MARKETING">
                          DIGITAL MARKETING
                        </SelectItem>
                        <SelectItem value="DOCTOR"> DOCTOR</SelectItem>
                        <SelectItem value="MAID / OFFICE BOY">
                          MAID / OFFICE BOY
                        </SelectItem>
                        <SelectItem value="GUARD"> GUARD</SelectItem>
                        <SelectItem value="DRIVER"> DRIVER</SelectItem>
                        <SelectItem value="ACCOUNTANT">ACCOUNTANT</SelectItem>
                        <SelectItem value="INVENTORY">INVENTORY</SelectItem>
                        <SelectItem value="TRUST MARKETING">
                          TRUST MARKETING
                        </SelectItem>
                        <SelectItem value="SHOP RANCHI">SHOP RANCHI</SelectItem>
                        <SelectItem value="MIS">MIS</SelectItem>
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
    </>
  )
}
