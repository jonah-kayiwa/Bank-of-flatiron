import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import TransactionForm from './components/formTransaction';
import TableTransaction from './components/tableTransaction';
import SearchBar from './components/searchBar';
import Header from './components/header';



function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      });
  }, []);

  function addTransaction(newTransaction) {
    setTransactions([...transactions, newTransaction]);
  }

  const filteredTransactions = transactions
    ? transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  function deleteTransaction(id) {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  }

  return (
    <div className="App">
      <Header />
      <TableTransaction transactions={filteredTransactions} onDelete={deleteTransaction} />
      <SearchBar onSearch={setSearchTerm} />
      <TransactionForm onSubmit={addTransaction} />
    </div>
  );
}

export default App;