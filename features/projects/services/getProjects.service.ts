import { getNextPage } from "@/lib/getNextParam";
import { findProjects } from "../db/project.query";
import { DEFAULT_LIMIT } from "@/config/app";

const getProjects = async ({
  creatorId,
  page,
  limit,
}: {
  page?: number;
  limit?: number;
  creatorId: string;
}) => {
  const defaultPage = page ? Number(page) : 0;
  const defaultLimit = limit ? Number(limit) : DEFAULT_LIMIT;
  const offset = defaultLimit * defaultPage;
  const { data, total } = await findProjects({
    creatorId,
    offset,
    limit: defaultLimit,
  });

  const nextPage = getNextPage({
    total,
    currentPage: defaultPage,
    limit: defaultLimit,
    offset,
  });
  return { data, total, nextPage };
};

export { getProjects };
