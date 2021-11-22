import AppLogic from "./components/appLogic";
import { Provider } from "react-redux";
import {store} from "./redux/store"
import "./styles/themes/default/theme.scss";

function App() {
  return( 
  <div className='app__wrapper'>
    <Provider store={store}>
  <AppLogic/>
  </Provider>
  </div>)
}

export default App;
