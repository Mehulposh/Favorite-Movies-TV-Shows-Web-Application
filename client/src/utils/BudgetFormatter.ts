export const BudgetFormatter = (budget?: number, budgetLabel?: string): string => {
  if (budget == null && !budgetLabel) return "-";

  const unit = budgetLabel?.toLowerCase() || "";
  const validUnits = ["thousand", "million", "billion"];
  
  // Capitalize unit for display
  const displayUnit = validUnits.includes(unit)
    ? unit.charAt(0).toUpperCase() + unit.slice(1)
    : budgetLabel || "";

  if (budget != null && budgetLabel) {
    return `${budget} ${displayUnit}`;
  }
  if (budget != null) {
    return `${budget} Million`; // assume default unit
  }
  return `? ${displayUnit}`;
};


