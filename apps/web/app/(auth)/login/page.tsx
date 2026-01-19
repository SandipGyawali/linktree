"use client";
import { cn } from "@linktree/ui/cn";
import { Button } from "@linktree/ui/button";
import { Input } from "@linktree/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@linktree/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../../schema/auth.schema";
import { useLogin } from "../../apis/auth/auth.api";
import { useRouter } from "next/navigation";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("Logged in:", res);
        router.replace("/dashboard")
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-start gap-1 text-center mb-7">
          <h1 className="text-lg md:text-3xl font-bold">
            Login to your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to login to your account.
          </p>
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="m@example.com"
                  className="h-9"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <a
                  href="#"
                  className="ml-auto text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <FormControl>
                <Input {...field} type="password" className="h-9" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Server error */}
        {error && (
          <p className="text-sm text-red-500 text-start">
            {error.message}
          </p>
        )}

        <Button
          size="lg"
          type="submit"
          disabled={isPending}
          className="font-medium text-md h-9 mt-4"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </p>
      </form>
    </Form>
  );
}
