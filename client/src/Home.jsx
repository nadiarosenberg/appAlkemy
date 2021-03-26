import {Link} from 'react-router-dom';
import React, {Component} from 'react';
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
        fetch('/movements/api/list/')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            movementsList:data
          })
        })
        .catch(console.log)

        //get balance
        Axios.get('/movements/api/balance/').then((response)=>{
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
            {/* Sidebar */}
            <div className="nav_bar">
                <div id="sidebar-container">
                    <div className="logo">Mis finanzas</div>
                    <ul className="menu">
                        <li>
                            <Link to="/" className = "d-block"><i className="icon ion-md-home lead"></i>  Home</Link>
                        </li>
                        <li>
                            <Link to="/form" className = "d-block"><i className="icon ion-md-add lead"></i>  Ingresar movimiento</Link>
                        </li>
                        <li>
                            <Link to="/movements" className = "d-block"><i className="icon ion-md-wallet lead"></i>  Ver movimientos</Link>
                        </li>
                    </ul>
                </div>
            </div>

           {/* Page Content */}
            <div className="content">
                            <div className="user_barr"><i className="icon ion-md-person lead"></i>  Usuario</div>
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
                                            <table className="table table-borderless table table-hover">
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
{/* Cierre de la funcion */}
        </div>)
}}

export default Home