
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

function Sidebar() {

  const [showNav, setShowNav] = useState(true)

  return <div className={`body-area${showNav ? ' body-pd' : ''}`}>
    <header className={`header${showNav ? ' body-pd' : ''}`}>
      <div className="header_toggle">
        <i
          className={`bi ${showNav ? 'bi-x' : 'bi-list'}`}
          onClick={() => setShowNav(!showNav)} />
      </div>
      <div className="header_img">
        <img
          src="https://reqres.in/img/faces/5-image.jpg"
          alt="Clue Mediator" />
      </div>
    </header>
    <div className={`l-navbar${showNav ? ' show' : ''}`}>
      <nav className="nav">
        <div>
          <a href="https://cluemediator.com" className="nav_logo" rel="noopener">
            <i className='bi bi-alexa nav_logo-icon' /> <span className="nav_logo-name">MPMS</span>
          </a>
          <div className="nav_list">
            <a href="./Home"  className="nav_link" rel="noopener">
              <i className='bi bi-people nav_icon' /><span className="nav_name">Prediction</span>
            </a>
            <a href="./ManageMechanic"  className="nav_link" rel="noopener">
              <i className='bi bi-person-check nav_icon' /><span className="nav_name">Manage mech+
              </span>
            </a>
            <a href="./Filter_specialty"  className="nav_link" rel="noopener">
              <i className='bi bi-person-check nav_icon' /><span className="nav_name">contact Mechanic</span>
            </a>
          </div>
        </div>
        <a href="https://cluemediator.com"  className="nav_link" rel="noopener">
          <i className='bi bi-box-arrow-left nav_icon' /><span className="nav_name">SignOut</span>
        </a>
      </nav>
    </div>
    <div className="pt-4 pb-4">
      
      <h4></h4>
      
    </div>
  </div>
}

export default Sidebar;