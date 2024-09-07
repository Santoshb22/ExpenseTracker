import React, { useState } from 'react';
import Styles from "./RecentTransaction.module.css";
import TransactionSection from './TransactionSection';
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

const RecentTransaction = ({ data, setData, modal }) => {
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  function handlePageChange(direction) {
    if (direction === "next" && currPage < totalPages) {
      setCurrPage(currPage + 1);
    } else if (direction === "prev" && currPage > 1) {
      setCurrPage(currPage - 1);
    }
  }

  function handleRemove(id) {
    setData(prevData => {
      const removedExp = prevData.expenses.find(expense => expense.id === id);

      const updatedExpenses = prevData.expenses.filter(expense => expense.id !== id);
      const updateTotalExpense = prevData.totalExpense - removedExp.amount;
      const updatedBalance = prevData.balance + removedExp.amount;

      return {
        ...prevData,
        expenses: updatedExpenses,
        totalExpense: updateTotalExpense,
        balance: updatedBalance
      };
    });
  }

  function handleEdit(transaction) {
    modal(transaction);
  }

  return (
    <div className={Styles.recentTransaction}>
      {
        data.length === 0 ? <h1>No Expense</h1>
          : (
            displayedData.map((item, index) => (
              <React.Fragment key={index}>
                <TransactionSection data={item} onEdit={() => handleEdit(item)} onRemove={handleRemove} />
                <hr />
              </React.Fragment>
            ))
          )
      }
      {
        data.length > 0 && <div className={Styles.pagination}>
          <button onClick={() => handlePageChange("prev")} disabled={currPage === 1}>
            <GoArrowLeft />
          </button>
          <span>{currPage}</span>
          <button onClick={() => handlePageChange("next")} disabled={currPage === totalPages}>
            <GoArrowRight />
          </button>
        </div>
      }
    </div>
  );
};

export default RecentTransaction;
