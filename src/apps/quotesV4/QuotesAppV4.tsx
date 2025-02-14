import React, { useEffect, useRef } from "react";

const ROWS = 30;
const COLS = 24;
const cellRefs = new Map(); // Store cell refs for fast updates

// WebSocket simulator that updates all cells every 20ms
const WebSocketSimulator = (onUpdate) => {
  let price = 1.01;
  const increment = 0.01;
  setInterval(() => {
    price = (price + increment);
    price = parseFloat(price.toFixed(2));
    const updates = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        updates.push({ row, col, newPrice: price });
      }
    }
    onUpdate(updates);
  }, 200); // Updates every 20ms
};

const PriceTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    WebSocketSimulator((updates) => {
      updates.forEach(({ row, col, newPrice }) => {
        const key = `${row}-${col}`;
        if (cellRefs.has(key)) {
          cellRefs.get(key).textContent = newPrice; // Direct DOM update
        }
      });
    });
  }, []);

  return (
      <div style={{ maxHeight: "80vh", overflow: "auto", border: "1px solid #ddd" }}>
        <h1>plain html table</h1>
        <table ref={tableRef} style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
          {Array.from({ length: ROWS }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: COLS }).map((_, colIdx) => (
                    <td
                        key={colIdx}
                        ref={(el) => {
                          if (el) cellRefs.set(`${rowIdx}-${colIdx}`, el);
                        }}
                        style={{
                          border: "1px solid #ccc",
                          padding: "5px",
                          textAlign: "center",
                          width: "50px",
                        }}
                    >
                      {parseFloat((Math.random() * 100).toFixed(2))}
                    </td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default PriceTable;
