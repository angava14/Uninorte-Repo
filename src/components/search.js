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

class Search extends Component{
    
    
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
        const usertemp = localStorage.getItem('busqueda')
        const busqueda = JSON.parse(usertemp);
        const token = localStorage.getItem('token');
        console.log(busqueda);
        this.setState({projectlist: busqueda}) ;
        
        if ( token) {
            
        if ( busqueda.description == "User Admin"){
            this.setState({admin: true , user: busqueda})
            
        }
        this.setState({auth:true})
        
        }else{
            
          this.setState({auth:false})  
        }
        
    }
    
    verproyecto(id){
    localStorage.setItem("idproyecto" ,id)
    this.props.history.push({pathname: '/verproyecto'})    
    }
    
    
    render() {
        return (
            
            <MuiThemeProvider>
            <Navbar history = {this.props.history}/>
                          <h1 style = {styles.card} >Resultados: </h1>
                              {this.state.projectlist.map((item , i , objeto )=>{
                              console.log(item);
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
                    <CardText> Creado Por: {item.owners[0].name}
                    </CardText>
                    <CardActions   >
                                      <h6>Tags : </h6> {item.tags.map(( x , i , objeto )=>{ 
                  return(
                 
                          <Chip
                             key={x.tag}
                            style={styles.chip}
                                  >
                             {x.tag}
                            </Chip>
                            
                    );
                   })} 
                   
                   
                   
                    </CardActions>
                </Card>
                );
                              })}      
    	      
        </MuiThemeProvider>
            );
    }
    
    
    
    
    
    
    
}
export default Search;