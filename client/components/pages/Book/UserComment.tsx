"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "sonner"
import {addComment} from "@/network/endpoints/BooksApi";
import {useRouter} from "next/navigation";


const FormSchema = z.object({
    userComment: z.string().min(1, {
        message: "Username must be at least 2 characters.",
    }),
})

export function UserCommentSection({book_id, user_id, user_name}: {
    book_id: number,
    user_id: string,
    user_name: string
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userComment: "",
        },
    })

    const router = useRouter();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const comm = data.userComment
            const reponse = await addComment({
                book_id,
                user_id,
                user_name,
                comment_text: comm
            })
            toast("You comment has been submitted")
            router.refresh();
        } catch (e: any) {
            toast(e.response.data.error)
        } finally {
            form.reset()
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 py-4 space-y-6">
                <FormField
                    control={form.control}
                    name="userComment"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Partagez ce que vous avez sur le coeur!</FormLabel>
                            <FormControl>
                                <Input className={"placeholder:text-black text-black"}
                                       placeholder="I really like this book" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Partager</Button>
            </form>
        </Form>
    )
}
