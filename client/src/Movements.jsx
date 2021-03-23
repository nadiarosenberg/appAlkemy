import {Link} from 'react-router-dom';
import React, {Component} from 'react';


class Movements extends Component {
    constructor() {
        super();
        this.state= {
            movementsList:[]
        }
    };

    componentDidMount() {
        fetch('movements/api/')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            movementsList:data
          })
        })
        .catch(console.log)
    };

    render() {
        return (
            <div className="container">

            {/* All movements */}
              <h2>Ultimos movimientos:</h2>
                <div className="row justify-content-center">     
                <div className="col-8">
                    <table className="table table-borderless table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Concepto</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Tipo</th>
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
                                    {aMovement.amount}
                                </td>
                                <td>
                                    {aMovement.input_type}
                                </td>

                                <td>
                                {/* Delete item */}
                                    <button type="button" class="btn btn-primary btn-block" onClick={()=>{
                                        fetch(`/movements/api/${this.input_id}.input_id}`,{method:'DELETE'}).then(()=>{
                                            fetch('/movements/api').then((result)=>result.json()).then((json)=>{
                                                console.log({json});
                                                this.setState(json);
                                                }).catch(console.log);
                                            })
                                    }}>Eliminar</button>
                                </td>

                                <td>
                                {/* Edit item */}
                                    <button type="button" class="btn btn-primary btn-block" onClick={()=>{
                                        fetch(`/movements/api/${this.input_id}`,{method:'PUT'}).then(()=>{
                                            fetch('/movements/api').then((result)=>result.json()).then((json)=>{
                                                console.log({json});
                                                this.setState(json);
                                            }).catch(console.log);
                                        })
                                }}>Editar</button>
                                </td>
                        </tr>
                        )
                        )}
                        </tbody>
                        </table>
                </div>
                </div>

        {/* Order by type */}
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form action="/movements/api" method="get">
                        <div className="form-group">
                            <label htmlFor="type">Ver:</label>
                            <select className="form-control" id="type" name="type">
                                <option>Ingresos</option>
                                <option>Gastos</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        
        {/* Back to Home */}
        <div>
            <Link to= "/"><button type="button" className="btn btn-primary btn-block">Volver a Home</button></Link>
        </div>

{/* Cierre de la funcion, no tocar */}
    </div>)};
} 


export default Movements
