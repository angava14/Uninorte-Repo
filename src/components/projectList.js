import React, { Component } from 'react';
import Common from "../shared/common";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader,CardActions, CardTitle, CardText} from 'material-ui/Card';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import SvgIconFlag from 'material-ui/svg-icons/content/flag';
import {blue300, indigo900} from 'material-ui/styles/colors';


const styles = {
  block: {
    maxWidth: 200,
  },
  checkbox: {
    marginBottom: 16,width: 50,position: "absolute",right:0,
  },
   aligning: {
     display: 'inline-block',
  },chip: {
    margin: 2,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin:4,
  },card:{
   width: '80%' ,
   margin: "2% 10% 0% 10% "
  }
  
};
 function handleRequestDelete() {
    alert('You clicked the delete button.');
    }

class ProjectList extends Component{
    
    
    constructor(props) {
        super(props)
        this.state = {
            admin : '' ,
            user: '' ,
            auth: false, 
            projectlist : [] ,
        }
    } 
    
   
    componentWillMount(){
        const padre = this ;
        const usertemp = localStorage.getItem('user')
        const usuario = JSON.parse(usertemp);
        const token = localStorage.getItem('token');
        
        
        if ( token) {
            
        if ( usuario.description == "User Admin"){
            this.setState({admin: true , user: usuario})
            
        }
        this.setState({auth:true})
        
        }else{
            
          this.setState({auth:false})  
        }
        
        
  
  
        if (usuario) {
            Common.listarmisproyectos( usuario.id , resp => { 
                
                padre.setState({ projectlist : resp.data.data})
            } , err => { 
                
                
            })
        }
        
        
        
    }
    
    verproyecto(id){
    localStorage.setItem("idproyecto" ,id)
    this.props.history.push({pathname: '/verproyecto'})    
    }
    
    
    render() {
        return (
            
            <MuiThemeProvider>
                           <h1 style = {styles.card} >Mis Proyectos</h1>
                              {this.state.projectlist.map((item , i , objeto )=>{
             return (
    	         <Card style = {styles.card} key={item.id}>
                    <CardHeader
                              onClick= { () => this.verproyecto(item.id) }
                              title={item.name}
                              subtitle={"Fecha de Creacion :" + item.created_at}
                              style={{ cursor: 'pointer'}}
                    />
                    <CardText>{item.description}
                    </CardText>

                    <CardActions className="visibility"  >
                   
                    </CardActions>

                </Card>
                );
                              })}      
    	      
        </MuiThemeProvider>
            );
    }
    
    
    
    
    
    
    
}
export default ProjectList;