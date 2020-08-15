/* eslint-disable @typescript-eslint/no-var-requires */
import { createModel } from "@rematch/core";
import { Dispatch, RootState } from "..";
import { Audio } from "expo-av";
const soundTrack = require("../../assets/sounds/music.mp3");
const clickSound = require("../../assets/sounds/click.wav");

const clickSoundObject = new Audio.Sound();
const soundObject = new Audio.Sound();
const initialState: SettingsState = {
  isMusicOn: true,
};
export const settings = createModel<SettingsState>()({
  state: initialState, // initial state
  reducers: {
    reset() {
      return initialState;
    },
    setMusicState(state, isMusicOn: boolean) {
      return { ...state, isMusicOn };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async playMusic() {
      const {
        settings: { setMusicState },
      } = dispatch as Dispatch;

      const { isLoaded } = await soundObject.getStatusAsync();
      if (!isLoaded) {
        await soundObject.loadAsync(soundTrack);
        await soundObject.playAsync();
        await soundObject.setIsLoopingAsync(true);
      } else {
        await soundObject.playAsync();
      }
      setMusicState(true);
      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      // await soundObject.unloadAsync();
    },
    async toggleMusic(_, rootState) {
      const {
        settings: { stopMusic, playMusic, setMusicState },
      } = dispatch as Dispatch;
      const {
        settings: { isMusicOn },
      } = rootState as RootState;

      if (isMusicOn) {
        setMusicState(false);
        await stopMusic();
      } else {
        setMusicState(true);
        await playMusic();
      }
    },
    async stopMusic() {
      const {
        settings: { setMusicState },
      } = dispatch as Dispatch;

      await soundObject.pauseAsync();
      setMusicState(false);
    },
    async playClickSound(_, rootState) {
      const {
        settings: { isMusicOn },
      } = rootState as RootState;
      if (!isMusicOn) {
        return;
      }
      const { isLoaded } = await clickSoundObject.getStatusAsync();
      if (!isLoaded) {
        await clickSoundObject.loadAsync(clickSound);
      }
      await clickSoundObject.setPositionAsync(0);
      await clickSoundObject.playAsync();
    },
  }),
});
