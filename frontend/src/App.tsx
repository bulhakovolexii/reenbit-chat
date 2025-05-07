import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./utils/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatLayout from "./layouts/ChatLayout";
import ChatPage from "./pages/ChatPage";

// import { useLoginMutation } from "./redux";

function App() {
  // const [login] = useLoginMutation();

  // login({ email: "test@test.com", password: "123456" });
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ChatLayout />}>
          <Route index element={<div>Select a chat to start messaging</div>} />
          <Route path=":chatId" element={<ChatPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
