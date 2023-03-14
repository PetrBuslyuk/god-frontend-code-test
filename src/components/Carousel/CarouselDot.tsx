import { Block } from "vcc-ui";
import { CurrentTheme } from "vcc-ui/dist/types/shared";

interface IProps {
  isActive: boolean;
  onClick: (index: number) => void;
  theme: CurrentTheme;
  index: number;
}

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
