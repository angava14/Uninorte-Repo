import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Common from "../shared/common";
import Chip from 'material-ui/Chip';

class NewProject extends Component{
    
    
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            nombreproyecto: '' ,
            descripcion: '' ,
            admin : false , 
            contador: 0 ,
            chipData: [] ,
        
        }
        this.handleChange = this.handleChange.bind(this);
        this.getFileName = this.getFileName.bind(this);
        this.crearproyecto = this.crearproyecto.bind(this);
        this.agregartag = this.agregartag.bind(this);
            this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    
    } 
    
    
    
      renderChip(data) {
    return (
      <Chip
        key={data.key}
        
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }
    
    agregartag(){
        const tag = document.getElementById('tags').value;
        this.state.chipData.push({ label: tag})
        this.setState({ contador: this.state.contador + 1});
    }
    componentWillMount(){
         const token = localStorage.getItem('token');
         if (token){
             this.setState({admin:true})
         }else{
             
         }
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
    
    
          crearproyecto(){
              const padre = this ;
        const archivo  = this.state.file ; 
        const nombrearchivo = this.state.file.name ; 
        const  nombreproyecto = this.state.nombreproyecto ;
        const descripcion = this.state.descripcion ;
        
         const tags = new Array() ;
        for ( let i = 0 ; i < this.state.chipData.length ; i++){
            tags[i] = this.state.chipData[i].label ;
        }
        const colaboradores = []    
        console.log(tags);
    
        Common.newproject (nombreproyecto , descripcion , tags , colaboradores , response => {
            console.log(response);
            Common.subirarchivo(archivo , response.data.data.id , resp => {
                console.log(resp);
            } , error => {
                
            } )
            
        } , erro => {
            
        
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
                              title="Crear Proyecto"
                              
                              className="text-center  pt-3"
                            />
                            <div className="card-body">
                                <div className="d-flex flex-column">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Nombre del proyecto</label>
                                        <input name="nombreproyecto" onChange={this.handleChange} type="text" className="form-control" id="nombreproyecto"  placeholder="Nombre" />
                                       
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputDescrp">Descripcion</label>
                                        <input name='descripcion' onChange={this.handleChange} type="text" className="form-control" id='descripcion' placeholder="Description" />
                                    </div>
                                    
                                    <Card>
                                    <CardHeader
                                       title="Seleccionar Archivo"/>
                                       
                                         
                                                    <input type='file'  id="documentselector"  onChange={this.getFileName}/>
                                                     <br/>
                                         <div className="form-group">
                                          <label htmlFor="exampleInputDescrp">Ingresar Tags</label>
                                          <input name='tags'  type="text" className="form-control" id='tags' placeholder="Tags" />
                                          <button   className="btn btn-primary mr-3" onClick={ () => this.agregartag() }>Agregar Tag</button>
                                        </div>
                                    </Card>
                                    
                                    <div className="text-center">
                                          {this.state.chipData.map(this.renderChip, this)}
                                         <button   className="btn btn-primary mr-3" onClick={ () => this.crearproyecto() }>Crear proyecto</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
               
            </div >
        </MuiThemeProvider>
            );
    }
    
    
    
    
    
    
    
}
export default NewProject;