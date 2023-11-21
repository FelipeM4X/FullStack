const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require(mysql)

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

// trabalhar com dados no formato json
app.use(express.urlencoded({
    extended: true
}))

// CRUD => Create, read, update and delete


app.use(express.json())

//rotas

app.post("/delete", (request, response) => {
    const { id } = request.body
    
    const sql = `
    DELETE FROM books 
    WHERE id = ${id}
    `

    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        response.redirect("/")
    })
})

app.post("/edit/save", (request, response) => {
    const {id,title,pageqty} = request.body

    const sql = `
        UPDATE books
        SET title = '${title}', pageqtty = '${pageqty}'
        WHERE id = ${id}
    `

    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        response.redirect("/")
    })
})

app.post("/register/save", (request, response) => {
    const {title, pageqty} = request.body

    const query = 
    `INSERT INTO books (title, pageqty)
    VALUES ('${title}', '${pageqty}')`

    conn.query(query, (error) => {
        if (error){
            console.log(error)
            return
        }
        response.redirect("/")
    })
})

app.get("/edit/:id", (request, response) => {
    const id = request.params.id
    const sql = `
        SELECT * FROM books
        WHERE id = ${id}
    `

    conn.query(sql, (error, data) => {
        if(error) {
            return console.log(error)
        }

        const book = data[0]

        response.render('edit', {book})
    })
})

app.get("/book/:id", (request, response) => {
    const id = request.params.id

    const sql = `
    SELECT * FROM books 
    WHERE id=${id}
    `

    conn.query(sql, (error, data) => {
        if(error){
            return console.log(error)
        }

        const book = data[0]

        response.render("book", { book })
    } )
} )

app.get("/register", (request, response) => {
    response.render("register")
} )

app.get('/', (request, response) => {
    const query = 'SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const books = data

        console.log(books)

        response.render("home", {books})
    })
})

//conexao com mysql

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if(error) {
    console.log(error)
    return
    }
    console.log("Conectado ao MySQL!")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000!")
    })
})