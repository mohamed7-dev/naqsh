const getNextPage = ({
  total,
  offset,
  currentPage,
  limit,
}: {
  total: number;
  offset: number;
  currentPage: number;
  limit: number;
}) => {
  const hasMore = offset + limit < total;
  return hasMore ? currentPage + 1 : null;
};

export { getNextPage };
