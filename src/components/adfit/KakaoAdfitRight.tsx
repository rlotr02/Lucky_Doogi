import { useEffect, useRef } from "react";

const KakaoAdfitRight = () => {
  const scriptElement = useRef<HTMLDivElement | null>(null);

  // script 태그를 동적으로 추가
  useEffect(() => {
    if (scriptElement.current) {
      const script = document.createElement("script");
      script.setAttribute("src", "https://t1.daumcdn.net/kas/static/ba.min.js");
      script.setAttribute("charset", "utf-8");
      script.setAttribute("async", "true");

      scriptElement.current.appendChild(script);
    }
  }, []);

  return (
    <div ref={scriptElement}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-kZLtt9FXcwM3olFg"
        data-ad-width="160"
        data-ad-height="600"
      />
    </div>
  );
};

export default KakaoAdfitRight;
