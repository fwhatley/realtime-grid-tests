import React, { useEffect, useRef } from "react";

const numCols = 30;
const numRows = 24;
const cellWidth = 40;
const cellHeight = 30;
const updateInterval = 200; // 5 updates per second

// Cell Component with Independent Canvas
const PriceCell = ({ initialPrice }) => {
  const canvasRef = useRef(null);
  let price = initialPrice;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawPrice() {
      ctx.clearRect(0, 0, cellWidth, cellHeight); // Clear cell
      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#ccc";
      ctx.strokeRect(0, 0, cellWidth, cellHeight); // Draw cell border
      ctx.fillText(price.toFixed(2), cellWidth / 2, cellHeight / 2); // Draw price
    }

    drawPrice(); // Initial draw

    // Update price every 200ms (5 times per second)
    const interval = setInterval(() => {
      price += 0.01; // Increment price
      drawPrice(); // Update only this canvas
    }, updateInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <canvas ref={canvasRef} width={cellWidth} height={cellHeight} />;
};

// Main Grid Component
export default function PriceTableCanvas() {
  const initialPrices = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => parseFloat((Math.random() * 100).toFixed(2)))
  );

  return (
      <>
        <h1>
          canvas in for each cell
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, ${cellWidth}px)`, gap: "1px" }}>
          {initialPrices.flat().map((price, index) => (
              <PriceCell key={index} initialPrice={price} />
          ))}
        </div>
      </>

  );
}
