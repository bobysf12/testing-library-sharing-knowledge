import styled from "styled-components";
import { FormEvent, useRef, useState } from "react";
import { DiaryEntry } from "./types";
import { Button, Paper } from "./Components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 16px;
`;
const FormLabel = styled.label`
  font-size: 12px;
  margin-bottom: 4px;
`;
const Input = styled.input`
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 0.5px solid #000;
  highlight: none;
`;
const TextArea = styled.textarea`
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 0.5px solid #000;
  highlight: none;
`;

type Props = {
  onSave: (entry: Omit<DiaryEntry, "id">) => void;
};
export const DiaryEntryForm = ({ onSave }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSave({
      title,
      description,
    });

    setTitle("");
    setDescription("");
    titleRef.current!.focus();
  };
  return (
    <Paper>
      <Form data-testid="diary-entry-form" onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            ref={titleRef}
            id="title"
            name="title"
            value={title}
            onChange={(evt) => setTitle(evt.currentTarget.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="description">Description</FormLabel>
          <TextArea
            id="description"
            name="description"
            value={description}
            onChange={(evt) => setDescription(evt.currentTarget.value)}
          />
        </FormGroup>
        <Button type="submit">Add new entry</Button>
      </Form>
    </Paper>
  );
};
