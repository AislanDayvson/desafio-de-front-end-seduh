import { Route, Navigate, Routes } from "react-router-dom";
import SelectCity from "../pages/SelectCity";
import CityWeather from "../pages/CityWeather";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<SelectCity/>} />
      <Route path="/city/:id" element={<CityWeather/>} />~
      <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
  )
}

export default App
