import {Link} from 'react-router-dom';
import React, {Component} from 'react';

class SideBar extends Component {
  render() {
    return(
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
    )
  }
};

export default SideBar 