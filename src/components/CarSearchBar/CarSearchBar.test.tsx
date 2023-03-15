import { StyleProvider, ThemePicker } from "vcc-ui";
import { cleanup, render as jestRenderer, fireEvent, act } from '@testing-library/react';

import { CarSearchBar } from "./CarSearchBar";

afterEach(cleanup);

jest.useFakeTimers();

describe('CarSearchBar', () => {
  it('Should emit search input value after debounced 500 ms', async () => {
    const searchCarFn = jest.fn();

    const wrapper = jestRenderer(
      <StyleProvider>
        <ThemePicker variant="light">
          <CarSearchBar searchCars={searchCarFn} />
        </ThemePicker>
      </StyleProvider>
    );

    const searchBarInput = await wrapper.findByTestId('search-bar-input');

    act(() => {
      fireEvent.change(searchBarInput, { target: { value: 'new value' } });

      expect(searchCarFn).toBeCalledTimes(1);
      expect(searchCarFn).toHaveBeenCalledWith('');

      jest.runAllTimers();

      expect(searchCarFn).toBeCalledTimes(2);
      expect(searchCarFn.mock.calls[1][0]).toEqual('new value');
    })
  })
})
