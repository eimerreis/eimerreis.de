import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

it("should open the menu when clickin on the logo", async () => {
    render(<Header name={"eimerreis.de"} />)

    const menuButton = await screen.findByRole("button");

    const noNavigation = await screen.queryByRole("navigation");
    expect(noNavigation).not.toBeInTheDocument(); 

    await userEvent.click(menuButton);

    const navigation = await screen.queryByRole("navigation");
    expect(navigation).toBeInTheDocument();
})