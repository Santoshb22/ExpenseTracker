// ExpenseTracker.jsx
import React, { useEffect, useState } from 'react';
import Styles from "./ExpenseTracker.module.css";
import WindowController from '../WindowController/WindowController.jsx';
import ExpenseCard from '../ExpenseCard/ExpenseCard.jsx';
import EllipseChart from '../EllipseChart/EllipseChart.jsx';
import TopExpense from '../TopExpense/TopExpense.jsx';
import RecentTransaction from '../RecentTransaction/RecentTransaction.jsx';
import ModalComponent from '../Modal/ModalComponent.jsx';

const ExpenseTracker = () => {
  const [data, setData] = useState({ expenses: [], balance: 5000, totalExpense: 0 });
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    price: '',
    category: '',
    date: '',
    amount: ''
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || { expenses: [], balance: 5000, totalExpense: 0 };
    setData(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const openExpenseModal = () => setIsExpenseModalOpen(true);
  const closeExpenseModal = () => setIsExpenseModalOpen(false);

  const openIncomeModal = () => setIsIncomeModalOpen(true);
  const closeIncomeModal = () => setIsIncomeModalOpen(false);

  const openEditModal = (transaction) => {
    setIsEditModalOpen(true);
    setFormData({
      id: transaction.id,
      title: transaction.title,
      price: transaction.amount,
      category: transaction.category,
      date: transaction.date,
      amount: transaction.amount
    });
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isExpenseModalOpen) {
      const newTransaction = {
        id: Date.now(),
        title: formData.title,
        amount: parseFloat(formData.price),
        category: formData.category,
        date: formData.date
      };

      setData(prevData => {
        const addExpense = [...prevData.expenses, newTransaction];
        const newBalance = prevData.balance - newTransaction.amount;
        const updateTotalExpense = prevData.totalExpense + newTransaction.amount;
        return {
          expenses: addExpense,
          balance: newBalance,
          totalExpense: updateTotalExpense
        };
      });
      closeExpenseModal();
    } else if (isEditModalOpen) {
      setData(prevData => {
        const updatedExpenses = prevData.expenses.map(exp =>
          exp.id === formData.id
            ? { ...exp, title: formData.title, amount: parseFloat(formData.price), category: formData.category, date: formData.date }
            : exp
        );
        const oldExpense = prevData.expenses.find(exp => exp.id === formData.id);
        const updatedTotalExpense = prevData.totalExpense - (oldExpense ? oldExpense.amount : 0) + parseFloat(formData.price);
        const updatedBalance = prevData.balance + (oldExpense ? oldExpense.amount : 0) - parseFloat(formData.price);

        return {
          expenses: updatedExpenses,
          balance: updatedBalance,
          totalExpense: updatedTotalExpense
        };
      });
      closeEditModal();
    } else {
      const addingIncome = parseFloat(formData.amount);
      setData(prevData => ({
        ...prevData,
        balance: prevData.balance + addingIncome
      }));
      closeIncomeModal();
    }

    setFormData({
      id: null,
      title: "",
      price: '',
      category: '',
      date: '',
      amount: ''
    });
  };


  const calculateCategoryTotals = () => {
    const totals = {
      Food: 0,
      Entertainment: 0,
      Travel: 0
    };
    
    data.expenses.forEach(expense => {
      if (totals[expense.category] !== undefined) {
        totals[expense.category] += expense.amount;
      }
    });

    return Object.keys(totals).map(category => ({
      name: category,
      value: totals[category]
    }));
  };

  const categoryData = calculateCategoryTotals();



  return (
    <div>
      <WindowController />
      <div className={`${Styles.expenseTracker} ${isExpenseModalOpen || isIncomeModalOpen ? Styles.bgWhite : ''}`}>
        <h1 className={Styles.heading}>Expense Tracker</h1>

        <div className={Styles.expenseContainer}>
          <section className={Styles.topSection}>
            <div className={Styles.expenseCards}>
              <ExpenseCard title={"Wallet Balance:"} add={"Income"} amount={data.balance} modal={openIncomeModal} />
              <ExpenseCard title={"Expenses:"} add={"Expense"} amount={data.totalExpense} modal={openExpenseModal} />
            </div>
            <div>

              <EllipseChart  data={categoryData}/>
              <div className={Styles.chartGuide}>
                <div>
                  <span className={Styles.purple}></span>Food
                </div>
                <div>
                  <span className={Styles.orange}></span>Entertainment
                </div>
                <div>
                  <span className={Styles.yellow}></span>Travel
                </div>
              </div>
            </div>
          </section>

          <section className={Styles.bottomSection}>
            <div className={Styles.leftSection}>
              <p className={Styles.recentTransaction}>Recent Transactions</p>
              <RecentTransaction data={data.expenses} setData={setData} modal={openEditModal} />
            </div>

            <div className={Styles.rightSection}>
              <p className={Styles.totalExpense}>Top Expenses</p>

              <TopExpense  data={categoryData} />
            </div>
          </section>
        </div>


        <ModalComponent
          isOpen={isExpenseModalOpen}
          onRequestClose={closeExpenseModal}
          title="Add Expense"
          onSubmit={handleSubmit}
        >
          <input type="text"
            placeholder="Title"
            name="title"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.title}
          />
          <input type="number"
            placeholder="Price"
            name="price"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.price}
          />
          <select
            name="category"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.category}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>
          <input type="date"
            placeholder="dd/mm/yyyy"
            name="date"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.date}
          />
        </ModalComponent>

        {/* Add Income Modal */}
        <ModalComponent
          isOpen={isIncomeModalOpen}
          onRequestClose={closeIncomeModal}
          title="Add Income"
          onSubmit={handleSubmit}
        >
          <input type="number"
            placeholder="Amount"
            name="amount"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.amount}
          />
        </ModalComponent>

        {/* Edit Expense Modal */}
        <ModalComponent
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          title="Edit Expense"
          onSubmit={handleSubmit}
        >
          <input type="text"
            placeholder="Title"
            name="title"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.title}
          />
          <input type="number"
            placeholder="Price"
            name="price"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.price}
          />
          {/* Change: Replaced category input with a dropdown for predefined categories */}
          <select
            name="category"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.category}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>
          <input type="date"
            placeholder="dd/mm/yyyy"
            name="date"
            className={Styles.inputField}
            onChange={handleInputChange}
            value={formData.date}
          />
        </ModalComponent>
      </div>
    </div>
  );
};

export default ExpenseTracker;
