"use client";

import AppContainer from "@/components/AppContainer";
import DoneScreen from "@/components/DoneScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import History from "@/components/History";
import StartScreen from "@/components/StartScreen";
import UpdateButton from "@/components/UpdateButton";
import "./index.css";

export default function Home() {
  return (
    <AppContainer>
      <UpdateButton />
      <History />
      <StartScreen />
      <GeneratingScreen />
      <DoneScreen />
    </AppContainer>
  );
}
