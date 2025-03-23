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
  total?: number;
  nextParam?: number | null;
} & ConditionalActionType;

type Res<T> = Omit<Props<T>, "actionType"> & { success: true };
const handleSuccessResponse = <T>({
  message,
  code,
  data,
  nextParam,
  total,
}: Props<T>): Res<T> => {
  return {
    success: true as const,
    code,
    message,
    data,
    ...(nextParam && { nextParam }),
    ...(total && { total }),
  } satisfies Res<T>;
};
export { handleSuccessResponse };
