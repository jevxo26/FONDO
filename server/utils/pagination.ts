export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PrismaModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findMany: (args: any) => Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  count: (args: any) => Promise<number>;
}

export async function paginate<T>(
  model: PrismaModel,
  query: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, string>;
    include?: Record<string, unknown>;
    select?: Record<string, unknown>;
  } = {},
  page = 1,
  limit = 20,
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    model.findMany({ ...query, skip, take: limit }) as Promise<T[]>,
    model.count({ where: query.where || {} }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
