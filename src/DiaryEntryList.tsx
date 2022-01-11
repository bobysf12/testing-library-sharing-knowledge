import styled from "styled-components";
import { Paper, Button } from "./Components";
import { DiaryEntry } from "./types";

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
`;

type Props = {
  diaryEntries: DiaryEntry[];
  onDelete: (id: number) => void;
};

export const DiaryEntryList = ({ diaryEntries, onDelete }: Props) => {
  return (
    <List>
      {diaryEntries.map((entry) => (
        <DiaryEntryCard entry={entry} onDelete={onDelete} key={entry.id} />
      ))}
    </List>
  );
};

const ListItem = styled(Paper)`
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
`;
const Description = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
`;
const DeleteButton = styled(Button)`
  background-color: red;
  min-width: 80px;
`;

const DiaryEntryCard = ({
  entry,
  onDelete,
}: {
  entry: DiaryEntry;
  onDelete: (id: number) => void;
}) => {
  return (
    <ListItem>
      <div>
        <Title>{entry.title}</Title>
        <Description>{entry.description}</Description>
      </div>
      <DeleteButton onClick={() => onDelete(entry.id)}>Delete</DeleteButton>
    </ListItem>
  );
};
