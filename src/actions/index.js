export const addItem = (item) => {
  return {
    type: "add",
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: "remove",
    payload: item,
  };
};
