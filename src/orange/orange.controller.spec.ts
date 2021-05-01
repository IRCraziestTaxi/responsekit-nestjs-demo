import { Test, TestingModule } from "@nestjs/testing";
import { OrangeController } from "./orange.controller";

describe("OrangeController", () => {
    let controller: OrangeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrangeController]
        }).compile();

        controller = module.get<OrangeController>(OrangeController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
