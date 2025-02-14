import React, {useEffect, useRef, useState} from "react";
import type {ColDef, ICellRendererParams} from "ag-grid-community";
import _ from 'lodash'

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IPubSubTopic {
    callback: (val: any) => void
    lastPublishedPayload: any | null
}

/**
 * A publish subscribe service where there is only single subscriber for each topic.
 */
class PubSubService {
    private static topics: any = {}

    public static subscribe(topic: string = '', callback: (val: any) => void) {
        if (!topic) {
            console.error('Topic name is empty when it should not be empty.')
        }
        if (this.topics[topic]) {
            console.warn(
                `A topic named ${topic} already exists. Unsubscribe from it before subscribing.`,
            )
        }
        const pubSubTopic: IPubSubTopic = {
            callback,
            lastPublishedPayload: null,
        }
        this.topics[topic] = pubSubTopic
    }

    public static unsubscribe(topic = '') {
        delete this.topics[topic]
    }

    public static publish(topic: string = '', payload: any) {
        if (
            this.topics[topic] &&
            !_.isEqual(this.topics[topic].lastPublishedValue, payload)
        ) {
            this.topics[topic].lastPublishedValue = payload
            this.topics[topic].callback(payload)
        }
    }

}

const ROWS = 24;
const COLS = 30;
const UPDATE_INTERVAL = 200; // 5 updates per second

const generateInitialData = () => {
    return Array.from({ length: ROWS }, (_, rowIndex) => {
        const rowData = {
            id: `row${rowIndex}`,
            symbol: `SYM${rowIndex + 1}`,
            exchange: `EXCH${Math.floor(Math.random() * 3) + 1}`,  // Random exchange for illustration
            assetType: `Asset Type ${Math.floor(Math.random() * 3) + 1}`,  // Random asset type for illustration
        };

        for (let i = 0; i < COLS; i++) {
            rowData[`col${i}`] = (10 + Math.random() * 10).toFixed(2);
        }
        return rowData;
    });
};


const PriceCellRenderer = (params: ICellRendererParams) => {
    const topicId = `${params.node.id}-${params.colDef?.field}`
    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (topicId) {
            PubSubService.unsubscribe(topicId)
            const callback = (update: any) => {
                const {display: newDisplay} = update

                if (cellRef?.current) {
                    cellRef.current.innerText = newDisplay || ''
                }
            }
            PubSubService.subscribe(topicId, callback)
        }

        return () => {
            if (topicId) {
                PubSubService.unsubscribe(topicId)
            }
        }
    }, [topicId]);

    console.log(`cell render: `, topicId)
    return <div ref={cellRef} />;
};

const getColumnDefs = (): ColDef[] => {
  return Array.from({ length: COLS }, (_, i) => ({
    field: `col${i}`,
    headerName: `Price ${i + 1}`,
    width: 100,
    cellRenderer: PriceCellRenderer, // Use custom cell renderer
  }));
};

const RealTimeGrid = () => {
  const gridApiRef = useRef<any>(null);
  const [rowData] = useState(generateInitialData());
  const colDefs = getColumnDefs();

  useEffect(() => {
    let price = 10.20
    const inc = 0.01

    const interval = setInterval(() => {
        price = parseFloat((price + inc).toFixed(2));
        if (!gridApiRef.current) return;

        const updates: Record<string, any> = {};
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                updates[`row${i}-col${j}`] = { display: price };
            }
        }

        Object.entries(updates).forEach(([topicId, payload]) => {
            PubSubService.publish(topicId, payload);
        });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  console.log('grid render')
  return (
      <div style={{ width: "1400px", height: "1000px" }} >
        <h1>Quotes: ag-grid with cell renderer & direct updates</h1>
        <div># rows: {ROWS}</div>
        <div># cols: {COLS}</div>
        <div>total cell updates: {ROWS * COLS}</div>
        <div>update interval (ms): {UPDATE_INTERVAL}</div>
        <AgGridReact
            ref={gridApiRef}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={{ resizable: true, sortable: false }}
            getRowId={(params) => params.data.id}
            onGridReady={(params) => {
              gridApiRef.current = params.api;
            }}
        />
      </div>
  );
};

export default RealTimeGrid;
