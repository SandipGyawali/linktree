import z from "zod";

export const createLinkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  originalUrl: z.url("Enter a valid URL"),
  description: z.string().optional(),
  isPreviewEnabled: z.boolean().default(true),
  expiresAt: z.string().optional(),
  image: z.url("Enter a valid image URL").default("https://example.com/images/preview.png"), // default image
});
export type CreateLinkFormValues = z.infer<typeof createLinkSchema>;
