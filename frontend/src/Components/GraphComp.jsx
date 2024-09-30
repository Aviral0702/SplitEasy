import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const GraphComponent = () => {
  const cyRef = useRef(null);

  useEffect(() => {
    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        { data: { id: 'A' } },
        { data: { id: 'B' } },
        { data: { id: 'C' } },
        { data: { id: 'AB', source: 'A', target: 'B' } },
        { data: { id: 'BC', source: 'B', target: 'C' } },
        { data: { id: 'CA', source: 'C', target: 'A' } },
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#0074D9',
            label: 'data(id)',
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 4,
            'line-color': '#FF4136',
            'target-arrow-color': '#FF4136',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],
      layout: {
        name: 'grid',
        rows: 1,
      },
    });

    return () => {
      cy.destroy();
    };
  }, []);

  return (
    <div>
      <h2>Bill Splitting Graph Visualization</h2>
      <div
        id="cy"
        ref={cyRef}
        style={{ width: '600px', height: '400px', border: '1px solid black' }}
      />
    </div>
  );
};

export default GraphComponent;
