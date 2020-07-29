import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { DialogController } from './dialog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dialog } from './dialog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dialog])],
  providers: [DialogService],
  controllers: [DialogController],
})
export class DialogModule {
}
