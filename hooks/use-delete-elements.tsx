import { useSelf, useMutation } from "@/liveblocks.config";

export const useDeleteLayers = () => {
  return useMutation(({ storage, setMyPresence }, position?: number) => {
    const liveLayers = storage.get("layers");

    if (!position) liveLayers.delete(liveLayers.toArray().length - 1);
    else {
      liveLayers.delete(position);
    }
  }, []);
};
