import '../App.css';
import { Link } from 'react-router-dom'

function Nav() {
    const navStyle = {
        color:'white'
    }

  return (
    <div>
     <nav>
         <h3>Challenge</h3>
         <ul className="nav-links">
             <Link style={navStyle} to="/abm">
                <li>Abm</li>
             </Link>
             <Link style={navStyle} to="/">
                <li>Home</li>
             </Link>
         </ul>
     </nav>
    </div>
  );
}

export default Nav;