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
import Navbar from "./navbar";

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

class Usuarios extends Component{
    
    
    constructor(props) {
        super(props)
        this.state = {
            admin : '' ,
            user: '' ,
            auth: false, 
            usuarioslist : [] ,
        }
    } 
    
   
    componentWillMount(){
        const padre = this ;
        const usertemp = localStorage.getItem('user')
        const usuario = JSON.parse(usertemp);
        const token = localStorage.getItem('token');
        
        console.log(usuario);
        if ( token) {
            
        if ( usuario.description == "User Admin"){
            this.setState({admin: true , user: usuario})
            
        }
        this.setState({auth:true})
        
        }else{
            
          this.setState({auth:false})  
        }
        
        
 
        Common.getusers( resp => {
            console.log(resp);
        } , error => {
            console.log(error);
        })
        
        
    }
    
  

    
    
    render() {
        return (
            
            <MuiThemeProvider>
            <Navbar history={this.props.history} />
                           <h1 style = {styles.card} >Usuarios:</h1>
     
    	      
        </MuiThemeProvider>
            );
    }
    
    
    
    
    
    
    
}
export default Usuarios;