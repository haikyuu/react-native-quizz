import * as React from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { RootState } from "../store";

const mapState = (state: RootState) => ({
  isMusicOn: state.settings.isMusicOn,
});

interface toggleFunc {
  (): void;
}
type Props = ReturnType<typeof mapState> & { toggleMusic: toggleFunc } & {
  tintColor?: string;
};
// We connect using connect because hooks are not supported in navigation
// options.
// And
const HeaderRight = ({ isMusicOn, toggleMusic, tintColor }: Props) => {
  return (
    <TouchableOpacity onPress={() => toggleMusic()}>
      <Entypo
        name={isMusicOn ? "sound" : "sound-mute"}
        size={30}
        color={tintColor}
      />
    </TouchableOpacity>
  );
};

export default connect(mapState)(HeaderRight);
