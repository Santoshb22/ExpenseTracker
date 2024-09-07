import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Styles from "./EllipseChart.module.css"
const data = [
  { name: 'Food', value: 30 }, 
  { name: 'Entertainment', value: 70 },
  { name: 'Travel', value: 10 },
];

const COLORS = ['#A000FF', '#FF9304', '#FDE006']; 

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const EllipseChart = () => {
  return (
    <div className={Styles.chart}>
      <div className={Styles.chartContent}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default EllipseChart;
