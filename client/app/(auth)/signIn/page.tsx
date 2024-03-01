/**
 * @module Page
 */

/**
 * React functional component representing the registration page.
 * @function Page
 * @returns {JSX.Element} JSX element representing the registration page.
 */

"use client";

// Libraries
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import FormFieldWrapper from "@/components/shared/Form/FormFieldWrapper";

// ...
import { loginSchema } from "@/lib/validations/login";

const Page = () => {
  /**
   * Array of objects describing form fields.
   * @constant {Object[]}
   * @default
   */
  const formFields = [
    {
      name: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "*****",
      type: "password",
    },
  ];

  /**
   * Object containing toast-related functions.
   * @constant {Object}
   * @property {Function} toast - Function to display toast messages.
   */
  const { toast } = useToast();

  /**
   * Object containing functions related to loading state.
   * @constant {Object}
   * @property {Function} setLoading - Function to set loading state.
   */
  // const { setLoading } = useLoaderStore();

  /**
   * Object containing functions related to user state.
   * @constant {Object}
   * @property {Function} setUser - Function to set user data.
   */
  // const { setUser } = useUserStore();

  /**
   * Object representing the Next.js router.
   * @constant {Object}
   * @property {Function} router - Object representing the Next.js router.
   */
  const router = useRouter();

  /**
   * Object representing the form state and methods.
   * @constant {Object}
   * @property {Function} form - Object representing the form state and methods.
   */
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Async function handling form submission.
   * @async
   * @function onSubmit
   * @param {Object} values - Form values submitted by the user.
   * @throws {Object} error - Error object in case of submission failure.
   * @returns {void}
   */

  async function handleLogin(values: z.infer<typeof loginSchema>) {

    console.log(values);

    // setLoading(true);
    // try {
    //   const response = await LogInUser(values);
    //   toast({
    //     title: "Logged In Successfully!",
    //   });
    //   setUser(response.data);
    //   router.push("/");
    // } catch (error: any) {
    //   toast({
    //     title: "Something Went Wrong!",
    //     description: error.response?.data?.message || "Please try again!",
    //     variant: "destructive",
    //   });S
    // } finally {
    //   form.reset();
    //   setLoading(false);
    // }
  }

  return (
    <>
      <div className="flex h-screen min-h-full bg-gray-100">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex-column-center">
              <Image
                src={"/assets/shared/logo.png"}
                alt={"Logo"}
                width={100}
                height={100}
                className="w-auto"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link className="font-bold text-primary-500" href={"/signUp"}>
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(handleLogin)}
                  >
                    {formFields.map((field) => (
                      <FormFieldWrapper
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type || ""}
                      />
                    ))}
                    <div className={"flex-column-start gap-y-2"}>
                      <Button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm"
                      >
                        Sign in
                      </Button>
                      {/* <Button */}
                      {/*  type="submit" */}
                      {/*  className="flex-center w-full gap-x-2 rounded-md border-2 border-primary-500 bg-gray-200 px-4 py-2 text-sm font-medium text-primary-500  shadow-sm" */}
                      {/* > */}
                      {/*  <Image */}
                      {/*    src="/assets/icons/google.png" */}
                      {/*    width={28} */}
                      {/*    height={28} */}
                      {/*    alt="google icon" */}
                      {/*  /> */}
                      {/*  Sign in with Google */}
                      {/* </Button> */}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-column-center  relative hidden  w-0 flex-1 overflow-hidden bg-primary-500  px-12 py-36 text-center  lg:block">
          <div className="flex-column-center h-full gap-y-4">
            <div className="inline-block rounded-full bg-white px-2 py-1 font-bold text-primary-500">
              Quotes
            </div>
            <p className="h3-bold flex-center mt-4  w-2/3 text-center text-white">
              Love the simplicity of the service and the prompt customer
              support. We can’t imagine working without it.
            </p>
            <div className="flex-column-center mt-8">
              <Image
                src="/assets/auth/ceo.png"
                width={80}
                height={80}
                alt="ceo image"
              />
              <h4 className="base-medium mt-2 font-bold text-white">
                John Doe
              </h4>
              <p className="body-regular font-bold text-white">
                CEO & Founder at Flex.co
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
