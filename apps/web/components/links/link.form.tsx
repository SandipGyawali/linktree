"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@linktree/ui/form";
import { Input } from "@linktree/ui/input";
import { Textarea } from "@linktree/ui/textarea";
import { Button } from "@linktree/ui/button";
import { Switch } from "@linktree/ui/switch";
import { QRPreview } from "../../components/qrcode.preview";
import { cn } from "@linktree/ui/cn";
import {
  CreateLinkFormValues,
  createLinkSchema,
} from "../../schema/link.schema";

type LinkFormProps = {
  defaultValues?: Partial<CreateLinkFormValues>;
  onSubmit: (values: CreateLinkFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export function LinkForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save",
}: LinkFormProps) {
  const form = useForm<CreateLinkFormValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      title: "",
      originalUrl: "",
      image: "",
      description: "",
      isPreviewEnabled: true,
      expiresAt: "",
      ...defaultValues,
    },
  });

  const { handleSubmit, watch, setValue, control } = form;
  const watchedUrl = watch("originalUrl");
  const watchedPreview = watch("isPreviewEnabled");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="expiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>QR Code</FormLabel>
          <div
            className={cn(
              "flex h-40 items-center justify-center rounded-md border bg-muted text-sm",
              watchedUrl && "h-fit w-fit p-2"
            )}
          >
            {watchedUrl ? <QRPreview url={watchedUrl} /> : "QR preview"}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <FormLabel>Custom Link Preview</FormLabel>
          <Switch
            checked={watchedPreview}
            onCheckedChange={(v) => setValue("isPreviewEnabled", v)}
          />
        </div>

        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
