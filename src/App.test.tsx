import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import App from "./App";

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

  // Check if the new entry is shown in the list
  const diaryEntryListEl = screen.getByRole("list", {
    name: "diary entry list",
  });

  // (OPTIONAL) Use `within` API to check whether the element is rendered within the list
  // https://testing-library.com/docs/dom-testing-library/api-within
  expect(within(diaryEntryListEl).queryByText(title)).toBeInTheDocument();
  expect(within(diaryEntryListEl).queryByText(description)).toBeInTheDocument();
  expect(
    within(diaryEntryListEl).queryByRole("button", { name: "Delete" })
  ).toBeInTheDocument();

  // Check if inputs are reset
  expect(titleInput).toHaveValue("");
  expect(descriptionInput).toHaveValue("");

  // Try to remove the new entry
  const deleteBtn = within(diaryEntryListEl).getByRole("button", {
    name: "Delete",
  });
  fireEvent.click(deleteBtn);

  // The entry should be gone
  expect(within(diaryEntryListEl).queryByText(title)).not.toBeInTheDocument();
  expect(
    within(diaryEntryListEl).queryByText(description)
  ).not.toBeInTheDocument();
  expect(
    within(diaryEntryListEl).queryByRole("button", { name: "Delete" })
  ).not.toBeInTheDocument();
});

// HOMEWORK: Add validations to the diary entry form
// 1. Should not be empty
// 2. Title should have max characters of 60
// 3. Description should have min 10 characters
