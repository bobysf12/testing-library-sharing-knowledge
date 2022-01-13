import { DiaryEntry } from "./types";

export function loadDiaryEntries(): DiaryEntry[] {
  return [
    {
      id: 1,
      title: "Went to the park",
      description: "Trying to get some fresh air",
    },
    {
      id: 2,
      title: "Hangout with Agung",
      description: "Play some games in his apartment",
    },
    {
      id: 3,
      title: "Went to Bandung with Puguh",
      description: "Visit the team in Bandung",
    },
    {
      id: 4,
      title: "Watch movies with GF",
      description: "After a very long time!",
    },
  ];
}
