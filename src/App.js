import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import Alert from './components/Alert';
import uuid from 'react-uuid';

const initialExpenses = [
    { id: uuid(), charge: 'rent', amount: 1600 },
    { id: uuid(), charge: 'car', amount: 400 },
    { id: uuid(), charge: 'credit card bill', amount: 1200 }
];

function App() {
    //***** state values *******/
    const [expenses, setExpenses] = useState(initialExpenses);
    const [charge, setCharge] = useState('');
    const [amount, setAmount] = useState('');
    const [alert, setAlert] = useState({show:false});
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState(0)
    //****** functionality  *******/
    const handleCharge = e => {
        setCharge(e.target.value)
    }
    const handleAmount = e => {
        setAmount(e.target.value)
    }
    const handleAlert  = ({type,text}) =>{
        setAlert({show:true, type, text});
        setTimeout(()=>{
            setAlert({show:false})
        },3000)
    }

    const handleSubmit = e => {
        e.preventDefault();
      if(charge !== '' && amount > 0){
        const singleExpense = {id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpense])
        setCharge('');
        setAmount('');
        handleAlert({type:'success', text:'item added'})
      }else{handleAlert({type:'danger', text:`charge can't be empty value and amount value has to be bigger than zero`})}
    }
    const clearItems = ()=>{
        setExpenses([]);
        handleAlert({type: 'danger', text: 'all items deleted'});
    }
    const handleDelete = (id) =>{
        let tempExpenses = expenses.filter(item => item.id !== id)
        setExpenses(tempExpenses)
        handleAlert({type: 'danger', text: 'item deleted'});

    }
    const handleEdit = (id) =>{
        let expense = expenses.find(item => item.id === id)
        let {charge, amount} = expense;
        setCharge(charge)
        setAmount(amount)
        setEdit(true)
        setId(id)

    }


    return (<>
        {alert.show && <Alert type={alert.type} text={alert.text} />}
        <Alert />
        <h1>Budget Calculator</h1>
        <main className='App'>
            <Form 
            charge={charge} 
            amount={amount} 
            handleAmount={handleAmount} 
            handleCharge={handleCharge} 
            handleSubmit={handleSubmit} 
            edit = {edit}
            />
            <List 
            expenses={expenses}
            handleDelete={handleDelete} 
            handleEdit = {handleEdit} 
            clearItems = {clearItems} 
            />
        </main>
        <h1>
            Total Spending: <span className='total'>
                $
                {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
        }, 0)}
            </span>
        </h1>
    </>
    );
}

export default App;
