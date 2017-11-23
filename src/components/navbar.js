import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Common from "../shared/common";


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            admin : '' ,
            user: '' ,
            auth: false, 
        }
          this.logout = this.logout.bind(this);
          this.buscarportag = this.buscarportag.bind(this);
    } 
   
    
    componentWillMount(){
        
        const usertemp = localStorage.getItem('user')
        const usuario = JSON.parse(usertemp);
        const token = localStorage.getItem('token');
        
        if ( token) {
            
        if ( usuario.description == "User Admin"){
            this.setState({admin: true , user: usuario})
            
        }
        this.setState({auth:true})
        this.forceUpdate()
        }else{
            
          this.setState({auth:false})  
        }
        
        
    }
    
    logout(){
        localStorage.clear();
        this.props.history.push('/login')
        this.forceUpdate()
        
    }
    
    
    buscarportag(){
        const padre = this ;
    const valor = document.getElementById('tag').value;
    const tag = new Array(valor)
    Common.buscarportag(tag , resp => {
        localStorage.setItem('busqueda' , JSON.stringify(resp.data.data));
       
        window.location.href = "/search";
        
    } , error  => {
        console.log(error);
    })
    }
    
    render() {
        return (
            <nav className="navbar beforeDestroy navbar-expand-md navbar-light bg-light">
                <a style={{cursor: 'pointer'}} className="navbar-brand" href="/" >Code Uninorte</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                       { this.state.auth == true ?
                       <ul className="navbar-nav mr-auto">
                       
                        <li className="nav-item">
                            <a className="nav-link" ><Link to="/">Home</Link></a>
                        </li>
                         <li className="nav-item">
                            <a className="nav-link" ><Link to="/newproject">Nuevo Proyecto</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" ><Link to="/perfil">Mi Perfil</Link></a>
                        </li>
                        

                        { this.state.admin == true ?
                        <div className="navbar-nav mr-auto" >
                           <li className="nav-item">
                             <a className="nav-link" ><Link to="/signup">Registrar</Link></a>
                        </li>
                        <li className="nav-item">
                             <a className="nav-link" ><Link to="/usuarios">Usuarios</Link></a>
                        </li>
                        </div> 
                            : null
                        }
                                                <li className="nav-item">
                             <a className="nav-link"  onClick={ () =>this.logout()}><Link to="/">Logout</Link></a>
                        </li>
                        
                        </ul>
                        :
                        <ul className="navbar-nav mr-auto">
                         
                        <li className="nav-item active">
                         <a className="nav-link" ><Link to="/login">Login</Link></a>
                        </li>
                        <li className="nav-item">
                         <a className="nav-link" ><Link to="/">Home</Link></a>
                        </li>
                        
                        </ul>
                          }
                    
                    <div className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id='tag' />
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.buscarportag() }>Search</button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;