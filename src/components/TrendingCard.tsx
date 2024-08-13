import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Text,
  Image,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { Track } from "../types/Track.interface";
import { StarIcon } from "@chakra-ui/icons";

export function TrendingCard({
  track,
  like,
}: {
  track: Track;
  like: (id: string, like: boolean) => void;
}) {
  return (
    <Card>
      <HStack>
        <CardHeader>
          <Image src={track.artwork["150x150"]} alt={track.title} />
        </CardHeader>
        <CardBody>
          <Stack align={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={600} color={"gray.800"}>
              {track.title}
            </Text>
            <Stack spacing={0} align={"flex-start"}>
              <Text fontSize={"xs"} color="gray.500">
                {track.genre}
              </Text>
              <Text fontSize={"xs"} color="gray.500">
                {track.mood}
              </Text>
            </Stack>
            <IconButton
              bg={track.liked ? "purple.600" : "purple.100"}
              icon={<StarIcon />}
              onClick={() => like(track.id, !track.liked)}
              aria-label={"like"}
            />
          </Stack>
        </CardBody>
      </HStack>
    </Card>
  );
}
