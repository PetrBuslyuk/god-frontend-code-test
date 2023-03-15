import { Block } from "vcc-ui";
import { CurrentTheme } from "vcc-ui/dist/types/shared";

interface IProps {
  isActive: boolean;
  onClick: (index: number) => void;
  theme: CurrentTheme;
  index: number;
}

/**
 * One of navigation shape. Commonly used as navigation button in small screens
 *
 * @param isActive - highlight dot when item is active
 * @param onClick - callback when bot item was clicked
 * @param index - current index of dot element
 * @param theme - current theme
 */
export const CarouselDot = ({ isActive, onClick, index, theme }: IProps) => {
  return <Block
    extend={{
      borderRadius: '100%',
      transition: '1s background-color ease-out',
      backgroundColor: isActive ? theme.color.foreground.primary : theme.color.ornament.border,
      width: '10px',
      height: '10px',
      cursor: 'pointer'
    }}
    onClick={() => onClick(index)}
  >
  </Block>;
}
