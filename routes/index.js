const express = require("express");
const wrap = require("express-async-error-wrapper");

const router = express.Router();

router.get("/", wrap(async (req, res) => {
	res.render("index/index");
}));

router.get("/perfil", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Perfil"
	};

	res.render("index/perfil", opcoes);
}));

router.get("/eventos", wrap(async (req, res) => {
	let eventoA = {
		id: 1,
		nome: "Evento A",
		valor: 25
	};

	let eventoB = {
		id: 2,
		nome: "Evento B",
		valor: 15
	};

	let eventoC = {
		id: 3,
		nome: "Evento C",
		valor: 100
	};

	let eventosVindosDoBanco = [ eventoA, eventoB, eventoC ];

	let opcoes = {
		titulo: "Listagem de Eventos",
		produtos: eventosVindosDoBanco
	};

	res.render("index/eventos", opcoes);
}));

module.exports = router;
