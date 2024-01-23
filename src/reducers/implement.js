// reducer > implement.js
const initialState = {
    items: [],
  };
  
  export const listItem = (state = initialState, action) => {
    switch (action.type) {
      case "add":
        return { items: [...state.items, action.payload] };
      case "remove":
        let newlist = state.items.filter((value) => {
          return action.payload.name !== value.name;
        });
        return { items: [...newlist] };
      default:
        return state;
    }
  };
  