import React from "react";
import {useTheme} from "vcc-ui";
import { ICar } from "../../interfaces/Car.interface";
import { CarPreview } from "../CarPreview/CarPreview";
import { CarListPreviewEmpty } from "./CarListPreviewEmpty";
import { Carousel } from "../Carousel/Carousel";

interface IProps {
    cars: ICar[];
}

/**
 * Cars list preview
 *
 * @param cars - cars to display
 * @param theme - current theme
 */
export const CarListPreview = ({ cars }: IProps) => {
  const theme = useTheme();

  if (!cars.length) {
    return <CarListPreviewEmpty />
  }

  const carouselItems = cars?.map((car: ICar) => <CarPreview key={car.id} car={car} theme={theme}></CarPreview> );

  return <Carousel items={carouselItems} nextButtonLabel={'Next cars'} previousButtonLabel={'Previous cars'}></Carousel>;
}
