import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import NotFound from "./views/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
