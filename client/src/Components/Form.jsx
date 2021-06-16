import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import Axios from 'axios';
import {useParams, useHistory} from 'react-router';


function Form(){
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState('');
    const [input_date, setInput_date] = useState('');
    const [input_type, setInput_type] = useState('Income'); //default value
    const [type_expense, setType_expense] = useState('Comida'); //default value

    //Edit input
    const {id} = useParams();
    const history = useHistory(); 
    useEffect(()=>{
        if (id && id.length){
            Axios.get(`/movements/${id}`).then((response)=>{
                if (response.data.length){
                    const [value] = response.data; 
                    setConcept(value.concept);
                    setAmount(value.amount);
                    setInput_date(value.input_date.split("T")[0]);
                    setInput_type(value.input_type);
                    setType_expense(value.type_expense);
                }
            })
        }
    },[id])

    //Submit 
    const submitForm = (e)=>{
        e.preventDefault(); //no refresh
        if (id){
            Axios.put(`/movements/${id}`,{
                concept: concept,
                amount: amount,
                input_date: input_date,
                input_type: input_type,
                type_expense: type_expense
                }).then(()=>{
                    alert('Movimiento modificado');
                    //redirect
                    history.push('/movements');
                }).catch(e=>console.log(e))
        }else{
            Axios.post('/movements',{
                concept: concept,
                amount: amount,
                input_date: input_date,
                input_type: input_type,
                type_expense: type_expense
                }).then(()=>{
                    alert('Movimiento ingresado');
                    //clean form
                    setConcept('');
                    setAmount('');
                    setInput_date('');
                    setInput_type('Income');
                    setType_expense('Food');
                }).catch(e=>console.log(e))}
    }

    return (
        <div className= "w-100">
            <SideBar />
            {/* Page Content */}
            <div className="content">
                <Header />
                {/* Form */}
                <div className="container">
                <div className="row justify-content-center">
                <div className="col-6">
                <form onSubmit={submitForm}>
                        <div className="form-group">
                                <label htmlFor="concept">Concepto:</label>
                                <input type="text" name="concept" id="concept" className="form-control" value={concept}  onChange={(e)=>{setConcept(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                                <label htmlFor="amount">Valor:</label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input type="number" name="amount" id="amount" required min="1" value={amount} className="form-control"  onChange={(e)=>{setAmount(e.target.value)}}/>
                                    </div>
                        </div>
                        <div className="form-group">
                                <label htmlFor="input_date">Fecha:</label>
                                <input type="date" name="input_date" id="input_date" required className="form-control" value={input_date} onChange={(e)=>{setInput_date(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                                <label htmlFor="input_type">Tipo:</label>
                                <select value={input_type} onChange={(e)=>{setInput_type(e.target.value) }}  disabled={(id)} type="text" name="input_type" id="input_type" required className="form-control">
                                    <option value="Income">Ingreso</option>
                                    <option value="Expense" >Gasto</option>
                                </select>
                        </div>
                        <div className="form-group" id="type_expense" style={{ display: input_type=="Income" ? "none": "block" }}>
                            <label htmlFor="type_expense">Tipo de gasto:</label>
                                <select disabled={(id)} type="text" name="type_expense"  className="form-control" value={type_expense} onChange={(e)=>{setType_expense(e.target.value)}}>
                                        <option value="Food" >Comida</option>
                                        <option value="Living">Vivienda</option>
                                        <option value="Transport">Transporte</option>
                                        <option value="Recreation">Recreación</option>
                                        <option value="Other">Otro</option>
                                </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" id="submit_button" value="Submit">Aceptar</button>
                        </div >   
                </form>
                </div>
                </div>
                </div>
            </div>
        </div>)
};

export default Form