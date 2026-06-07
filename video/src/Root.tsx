import "./index.css";
import { Composition } from "remotion";
import { ParikcartSplash } from "./compositions/ParikcartSplash";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ParikcartSplash"
        component={ParikcartSplash}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
