import { Test, TestingModule } from "@nestjs/testing";
import { ResponsekitModule } from "@responsekit/nestjs";
import { AppleController } from "./apple.controller";

describe("AppleController", () => {
    let controller: AppleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ResponsekitModule.forRoot()
            ],
            controllers: [AppleController]
        }).compile();

        controller = module.get<AppleController>(AppleController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
