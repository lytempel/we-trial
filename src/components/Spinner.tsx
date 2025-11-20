import type { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
};

interface SpinnerProps {
  loading: boolean;
}

const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <BeatLoader
      color="#e1261c"
      loading={loading}
      cssOverride={override}
      size={16}
    />
  );
};

export default Spinner;
