import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/InteractiveGraph.css';

function InteractiveGraph() {
  const [data, setData] = useState([
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 500 },
    { name: 'Product D', value: 280 },
    { name: 'Product E', value: 590 },
  ]);

  const [newProduct, setNewProduct] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddData = (e) => {
    e.preventDefault();
    if (newProduct && newValue) {
      setData([...data, { name: newProduct, value: parseInt(newValue, 10) }]);
      setNewProduct('');
      setNewValue('');
    }
  };

  const handleUpdateData = (index, newValue) => {
    const updatedData = [...data];
    updatedData[index].value = parseInt(newValue, 10);
    setData(updatedData);
  };

  return (
    <div className="interactive-graph">
      <h3>Q2 Sales Data</h3>
      <BarChart
        width={600}
        height={400}
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      <div className="data-editor">
        <h4>Edit Data</h4>
        {data.map((item, index) => (
          <div key={index} className="data-item">
            <span>{item.name}: </span>
            <input
              type="number"
              value={item.value}
              onChange={(e) => handleUpdateData(index, e.target.value)}
            />
          </div>
        ))}
        <form onSubmit={handleAddData} className="add-data-form">
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            placeholder="New Product Name"
          />
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Value"
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default InteractiveGraph;