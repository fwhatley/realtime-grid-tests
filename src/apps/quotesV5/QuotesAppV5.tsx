import React, { useEffect, useRef } from "react";

const ROWS = 30;
const COLS = 24;

// WebSocket simulator that updates all cells every 20ms
const WebSocketSimulator = (onUpdate) => {
  let price = 1.01;
  const increment = 0.01;

  setInterval(() => {
    price = parseFloat((price + increment).toFixed(2));

    const newTableData = [];
    for (let row = 0; row < ROWS; row++) {
      const rowData = [];
      for (let col = 0; col < COLS; col++) {
        rowData.push(price);
      }
      newTableData.push(rowData);
    }

    onUpdate(newTableData);
  }, 200); // Updates every 20ms
};

const PriceTable = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    WebSocketSimulator((newTableData) => {
      if (!tableRef.current) return;

      // Create a new tbody using DocumentFragment
      const fragment = document.createDocumentFragment();
      const newTbody = document.createElement("tbody");

      newTableData.forEach((rowData, rowIdx) => {
        const tr = document.createElement("tr");

        rowData.forEach((price, colIdx) => {
          const td = document.createElement("td");
          td.textContent = price;
          td.style.border = "1px solid #ccc";
          td.style.padding = "5px";
          td.style.textAlign = "center";
          td.style.width = "50px";
          tr.appendChild(td);
        });

        newTbody.appendChild(tr);
      });

      fragment.appendChild(newTbody);

      // Replace old tbody with the new one in a single operation
      const oldTbody = tableRef.current.querySelector("tbody");
      if (oldTbody) {
        tableRef.current.replaceChild(fragment.firstChild, oldTbody);
      }
    });
  }, []);

  return (
      <div style={{ maxHeight: "80vh", overflow: "auto", border: "1px solid #ddd" }}>
        <h1>table: replace table body from createDocumentFragment </h1>
        <table ref={tableRef} style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
          {Array.from({ length: ROWS }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: COLS }).map((_, colIdx) => (
                    <td
                        key={colIdx}
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
