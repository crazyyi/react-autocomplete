import { render, screen, within } from '@testing-library/react';
import { AutocompleteProps } from './Autocomplete.types';
import { Autocomplete } from './Autocomplete'; // Replace with actual path
import userEvent from "@testing-library/user-event";

jest.mock('./Autocomplete.types'); // Mock AutocompleteProps for now

describe('Autocomplete component', () => {
  const mockList = ['black', 'white', 'red', 'yellow'];
  const mockRenderItem = jest.fn().mockImplementation(() => (value: string) => <div>{value}</div>);
  let mockAutocompleteProps: AutocompleteProps;

  beforeEach(() => {
    mockAutocompleteProps = {
      label: "",
      list: mockList,
      renderItem: mockRenderItem,
    };
  })

  it('should match snapshot', () => {
    mockAutocompleteProps.label = "hello"
    const { container } = render(<Autocomplete {...mockAutocompleteProps} />);
    expect(container).toMatchSnapshot()
  })

  it('renders the input element', async () => {
    mockAutocompleteProps.label = "hello"
    render(<Autocomplete {...mockAutocompleteProps} />);
    expect(await screen.findByTestId('input')).toBeTruthy()
  });

  it('toggles the dropdown list on click', async () => {
    mockAutocompleteProps.label = "world"
    render(<Autocomplete {...mockAutocompleteProps} />);
    const wrapper = await screen.findByTestId('wrapper');
    await userEvent.click(wrapper)

    expect(await screen.findByTestId('listbox')).toBeTruthy();
  });

  it('hides the dropdown list when clicked outside', async () => {
    mockAutocompleteProps.label = "hello"
    render(<Autocomplete {...mockAutocompleteProps} />);
    const wrapper = await screen.findByTestId('wrapper');
    await userEvent.click(wrapper)

    expect(await screen.findByTestId('listbox')).toBeTruthy();

    await userEvent.click(document.body)

    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('renders list items using renderItem prop', async () => {
    mockAutocompleteProps.label = "test"
    render(<Autocomplete {...mockAutocompleteProps} />);
    const wrapper = await screen.findByTestId('wrapper');
    await userEvent.click(wrapper)
    const listbox = await screen.findByRole('list', {
      name: /datalist/i,
    })

    expect(listbox).toBeTruthy();

    const items = await within(listbox).findAllByRole("listitem")
    expect(items.length).toBe(4)

    const itemNames = items.map(item => item.textContent)
    expect(itemNames).toMatchSnapshot(`
      Array [
        'black', 'white', 'red', 'yellow'
      ]
    `)
  });
});
