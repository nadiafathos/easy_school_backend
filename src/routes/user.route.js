import express from 'express';
import { getAllUsers,updateUser,getUserById,deleteUser,loginUser, createUser } from '../controllers/user.controller.js';

//import {authenticate} from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/role.middlware.js";
import authMiddleware from '../middlewares/auth.middleware.js';

const router =express.Router();

//routes publiques

router.post('/register',createUser);
router.post('/login',loginUser);

//routes protégées (necessitant un token)

// admin uniquement
router.get(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  getAllUsers
);

// admin ou parent
router.get(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'parent'),
  getUserById
);

// admin uniquement
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  updateUser
);

router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  deleteUser
);




export default router;

