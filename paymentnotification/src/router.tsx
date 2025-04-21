import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./modules/home/HomeScreen";
import { AppLayout } from "./layouts/AppLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
