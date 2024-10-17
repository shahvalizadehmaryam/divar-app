import { Toaster } from "react-hot-toast";
import { BrowserRouter} from "react-router-dom";
import Router from "router/Router";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toaster position="top-left" />
    </div>
  );
}

export default App;
