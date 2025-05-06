import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Login } from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const chatId = "6819e7f0b9e3119362912d9c";
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Захищені маршрути */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/" element={<Chat chatId={chatId} />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
