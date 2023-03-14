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

export const CarouselNavigation = ({
  navigation, itemsAmount, isPreviousButtonDisabled,
  isNextButtonDisabled, theme, activeItem, changeSlide, previousButtonLabel = '', nextButtonLabel = ''
}: IProps) => {

  if (navigation === CarouselNavigationEnum.DOTS) {
    return (
      <View direction={'row'} spacing={3} justifyContent={'center'}>
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
    <View direction={'row'} spacing={3} justifyContent={'end'} marginRight={5}>
      <IconButton
        disabled={activeItem === 0 || isPreviousButtonDisabled}
        aria-label={previousButtonLabel}
        iconName="navigation-chevronback"
        variant="outline"
        onClick={() => changeSlide(activeItem - 1)}
      />
      <IconButton
        disabled={activeItem === itemsAmount - 1 || isNextButtonDisabled}
        aria-label={nextButtonLabel}
        iconName="navigation-chevronforward"
        variant="outline"
        onClick={() => changeSlide(activeItem + 1)}
      />
    </View>
  )
}
