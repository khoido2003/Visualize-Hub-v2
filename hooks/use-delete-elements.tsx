import { useSelf, useMutation } from "@/liveblocks.config";

export const useDeleteLayers = () => {
  return useMutation(({ storage, setMyPresence }) => {
    const liveLayers = storage.get("layers");
    liveLayers.delete(liveLayers.toArray().length - 1);
  }, []);
};
