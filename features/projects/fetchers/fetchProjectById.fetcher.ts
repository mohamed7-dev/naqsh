import { handleSuccessResponse } from "@/lib/success";
import { getProjectById } from "../services/getProjectById.service";
import { handleError } from "@/lib/error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/routes";

const fetchProjectById = async (id: string) => {
  try {
    const project = await getProjectById(id);
    revalidatePath(routes.projectEditor(id), "page");
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
