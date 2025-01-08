import Provider from "./src/context/Provider";
import AppContainer from "./src/AppContainer";

export default function App() {
  return (
    <Provider>
      <AppContainer />
    </Provider>
  );
}