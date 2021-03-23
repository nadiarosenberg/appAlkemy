import {Link} from 'react-router-dom';
import React, {Component} from 'react';

class Form extends Component {

constructor(props) {
    super(props);
    this.state = {
        concept: '',
        amount: '',
        input_date: '',
        input_type: '',
    }
};

/*
    this.handleChangeConcept= this.handleChangeConcept.bind(this);
    this.handleChangeAmount= this.handleChangeAmount.bind(this);
    this.handleChangeInput_date= this.handleChangeInput_date.bind(this);
    this.handleChangeInput_type= this.handleChangeInput_type.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

};*/

handleChange(property) {
    var self = this;
    return function _handleChange(event) {
        self.setState({[property]: event.target.value});
    }
};

/*
handleChangeConcept(event) {
    this.setState({
        concept: event.target.value,
    })
};

handleChangeAmount(event) {
    this.setState({
        amount: event.target.value,
    })
};

handleChangeInput_date(event) {
    this.setState({
        input_date: event.target.value,
    })
};

handleChangeInput_type(event) {
    this.setState({
        input_type: event.target.value,
    })
};*/

handleSubmit(event) {
    var self = this;
    console.log('Entre');
    fetch('movements/api/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            concept : self.state.concept,
            amount: self.state.amount,
            input_date: self.state.input_date,
            input_type: self.state.input_type,
        })
    });
    event.preventDefault();
};

  render() {
    return (
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-6">
      <form>
               <div className="form-group">
                    <label htmlFor="concept">Concepto:</label>
                    <input type="text" name="concept" id="concept" className="form-control" onChange={this.handleChange('concept')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Valor:</label>
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                            <input type="number" name="amount" id="amount" className="form-control"  onChange={this.handleChange('amount')}/>
                        </div>
                </div>
                <div className="form-group">
                    <label htmlFor="input_date">Fecha:</label>
                    <input type="date" name="input_date" id="input_date" className="form-control"  onChange={this.handleChange('input_date')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="input_type">Tipo:</label>
                    <select  type="text" name="input_type" id="input_type" className="form-control"  onChange={this.handleChange('input_type')}>
                        <option >Ingreso</option>
                        <option>Gasto</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block" value="Submit" onClick={this.handleSubmit}>Aceptar</button>
      </form>
    </div>
    </div>
        <div>
        <Link to= "/"><button type="button" className="btn btn-primary btn-block" >Volver a Home</button></Link>
    </div>
    </div>
    
/*Cierre de la funcion no tocar */
    )
  }
}

export default Form