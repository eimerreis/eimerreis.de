import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Navigation } from './Navigation';

it('should not render navigation if open prop is false', async () => {
    const onClose = jest.fn();
    render(<Navigation onClose={onClose} open={false} />);

    const navigation = await screen.queryByRole("navigation")
    expect(navigation).not.toBeInTheDocument();
});

it('should render navigation if open prop is true', async () => {
    const onClose = jest.fn();
    render(<Navigation onClose={onClose} open={true} />);

    const navigation = await screen.findByRole("navigation")
    expect(navigation).toBeInTheDocument();
});


it('should call onClose callback when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<Navigation onClose={onClose} open={true} />);

    const closeButton = await screen.findByRole("button")
    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1);
});
