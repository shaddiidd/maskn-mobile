import Provider from "./Provider";
import AppContainer from "./AppContainer";

export default function App() {
  return (
    <Provider>
      <AppContainer />
    </Provider>
  );
}