"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@linktree/ui/card";
import { Input } from "@linktree/ui/input";
import { Textarea } from "@linktree/ui/textarea";
import { Button } from "@linktree/ui/button";
import { Switch } from "@linktree/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@linktree/ui/form";
import { QRPreview } from "../../components/qrcode.preview";
import { cn } from "@linktree/ui/cn";
import { CreateLinkFormValues, createLinkSchema } from "../../schema/link.schema";
import { useAddLink } from "../../app/apis/short/links.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 

export function CreateLinkForm() {
  const router = useRouter();
  const linkMn = useAddLink();
  const form = useForm<CreateLinkFormValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      title: "",
      originalUrl: "",
      image: "",
      description: "",
      isPreviewEnabled: true,
      expiresAt: "",
    },
  });

  const { handleSubmit, watch, setValue, control } = form;

  const watchedUrl = watch("originalUrl");
  const watchedPreview = watch("isPreviewEnabled");

  console.log(form.formState.errors)
  const onSubmit = (data: CreateLinkFormValues) => {
    const payload = {
      title: data.title,
      originalUrl: data.originalUrl,
      description: data.description,
      image: data.image,
      isPreviewEnabled: data.isPreviewEnabled,
      expiresAt: data.expiresAt || null,
    };
    linkMn.mutate(payload, {
      onSuccess: () => toast("Successfully Created Link.")
    });
    form.reset();
    router.replace("/short/links")
  };

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>New Link</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
              <div className="space-y-6">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="originalUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Destination URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/page"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Description / Tags</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Add comments" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Expiration Date & Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          placeholder="Select expiration"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.png"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <FormLabel>QR Code</FormLabel>
                  <div className={
                    cn(
                      "flex h-40 items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground", 
                      watchedUrl && "h-fit w-fit p-2"
                    )}
                  >
                    {/* {watchedUrl ? "QR for " + watchedUrl : "QR preview"} */}
                    {watchedUrl ? (
                      <QRPreview url={watchedUrl} />
                    ) : (
                      "QR will appear here after entering a URL"
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel>Custom Link Preview</FormLabel>
                    <Switch
                      checked={watchedPreview}
                      onCheckedChange={(val) => setValue("isPreviewEnabled", val)}
                    />
                  </div>

                  <div className="flex h-40 items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">
                    {watchedPreview
                      ? `Preview: ${form.getValues("originalUrl")}`
                      : "Enter a link to generate a preview"}
                  </div>
                </div>

                <Button disabled={linkMn.isPending} className="w-full" type="submit">
                  {linkMn.isPending ? "Creating..." : "Create Link"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
