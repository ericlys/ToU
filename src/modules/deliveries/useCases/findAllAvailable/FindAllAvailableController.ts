import { Request, Response } from "express";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

export class FindAllAvailableController {
  async handle(request: Request, response: Response) {
    const { page, limit, search } = request.query;

    const findAllAvailableUseCase = new FindAllAvailableUseCase();
    const deliveries = await findAllAvailableUseCase.execute({
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      search: String(search || "")
    });

    return response.json(deliveries)
  }
}