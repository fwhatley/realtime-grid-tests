import {useEffect, useRef, useState} from "react";

import type { ColDef } from "ag-grid-community";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { getQuoteGridData } from "./helper";
import { IQuote } from "./models";

ModuleRegistry.registerModules([AllCommunityModule]);

const UPDATE_TIMES_PER_SECOND = 5
const UPDATE_INTERVAL = 1000/UPDATE_TIMES_PER_SECOND;

const QuotesAppV3 = () => {
  const [rowData] = useState<IQuote[]>(getQuoteGridData());
  const gridApiRef = useRef<any>(null);

  console.log('QuotesApp render:', rowData, gridApiRef);

  useEffect(() => {
    console.log('QuotesApp.useEffect:');
    const inc = 0.01;
    let price = 1.0;
    setInterval(() => {
      price += inc;
      const updates = (getQuoteGridData(price));
      console.log('QuotesApp.useEffect.setInterval:', updates);
      if (gridApiRef.current) {
        gridApiRef.current.applyTransactionAsync({update: updates});

      }

    }, UPDATE_INTERVAL);
  },[]);

  const [colDefs] = useState<ColDef<IQuote>[]>([
    { field: "symbol" },
    { field: "open" },
    { field: "openPriceDisplay" },
    { field: "high" },
    { field: "highPriceDisplay" },
    { field: "low" },
    { field: "lowPriceDisplay" },
    { field: "previousClose" },
    { field: "previousClosePriceDisplay" },
    { field: "last" },
    { field: "lastPriceDisplay" },
    { field: "lastSize" },
    { field: "ask" },
    { field: "askPriceDisplay" },
    { field: "askSize" },
    { field: "bid" },
    { field: "bidPriceDisplay" },
    { field: "netChange" },
    { field: "netChangePct" },
    { field: "high52Week" },
    { field: "high52WeekPriceDisplay" },
    { field: "low52Week" },
    { field: "low52WeekPriceDisplay" },
  ]);
  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
  };
  const getRowId = (params: any) => params.data.symbol;

  const rowCount = rowData.length
  const colCount = Object.keys(rowData[0]).length
  return (
      <div style={{ width: "1400px", height: "1000px" }}>
        <h1>Quotes: suppressReact & transactionApplyAsync</h1>
        <div># rows: {rowCount}</div>
        <div># cols: {colCount}</div>
        <div>total cell updates: {rowCount * colCount}</div>
        <div>update interval (ms): {UPDATE_INTERVAL}</div>
        <AgGridReact
            suppressReact={true}
            suppressAnimationFrame={true}  // Avoid excess re-renders
            // rowBuffer={1}                 // Reduce off-screen row rendering
            enableCellChangeFlash={true}    // Flash changes instead of full re-render
            rowSelection="none"             // Disable row selection for better performance

            getRowId={getRowId}
            ref={gridApiRef}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onGridReady={(params) => {
              gridApiRef.current = params.api;
            }}      />
      </div>
  );
};

export default QuotesAppV3;
