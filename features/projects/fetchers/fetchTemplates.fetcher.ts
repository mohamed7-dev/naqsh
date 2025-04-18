import { getTemplates } from "@/features/templates/services/getTemplates.service";
import { handleError } from "@/lib/error";
import { handleSuccessResponse } from "@/lib/success";

export const fetchTemplates = async ({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}) => {
  try {
    const { data, total, nextPage } = await getTemplates({
      limit,
      page,
    });
    return handleSuccessResponse({
      actionType: "Find",
      code: 200,
      data,
      total,
      nextParam: nextPage,
    });
  } catch (error) {
    return handleError(error);
  }
};
