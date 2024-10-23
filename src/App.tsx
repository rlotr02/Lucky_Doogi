import "./App.css";
import MainPage from "@pages/MainPage";
import ResultPage from "@pages/ResultPage";
import { useState } from "react";
import KakaoAdfitLeft from "@components/adfit/KakaoAdfitLeft";
import KakaoAdfitRight from "@components/adfit/KakaoAdfitRight";

const App = () => {
  const [isMainPage, setIsMainPage] = useState(true);

  return (
    <div className="layout-wrapper">
      <div className="ad-wrapper">
        <KakaoAdfitLeft />
      </div>
      <div className="main-wrapper">
        {isMainPage ? (
          <MainPage setIsMainPage={setIsMainPage} />
        ) : (
          <ResultPage setIsMainPage={setIsMainPage} />
        )}
      </div>
      <div className="ad-wrapper">
        <KakaoAdfitRight />
      </div>
    </div>
  );
};

export default App;
