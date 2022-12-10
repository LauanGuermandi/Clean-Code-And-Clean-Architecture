import express from "express";
import { validate } from "./CpfValidator"
const app = express();
app.use(express.json());

const products = [
	{ idProduct: 1, description: "A", price: 1000 },
	{ idProduct: 2, description: "B", price: 5000 },
	{ idProduct: 3, description: "C", price: 30 }
];

const cupons = [
    { codigo: "CUPON20", desconto: 20 }
];

app.post("/checkout", (req, res) => {
    var total = 0;
    var isValid = validate(req.body.cpf)

    if(!isValid)
    {
        return res.status(400).send("Invalid CPF");
    }

    for(const item of req.body.items)
    {
        var product = products.find((p) => p.idProduct == item.idProduto)
        if(!product)
        {
            return res.status(400).send("Invalid Product");
        }

        total += product.price
    }

    const cuponCode = req.body.cupon
    if(cuponCode)
    {
        var cupon = cupons.find((cupon) => cupon.codigo == cuponCode)
        if(cupon)
        {
            total = total - (total * (cupon.desconto/100))
        }
    }

    return res.status(201).json({total});
});

app.listen(3000);
