import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ComponentProps } from "react";
import { EMAIL_TEMPLATES, EmailTemplates } from "src/lib/templates";
import { transporter } from "src/lib/transporter";
import { renderToStaticMarkup } from "react-dom/server";
import { ENV } from "config/env";

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
  private readonly logger: Logger;

  constructor() {
    this.transporter = transporter;
    this.logger = new Logger(EmailService.name);
  }

  async sendMail<T extends keyof EmailTemplates>({
    from = `"No Reply": ${ENV.SMTP_USER}`,
    to,
    key,
    props,
  }: {
    from?: string;
    to: string; 
    key: T,
    props: ComponentProps<EmailTemplates[T]>
  }) {
    const template = EMAIL_TEMPLATES[key](props);
    const html = renderToStaticMarkup(template);
    
    const info = await this.transporter.sendMail({
      from,
      to,
      subject: template.props.subject,
      html
    });

    this.logger.log(`Mail sent:`, info);
  }
};