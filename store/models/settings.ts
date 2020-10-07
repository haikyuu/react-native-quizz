/* eslint-disable @typescript-eslint/no-var-requires */
import { createModel } from "@rematch/core";
import { Audio } from "expo-av";
import { RootModel } from ".";
const soundTrack = require("../../assets/sounds/music.mp3");
const clickSound = require("../../assets/sounds/click.wav");

const clickSoundObject = new Audio.Sound();
const soundObject = new Audio.Sound();
const initialState: SettingsState = {
  isMusicOn: true,
};

export const settings = createModel<RootModel>()({
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
      } = dispatch;

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
    async toggleMusic(_, state) {
      const {
        settings: { stopMusic, playMusic, setMusicState },
      } = dispatch;
      const {
        settings: { isMusicOn },
      } = state;

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
      } = dispatch;

      await soundObject.pauseAsync();
      setMusicState(false);
    },
    async playClickSound(_, state) {
      const {
        settings: { isMusicOn },
      } = state;
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
