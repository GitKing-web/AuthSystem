const { Router } = require('express');
const { helloWorld,
    handleSignup,
    handleLogin,
    handleUpdate,
    getUser,
    getAllUsers,
    deleteUser,
    handlePost,
    getPost,
    getAllPosts,
    postUpdate,
    deletePost,
    renderEJS,
    signUp,
    login,
    renderDashboard
 } = require('../controllers/routes.controllers')

const { tokenAuthorization, adminTokenAuthorization, checkUserAuthorization }= require('../middlewares/auth.middleware')
const router = Router();

//GET REQUESTS
// render ejs routes
router.get('/', renderEJS)
router.get('/register', signUp)
router.get('/login', login)
router.get('/dashboard', checkUserAuthorization, renderDashboard)

router.get('/', helloWorld)
router.get('/user/:id', adminTokenAuthorization, getUser)
router.get('/users', adminTokenAuthorization, getAllUsers)
router.get('/user/post/:postId', tokenAuthorization, getPost)
router.get('/posts', adminTokenAuthorization, getAllPosts)
// POST REQUESTS
router.post('/signup', handleSignup)
router.post('/login', handleLogin)
router.post('/post', tokenAuthorization, handlePost)

// UPDATE REQUESTS
router.put('/update/user/:id', tokenAuthorization, handleUpdate)
router.put('/update/post/:postId', tokenAuthorization, postUpdate)

// DELETE REQUESTS
router.delete('/delete/user/:id', tokenAuthorization, deleteUser )
router.delete('/delete/post/:postId', tokenAuthorization, deletePost)

module.exports = router; 