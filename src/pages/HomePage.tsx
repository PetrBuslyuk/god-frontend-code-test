import React from "react";
import { View } from "vcc-ui";
import { useCars } from "../hooks/useCars.hook";
import { Header } from "../components/Header/Header";
import { Preloader } from "../components/Preloader/Preloader";
import { CarSearchBar } from "../components/CarSearchBar/CarSearchBar";
import { Main } from "../components/Main/Main";
import { CarListPreview } from "../components/CarListPreview/CarListPreview";

export const HomePage = () => {
  const { isLoading, cars, searchCars } = useCars();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <View>
      <Header></Header>
      <Main>
        <CarSearchBar searchCars={searchCars} />
        <CarListPreview cars={cars} />
      </Main>
    </View>
  );
}
