import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { ContentStudio } from "@/pages/ContentStudio";
import { Games } from "@/pages/Games";
import { Wallet } from "@/pages/Wallet";
import { Settings } from "@/pages/Settings";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="studio" element={<ContentStudio />} />
            <Route path="games" element={<Games />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
