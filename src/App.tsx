import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import UsersList from "./pages/UsersList";
const UsersList = lazy(() => import("./pages/UsersList"));
import AddEdit from "./pages/AddEditUser";
import Layout from "./layout/Layout";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { lazy, Suspense, useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

function App() {
  const toast = useRef<Toast | null>(null);

  return (
    <BrowserRouter>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      height: "100vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "1rem",
                      background: "#f8fafc",
                    }}
                  >
                    <ProgressSpinner
                      style={{ width: "60px", height: "60px" }}
                      strokeWidth="4"
                      animationDuration=".8s"
                    />

                    <h3
                      style={{
                        color: "#334155",
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      Loading...
                    </h3>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<UsersList toast={toast} />} />
                </Routes>
              </Suspense>
            }
          />
          <Route path="/add" element={<AddEdit toast={toast} />} />
          <Route path="/edit/:id" element={<AddEdit toast={toast} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
