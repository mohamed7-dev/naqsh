import { handleSuccessResponse } from "@/lib/success";
import { getProjectById } from "../services/getProjectById.service";
import { handleError } from "@/lib/error";

const fetchProjectById = async (id: string) => {
  try {
    const project = await getProjectById(id);
    return handleSuccessResponse({
      actionType: "Find",
      code: 200,
      data: project,
    });
  } catch (error) {
    return handleError(error);
  }
};

export { fetchProjectById };
