import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import * as helpers from "./helpers";

it("should be able to create a new entry", () => {
  render(<App />);
  const title = "Hanging out with the boys";
  const description =
    "Hanging out with the boys until midnight drinking some boozeee";

  const titleInput = screen.getByLabelText("Title");
  const descriptionInput = screen.getByLabelText(/description/i);
  const saveBtn = screen.getByText("Add new entry");
  // const saveBtn = screen.getByRole("button", {name: "Add new entry"});

  // Fill in title input
  fireEvent.change(titleInput, {
    target: {
      value: title,
    },
  });
  // Fill in description input
  fireEvent.change(descriptionInput, {
    target: {
      value: description,
    },
  });

  expect(titleInput).toHaveValue(title);
  expect(descriptionInput).toHaveValue(description);

  fireEvent.click(saveBtn);

  expect(titleInput).toHaveValue("");
  expect(descriptionInput).toHaveValue("");

  // Check whether the title is actually rendered within the component
  expect(screen.queryByText(title)).toBeTruthy();
  expect(screen.queryByText(description)).toBeTruthy();
});

it("should be able to load and show diary entries", () => {
  // Mock returned data
  const spy = jest.spyOn(helpers, "loadDiaryEntries").mockReturnValue([
    { id: 1, title: "Title 1", description: "Desc 1" },
    { id: 2, title: "Title 2", description: "Desc 2" },
  ]);

  render(<App />);

  expect(screen.queryByText("Title 1")).toBeTruthy();
  expect(screen.queryByText("Desc 1")).toBeTruthy();

  expect(screen.queryByText("Title 2")).toBeTruthy();
  expect(screen.queryByText("Desc 2")).toBeTruthy();

  spy.mockRestore();
});

it("should be able to delete an entry", () => {
  // Mock returned data
  const spy = jest.spyOn(helpers, "loadDiaryEntries").mockReturnValue([
    { id: 1, title: "Title 1", description: "Desc 1" },
    { id: 2, title: "Title 2", description: "Desc 2" },
  ]);

  render(<App />);

  // const deleteBtn = screen.getByRole("button", { name: "Delete" });
  // const deleteBtn = screen.getByTestId("delete-2");

  const deleteBtns = screen.getAllByRole("button", { name: "Delete" });
  const deleteBtn = deleteBtns[0];

  fireEvent.click(deleteBtn);

  expect(screen.queryByText("Title 1")).not.toBeInTheDocument();

  spy.mockRestore();
});

// it("should be able to update entry", () => {});

// it("should be able to refresh the page", () => {});

// it("should not be able to create a duplicated entry", () => {});

// it("should validate the form", () => {});
