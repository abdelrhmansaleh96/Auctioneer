const main_reducer = (state, action) => {
  if(action.type === "END_AUCTION") {
    return {
      ...state,
      count: state.count + 1,
    };
  }
  return {
    ...state,
  };
};

export default main_reducer;
