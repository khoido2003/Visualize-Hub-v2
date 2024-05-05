export const getMouseCoordinates = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  panOffset: { x: number; y: number },
  scale: number,
  scaleOffset: { x: number; y: number },
) => {
  const clientX = event.clientX / scale;
  const clientY = event.clientY / scale;

  // Adjust for pan offset
  const adjustedX = clientX - panOffset.x;
  const adjustedY = clientY - panOffset.y;

  // Adjust for scale offset
  const finalX = adjustedX + scaleOffset.x / scale;
  const finalY = adjustedY + scaleOffset.y / scale;

  return { clientX: finalX, clientY: finalY };
};
