import { Controller, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { EmailService } from "./mail.service";

@Controller()
export class EMailController {
  private readonly logger = new Logger(EMailController.name);
  constructor(private readonly mailService: EmailService) {}

  @EventPattern("mail.transactional")
  async handleSendMail(
    @Payload() data,
    @Ctx() context: RmqContext
  ) {
    try {
      await this.mailService.sendMail({
        key: data.key,
        props: data.props,
        to: data.to,
      });
    }catch(err) {
      this.logger.error("Faild to process email: ", err);
    }
  }
}
