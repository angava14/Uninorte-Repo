import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Common from "../shared/common";
import IconButton from 'material-ui/IconButton';
import Archicon from 'material-ui/svg-icons/content/archive';

 var styles={
  large: {
    width: 120,
    height: 120,
    padding: 0,
  }
}

const iconbutton ={
    padding: 0 
}


class VerProyecto extends Component{
    
    
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            nombreproyecto: '' ,
            descripcion: '' ,
            codigo: '',
            fecha : '' ,
            fechaactualizacion: '' ,
            creador: '',
            idproyecto: localStorage.getItem("idproyecto") ,
            archivoexist : false ,
            
        
        }
        this.handleChange = this.handleChange.bind(this);
        this.getFileName = this.getFileName.bind(this);
        this.actualizarinfo = this.actualizarinfo.bind(this);
         this.borrarproyecto = this.borrarproyecto.bind(this);
    } 
    
    componentWillMount(){
        const padre = this;
        const idproyecto = this.state.idproyecto ;
        Common.buscarproyecto(idproyecto , resp => {
            padre.setState({ nombreproyecto: resp.data.data.name , 
            descripcion: resp.data.data.description , 
            fecha: resp.data.data.created_at ,
            creador: resp.data.data.owners[0].name , 
            fechaactualizacion: resp.data.data.updated_at , 
            codigo: resp.data.data.id ,
            })
        }, error => {
            console.log(error)
        })
        
        
        Common.buscararchivo(idproyecto , resp => {
            console.log(resp);
            if (resp){
                padre.setState({ archivoexist: true });
            }
            
        } , error => {
            
        })
        
        
    }
    
        handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
            
        });
        }
        
         getFileName(){
        var name = document.getElementById('documentselector');
        this.state.file = name.files.item(0);
         }
    
    
        actualizarinfo(){
        const archivo  = this.state.file ; 
        const nombrearchivo = this.state.file.name ; 
        const creador = this.state.creador ; 
        const descripcion = this.state.descripcion ;
        const nombreproyeto = this.state.nombreproyecto ; 
        const fecha = this.state.fecha ; 
        const padre= this ; 
        const tags = new Array('tag1' ,'tag2' , 'tag3') ;
        const colaboradores= [];
        if(archivo){
           Common.subirarchivo(archivo ,padre.state.idproyecto , resp => {
                
            } , error => {
                
            } ) 
        }
        
        Common.actualizarinfoprojecto(this.state.idproyecto,nombreproyeto , descripcion , tags , colaboradores , resp => {
            console.log(resp);
        }, error => {
            console.log(error);
        })
        
        /* todas las variables de la pagina */
        }
    
    descargar(){
        this.props.history.push
    }
    
    borrarproyecto(){
        Common.borrarproyecto( this.state.idproyecto , resp => {
            console.log(resp);
         }, error => {
             console.log(error);
         })
    }
    
    render() {
        return (
            
            <MuiThemeProvider>
                <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10">
                        <Card>
                        <CardHeader
                              title={"Nombre: "+ this.state.nombreproyecto}
                              titleStyle={{'fontSize':'20px', 'fontWeight':'bold'}}
                              className="text-center  pt-3"
                            />
                            <div className="card-body">
                               <label > <b>Descripcion:</b></label>
                               <br/>
                                <TextField  value={this.state.descripcion} multiLine={true} rows={5} onChange={this.handleChange} name="descripcion" fullWidth={true}/>
                                <br/>
                            <label ><b> Codigo:</b> </label>
                            <TextField  value={this.state.codigo}  name="codigo"/>
                             <br/>
                             
                            <label ><b> Fecha de Creacion:</b> </label>
                            <TextField  value={this.state.fecha} name="fecha"/>
                            <br/>
                            <label ><b> Fecha de Actualizacion:</b> </label>
                            <TextField  value={this.state.fechaactualizacion}  name="fechaactualizacion"/>
                            <br/>
                            <label ><b> Subir Archivo .Zip:</b> </label>
                            <input type='file'  id="documentselector"  onChange={this.getFileName}/>
                            <br/>
                            <label ><b> Creador: </b></label>
                            <TextField  value={this.state.creador} />   
                            <br/>
                            <div className="text-center">
                            <button  className="btn btn-primary mr-3" onClick={ () => this.actualizarinfo ()}>Actualizar Informacion</button>
                            <button  className="btn btn-primary mr-3"onClick={ () => this.borrarproyecto ()}  >Borrar Proyecto</button>
                            </div>
                            </div>
                        </Card>
                    </div>

                </div>
        { this.state.archivoexist == true ?        
                 <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-10">
                        <Card>
                        <CardHeader
                              title="Archivo"
                              titleStyle={{'fontSize':'20px', 'fontWeight':'bold'}}
                              className="text-center  pt-3"
                            />
                            <div className="card-body">
                            
                                <IconButton style={iconbutton} iconStyle={styles.large} onClick={() => window.open('https://repo-code-uninorte.herokuapp.com/api/v1/projects/'+this.state.idproyecto+"/files")}><Archicon /></IconButton> 
                                <label > Click para Descargar </label>
                               
                            </div>
                        </Card>
                    </div>

                </div>
             : null }   
                
            </div >
        </MuiThemeProvider>
            );
    }
    
    
    
    
    
    
    
}
export default VerProyecto;