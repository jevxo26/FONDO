export function createMutationWrapper<TVariables, TData = void>(
  trigger: (body: TVariables) => Promise<{ data?: TData; error?: unknown }>,
) {
  const mutateAsync = async (body: TVariables): Promise<TData> => {
    const result = await trigger(body);
    if (result.error) throw result.error;
    return result.data as TData;
  };

  const mutate = (
    body: TVariables,
    options?: {
      onSuccess?: (data: TData, variables: TVariables, context: unknown) => void;
      onError?: (error: unknown, variables: TVariables, context: unknown) => void;
      onSettled?: (data: TData | undefined, error: unknown, variables: TVariables, context: unknown) => void;
    },
  ) => {
    mutateAsync(body).then(
      (data) => {
        options?.onSuccess?.(data, body, undefined);
        options?.onSettled?.(data, undefined, body, undefined);
      },
      (error) => {
        options?.onError?.(error, body, undefined);
        options?.onSettled?.(undefined, error, body, undefined);
      },
    );
  };

  return { mutate, mutateAsync };
}
