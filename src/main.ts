import { NestFactory } from "@nestjs/core";
import { RejectionFilter, rejectionPipe } from "@responsekit/nestjs";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new RejectionFilter());
    app.useGlobalPipes(rejectionPipe);
    await app.listen(3000);
}
bootstrap();
