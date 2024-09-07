import React from 'react'
import Styles from "./ExpenseTracker.module.css"
import WindowController from '../WindowController/WindowController.jsx'
import ExpenseCard from '../ExpenseCard/ExpenseCard.jsx'
import EllipseChart from '../EllipseChart/EllipseChart.jsx'
import TopExpense from '../TopExpense/TopExpense.jsx'
import RecentTransaction from '../RecentTransaction/RecentTransaction.jsx'

const ExpenseTracker = () => {
  return (
    <div>
        <WindowController/>
        <div className={Styles.expenseTracker}>
          <h1 className={Styles.heading}>Expense Tracker</h1>

          <div className={Styles.expenseContainer}>
            <section className={Styles.topSection}>
              <div className={Styles.expenseCards}>
                <ExpenseCard/>
                <ExpenseCard/>
              </div>
              <div>
                <EllipseChart/>
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
              <RecentTransaction/>
              </div>

              <div className={Styles.rightSection}>
              <p className={Styles.totalExpense}>Recent Transactions</p>
              <TopExpense/>
              </div>
            </section>
          </div>
        </div>
    </div>
  )
}

export default ExpenseTracker