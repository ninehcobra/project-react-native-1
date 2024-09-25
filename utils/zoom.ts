export const getZoomLevel = (radius: number) => {
  return Math.log2(360 * (40075017 / (radius * 1000 * 256))) - 1;
};
