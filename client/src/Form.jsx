import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {useParams, useHistory} from 'react-router';


function Form(){
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState('');
    const [input_date, setInput_date] = useState('');
    const [input_type, setInput_type] = useState('Income'); //default value
    const [type_expense, setType_expense] = useState('Comida'); //default value

    //Edit input
    const {input_id} = useParams();
    const history = useHistory(); 
    useEffect(()=>{
        if (input_id && input_id.length){
            Axios.get(`/movements/api/${input_id}`).then((response)=>{
                    console.log(response);
                    if (response.data.length){
                        const [value] = response.data; 
                        setConcept(value.concept);
                        setAmount(value.amount);
                        setInput_date(value.input_date.split("T")[0]);
                        setInput_type(value.input_type);
                        setType_expense(value.type_expense);
                    }
            }
            )
        }
    },[input_id])

    //Submit 
    const submitForm = (e)=>{
        e.preventDefault(); //no refresh
        if (input_id){
            Axios.put(`/movements/api/${input_id}`,{
                concept: concept,
                amount: amount,
                input_date: input_date,
                input_type: input_type,
                type_expense: type_expense
                }).then(()=>{
                    alert('Movimiento modificado');
                    //redirect
                    history.push('/movements/');
                }).catch(e=>console.log(e))
        }else{
            Axios.post('/movements/api/import/',{
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

    /*function show_form(event){
        var element = document.getElementById('type_expense');
        element.style.display = 'block';
    }*/

    return (
    <div>
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
                                <input type="number" name="amount" id="amount" required value={amount} className="form-control"  onChange={(e)=>{setAmount(e.target.value)}}/>
                            </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input_date">Fecha:</label>
                        <input type="date" name="input_date" id="input_date" required className="form-control" value={input_date} onChange={(e)=>{setInput_date(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input_type">Tipo:</label>
                        <select disabled={(input_id)} type="text" name="input_type" id="input_type" required className="form-control" value={input_type} onChange={(e)=>{setInput_type(e.target.value)}}>
                            <option value="Income" >Ingreso</option>
                            <option value="Expense" id="expenseId">Gasto</option>
                        </select>
                    </div>
                     <div className="form-group" id="type_expense" >
                        <label htmlFor="type_expense">Tipo de gasto:</label>
                        <select disabled={(input_id)} type="text" name="type_expense"  className="form-control" value={type_expense} onChange={(e)=>{setType_expense(e.target.value)}}>
                                        <option value="Food" >Comida</option>
                                        <option value="Living">Vivienda</option>
                                        <option value="Transport">Transporte</option>
                                        <option value="Recreation">Recreación</option>
                                        <option value="Other">Otro</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" value="Submit">Aceptar</button>
        </form>
        </div>
        </div>
        </div>

        {/* Back Home */}
        <Link to= "/"><button type="button" className="btn btn-primary btn-block" >Volver a Home</button></Link>

    </div>)
};

export default Form