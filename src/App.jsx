import styles from "./App.module.css";
import Header from "./components/Layout/Header";
import TransformersContainer from "./components/Transformers/TransformersContainer";
import UnitsProvider from "./store/UnitsProvider";

function App() {
  return (
    <UnitsProvider>
      <Header />
      <TransformersContainer />
    </UnitsProvider>
  );
}

export default App;
