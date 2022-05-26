const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/auth");
const proprietaireAuth = require("../middlewares/proprietaireAuth");
const AdminAuth = require("../middlewares/adminAuth");
const stadeController = require("../controllers/stadeController");
router.get('/all',stadeController.getAllStades)
router.post('/nom',stadeController.getStadesByNom)
router.get('/id/:id',stadeController.getStadeById)
router.get('/proprietaire',proprietaireAuth,stadeController.getStadesByProprietaire)
router.get('/count',stadeController.countStades)
router.post('/add',proprietaireAuth,stadeController.ajoutStade)
router.put('/update',proprietaireAuth,stadeController.ajoutStade)

module.exports = router