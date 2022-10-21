import { Test, TestingModule } from "@nestjs/testing";
import { ResponsekitModule } from "@responsekit/nestjs";
import { OrangeController } from "./orange.controller";

describe("OrangeController", () => {
    let controller: OrangeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ResponsekitModule.forRoot()
            ],
            controllers: [OrangeController]
        }).compile();

        controller = module.get<OrangeController>(OrangeController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
