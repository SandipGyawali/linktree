import { Body, Controller, Inject, Logger, Post } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SendMailDto } from "./dto/send_mail.dto";

@ApiTags("Email Module")
@Controller("mail")
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(
    @Inject("MAIL_SERVICE") private readonly mailClient: ClientProxy,
  ) {}

  @Post("send")
  @ApiOperation({ summary: "Send an Email" })
  @ApiResponse({ status: 201, description: "Email request sent successfully" })
  @ApiResponse({ status: 400, description: "Invalid request body" })
  @ApiBody({ type: SendMailDto })
  async sendMail(@Body() body: SendMailDto) {
    this.logger.log("The request body is:", body);
    // fire and forget event
    this.mailClient.emit("mail.transactional", body);

    return {
      message: "Email request send to mail service"
    }
  }
}