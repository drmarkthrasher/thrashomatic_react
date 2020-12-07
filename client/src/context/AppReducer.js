export default (state, action) => {
  switch (action.type) {
    case 'SET_AUTHENTICATION':
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case 'SET_COCKTAILS':
      return {
        ...state,
        cocktails: action.payload,
      };
    case 'DELETE_COCKTAIL':
      return {
        ...state,
        cocktails: state.cocktails.filter(
          (cocktail) => cocktail.id !== action.payload
        ),
      };
    case 'ADD_COCKTAIL':
      return { ...state, cocktails: [action.payload, ...state.cocktails] };
    case 'EDIT_COCKTAIL':
      return {
        ...state,
        cocktails: state.cocktails.map((cocktail) => {
          if (cocktail.id !== action.payload.id) {
            return cocktail;
          }
          return {
            ...cocktail,
            name: action.payload.name,
            liquors: action.payload.liquors,
            otherIngredients: action.payload.otherIngredients,
          };
        }),
      };
    case 'SET_BLUETOOTH_DEVICE':
      return {
        ...state,
        device: action.payload,
      };
    case 'SET_BLUETOOTH_SERVER':
      return {
        ...state,
        server: action.payload,
      };
    case 'SET_BLUETOOTH_SERVICE':
      return {
        ...state,
        service: action.payload,
      };
    default:
      return state;
  }
};
