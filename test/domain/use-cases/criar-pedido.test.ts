/*
1 - Deve criar um pedido com 3 produtos (com descrição, preço e quantidade) e calcular o valor total
2 - Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o total (percentual sobre o total do pedido)
3 - Não deve criar um pedido com cpf inválido (lançar algum tipo de erro)
4 - Não deve fazer pedido com produto que não existe
*/

import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

describe('Criar pedido tests', () => {
    test('Não deve criar pedido com CPF inválido', async () => {
        var input = {
            cpf: "111.111.111-11"
        }

        var response = await axios.post("http://localhost:3000/checkout", input)
        expect(response.status).toBe(400)
        var message = response.data
        expect(message).toBe("Invalid CPF")
    });

    test('Não deve fazer pedido com produto que não existe', async () => {
        var input = {
            cpf: "419.274.778-24",
            items: [
                { idProduto: 4, quantidade: 1 },
            ]
        }

        var response = await axios.post("http://localhost:3000/checkout", input);
        expect(response.status).toBe(400);
        var message = response.data
        expect(message).toBe("Invalid Product")
    });

    test('Deve criar um pedido com 3 produtos e calcular o valor total', async () => {
        var input = {
            cpf: "419.274.778-24",
            items: [
                { idProduto: 1, quantidade: 1 },
                { idProduto: 2, quantidade: 1 },
                { idProduto: 3, quantidade: 1 }
            ]
        }

        var response = await axios.post("http://localhost:3000/checkout", input);
        expect(response.status).toBe(201);
        var total = response.data.total
        expect(total).toBe(6030);
    });

    test('Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o total', async () => {
        var input = {
            cpf: "419.274.778-24",
            items: [
                { idProduto: 1, quantidade: 1 },
                { idProduto: 2, quantidade: 1 },
                { idProduto: 3, quantidade: 1 }
            ],
            cupon: "CUPON20"
        }

        var response = await axios.post("http://localhost:3000/checkout", input);
        expect(response.status).toBe(201);
        var total = response.data.total
        expect(total).toBe(4824);
    });
});
