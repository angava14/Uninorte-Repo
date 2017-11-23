import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton' ;
import Common from "../shared/common";

const card ={
	display:'flex',
	'justifyContent':'center',
	padding:'0px',
	'paddingTop':'16px',
}

const itemcolor ={
  color: '#FFFFFF',
  marginTop: '1%',
  marginRight: '2%',
  display:'flex',
  height: '5%'
}

const carta = {
    width: '70%',
    margin: '10% 15% 0% 15%',
}

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
           nombre: '' ,
           perfil: '' ,
           correo : '' ,
           file: ' ' ,
           fechaderegistro: '',
           ultimaactualizacion: '',
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleOpen = this.handleOpen.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.getFileName = this.getFileName.bind(this);
            this.subirimagen = this.subirimagen.bind(this);
            this.guardarinfo = this.guardarinfo.bind(this);
    }
    
    
    
    componentWillMount(){
        const padre = this ;
        const token  = localStorage.getItem('token');
        const user = localStorage.getItem('user')
        const usuario = JSON.parse(user);
        Common.buscarusuario(usuario.id , resp => {
            console.log(resp);
            padre.setState( { nombre: resp.data.data.name , correo: resp.data.data.email , perfil: resp.data.data.description ,
            fechaderegistro: resp.data.data.created_at , ultimaactualizacion: resp.data.data.updated_at })
        } , error =>{
            console.log(error);
        });
        
        
        }
          handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }

    getFileName(){
        var name = document.getElementById('imageselector');
        this.state.file = name.files.item(0);
        
    }
    
          handleClose () {
    this.setState({open: false});
  };
  
  handleOpen() {
    this.setState({open: true});
  };
    
    
    subirimagen(){
        const archivo  = this.state.file ; 
        const nombre = this.state.file.name ; 
        
        /* Con esas 2 variables ya tienes el archivo ( la foto )  y el nombre */
        
    }
    
     guardarinfo(){
        const user = localStorage.getItem('user')
        const usuario = JSON.parse(user);
        const nombre  = this.state.nombre ; 
        const perfil = this.state.perfil ; 
        const correo = usuario.email ;
        console.log(correo);
        /* Con esas 2 variables ya tienes lo que esta en el input de nombre y en el input de perfil*/
        Common.actualizarinfoperfil(usuario.id , nombre , correo , perfil , resp =>{
            console.log(resp);
        } , error => {
            console.log(error);
        });
    }
    


    render() {
        return (
            <div style={carta}>
           <MuiThemeProvider>
           <div>
           		<Card  >
		<CardTitle style={card} titleStyle={card}  title="Mi Perfil"  />
		
    	<CardActions>
          <div className='cuadrado'>
          <div className='division1' >
          <Avatar src={this.state.avatar} size={240} className="avatar" style={{ marginBottom: '3%'}}/>
                                        <div className="text-center">
                                        <button  className="btn btn-primary mr-3"  onClick={this.handleOpen}>Cambiar Imagen</button>
                                        </div>
          </div>
          <div className='division2'>
          
                        <div className="form-group">
                        <label htmlFor="exampleInputDescrp">Nombre</label>
                        <input name="nombre" onChange={this.handleChange} type="text" disabled={true} className="form-control" id="nombre"  value={this.state.nombre} />
                        </div>
          
                        <div className="form-group">
                        <label htmlFor="exampleInputDescrp">Perfil</label>
                        <input name="perfil" onChange={this.handleChange} type="text" className="form-control" id="perfil" value={this.state.perfil} />
                        </div>
          
                        <div className="form-group">
                        <label htmlFor="exampleInputDescrp">Correo:</label>
                        <h6 >{this.state.correo} </h6>
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="exampleInputDescrp">Fecha de Registro:</label>
                        <h6 >{this.state.fechaderegistro} </h6>
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="exampleInputDescrp">Ultima Actualizacion:</label>
                        <h6 >{this.state.ultimaactualizacion} </h6>
                        </div>
                        
          <form>
                        <div className="text-center">
                        <button  className="btn btn-primary mr-3" onClick={ () => this.guardarinfo ()}>Guardar</button>
                         </div>
          </form>
          
          </div>
          </div>
		</CardActions>
        </Card>
           
           
     <Dialog
          title="Cambiar Avatar"
          modal={true}
          open={this.state.open}
        >
        <h4> Recomendado: 240x204 pixeles</h4>
        <br/>
<input type='file' id="imageselector" accept="image/*" onChange={this.getFileName}/>
<br/>
<FlatButton style={itemcolor} label="Cancelar" onClick={ () => this.handleClose()}  backgroundColor="#00bcd4" hoverColor="#006775" />
<FlatButton style={itemcolor} label="Guardar" backgroundColor="#00bcd4" hoverColor="#006775" onClick={ () => this.subirimagen()} />
</Dialog>
           
           
           </div>
           </MuiThemeProvider>
            </div>
        );
    }
}

export default Perfil;