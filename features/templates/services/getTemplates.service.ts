import { DEFAULT_LIMIT } from "@/config/app";
import { getNextPage } from "@/lib/getNextParam";
import { findTemplates } from "../db/templates.query";

const getTemplates = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  const defaultPage = page ? Number(page) : 0;
  const defaultLimit = limit ? Number(limit) : DEFAULT_LIMIT;
  const offset = defaultLimit * defaultPage;
  const { data, total } = await findTemplates({
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

export { getTemplates };
