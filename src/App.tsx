import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import UsersList from "./pages/UsersList";
const UsersList = lazy(() => import("./pages/UsersList"));
import AddEdit from "./pages/AddEditUser";
import Layout from "./layout/Layout";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { lazy, Suspense, useRef } from "react";
function App() {
  const toast = useRef<Toast | null>(null);

  return (
    <BrowserRouter>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Routes>
        <Route element={<Layout />}>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/" element={<UsersList toast={toast} />} />
          </Suspense>
          <Route path="/add" element={<AddEdit toast={toast} />} />
          <Route path="/edit/:id" element={<AddEdit toast={toast} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
