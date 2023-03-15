import { useTheme, View } from "vcc-ui";
import React, { Children, TouchEvent, useEffect, useRef, useState } from "react";
import { THEME } from "../../constants/theme.constants";
import { CarouselNavigation } from "./CarouselNavigation";
import { useWindowResize } from "../../hooks/useWindowResize.hook";
import { TCarouselResponsiveOptions } from "../../types/CarouselResponsiveOptions.type";
import { DEFAULT_CAROUSEL_RESPONSIVE_OPTIONS } from "../../constants/defaultCarouselItemBreakpoints.constants";

interface IProps {
  items: JSX.Element[];
  previousButtonLabel: string;
  nextButtonLabel: string;
  responsive?: TCarouselResponsiveOptions,
  onceEmpty?: JSX.Element,
}

const DIRECTION_DIFFERENCE_PX = 10;

/**
 * Carousel component
 *
 * @param items - items to slide
 * @param responsive - responsive options
 * @param previousButtonLabel - previous label for screen readers
 * @param nextButtonLabel - next button label for screen readers
 * @param onceEmpty - component, which should be displayed, once list is empty
 */
export const Carousel = ({ items = [],
  responsive = DEFAULT_CAROUSEL_RESPONSIVE_OPTIONS,
  previousButtonLabel,
  nextButtonLabel,
  onceEmpty = <></>
}: IProps) => {
  const theme = useTheme();
  const windowSize = useWindowResize();
  const [slideItem, setSlideItem] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [transforms, setTransforms] = useState<{ transform?: string }>({});
  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] = useState<boolean>(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const changeSlide = (slideNumber: number) => {
    if (!items.length) {
      return;
    }

    // Reset navigation buttons state
    setIsNextButtonDisabled(false);
    setIsPreviousButtonDisabled(false);

    const carouselRect = carouselRef?.current?.getBoundingClientRect();

    // As we know, that at least one element should be present, and it's width are equal
    // to all items in carousel list, we can retrieve it calculated width
    const child = carouselRef?.current?.children[0]?.getBoundingClientRect();

    // Spacing size from theme is 8 pxs.
    // It multiplies with provided in props spacing between items in carousel
    const spacingPx = THEME.spacingPx * responsive[windowSize?.themeBreakpoint]!.spacing;

    // How many spacings between already slided elements
    const spacingsTotal = spacingPx * slideNumber;

    const totalShift = (slideNumber * child!.width) + spacingsTotal;
    const totalMaxShift = ((items.length * child!.width) + (spacingPx * items.length - 1)) - carouselRect!.width;

    // If offset more than total offset - let's better set total maximum offset
    const transShift = totalShift >= totalMaxShift ? totalMaxShift : totalShift;

    // Disable navigation buttons once shift is out of carousel box dimension
    if (transShift <= 0) {
      setIsPreviousButtonDisabled(true);
    }

    if (transShift === totalMaxShift) {
      setIsNextButtonDisabled(true);
    }

    // Set offset in carousel list
    const trans = {
      transform: `translate3d(-${transShift}px, 0, 0)`,
    };

    setTransforms(trans);
    setSlideItem(slideNumber);
  };

  // Update offset of items, once carousel has been resized
  useEffect(() => {
    changeSlide(slideItem);
  }, [windowSize]);

  // Reset carousel, when items have been changed
  useEffect(() => {
    changeSlide(0);
  }, [items]);

  const isRightDirection = (event: TouchEvent) => {
    const currentPosition = event.touches[0].clientX;
    const direction = touchPosition! - currentPosition;

    return direction > DIRECTION_DIFFERENCE_PX;
  }

  const isLeftDirection = (event: TouchEvent) => {
    const currentPosition = event.touches[0].clientX;
    const direction = touchPosition! - currentPosition;

    return direction < -DIRECTION_DIFFERENCE_PX;
  }

  const handleTouchStart = (event: TouchEvent) => {
    const touchDown = event.touches[0].clientX;
    setTouchPosition(touchDown);
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (touchPosition === null) {
      return;
    }

    // If swipes to the right and next item is not out of the range
    // Then set next item as active
    if (isRightDirection(event) && slideItem + 1 < items.length ) {
      changeSlide(slideItem + 1);
    }

    // Otherwise if user swipes to the left, and we have previous item
    // Then set previous items as active
    if (isLeftDirection(event) && slideItem - 1 >= 0) {
      changeSlide(slideItem - 1);
    }

    // Clear touch position
    setTouchPosition(null);
  }

  const onFocus = (index: number) => {
    changeSlide(index);
  }

  if (!items.length) {
    return onceEmpty;
  }

  return (
    <View data-testid={'carousel-wrapper'}>
      <View
        data-testid={'carousel-list'}
        ref={carouselRef}
        spacing={responsive[windowSize!.themeBreakpoint]!.spacing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        marginBottom={5}
        direction={"row"}
        width={'100%'}
        maxWidth={'100%'}
        extend={{ ...transforms, transition: '1s transform ease-out' }}
      >
        { Children.map(items, (item, index) => (
          <div data-testid={`carousel-list-item-${index}`} onFocus={() => onFocus(index)}>
            {item}
          </div>
        ))}
      </View>
      <CarouselNavigation
        navigation={responsive[windowSize!.themeBreakpoint]!.navigation}
        activeItem={slideItem}
        changeSlide={changeSlide}
        theme={theme}
        itemsAmount={items.length}
        isNextButtonDisabled={isNextButtonDisabled}
        isPreviousButtonDisabled={isPreviousButtonDisabled}
        previousButtonLabel={previousButtonLabel}
        nextButtonLabel={nextButtonLabel}
      />
    </View>
  );
}
