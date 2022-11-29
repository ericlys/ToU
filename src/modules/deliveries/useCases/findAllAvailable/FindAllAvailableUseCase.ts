import { prisma } from "../../../../database/prismaClient";

interface FindAllAvailableUseCaseRequest {
  page: number;
  limit: number;
  search: string;
}

export class FindAllAvailableUseCase {
  async execute({ page, limit, search }: FindAllAvailableUseCaseRequest) {

    const deliveries = await prisma.$transaction([
      prisma.deliveries.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: {
          end_at: null,
          id_deliveryman: null,
          item_name: {
            contains: search,
            mode: "insensitive"
          }
        }
      }),
      prisma.deliveries.count({
        where: {
          end_at: null,
          id_deliveryman: null,
          item_name: {
            contains: search,
            mode: "insensitive"
          }
        }
      }),
    ]);

    const total_pages = Math.round(deliveries[1] / limit);

    return {
      deliveries: deliveries[0],
      count: deliveries[1],
      total_pages: total_pages > 0 ? total_pages : 1
    };
  }
}