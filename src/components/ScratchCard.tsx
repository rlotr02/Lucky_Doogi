import { useRef, useEffect, useState } from "react";
import ScratchCardImg from "@images/cards/ScratchCard.png";

const ScratchCard = ({
  isShowIcon,
  setIsShowIcon,
  selectImage,
  setIsClickIcon,
}: {
  isShowIcon: boolean;
  setIsShowIcon: React.Dispatch<React.SetStateAction<boolean>>;
  selectImage: string;
  setIsClickIcon: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null); // 마지막으로 지운 위치 상태
  const totalPixels = 640 * 1062; // 전체 픽셀 수
  const [opacity, setOpacity] = useState(1); // 스크래치 이미지 투명도
  const [imgOpacity, setImgOpacity] = useState(0); // 결과 이미지 투명도
  const [isEndTransition, setIsEndTransition] = useState(false); // transition이 끝났는지 여부
  const [isImageLoaded, setIsImageLoaded] = useState(false); // 결과 이미지 로드 여부

  const initializeState = () => {
    setOpacity(1);
    setImgOpacity(0);
    setIsEndTransition(false);
    setIsImageLoaded(false);
    setLastPosition(null);
    setCtx(null);
  };

  useEffect(() => {
    initializeState();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    // 스크래치 이미지 설정
    const scratchImage = new Image();
    scratchImage.src = ScratchCardImg;
    scratchImage.onload = () => {
      canvas.width = scratchImage.width;
      canvas.height = scratchImage.height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "source-over";
      context.drawImage(scratchImage, 0, 0, canvas.width, canvas.height);
      setCtx(context);
    };
  }, [selectImage]);

  useEffect(() => {
    setIsEndTransition(true);
  }, []);

  // 마우스, 터치 이벤트로부터 좌표 계산
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    return { x, y };
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!ctx || !canvasRef.current || !isEndTransition || !isImageLoaded)
      return;

    if (!isShowIcon && imgOpacity !== 1) {
      setImgOpacity(1);
    }

    const { x, y } = getCoordinates(e);

    const scaleX = canvasRef.current.width / 320;
    const scaleY = canvasRef.current.height / 531;

    // 스크래치 효과 설정
    ctx.globalCompositeOperation = "destination-out"; // 이미지 지우기 모드 설정
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 200; // 스크래치 선 두께

    // 마지막 위치가 존재할 때만 선 그리기
    if (lastPosition) {
      ctx.beginPath();
      ctx.moveTo(lastPosition.x * scaleX, lastPosition.y * scaleY);
      ctx.lineTo(x * scaleX, y * scaleY);
      ctx.stroke();
    }

    setLastPosition({ x, y }); // 마지막 위치 업데이트
  };

  // 남아있는 이미지의 픽셀 수를 계산하는 함수
  const calculateRemainingPixels = (): number => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let remainingPixels = 0;

    // 남아있는 픽셀 수 계산
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 255) {
        remainingPixels++;
      }
    }

    return remainingPixels;
  };

  // 마우스, 터치가 캔버스를 벗어날 때
  const handlePointerOut = () => {
    if (!ctx || !canvasRef.current) return;

    setLastPosition(null); // 마지막 위치 초기화

    // 남아있는 픽셀 수 계산
    const remainingPixels = calculateRemainingPixels();
    const scratchedPercentage = (totalPixels - remainingPixels) / totalPixels;

    // 지워진 비율이 65% 이상이면 이미지 투명하게 설정
    if (scratchedPercentage >= 0.65) {
      setOpacity(0);
      setIsShowIcon(true);
    }
  };

  // transition이 끝난 후 canvas 지우기
  const handleTransitionEnd = () => {
    if (ctx && canvasRef.current && isShowIcon) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setIsClickIcon(true);
    }
    setIsEndTransition(true);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "320px",
        height: "531px",
      }}
      draggable={false}
    >
      <img
        src={selectImage}
        width={320}
        height={531}
        style={{
          position: "absolute",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          opacity: imgOpacity,
          zIndex: -10,
        }}
        onLoad={() => setIsImageLoaded(true)}
        draggable={false}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={1062}
        onMouseMove={draw}
        onMouseLeave={handlePointerOut}
        onTouchMove={draw}
        onTouchEnd={handlePointerOut}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transition: "opacity 0.6s ease-in-out",
          opacity,
          width: 320,
          height: 531,
        }}
        draggable={false}
      />
    </div>
  );
};

export default ScratchCard;
