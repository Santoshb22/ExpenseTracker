import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Styles from "./TopExpense.module.css"

const TopExpense = ({data}) => {
  return (
    <div className={Styles.topExpenses}>
      {
        !data || data.length === 0? <h1 className={Styles.noExpense}>First add Expenses </h1>
        : (
          <ResponsiveContainer >
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#8784D2" barSize={25} radius={[0, 20, 20, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        )
      }
    </div>
  );
};

export default TopExpense;
