import {Link} from 'react-router-dom';
import React, {Component} from 'react';

class Home extends Component {
    constructor() {
        super();
        this.state= {
            movementsList:[],
            balance: '',
        }
    };

    componentDidMount() {
        fetch('movements/api/list/')
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
              <h1>App de finanzas</h1>

              {/* Last 10 movements */}
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