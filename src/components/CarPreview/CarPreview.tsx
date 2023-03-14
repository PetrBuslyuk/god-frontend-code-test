import Image from 'next/image';
import { useState } from "react";
import { View, Link } from "vcc-ui";
import { CurrentTheme } from "vcc-ui/dist/types/shared";
import { ICar } from "../../interfaces/Car.interface";
import { ROUTING } from "../../constants/routing.constants";

interface IProps {
  car: ICar;
  theme: CurrentTheme;
}

/**
 * Single car preview
 *
 * @param car - car entity
 * @param theme - current theme
 */
export const CarPreview = ({ car, theme }: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const onHover = (hovered: boolean): void => {
    setIsHovered(hovered);
  }

  return (
    <View onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} extend={{
      onlyS: {
        width: '70vw'
      },
      onlyM: {
        width: '45vw',
      },
      fromL: {
        width: '16vw',
      },
    }}>
      <View>
        <Link href={`/${ROUTING.CAR.INDEX}/${car.id}`}>
          <span style={{
            color: isHovered ? theme.color.foreground.action : theme.color.foreground.secondary,
            marginBottom: 2,
            fontWeight: 700,
          }}>{car.bodyType.toUpperCase()}</span>
          <View
            spacing={1}
            marginBottom={2}
            extend={{
              justifyContent: 'flex-start',
              alignItems: 'baseline',
              untilM: {
                flexDirection: 'column'
              },
              fromM: {
                flexDirection: 'row'
              }
            }}
          >
            <h3 style={{
              fontWeight: 700,
              fontSize: '0.8rem',
              color: isHovered ? theme.color.foreground.action : theme.color.foreground.primary,
            }}>{ car.modelName }</h3>
            <span
              style={{
                color: isHovered ? theme.color.foreground.action :theme.color.foreground.secondary,
                fontSize: '0.5rem'
              }}>
              { car.modelType }
            </span>
          </View>

          <picture>
            <Image
              src={car.imageUrl}
              alt={`Volvo ${car.modelName} ${car.bodyType} ${car.modelType} car`}
              width={'400'}
              height={'300'}
              layout="responsive"
              objectFit="cover"
            />
          </picture>
        </Link>
      </View>

      <View justifyContent={'center'} direction={'row'} spacing={2}>
        <Link href={`/${ROUTING.CAR.INDEX}/${car.id}`} arrow={'right'}>{'LEARN'}</Link>
        <Link href={`/${ROUTING.SHOPPING_CART}/${car.id}`} arrow={'right'}>{'SHOP'}</Link>
      </View>
    </View>
  );
}
