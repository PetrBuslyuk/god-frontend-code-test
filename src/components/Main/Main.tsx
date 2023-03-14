import { View } from "vcc-ui";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * Main container
 *
 * @param props - children components
 */
export const Main = (props: IProps) => {
  return <View
    extend={{
      padding: 0,
      overflowX: 'hidden',
      untilL: {
        width: '100vw',
        paddingLeft: 10,
        paddingRight: 10
      },
      fromL: {
        width: '70vw',
        margin: '0 auto'
      }
    }}>
    {props.children}
  </View>
}
