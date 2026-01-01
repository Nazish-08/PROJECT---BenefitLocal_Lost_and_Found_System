import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SuccessRatePage = () => {
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchSuccessRate = async () => {
      try {
        const res = await axios.get('http://localhost:8000/success-rate');
        const values = res.data.values;
        const labels = res.data.labels;

        const data = labels.map((label, index) => ({
          name: label,
          value: values[index],
        }));

        setChartData(data);
        setTotal(values.reduce((a, b) => a + b, 0));
      } catch (err) {
        console.error('Error fetching success rate:', err);
      }
    };

    fetchSuccessRate();
  }, []);

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>
        📊 Item Recovery Success Rate (Last 30 Days)
      </h2>

      {total > 0 ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={600} height={400}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div style={{ marginTop: '30px', fontSize: '16px', color: '#333' }}>
            <p><strong>Total Reports:</strong> {total}</p>
            <p><strong>Recovered Items:</strong> {chartData[0]?.value || 0}</p>
            <p><strong>Not Recovered Items:</strong> {chartData[1]?.value || 0}</p>
            <p style={{ fontStyle: 'italic', color: '#666' }}>
              Data is based on real form submissions by users. This helps track how many people are able to find their lost items in Mumbai Local Trains using BenefitLocal.
            </p>
          </div>
        </>
      ) : (
        <p>No data available from the last 30 days.</p>
      )}
    </div>
  );
};

export default SuccessRatePage;
