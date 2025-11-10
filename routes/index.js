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

router.get("/criarevento", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Criar evento"
	};

	res.render("index/criarevento", opcoes);
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

	await sql.connect(async sql => {
		// Tudo aqui dentro é executado com a conexão aberta!

		let parametros = [
			evento.nome,
			evento.descricao
		]

		evento = await sql.query("insert into evento (nome, descricao) values (?, ?)", parametros);

		//...

	});

	res.json(true);

}));

router.get("/eventos", wrap(async (req, res) => {
	let eventos;

	await sql.connect(async sql => {
		// Tudo aqui dentro é executado com a conexão aberta!

		eventos = await sql.query("select id, nome, valor, data from evento");

		//...
	});

	let eventoA = {
		id: 1,
		data: "19/12/2025",
		tipo: "Evento A",
		nome: "O poder da IA nas estratégias de marca",
		valor: 70
	};

	let eventoB = {
		id: 2,
		data: "02/01/2026",
		tipo: "Evento B",
		nome: 'Big Data nas Empresas: Decisões Baseadas em Evidências',
		valor: 60
	};

	let eventoC = {
		id: 3,
		data: "23/12/2025",
		tipo: "Evento C",
		nome: 'Empresas Sustentáveis: Lucro e Propósito Caminhando Juntos',
		valor: 55
	};

	let eventoD = {
		id: 4,
		data: "28/01/2026",
		tipo: "Evento D",
		nome: 'Inovação Estratégica: Como se Destacar em Mercados Competitivos',
		valor: 80
	};

	let eventoE = {
		id: 5,
		data: "03/02/2026",
		tipo: "Evento E",
		nome: 'O Papel da Sustentabilidade no Mundo dos Negócios',
		valor: 75
	};

	let eventoF = {
		id: 6,
		data: "15/02/2026",
		tipo: "Evento F",
		nome: 'Tendências Corporativas e o Futuro dos Negócios',
		valor: 65
	};

	let eventoG = {
		id: 7,
		data: "30/01/2026",
		tipo: "Evento G",
		nome: 'Autoconhecimento e Alta Performance Profissional',
		valor: 70
	};

	let eventoH = {
		id: 8,
		data: "12/02/2026",
		tipo: "Evento H",
		nome: 'ESG Além do Conceito: Práticas que Geram Valor Real',
		valor: 55
	};

	let eventoI = {
		id: 9,
		data: "20/02/2026",
		tipo: "Evento I",
		nome: 'Equilíbrio, Foco e Performance: O Triângulo do Sucesso Pessoal',
		valor: 65
	};

	let eventoJ = {
		id: 10,
		data: "27/12/2026",
		tipo: "Evento J",
		nome: 'Decisões Inteligentes: Como Unir Análise e Intuição',
		valor: 80
	};

	let eventoK = {
		id: 11,
		data: "07/02/2026",
		tipo: "Evento K",
		nome: 'Reputação Corporativa: O Ativo Mais Valioso da Empresa',
		valor: 70
	};

	let eventoL = {
		id: 12,
		data: "17/01/2026",
		tipo: "Evento L",
		nome: 'Diversidade como Estratégia de Inovação e Crescimento',
		valor: 75
	};

	let eventosVindosDoBanco = [ eventoA, eventoB, eventoC, eventoD, eventoE, eventoF, eventoG, eventoH, eventoI, eventoJ, eventoK, eventoL ];

	let opcoes = {
		titulo: "Listagem de Eventos",
		eventos: eventosVindosDoBanco
	};

	res.render("index/eventos", opcoes);
}));

module.exports = router;
