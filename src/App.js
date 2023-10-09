import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import PlatformPage from "./pages/PlatformPage";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductPage from "./pages/ProductPage";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/pc"} element={<ReloadablePlatformPage deviceName={"PC"} />}></Route>
            <Route path={"/psn"} element={<ReloadablePlatformPage deviceName={"PSN"} />}></Route>
            <Route path={"/xbox"} element={<ReloadablePlatformPage deviceName={"XBOX"} />}></Route>
            <Route path={"/nintendo"} element={<ReloadablePlatformPage deviceName={"NINTENDO"} />}></Route>
            <Route path={"/rockstar-games"} element={<ReloadablePlatformPage deviceName={"ROCKSTAR GAMES"} />}></Route>
            <Route path={"/others"} element={<ReloadablePlatformPage deviceName={"OTHERS"} />}></Route>
            <Route path={"/product/:id"} element={<ProductPage/>}></Route>
        </Routes>
      </BrowserRouter>
  );
    function ReloadablePlatformPage({ deviceName }) {
        const location = useLocation();
        const [key, setKey] = useState(0);

        useEffect(() => {

            setKey(prevKey => prevKey + 1);
        }, [location.pathname]);

        return <PlatformPage key={key} deviceName={deviceName} />;
    }

}

export default App;
