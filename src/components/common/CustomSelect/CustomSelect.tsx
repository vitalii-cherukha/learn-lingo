import { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";

interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Закриваємо по кліку поза компонентом
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <p className={css.label}>{label}</p>

      <div
        className={`${css.select} ${open ? css.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{value}</span>

        <svg className={css.icon} width="20" height="20">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </div>

      {open && (
        <ul className={css.dropdown}>
          {options.map((opt) => (
            <li
              key={opt}
              className={`${css.item} ${value === opt ? css.active : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
