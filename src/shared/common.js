import Axios from 'axios';
import {urls} from "./urls";

Axios.defaults.headers.common['Content-Type'] = 'application/json';
Axios.defaults.baseURL = 'https://repo-code-uninorte.herokuapp.com/api/v1/';
Axios.defaults.headers.common['Accept'] = 'application/json';
export default class Common {
    
    
    
    static getHeader() {
        return {
            'Authorization':'Bearer ' + localStorage.getItem('token') ,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    
    static login(email,password, onSuccess, onError) {
        Axios.post(urls.login,{
            email,
            password
        }).then(Response=>{ 
            const token = Response.data.data.token
            
            localStorage.setItem('user' , JSON.stringify(Response.data.user) )
            localStorage.setItem('token',token)            
            onSuccess(true);
        }).catch(Error=>{
            onError(Error
            )
        })
    }

    static registrarusuario(name , email , description ,password, onSuccess, onError) {
        Axios.post(urls.signUp,{
            name,
            email,
            description,
            password
        }).then(Response=>{ 
            
            
            onSuccess(true);
        }).catch(Error=>{
            onError(Error
            )
        })
    }

   static listarproyectos(tag , onSuccess , onError) {
            Axios({
              method: 'get',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/projects?tag1',
                  params: {
                tags: tag
                } ,
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    }    
    
       static listarmisproyectos(id, onSuccess , onError) {
            Axios({
              method: 'get',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/users/'+id+'/projects',
                 
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    }  
    
    
    
       static registrarusuario(name, email , description , password , onSuccess , onError) {
            Axios({
              method: 'post',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/users',
              data: {
                name,
                email ,
                description,
                password  
              },
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    } 

       static buscararchivo(id, onSuccess , onError) {
            Axios({
              method: 'get',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/projects/'+id+'/files',
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    } 

       static buscarportag(tag, onSuccess , onError) {
            Axios({
              method: 'get',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/projects',
              params: {
                tags: tag  
              } ,
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    }   
    
           static buscarproyecto(id, onSuccess , onError) {
            Axios({
              method: 'get',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/projects/'+id ,
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    }

           static buscarusuario(id, onSuccess , onError) {
            Axios({
              method: 'get',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/users/'+id ,
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    }

    
        static newproject(name , description , tags , collaborators, onSuccess, onError) {
            console.log(this.getHeader());
            Axios({
              method: 'post',
              url: urls.createProject,
              data: {
                name,
                description,
                tags,
                collaborators
              },
              headers: this.getHeader(),
            }).then(response=>{
                
                
                onSuccess(response);
                return response;
                
            }).catch(error=>{
                onError(error)
            });
    }

        static actualizarinfoprojecto(id,name , description , tags, collaborators,  onSuccess, onError) {
            console.log(this.getHeader());
            Axios({
              method: 'put',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/projects/'+id,
              data: {
                name,
                description,
                tags,
                collaborators
              },
              headers: this.getHeader(),
            }).then(response=>{
                
                
                onSuccess(response);
                return response;
                
            }).catch(error=>{
                onError(error)
            });
    }  

        static actualizarinfoperfil(id,name , email ,  description ,  onSuccess, onError) {
            Axios({
              method: 'put',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/users/'+id,
              data: {
                name,
                email , 
                description,
              },
              headers: this.getHeader(),
            }).then(response=>{
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    } 
    
        static borrarproyecto(projectid, onSuccess, onError) {

            Axios({
              method: 'delete',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/projects/' + projectid,
              headers: this.getHeader(),
            }).then(response=>{
                
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    }     
  
        static subirarchivo(files, projectid, onSuccess, onError) {
            console.log(this.getHeader());
            const formData = new FormData();
            formData.append('files', files);
            Axios({
              method: 'put',
              url: 'https://repo-code-uninorte.herokuapp.com/api/v1/projects/' + projectid + '/files',
              data: formData,
              headers: this.getHeader(),
            }).then(response=>{
                
                onSuccess(response);
                return response;
            }).catch(error=>{
                onError(error)
            });
    }  
    
    
            static listar(onSuccess , onError) {
        Axios.get(urls.getAllUsers,{
 
        }).then(Response=>{ 
            
            return Response ; 
            onSuccess(true);
        }).catch(Error=>{
            onError(Error
            )
        })
    }
    
};

