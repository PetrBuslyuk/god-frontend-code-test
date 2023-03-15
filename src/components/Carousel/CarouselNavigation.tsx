import React from "react";
import { IconButton, View } from "vcc-ui";
import { CurrentTheme } from "vcc-ui/dist/types/shared";
import { CarouselDot } from "./CarouselDot";
import { CarouselNavigationEnum } from "../../enums/CarouselNavigation.enum";

interface IProps {
    itemsAmount: number;
    isPreviousButtonDisabled: boolean;
    isNextButtonDisabled: boolean;
    theme: CurrentTheme;
    activeItem: number;
    navigation: CarouselNavigationEnum;
    changeSlide: (index: number) => void;
    previousButtonLabel?: string;
    nextButtonLabel?: string;
}

/**
 * Navigation elements in carousel such as dots and arrows.
 * Can be customized in this component
 *
 * @param navigation { ARROWS | DOTS } - what type of navigation to use
 * @param itemsAmount {number} - to generate dots list we need to know total amount of list items
 * @param isPreviousButtonDisabled {boolean} - verifies if parent component disabled previous button
 * @param isNextButtonDisabled {boolean} - verifies if parent component disabled next button
 * @param theme {CurrentTheme} - current theme
 * @param activeItem {number} - index of active item in carousel list
 * @param changeSlide {callback} - callback of when navigation element has been clicked
 * @param previousButtonLabel {string} - aria label for previous button
 * @param nextButtonLabel {string} - aria label for next button
 */
export const CarouselNavigation = ({
  navigation, itemsAmount, isPreviousButtonDisabled,
  isNextButtonDisabled, theme, activeItem, changeSlide, previousButtonLabel = '', nextButtonLabel = ''
}: IProps) => {

  if (navigation === CarouselNavigationEnum.DOTS) {
    return (
      <View data-testid={'carousel-navigation-wrapper'} direction={'row'} spacing={3} justifyContent={'center'}>
        {Array.from({ length: itemsAmount }).map((_, index) => (
          <CarouselDot
            key={index}
            index={index}
            theme={theme}
            isActive={index === activeItem}
            onClick={() => changeSlide(index)}
          />))}
      </View>
    )
  }

  return (
    <View data-testid={'carousel-navigation-wrapper'} direction={'row'} spacing={3} justifyContent={'end'} marginRight={5}>
      <IconButton
        data-testid={'carousel-navigation-previous-button'}
        disabled={activeItem === 0 || isPreviousButtonDisabled}
        aria-label={previousButtonLabel}
        iconName="navigation-chevronback"
        variant="outline"
        onClick={() => changeSlide(activeItem - 1)}
      />
      <IconButton
        data-testid={'carousel-navigation-next-button'}
        disabled={activeItem === itemsAmount - 1 || isNextButtonDisabled}
        aria-label={nextButtonLabel}
        iconName="navigation-chevronforward"
        variant="outline"
        onClick={() => changeSlide(activeItem + 1)}
      />
    </View>
  )
}
