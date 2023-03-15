import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import { act, cleanup, fireEvent, render as jestRenderer } from '@testing-library/react';
import { Carousel } from "./Carousel";
import { CarPreview } from "../CarPreview/CarPreview";
import { CarListPreviewEmpty } from "../CarListPreview/CarListPreviewEmpty";
import { ICar } from "../../interfaces/Car.interface";
import { CarouselNavigationEnum } from "../../enums/CarouselNavigation.enum";
import { carouselDefaultOptionsMock } from "../../__mocks__/carousel-default-options.mock";
import { carsMock10Items, carsMock1Item, carsMock4Items, carsMockDefault } from "../../__mocks__/cars.mock";

afterEach(cleanup);

describe('Carousel',  () => {
  const setup = async (
    carsMock: ICar[],
    previousButtonLabel: string = '',
    nextButtonLabel: string = '',
    responsiveOptions = carouselDefaultOptionsMock,
  ) => {
    const items = carsMock?.map((car: ICar) => <CarPreview key={car.id} car={car}></CarPreview> );

    const wrapper = jestRenderer(
      <StyleProvider>
        <ThemePicker variant="light">
          <Carousel
            items={items}
            previousButtonLabel={previousButtonLabel}
            nextButtonLabel={nextButtonLabel}
            responsive={responsiveOptions}
            onceEmpty={<CarListPreviewEmpty />}
          />
        </ThemePicker>
      </StyleProvider>
    );

    const carousel = await wrapper.findByTestId('carousel-wrapper');
    const carouselList = await wrapper.findByTestId('carousel-list');

    return {
      wrapper,
      carousel,
      carouselList
    };
  };

  describe('Carousel list items', () => {
    it('Should should be empty if theme no any item', async () => {
      const wrapper = jestRenderer(
        <StyleProvider>
          <ThemePicker variant="light">
            <Carousel items={[]} previousButtonLabel={''} nextButtonLabel={''} />
          </ThemePicker>
        </StyleProvider>
      );

      expect(wrapper.queryByTestId('carousel-wrapper')).toBeNull();
      expect(wrapper.queryByTestId('carousel-list')).toBeNull();
    });

    it('Should render carousel list with 3 elements if there was 2 items', async () => {
      const { carouselList } = await setup(carsMockDefault);

      expect(carsMockDefault.length).toEqual(2);
      // Add cars mock length + View added extra spacing element for every new element starting from 1
      expect(carouselList.children.length).toEqual(3);
    });

    it('Should render carousel list with 1 elements if there was 1 item', async () => {
      const { carouselList } = await setup(carsMock1Item);

      // Expecting that there are no any extra spacing elements
      expect(carsMock1Item.length).toEqual(1);
      expect(carouselList.children.length).toEqual(1);
    });


    it('Should render carousel list with 5 elements if there was 4 items', async () => {
      const { carouselList } = await setup(carsMock4Items);

      expect(carsMock4Items.length).toEqual(4);
      // Add cars mock length + View added extra spacing element for every new element starting from 1
      expect(carouselList.children.length).toEqual(7);
    });
  })

  describe('Carousel navigation buttons', () => {
    it('Expected that navigation have arrows on large screen', async () => {
      Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 1500});

      const { wrapper } = await setup(carsMock1Item);

      const navigationButtonRight = await wrapper.findByTestId('carousel-navigation-next-button');
      const navigationButtonPrevious = await wrapper.findByTestId('carousel-navigation-previous-button');

      expect(navigationButtonRight).toBeDefined();
      expect(navigationButtonPrevious).toBeDefined();

      // Dots navigation should not be presented on large size
      try {
        await wrapper.findByTestId('carousel-navigation-dot-1');
      } catch (error) {
        expect(error).toBeDefined();
      }
    })

    it('Expected that navigation have dots on small screen', async () => {
      Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 479});

      const { wrapper } = await setup(carsMock1Item);

      const navigationButtonRight = await wrapper.findByTestId('carousel-navigation-dot-0');

      expect(navigationButtonRight).toBeDefined();

      // Arrows navigation should not be presented on small size
      try {
        await wrapper.findByTestId('carousel-navigation-next-button');
      } catch (error) {
        expect(error).toBeDefined();
      }
    })
  });

  describe('Carousel items navigation', () => {
    it('Expected that shift in carousel list on start is equal to 0', async () => {
      Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 1500});

      const { carouselList } = await setup(carsMock1Item);

      const containerStyle = window.getComputedStyle(carouselList);
      expect(containerStyle.transform).toEqual('translate3d(-0px, 0, 0)');
    });

    it('Expected that shift on next navigation is equal to item size + spacing size', async () => {
      Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 800});
      Object.defineProperty(window, 'innerHeight', {writable: true, configurable: true, value: 880});

      const { wrapper, carouselList } = await setup(carsMock10Items);

      const listItem = await wrapper.findByTestId('carousel-list-item-0');

      jest.spyOn(listItem, "getBoundingClientRect")
        .mockReturnValue({ width: 360, height: 425.59375, x: 10, y: 272,
          bottom: 697.59375, left: 10, right: 370, top: 272, toJSON: () => {} });

      jest.spyOn(carouselList, "getBoundingClientRect")
        .mockReturnValue({ width: 780, height: 425.59375, x: 10, y: 272,
          bottom: 697.59375, left: 10, right: 790, top: 272, toJSON: () => {} });

      // Selecting second dot navigation button
      const navigationButtonDot = await wrapper.findByTestId('carousel-navigation-dot-1');

      act(() => {
        fireEvent.click(navigationButtonDot);
      });

      const containerStyle = window.getComputedStyle(carouselList);

      // With additional spacing to second element
      expect(containerStyle.transform).toEqual(`translate3d(-376px, 0, 0)`);
    })

    it('Expected that user can swipe in list', async () => {
      Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 800});
      Object.defineProperty(window, 'innerHeight', {writable: true, configurable: true, value: 880});

      const { wrapper, carouselList } = await setup(carsMock10Items, '', '',
        {...carouselDefaultOptionsMock, untilXL: { spacing: 2, navigation: CarouselNavigationEnum.ARROWS }});

      const listItem = await wrapper.findByTestId('carousel-list-item-0');
      const listItem2 = await wrapper.findByTestId('carousel-list-item-1');

      jest.spyOn(listItem, "getBoundingClientRect")
        .mockReturnValue({ width: 360, height: 425.59375, x: 10, y: 272,
          bottom: 697.59375, left: 10, right: 370, top: 272, toJSON: () => {} });

      jest.spyOn(listItem2, "getBoundingClientRect")
        .mockReturnValue({ width: 360, height: 425.59375, x: 10, y: 272,
          bottom: 697.59375, left: 10, right: 370, top: 272, toJSON: () => {} });

      jest.spyOn(carouselList, "getBoundingClientRect")
        .mockReturnValue({ width: 780, height: 425.59375, x: 10, y: 272,
          bottom: 697.59375, left: 10, right: 790, top: 272, toJSON: () => {} });

      act(() => {
        fireEvent.touchStart(carouselList, { touches: [{ clientX: 100 }] });
      });

      act(() => {
        fireEvent.touchMove(carouselList, { touches: [{ clientX: 60 }] });
      })

      const containerStyle = window.getComputedStyle(carouselList);

      // With additional spacing to second element
      expect(containerStyle.transform).toEqual(`translate3d(-376px, 0, 0)`);
    })
  });
})
