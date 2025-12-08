import CustomSelect from "../CustomSelect/CustomSelect";
import css from "./FilterBar.module.css";
import { useState } from "react";

const FilterBar = () => {
  const [language, setLanguage] = useState("French");
  const [level, setLevel] = useState("A1 Beginner");
  const [price, setPrice] = useState("30");

  return (
    <div className={css.wrapper}>
      <CustomSelect
        label="Languages"
        options={["French", "English", "German", "Ukrainian", "Polish"]}
        value={language}
        onChange={setLanguage}
      />

      <CustomSelect
        label="Level of knowledge"
        options={[
          "A1 Beginner",
          "A2 Elementary",
          "B1 Intermediate",
          "B2 Upper-Intermediate",
        ]}
        value={level}
        onChange={setLevel}
      />

      <CustomSelect
        label="Price"
        options={["10", "20", "30", "40"]}
        value={price}
        onChange={setPrice}
      />
    </div>
  );
};

export default FilterBar;
