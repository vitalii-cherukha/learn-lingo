import { FilterValues } from "../../../types";
import LangSelect from "../LangSelect/LangSelect";
import LevelSelect from "../LevelSelect/LevelSelect";
import PriceSelect from "../PriceSelect/PriceSelect";
import css from "./FilterBar.module.css";
import { useState } from "react";

interface FilterBarProps {
  onFilterChange: (filters: FilterValues) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    language: "French",
    level: "A1 Beginner",
    price: "30",
  });

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={css.wrapper}>
      <LangSelect
        label="Languages"
        options={["French", "English", "German", "Ukrainian", "Polish"]}
        value={filters.language}
        onChange={(value) => handleFilterChange("language", value)}
      />

      <LevelSelect
        label="Level of knowledge"
        options={[
          "A1 Beginner",
          "A2 Elementary",
          "B1 Intermediate",
          "B2 Upper-Intermediate",
        ]}
        value={filters.level}
        onChange={(value) => handleFilterChange("level", value)}
      />

      <PriceSelect
        label="Price"
        options={["10", "20", "30", "40"]}
        value={filters.price}
        onChange={(value) => handleFilterChange("price", value)}
      />
    </div>
  );
};

export default FilterBar;
