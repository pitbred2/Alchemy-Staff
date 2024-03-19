const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0399bd4d18bf0c902dc1e475bff42ecfdb725fa3e3f4fdbdbba0911ab4bb3d3369": 100,
  "0367096677267a0f7cac16056a0ade1e57d759ee28230e07a314f7c9115efd7e15": 50,
  "02150d6969efb134d0d47891f261246418df69405bb1ab6a9242cf54f2b0f3ad70": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, messageHash, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  var string = signature;
  eval('var obj=' + string);

  const isSigned = secp256k1.verify(obj, messageHash, sender);

  if (balances[sender] < amount || !isSigned) {
    res.status(400).send({ message: "Not enough funds or You do not know privateKey!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
