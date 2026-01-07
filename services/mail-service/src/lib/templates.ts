import type { ComponentProps } from "react"
import CreateUserAccountOTPTemplate from "../templates/CreateUserAccountOtp";

export type EmailTemplateMap = {
  CreateUserAccountOTPTemplate: ComponentProps<typeof CreateUserAccountOTPTemplate>
};

export const EMAIL_TEMPLATES: {
  [K in keyof EmailTemplateMap]: (props: EmailTemplateMap[K]) => React.JSX.Element;
} = {
  CreateUserAccountOTPTemplate,
};

export type EmailTemplates = typeof EMAIL_TEMPLATES;