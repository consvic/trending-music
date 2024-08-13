import { useMutation, useQueryClient } from "react-query";
import { Track } from "../types/Track.interface";

export function useLikeTrack(tracks: Track[]) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ trackId, liked }: { trackId: string; liked: boolean }) => {
      return tracks.map((track) => {
        if (track.id === trackId) {
          return { ...track, liked };
        }
        return track;
      });
    },
    {
      onSuccess: (tracks: Track[]) => {
        queryClient.setQueryData(["trending"], tracks);
      },
    }
  );

  return mutation;
}
