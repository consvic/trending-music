import { Button, Heading, HStack, Input, Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getTrending } from "../api/trending";
import { TrendingCard } from "../components/TrendingCard";
import React, { useState } from "react";
import { Track } from "../types/Track.interface";
import Fuse from "fuse.js";
import { useLikeTrack } from "../hooks/useLikeTrack";

type Filters = "all" | "electronic" | "hiphop";

export function Main() {
  const { data } = useQuery("trending", getTrending, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const mutation = useLikeTrack(data ?? []);
  const [genre, setGenre] = React.useState<Filters>("all");
  const [likedFirst, setLikedFirst] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function filterTracks(tracks: Track[], genre: Filters) {
    let finalTracks = tracks;
    switch (genre) {
      case "all":
        finalTracks = tracks;
        break;
      case "electronic":
        finalTracks = tracks.filter((track) => track.genre === "Electronic");
        break;
      case "hiphop":
        finalTracks = tracks.filter((track) => track.genre === "Hip-Hop/Rap");
        break;
      default:
        finalTracks = tracks;
        break;
    }

    return likedFirst ? sortByLikeFirst(finalTracks) : finalTracks;
  }

  function sortByLikeFirst(tracks: Track[]) {
    return tracks.sort((a, b) => {
      if (a.liked && !b.liked) {
        return -1;
      }
      if (!a.liked && b.liked) {
        return 1;
      }
      return 0;
    });
  }

  function search(query: string) {
    if (!query || query === "") {
      return data ?? [];
    }

    const options = {
      keys: ["title", "genre", "mood"],
      threshold: 0.3,
    };
    const fuse = new Fuse(data ?? [], options);

    return fuse.search(query).map((result) => result.item);
  }

  function onSearchChange(query: string) {
    setSearchQuery(query);
  }

  function likeTrack(id: string, like: boolean) {
    mutation.mutate({ trackId: id, liked: like });
  }

  return (
    <main>
      <header>
        <Stack spacing={4}>
          <HStack justify={"space-between"}>
            <Heading color={"purple.500"}>Trending Music</Heading>
            <HStack>
              <Button
                variant={genre === "all" ? "outline" : "solid"}
                onClick={() => setGenre("all")}
                colorScheme={"purple"}
              >
                All
              </Button>
              <Button
                variant={genre === "electronic" ? "outline" : "solid"}
                onClick={() => setGenre("electronic")}
                colorScheme={"purple"}
              >
                Electronic
              </Button>
              <Button
                variant={genre === "hiphop" ? "outline" : "solid"}
                onClick={() => setGenre("hiphop")}
                colorScheme={"purple"}
              >
                Hip-Hop/Rap
              </Button>
              <Button
                variant={"ghost"}
                bg={likedFirst ? "purple.100" : "transparent"}
                onClick={() => setLikedFirst(!likedFirst)}
              >
                Liked first
              </Button>
            </HStack>
          </HStack>
          <Input
            placeholder="Search..."
            colorScheme="purple"
            _focusVisible={{ border: "1px solid #E9D8FD" }}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <section>
            <Stack spacing={2}>
              {filterTracks(search(searchQuery), genre).map((track) => (
                <TrendingCard key={track.id} track={track} like={likeTrack} />
              ))}
            </Stack>
          </section>
        </Stack>
      </header>
    </main>
  );
}
