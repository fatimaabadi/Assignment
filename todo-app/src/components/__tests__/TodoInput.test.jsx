import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import TodoInput from '../TodoInput.jsx';

describe('TodoInput component', () => {
  test('renders inputs and submits a new todo when title is provided', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    const { container } = render(<TodoInput addTodo={mockAdd} />);

    // find inputs by placeholder (matches your component)
    const titleInput = screen.getByPlaceholderText('Task title');
    const descInput = screen.getByPlaceholderText('Description (optional)');

    // date input has no placeholder — select by type
    const dateInput = container.querySelector('input[type="date"]');

    const submitBtn = screen.getByRole('button', { name: /add task/i });

    // type values
    await user.type(titleInput, 'Test task');
    await user.type(descInput, 'testing style update');

    // date input: try typing (jsdom sometimes needs change event)
    try {
      await user.type(dateInput, '2026-12-02');
    } catch (err) {
      // fallback: set value directly if typing fails
      fireEvent.change(dateInput, { target: { value: '2026-12-02' } });
    }

    // submit
    await user.click(submitBtn);

    // assertions: addTodo called once with expected fields
    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test task',
      description: 'testing style update',
      dueDate: '2026-12-02',
      completed: false,
      id: expect.any(Number)
    }));

    // inputs should be cleared after submit (component clears them)
    expect(titleInput).toHaveValue('');
    expect(descInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
  });

  test('does not submit when title is empty', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();
    const { container } = render(<TodoInput addTodo={mockAdd} />);

    const descInput = screen.getByPlaceholderText('Description (optional)');
    const dateInput = container.querySelector('input[type="date"]');
    const submitBtn = screen.getByRole('button', { name: /add task/i });

    await user.type(descInput, 'desc only');

    // date fallback as above (not strictly needed here)
    try {
      await user.type(dateInput, '2026-12-02');
    } catch {
      fireEvent.change(dateInput, { target: { value: '2026-12-02' } });
    }

    await user.click(submitBtn);

    expect(mockAdd).not.toHaveBeenCalled();
  });

  //NEW TEST
  test('clears inputs after submitting a todo', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();
    const { container } = render(<TodoInput addTodo={mockAdd} />);

    const titleInput = screen.getByPlaceholderText('Task title');
    const descInput = screen.getByPlaceholderText('Description (optional)');
    const dateInput = container.querySelector('input[type="date"]');
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(titleInput, 'My Task');
    await user.type(descInput, 'My Description');
    fireEvent.change(dateInput, { target: { value: '2025-12-01' } });

    await user.click(button);

    expect(titleInput).toHaveValue('');
    expect(descInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
  });

  //NEW TEST
  test('disables the Add Task button if title is empty', () => {
    const mockAdd = vi.fn();
    render(<TodoInput addTodo={mockAdd} />);

    const button = screen.getByRole('button', { name: /add task/i });

    expect(button).toBeDisabled();
  });
});
