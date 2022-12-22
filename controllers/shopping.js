const Shopping = require('../models/Shopping')
const mercadopago = require("mercadopago")

const controller = {

    addShop: async (req, res) => {
        let id = req.body.userId
        try {
            let user = await Shopping.findOne({ userId: id })
            if (user) {
                let num = user.products.filter(e => Object.keys(req.body.products)[0] == (Object.keys(e)[0]))
                console.log(num, 1)
                if (num.length > 0) {
                    num = num.map(e => Number(e[Object.keys(e)[0]]) + Number(req.body.products[Object.keys(e)[0]]))
                    let obj = user.products
                    console.log(num, 2)
                    obj.forEach((e, i) => {
                        if (Object.keys(req.body.products)[0] === Object.keys(e)[0]) {
                            obj[i][Object.keys(req.body.products)] = num
                        }
                    })
                    console.log(Object.keys(req.body.products)[0], obj)
                    let nuevo = await Shopping.findOneAndUpdate({ userId: id }, { "products": obj }, { new: true })
                    res.status(201).json({
                        response: nuevo,
                        success: true,
                        message: "Shopping add"
                    })
                }
                else {
                    let nuevo = await Shopping.findOneAndUpdate({ userId: id }, { $push: { "products": req.body.products } }, { new: true })
                    res.status(201).json({
                        response: nuevo,
                        success: true,
                        message: "Shopping add"
                    })
                }
            }
            else {
                let nuevo = await Shopping.create(req.body)
                res.status(201).json({
                    response: nuevo,
                    success: true,
                    message: "Shopping add"
                })
            }

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    delet: async (req, res) => {
        let id = req.body.userId
        try {
            console.log(id)
            let nuv = await Shopping.findOne({ userId: id })
            let obj = {}
            nuv.products.forEach(e => {
                if ((req.body.products) == (Object.keys(e)[0])) {
                    obj = e
                    return e
                }
            })
            console.log(obj)
            if (Object.keys(obj).length > 0) {
                let nuevo = await Shopping.findOneAndUpdate({ userId: id }, { $pull: { "products": obj } }, { new: true })
                res.status(201).json({
                    response: nuevo,
                    success: true,
                    message: "Shopping delete"
                })
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "Shopping error"
                })
            }

        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    read: async (req, res) => {
        let { id } = req.params
        try {
            let nuevo = await Shopping.findOne({ userId: id })
            res.status(201).json({
                response: nuevo,
                success: true,
                message: "Shopping find"
            })
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    pay: async (req, res) => {
        let obj = req.body
        try {
            // Crea un objeto de preferencia
            let preference = {
                items: [],
                back_urls:{
                    success: "http://localhost:3000/mycities",
                    failure: "http://localhost:3000/myprofile",
                    pending: "http://localhost:3000/asdasdsad"
                },
                auto_return: "approved"
            };
            obj.forEach(e => {
                preference.items.push({
                    title: e.name,
                    unit_price: e.price,
                    quantity: e.count,
                })
            })
            mercadopago.preferences
                .create(preference)
                .then(function (response) {
                    console.log(response)
                    res.status(201).json({
                        response: response.body.id
                    })
                    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
                })
                .catch(function (error) {
                    console.log(error);
                });


        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = controller