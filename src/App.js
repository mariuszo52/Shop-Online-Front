import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import PlatformPage from "./pages/PlatformPage";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/pc"} element={<ReloadablePlatformPage platformName={"PC"} />}></Route>
            <Route path={"/psn"} element={<ReloadablePlatformPage platformName={"PSN"} />}></Route>
            <Route path={"/xbox"} element={<ReloadablePlatformPage platformName={"XBOX"} />}></Route>
            <Route path={"/nintendo"} element={<ReloadablePlatformPage platformName={"NINTENDO"} />}></Route>
            <Route path={"/rockstar-games"} element={<ReloadablePlatformPage platformName={"ROCKSTAR GAMES"} />}></Route>
            <Route path={"/others"} element={<ReloadablePlatformPage platformName={"OTHERS"} />}></Route>
        </Routes>
      </BrowserRouter>
  );
    function ReloadablePlatformPage({ platformName }) {
        const location = useLocation();
        const [key, setKey] = useState(0);

        useEffect(() => {

            setKey(prevKey => prevKey + 1);
        }, [location.pathname]);

        return <PlatformPage key={key} platformName={platformName} />;
    }

}

export default App;
