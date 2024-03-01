import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

const FormFieldWrapper = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: Props) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="block text-sm font-medium text-gray-700">
          {label}
        </FormLabel>
        <FormControl>
          <Input
            className="block w-full appearance-none rounded-md   border-primary-500 bg-gray-100 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none  focus:ring-primary-500 sm:text-sm"
            type={type}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage className={"text-red-600"} />
      </FormItem>
    )}
  />
);

export default FormFieldWrapper;
