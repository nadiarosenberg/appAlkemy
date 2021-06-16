import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import Axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state= {
            movementsList:[],
            balance: '',
        }
    }

    componentDidMount() {
        //get list
        fetch('/movements/list/')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            movementsList:data
          })
        })
        .catch(console.log)

        //get balance
        Axios.get('/movements/balance/').then((response)=>{
            this.setState({
                balance: response.data.balance })
        })
    }

    render() {
        function Value_type_expense(data){
            var value = data;
            switch(value){
                case 'Food': 
                    value = 'Comida';
                    break;
                case 'Living': 
                    value = 'Vivienda';
                    break;
               case 'Transport':
                    value = 'Transporte';
                    break;
               case 'Recreation':
                    value = 'Recreación';
                    break;
               case 'Other':
                    value = 'Otro';
                    break;
                default: value = '-'}
            return (value)}

        return (
        <div className= "w-100">
            <SideBar/>
            {/* Page Content */}
            <div className="content">
                <Header />
                <div className="justify-content-center" id="welcome">
                    <h2 className = "welcome_message">Bienvenida/o!</h2>
                    {/* Balance */}
                    <div className="div_balance">
                            <h2>Balance</h2>
                            <h2 className="number_balance">${this.state.balance}</h2>
                    </div>
                </div>
                    {/* Last 10 movements */}
                    <div clasName = "tablediv">
                        <h2 className="h2_title">Ultimos movimientos</h2>
                            <div className="row justify-content-center">     
                            <div className="col-8">
                                <table id="table" className="table table-borderless table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Concepto</th>
                                            <th scope="col"></th>
                                            <th scope="col">Valor</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Tipo de gasto:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.movementsList.map((aMovement) => (
                                    <tr>  
                                            <td>
                                                {aMovement.input_date.split("T")[0].split('-').reverse().join('/')}
                                            </td>
                                            <td>
                                                {aMovement.concept}
                                            </td>
                                            <td>
                                                {aMovement.input_type=="Expense"?"-":"+"}
                                            </td>
                                            <td>
                                                ${aMovement.amount}
                                            </td>
                                            <td>
                                                {aMovement.input_type=="Income"?"Ingreso":"Gasto"}
                                            </td>
                                            <td>
                                                {Value_type_expense(aMovement.type_expense)}
                                            </td>
                                    </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                    </table>
                            </div>
                            </div>
                        </div>
            </div>
        </div>)
}}

export default Home