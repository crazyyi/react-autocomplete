import { renderHook, fireEvent } from '@testing-library/react';
import { useOutsideClick } from './hooks'; // Replace with actual path
import userEvent from '@testing-library/user-event';

describe('useOutsideClick hook', () => {
  let ref: React.RefObject<HTMLElement>;

  beforeEach(() => {
    ref = { current: document.createElement('div') }; // Create a mock ref
  });

  it('click outside of element will not show dropdown list', async () => {
    const { result } = renderHook(() => useOutsideClick(ref));

    await userEvent.click(document.body)

    expect(result.current.show).toBe(false)
  });

  it('click on element will show dropdown list', async () => {
    const { result } = renderHook(() => useOutsideClick(ref));
    ref?.current?.addEventListener('click', result.current.clickHandler)
    fireEvent.click(ref?.current!)

    expect(result.current.show).toBe(true)
  });

  it('useOutsideClick cleans up event listener on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useOutsideClick(null));

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1); // Listener added

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1); // Listener removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.anything()); // Verify click event and callback
  });
});
