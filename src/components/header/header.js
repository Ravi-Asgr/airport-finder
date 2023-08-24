import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className="p-5 text-center">
            <NavLink className="mr-4 p-3 text-base" to={`/`}
                style={({ isActive }) =>
                isActive
                  ? {
                      //color: '#fff',
                      'textDecoration': 'underline',
                      'fontWeight': 'bold'
                    }
                  : { 
                        //color: '#545e6f', 
                        //background: '#f0f0f0' 
                    }
              } >Home</NavLink>
            <NavLink className="mr-4 p-3 text-base" to={`/about`} 
                style={({ isActive }) =>
                isActive
                  ? {
                      //color: '#fff',
                      'textDecoration': 'underline',
                      'fontWeight': 'bold'
                    }
                  : { 
                        //color: '#545e6f', 
                        //background: '#f0f0f0' 
                    }
              } >About</NavLink>
              <NavLink className="mr-4 p-3 text-base" to={`/flights`} 
                style={({ isActive }) =>
                isActive
                  ? {
                      //color: '#fff',
                      'textDecoration': 'underline',
                      'fontWeight': 'bold'
                    }
                  : { 
                        //color: '#545e6f', 
                        //background: '#f0f0f0' 
                    }
              } >Flights</NavLink>
            
        </header>
    );
}