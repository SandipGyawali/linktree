import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq"
import { Queue } from "src/constants/job.constant";

@Module({
  imports: [
    BullModule.registerQueue({
      name: Queue.Email,
      streams: {
        events: {
          maxLen: 100
        }
      }
    })
  ]
})
export class EmailQueueModule {}