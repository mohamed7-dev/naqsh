type ConditionalActionType =
  | {
      actionType: "Find";
      message?: string;
    }
  | {
      actionType: "Mutate";
      message: string;
    };

type Props<T> = {
  code: number;
  data: T;
  //   action?: string;
  //   total?: number;
  //   cursor?: number | null;
} & ConditionalActionType;

type Res<T> = Omit<Props<T>, "actionType"> & { success: true };
const handleSuccessResponse = <T>({
  message,
  code,
  data,
}: //   action,
//   total,
//   cursor,
Props<T>) => {
  return {
    success: true as const,
    code,
    message,
    data,
    // cursor: cursor || null,
    // ...(action && { action }),
    // ...(total && { total }),
  } satisfies Res<T>;
};
export { handleSuccessResponse };
