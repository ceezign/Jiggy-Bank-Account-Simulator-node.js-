import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true} ));
app.use(express.static("public"))

let balance = 0.0;
let transactions = [];

// Deposit route
app.post("/deposit", (req, res) => {
    let amount = parseFloat(req.body.amount)
    if (isNaN(amount) || amount <= 0) {
        return res.send(" Deposit amount must be positive.");
    }
    balance = balance + amount
    transactions.push(` Deposited: $${amount.toFixed(2)}`);
    res.redirect("/");

})

// withdraw route
app.post("/withdraw", (req, res) => {
    let amount = parseFloat(req.body.amount)
    if (isNaN(amount) || amount <= 0) {
        return res.send(" Withdrawal amount must be positive.");
    }
    if (amount > balance) {
        return res.send("Insufficient funds!");
    }
    balance = balance - amount
    transactions.push(` Withdrew: $${amount.toFixed(2)}`);
    res.redirect("/");
});

// check balance route
app.get("/balance", (req, res) => {
    res.send(` Current Balance: $${balance.toFixed(2)}`);
});

app.get("/history", (req, res) => {
    if (transactions.length === 0) {
        return res.send(" No transactions yet. ")
    }
    res.send(`<h3> Transaction History</h3>
        <ul>
            ${transactions.map(t => `<li>${t}</li>`).join(" ")}
        </ul>`
    );
});

app.listen(PORT, () =>{
    console.log(` Bank simulator listening on ${PORT}`)
})