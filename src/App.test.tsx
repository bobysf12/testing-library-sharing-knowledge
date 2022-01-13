import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import App from "./App";
import { DiaryEntry } from "./types";
import * as helpers from "./helpers";

it("should show title", () => {
  render(<App />);

  // Query the title element by text https://testing-library.com/docs/queries/bytext
  const titleEl = screen.getByText(/diary entry tracker/i);
  // Check if the title exist in the doc
  expect(titleEl).toBeInTheDocument();
});

it("should show diary entry form", () => {
  render(<App />);
  // Query the form element by `data-testid` attribute https://testing-library.com/docs/queries/bytestid
  const formEl = screen.getByTestId("diary-entry-form");
  // Check if the form element is rendered
  expect(formEl).toBeInTheDocument();
});

it("should show diary entry list container", () => {
  render(<App />);

  const listEl = screen.getByRole("list", { name: "diary entry list" });
  // Check if the form element is rendered
  expect(listEl).toBeInTheDocument();
});

it("should be able to create and remove diary entry", () => {
  render(<App />);

  const title = "This is title";
  const description = "This is description";

  // Get all input elements
  const titleInput = screen.getByLabelText("Title"); // https://testing-library.com/docs/queries/bylabeltext
  const descriptionInput = screen.getByLabelText("Description"); // https://testing-library.com/docs/queries/bylabeltext
  const saveBtn = screen.getByRole("button", { name: "Add new entry" }); // https://testing-library.com/docs/queries/byrole

  // Fire change event to fill in the inputs
  // https://testing-library.com/docs/dom-testing-library/api-events
  fireEvent.change(titleInput, {
    target: {
      value: title,
    },
  });
  fireEvent.change(descriptionInput, {
    target: {
      value: description,
    },
  });

  fireEvent.click(saveBtn);

  // (OPTIONAL) Use `within` API to check whether the element is rendered within the list
  // https://testing-library.com/docs/dom-testing-library/api-within
  expect(screen.queryByText(title)).toBeInTheDocument();
  expect(screen.queryByText(description)).toBeInTheDocument();

  // Check if inputs are reset
  expect(titleInput).toHaveValue("");
  expect(descriptionInput).toHaveValue("");
});

it("shoudl be able to delete entry", () => {
  const mockEntries: DiaryEntry[] = [
    { id: 1, title: "Entry1", description: "Entry desc1" },
    { id: 2, title: "Entry2", description: "Entry desc2" },
  ];

  const loadDiaryEntriesSpy = jest
    .spyOn(helpers, "loadDiaryEntries")
    .mockReturnValue(mockEntries);

  render(<App />);

  const deleteBtns = screen.getAllByRole("button", { name: "Delete" });

  fireEvent.click(deleteBtns[0]);

  // The entry should be gone
  expect(screen.queryByText(mockEntries[0].title)).not.toBeInTheDocument();
  expect(screen.queryByText(mockEntries[1].title)).toBeInTheDocument();

  loadDiaryEntriesSpy.mockRestore();
});

// HOMEWORK: Add validations to the diary entry form
// 1. Should not be empty
// 2. Title should have max characters of 60
// 3. Description should have min 10 characters
