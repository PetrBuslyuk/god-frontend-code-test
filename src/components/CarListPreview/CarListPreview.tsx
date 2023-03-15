import React from "react";
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
 */
export const CarListPreview = ({ cars }: IProps) => {
  const carouselItems = cars?.map((car: ICar) => <CarPreview key={car.id} car={car}></CarPreview> );

  return <Carousel
    items={carouselItems}
    nextButtonLabel={'Next cars'}
    previousButtonLabel={'Previous cars'}
    onceEmpty={<CarListPreviewEmpty />}
  />;
}
