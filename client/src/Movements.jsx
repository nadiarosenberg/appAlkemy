import {Link} from 'react-router-dom';
import React, {Component} from 'react';


class Movements extends Component {
    constructor() {
        super();
        this.state= {
            movementsList:[],
            input_type:'All',
            type_expense:'All'
        }
    }

    //Filter by type of operation
    fetchMovements(){
        fetch(`/movements/api/filter/${this.state.input_type}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            movementsList:data
          })
        })
        .catch(console.log)
    }
    componentDidMount() {
        this.fetchMovements();
    }

    //Filter by type of expense
    fetchTypeExpense(){
        fetch(`/movements/api/filter/subfilter/${this.state.type_expense}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            movementsList:data
          })
        })
        .catch(console.log)
    }

    componentDidUpdate(_,prevState){
        if (prevState.type_expense != this.state.type_expense){//if type_expense changes
            this.fetchTypeExpense();}
        if (prevState.input_type != this.state.input_type){//if input_type changes
            this.fetchMovements();}
    }

    onChangeType(value){
        this.setState({input_type:value});
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
            <div className="nav_bar" id="menu">
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
                
                {/* All movements */}
                <h2 className ="h2_movements">Movimientos</h2>

                {/* Order by type */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <form action="/movements/api/" method="get">
                                <div className="input-group" id="select_movement">
                                    <label htmlFor="type" className="input_select">Ver:</label>
                                    <select className="form-control" id="type" name="type" value={this.state.input_type} onChange={(e)=>{this.onChangeType(e.target.value)}}>
                                        <option value="All">Todos</option>
                                        <option value="Income">Ingresos</option>
                                        <option value="Expense">Gastos</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Order by type of expense */}
                <div className="container"style={{ display: this.state.input_type=="Income" ? "none": "block" }}>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <form action="/movements/api/" method="get">
                                <div className="input-group">
                                    <label htmlFor="type_expense" className="input_select">Tipo de gasto:</label>
                                    <select className="form-control" id="type_expense" name="type_expense" value={this.state.type_expense} onChange={(e)=>{this.setState({type_expense: e.target.value})}}>
                                        <option value="All_expenses">Todos</option>
                                        <option value="Food">Comida</option>
                                        <option value="Living">Vivienda</option>
                                        <option value="Transport">Transporte</option>
                                        <option value="Recreation">Recreacion</option>
                                        <option value="Other">Otro</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* List of movements */}
                    <div className="row justify-content-center" id="table_movements">     
                    <div className="col-9">
                        <table className="table table-borderless table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Concepto</th>
                                    <th scope="col"></th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Tipo de ingreso:</th>
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

                                    <td>
                                    {/* Delete item */}
                                        <button type="image" src="client\src\images\trash-outline.svg" className="btn btn-primary btn-block" id="button_movements" onClick={()=>{
                                            fetch(`/movements/api/${aMovement.input_id}`,{method:'DELETE'}).then(()=>{
                                                fetch('/movements/api').then((result)=>result.json()).then((json)=>{
                                                    console.log({json});
                                                    this.setState({...this.state,movementsList:json}); //mantiene lo que habia en estado y actualiza la lista con lo que elimine
                                                    }).catch(console.log);
                                                })
                                        }}><i className="fa fa-trash"></i></button>
                                    </td>

                                    <td>
                                    {/* Edit item */}
                                        <Link to={`/form/${aMovement.input_id}`}><button type="button" className="btn btn-primary btn-block" id="button_movements"><i className="fa fa-pencil"></i></button></Link>
                                    </td>
                            </tr>
                            )
                            )}
                            </tbody>
                            </table>
                    </div>
                    </div>
            </div>                 
            </div>)};
} 
export default Movements
