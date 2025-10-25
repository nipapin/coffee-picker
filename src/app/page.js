import AppContainer from "@/components/AppContainer";
import DoneScreen from "@/components/DoneScreen";
import GeneratingScreen from "@/components/GeneratingScreen";
import History from "@/components/History";
import StartScreen from "@/components/StartScreen";
import "./index.css";

export default function Home() {
  return (
    <AppContainer>
      <History />
      <StartScreen />
      <GeneratingScreen />
      <DoneScreen />
    </AppContainer>
  );
}
