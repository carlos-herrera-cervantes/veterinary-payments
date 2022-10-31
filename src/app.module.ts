import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
