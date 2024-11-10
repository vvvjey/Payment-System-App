import * as React from "react";
import Svg, { Path } from "react-native-svg";
const QRIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    {...props}
    width={props.width ? props.width : 40}
    height={props.height ? props.height : 40}
    fill={props.fill ? props.fill : '#ffffff'}
  >
    <Path d="M0 80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80zm64 16v64h64V96H64zM0 336c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48v-96zm64 16v64h64v-64H64zM304 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm80 64h-64v64h64V96zM256 304c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s7.2-16 16-16 16 7.2 16 16v96c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16s-7.2-16-16-16-16 7.2-16 16v64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V304zm112 176a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" />
  </Svg>
);
export default QRIcon;
