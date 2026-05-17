import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UsersList from "./pages/UsersList";
import AddEdit from "./pages/AddEditUser";
import Layout from "./layout/Layout";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";
function App() {
  const toast = useRef(null);

  return (
    <BrowserRouter>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<UsersList toast={toast}/>} />
          <Route path="/add" element={<AddEdit toast={toast}/>} />
          <Route path="/edit/:id" element={<AddEdit toast={toast}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
