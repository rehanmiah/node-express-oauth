const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const {
	randomString,
	containsAll,
	decodeAuthCredentials,
	timeout,
} = require("./utils")
const e = require("express")

const config = {
	port: 9001,
	privateKey: fs.readFileSync("assets/private_key.pem"),

	clientId: "my-client",
	clientSecret: "zETqHgl0d7ThysUqPnaFuLOmG1E=",
	redirectUri: "http://localhost:9000/callback",

	authorizationEndpoint: "http://localhost:9001/authorize",
}

const clients = {
	"my-client": {
		name: "Sample Client",
		clientSecret: "zETqHgl0d7ThysUqPnaFuLOmG1E=",
		scopes: ["permission:name", "permission:date_of_birth"],
	},
	"test-client": {
		name: "Test Client",
		clientSecret: "TestSecret",
		scopes: ["permission:name"],
	},
}

const users = {
	user1: "password1",
	john: "appleseed",
}

const requests = {}
const authorizationCodes = {}

let state = ""

const app = express()
app.set("view engine", "ejs")
app.set("views", "assets/authorization-server")
app.use(timeout)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

 



app.get("/authorize", (req, res) => {
	const clientId = req.query.client_id
	const client = clients[clientId]
	if(!client){
		res.status(401).send("Error: client not authorized")
		return
	}
	else{
		res.status(200)
		return
	}
	if (
		typeof req.query.scopes !== "string" ||
		!containsAll(client.scopes, req.query.scopes.split(" "))
	){
		res.status(401).send("Error: invalid scopes requested")
		return
	}

	const requestId = randomString()
	requests[requestid] = req.query
	res.render("login", {
		client,
		scope:req.query.scope,
		requestId,
	})
})

app.post("/approve", (req, res) => {
	const { userName, password, requestId } = req.body
	if (!userName || users[userName] !== password){
		res.status(401).send("Error`: user not authorized")
		return

	}
})




const server = app.listen(config.port, "localhost", function () {
	var host = server.address().address
	var port = server.address().port
})

// for testing purposes

module.exports = { app, requests, authorizationCodes, server }

