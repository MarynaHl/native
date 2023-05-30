import "react-native-gesture-handler";
import { Provider } from "react-redux";

import { UserProvider } from "./userContext";
import { store } from "./redux/store";

import MainComponent from "./src/components/MainComponent";

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <MainComponent />
      </UserProvider>
    </Provider>
  );
};

export default App;
