export const calculateRequestsNeeded = (totalCount: number, maxFetchableItems: number, hasDoneFirstRequest = false) => {
  if (hasDoneFirstRequest) {
    return Math.max(0, Math.ceil((totalCount - maxFetchableItems) / maxFetchableItems));
  }

  return Math.ceil(totalCount / maxFetchableItems);
};
