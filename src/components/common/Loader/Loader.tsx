import { BounceLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.backdrop}>
      <BounceLoader color="#121417" size={150} />
    </div>
  );
};

export default Loader;
