export const buildStoryPath = (pills, ids) => {
  if (ids.length === 0) {
    return "";
  }
  const [headId, ...tailIds] = ids;

  const currentPill = pills.find((pill) => pill?.id === headId);
  const separator = tailIds.length > 0 ? " " : "";
  return currentPill?.text + separator + buildStoryPath(currentPill?.children || [currentPill], tailIds);
};
