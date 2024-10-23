import { useEffect, useRef } from "react";

const KakaoAdfitBottom = () => {
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
        data-ad-unit="DAN-6UV1aeipWwc887VV"
        data-ad-width="320"
        data-ad-height="50"
      />
    </div>
  );
};

export default KakaoAdfitBottom;
