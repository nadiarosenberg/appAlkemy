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
    componentDidUpdate(_,prevState){
        if (prevState.input_type != this.state.input_type){//if imput_type changes
            this.fetchMovements();
        }
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

    render() {
        return (
            <div className="container">

            {/* All movements */}
              <h2>Movimientos</h2>

             {/* Order by type */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form action="/movements/api/" method="get">
                            <div className="input-group">
                                <label htmlFor="type">Ver:</label>
                                <select className="form-control" id="type" name="type" value={this.state.input_type} onChange={(e)=>{this.setState({input_type: e.target.value})}}>
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
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <form action="/movements/api/" method="get">
                            <div className="input-group">
                                <label htmlFor="type_expense">Ver:</label>
                                <select className="form-control" id="type_expense" name="type_expense" value={this.state.type_expense} onChange={(e)=>{this.setState({type_expense: e.target.value})}}>
                                    <option value="All_expenses">Todos</option>
                                    <option value="Food">Comida</option>
                                    <option value="Living">Vivienda</option>
                                    <option value="Transport">Transporte</option>
                                    <option value="Recreation">Recreación</option>
                                    <option value="Other">Otro</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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
                                    {aMovement.amount}
                                </td>
                                <td>
                                    {aMovement.input_type=="Income"?"Ingreso":"Gasto"}
                                </td>
                                <td>
                                    {aMovement.type_expense}
                                </td>

                                <td>
                                {/* Delete item */}
                                    <button type="button" class="btn btn-primary btn-block" onClick={()=>{
                                        fetch(`/movements/api/${aMovement.input_id}`,{method:'DELETE'}).then(()=>{
                                            fetch('/movements/api').then((result)=>result.json()).then((json)=>{
                                                console.log({json});
                                                this.setState({...this.state,movementsList:json}); //mantiene lo que habia en estado y actualiza la lista con lo que elimine
                                                }).catch(console.log);
                                            })
                                    }}>Eliminar</button>
                                </td>

                                <td>
                                {/* Edit item */}
                                    <Link to={`/form/${aMovement.input_id}`}><button type="button" class="btn btn-primary btn-block">Editar</button></Link>
                                </td>
                        </tr>
                        )
                        )}
                        </tbody>
                        </table>
                </div>
                </div>

        
            {/* Back Home */}
            <div>
                <Link to= "/"><button type="button" className="btn btn-primary btn-block">Volver a Home</button></Link>
            </div>

            </div>)};
} 


export default Movements
