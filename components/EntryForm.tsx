"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ToastAction } from "./ui/toast";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
  prn: z.string().min(10),
});

type UserFormValues = z.infer<typeof formSchema>;

const EntryForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prn: "" },
  });

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true);

    try {
      await axios.post(`/api/record`, data);
      toast({
        description: "Entry done!",
        variant: "success",
      });
      // router.refresh();
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data) {
        const errMessage = error?.response?.data;
        toast({
          description: errMessage,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      toast({
        description: "Something went wrong!!",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto md:w-[100%] lg:w-[60%] xl:w-[60%] bg-white rounded-2xl py-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="prn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PRN No.</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="PRN or Employee ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EntryForm;
