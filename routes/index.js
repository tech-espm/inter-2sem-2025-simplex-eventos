const express = require("express");
const wrap = require("express-async-error-wrapper");
const sql = require("../data/sql");

const router = express.Router();

router.get("/", wrap(async (req, res) => {

	

	res.render("index/index");
}));

router.get("/sobreaequipe", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Sobre a Equipe"
	};

	res.render("index/sobreaequipe", opcoes);
}));

router.get("/perfil", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Perfil"
	};

	res.render("index/perfil", opcoes);
}));

router.get("/dashboard", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Dashboard"
	};

	res.render("index/dashboard", opcoes);
}));

router.get("/inscricao", wrap(async (req, res) => {
	let id = parseInt(req.query["id"]);

	let eventos;

	await sql.connect(async sql => {
		eventos = await sql.query("select id, nome, categoria, endereco, valor, date_format(data, '%d/%m/%Y') data, descricao, capacidade from evento where id = ?", [id]);
	});


	let opcoes = {
		titulo: "Inscricao",
		evento: eventos[0]
	};

	res.render("index/inscricao", opcoes);
}));

router.get("/criarevento", wrap(async (req, res) => {

	

	await sql.connect(async sql => {
		// Tudo aqui dentro é executado com a conexão aberta!

		eventos = await sql.query("select id, nome, categoria, endereco, valor, data, descricao, capacidade from evento");

		//...
	});


	let opcoes = {
		titulo: "Criar evento", 
	};

	res.render("index/criarevento", opcoes);
}));

router.get("/editarperfil", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Editar Perfil"
	};

	res.render("index/editarperfil", opcoes);
}));

router.get("/editarevento", wrap(async (req, res) => {

	let opcoes = {
		titulo: "Editar Evento"
	};

	res.render("index/editarevento", opcoes);
}));

router.get("/editarinscricao", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Editar Inscrição"
	};

	res.render("index/editarinscricao", opcoes);
}));


router.post("/api/criarevento", wrap(async (req, res) => {
	let evento = req.body;

	if (!evento.nome) {
		res.status(400).json("Nome inválido!");
		return;
	}

	if (!evento.descricao) {
		res.status(400).json("Descrição inválida");
		return;
	}

	if (!evento.endereco) {
		res.status(400).json("Endereço inválido");
		return;
	}

	if (!evento.categoria) {
		res.status(400).json("Categoria inválida");
		return;
	}

	if (!evento.valor) {
		res.status(400).json("Valor inválido");
		return;
	}

	if (!evento.capacidade) {
		res.status(400).json("Capacidade inválida");
		return;
	}

	if (!evento.data) {
		res.status(400).json("Data inválida");
		return;
	}

	await sql.connect(async sql => {
		// Tudo aqui dentro é executado com a conexão aberta!

		let parametros = [
			evento.nome,
			evento.descricao,
			evento.endereco,
			evento.categoria,
			evento.valor,
			evento.capacidade,
			evento.data
		]

		evento = await sql.query("insert into evento (nome, descricao, endereco, categoria, valor, capacidade, data) values (?, ?, ?, ?, ?, ?, ?)", parametros);

		//...

	});

	res.json(true);

}));

router.get("/eventos", wrap(async (req, res) => {
	
	let lista;

	await sql.connect(async sql => {
		// Tudo aqui dentro é executado com a conexão aberta!

		lista = await sql.query("select id, nome, date_format(data, '%d/%m/%Y') as data, valor from evento");

		//...
	});

	let opcoes = {
		titulo: "Eventos",
		eventos: lista, 
	};

	res.render("index/eventos", opcoes);
}));

module.exports = router;
