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
        return (
        <div className="container">
            <h1>App de finanzas</h1>

            {/* Balance */}
              <h2>Balance: {this.state.balance} </h2>

            {/* Last 10 movements */}
              <h2>Ultimos movimientos:</h2>
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
                                    {aMovement.amount}
                                </td>
                                <td>
                                    {aMovement.input_type=="Income"?"Ingreso":"Gasto"}
                                </td>
                                <td>
                                    {aMovement.type_expense}
                                </td>
                        </tr>
                                )
                            )
                        }
                        </tbody>
                        </table>
                    </div>
                    </div>
            
            {/* Buttons */}
            <div>
                <Link to=  "/form" ><   button type="button" className="btn btn-primary btn-block">Ingresar movimiento</button></Link>
                <br/>    
                <Link to="/movements"><button type="button" className="btn btn-primary btn-block">Ver movimientos</button></Link>
            </div>

        </div>
        )};
}

export default Home