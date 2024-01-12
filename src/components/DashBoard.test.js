// Dashboard.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DashBoard from "./DashBoard";

test("renders Dashboard component", () => {
  const { getByText, getByPlaceholderText } = render(<DashBoard />);

  expect(getByText("DashBoard")).toBeInTheDocument();
});

test("updates input value on change", () => {
  const { getByPlaceholderText } = render(<DashBoard />);

  const input = getByPlaceholderText("Enter city name");
  fireEvent.change(input, { target: { value: "New York" } });

  expect(input.value).toBe("New York");
});

test("adds city to search history on search", () => {
  const { getByPlaceholderText, getByText } = render(<Dashboard />);

  const input = getByPlaceholderText("Enter city name");
  const searchButton = getByText("Search");

  fireEvent.change(input, { target: { value: "Paris" } });
  fireEvent.click(searchButton);

  expect(getByText("Paris")).toBeInTheDocument();
});

test("clears input field after search", () => {
  const { getByPlaceholderText, getByText } = render(<Dashboard />);

  const input = getByPlaceholderText("Enter city name");
  const searchButton = getByText("Search");

  fireEvent.change(input, { target: { value: "Berlin" } });
  fireEvent.click(searchButton);

  expect(input.value).toBe("");
});

// Add more tests based on your component's logic
