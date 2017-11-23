


export const  urls = {

    'getProject':  '/projects/:id',
    'getProjectRating':  '/projects/:id/ratings',
    'getAllProjects':  '/projects',
    'getAllUsers':  '/users',
    'getAdmins':  '/admins',
    'getUser':  '/users/:id',
    'getUserProjects':  '/users/:id/projects',
    'login':  '/login/email',
    'signUp':  '/users',
    'createProject':  'projects',
    'setProjectRating':  '/projects/:projectId/ratings',
    'setAdmin':  '/admins',
    'updateUserProfile':  '/users/:id',			//name: string, email: string, description: string
    'updateUserProfileFD':  '/users/:id/avatar',		//avatar
    'updateProjectInfo':  '/projects/:id',
    'updateProjectFiles':  '/projects/:projectId/files',  //only Form Data
    'deleteProject':  '/projects/:projectId',
    'deleteAdmin':  '/admins',

};