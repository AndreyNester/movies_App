export const validateOverview = (text) => {
  const validate = text
    .split("")
    .reduce(
      (acc, el, index, arr) => {
        if (index > 175 && el === " ") {
          acc.spacedAfterMax = true;
        }
        if (index === arr.length - 1 && acc.spacedAfterMax) {
          return {
            ...acc,
            data: [...acc.data, "..."],
          };
        }
        if (acc.spacedAfterMax) {
          return acc;
        }

        return {
          ...acc,
          data: [...acc.data, el],
        };
      },
      { data: [], spacedAfterMax: false }
    )
    .data.join("");
  return validate;
};
