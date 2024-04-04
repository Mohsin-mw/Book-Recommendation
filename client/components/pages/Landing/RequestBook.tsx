"use client";

import { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { requestNewBook } from "@/network/endpoints/BooksApi";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le nom d'utilisateur doit au moins comporter 2 caractères.",
  }),
  isbn: z.string().min(4, {
    message: "ISBN doit comporter au moins 4 caractères.",
  }),
});

type PropTypes = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RequestBook({ open, setOpen }: PropTypes) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      isbn: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await requestNewBook(values.title, values.isbn);
    toast("Request submitted");
    form.reset();
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel className={"text-gray-900"}>
                              Book Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={
                                  "no-focus text-primary font-bold ring-primary outline-primary"
                                }
                                placeholder="Educated..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Titre du livre (auteur optionnel)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isbn"
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel className={"text-gray-900"}>
                              ISBN
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={
                                  "no-focus text-primary font-bold ring-primary outline-primary"
                                }
                                placeholder="00293..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Numéro ISBN du livre
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <Button type="submit">Envoyer</Button>
                  </form>
                </Form>
                {/*<div className="mt-5 sm:mt-6">*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"*/}
                {/*        onClick={() => setOpen(false)}*/}
                {/*    >*/}
                {/*        Go back to dashboard*/}
                {/*    </button>*/}
                {/*</div>*/}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
