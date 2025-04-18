import { userOnly } from "@/features/auth/lib/protect";
import { getProjects } from "../services/getProjects.service";
import { handleSuccessResponse } from "@/lib/success";
import { handleError } from "@/lib/error";

const fetchProjects = async ({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}) => {
  try {
    const user = await userOnly();
    const { data, total, nextPage } = await getProjects({
      limit,
      page,
      creatorId: user.id,
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

export { fetchProjects };
