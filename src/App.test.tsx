import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./views/Home";
import { getRecipes } from "./services/recipeService";
import App from "./App";

jest.mock("./services/recipeService");

const mockRecipes = {
  recipes: [
    { id: 1, name: "Mock Recipe" },
    { id: 2, name: "Another Recipe" },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();

  (getRecipes as jest.Mock).mockResolvedValue(mockRecipes);
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test("renders Heading", () => {
  const Wrapper = createWrapper();
  render(
    <Wrapper>
      <App />
    </Wrapper>
  );
  const headingElement = screen.getByText(/Recipe Collection/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders list element from recipe list", async () => {
  const Wrapper = createWrapper();

  render(
    <Wrapper>
      <Home />
    </Wrapper>
  );

  const recipeElement = await screen.findByText("Mock Recipe");
  expect(recipeElement).toBeInTheDocument();
});

test("shows create recipe form when add button is clicked", () => {
  const Wrapper = createWrapper();
  render(
    <Wrapper>
      <Home />
    </Wrapper>
  );
  const addButton = screen.getByTestId("AddCircleIcon");
  fireEvent.click(addButton);
  expect(screen.getByText("Create a New Recipe")).toBeInTheDocument();
});
