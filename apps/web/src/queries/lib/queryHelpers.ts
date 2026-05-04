export function createQueryFn<T>(
  serverFn: () => Promise<{ success: boolean; data?: T; error?: string }>,
): () => Promise<T> {
  return async () => {
    const res = await serverFn();
    if (!res.success) {
      throw new Error(res.error || "Failed to fetch data");
    }
    return res.data as T;
  };
}
