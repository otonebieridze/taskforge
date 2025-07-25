import type { StylesConfig, GroupBase } from "react-select";

export type OptionType = {
  label: string;
  value: string;
};

export const getCustomSelectStyles = (
  isDark: boolean
): StylesConfig<OptionType, true, GroupBase<OptionType>> => ({
  control: (base) => ({
    ...base,
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    borderColor: isDark ? "#374151" : "#d1d5db",
    color: isDark ? "#f9fafb" : "#111827",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    color: isDark ? "#f9fafb" : "#111827",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? isDark
        ? "#374151"
        : "#e5e7eb"
      : isDark
      ? "#1f2937"
      : "#ffffff",
    color: isDark ? "#f9fafb" : "#111827",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: isDark ? "#374151" : "#e5e7eb",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: isDark ? "#f9fafb" : "#111827",
  }),
});
