import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the output of the text display : Lost It", () => {
    render(<App />);
    const linkElement = screen.getByText(/Lost-It/);
    expect(linkElement).toBeInTheDocument();
});

test("renders the output of the text display : Log In", () => {
    render(<App />);
    const linkElement = screen.getByText(/Log In/);
    expect(linkElement).toBeInTheDocument();
});

test("renders the output of the text display on Main Page", () => {
    render(<App />);
    const linkElement = screen.getByText(/A digitized lost & found system/);
    expect(linkElement).toBeInTheDocument();
});
