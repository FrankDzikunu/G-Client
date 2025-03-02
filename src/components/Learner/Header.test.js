import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header"; 
import { AuthProvider } from "../../../context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// A helper to wrap Header with necessary providers.
const renderWithProviders = (ui) => {
  return render(
    <GoogleOAuthProvider clientId="test-client-id">
      <AuthProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

describe("Header Component", () => {
  test("renders the logo", () => {
    renderWithProviders(<Header />);
    const logo = screen.getByAltText(/Client Logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("shows login button when not logged in", () => {

    renderWithProviders(<Header />);
    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
  });

  test("toggles login popup when login button is clicked", () => {
    renderWithProviders(<Header />);
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);

    const loginHeading = screen.getByRole("heading", { name: /Login/i });
    expect(loginHeading).toBeInTheDocument();
  });
  

});
