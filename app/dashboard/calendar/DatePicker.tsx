"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { PopoverClose } from "@radix-ui/react-popover"

import { ro } from 'date-fns/locale';

const FormSchema = z.object({
  selectedDate: z.date({
    required_error: "A date is required.",
  }),
})

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedDate: new Date(), // Setează data curentă ca valoare implicită
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // "data: " + data.selectedDate)
  }

  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Starea care controlează vizibilitatea pop-up-ului

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="selectedDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                        "glass"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ro })
                      ) : (
                        <span>Alege o dată</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl w-auto p-0 glass" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || new Date()}
                    onSelect={(date) => {
                      if (date) { // Verifică dacă date este definită
                        field.onChange(date);
                        onDateChange(date);
                        setIsCalendarOpen(false);
                      }
                    }}
                    initialFocus
                    className="p-3 backdrop-blur-xl rounded-2xl"
                  />
                </PopoverContent>
                <PopoverClose></PopoverClose>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}


