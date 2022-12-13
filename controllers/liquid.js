const Liquid = require('../models/Liquids')

const controller = {

    create: async(req,res) => { //método para crear un Liquid
        try {
            let nuevo = await Liquid.create(req.body)
            res.status(201).json({
                id: nuevo._id,
                success: true,
                message: "Liquid create"
            })
        } catch(error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    read: async(req,res) => { //método para leer/obtener todos los Liquid
        let { query } = req 
        
        //en la petición agrego un signo de pregunta ? para poder enviar una query/consulta
        //a la base de datos
        try {
            let todos = await Liquid.find()
            console.log(todos)
            let array = todos
            if(query.user_id){
                array = todos.filter(e => e.userId == query.user_id)
            }
            for(let name in query){
                if( name === "name"){
                    array = array.filter(e=> e.name.toLowerCase().includes(query.name.toLowerCase()))
                }
                if( name === "category"){
                    if(query.category.length)
                    {array = array.filter(e=>  query.category.toLowerCase().includes(e.category.toLowerCase()) )}
                }
            }
            if (array) {
                res.status(200).json({
                    response: array,
                    success: true,
                    message: "find liquids"
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "not find liquids"
                })
            }            
        } catch(error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }        
    },
    readOne: async (req, res) => {

        let { id } = req.params

        try {
            let liquid = await Liquid.findOne({ _id: id })

            if (liquid) {
                res.status(200).json({
                    success: true,
                    message: 'Liquid found',
                    data: liquid,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Liquid not found',
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },
    update: async (req, res) => {
        let { id } = req.params;

        try {
            let liquid = await Liquid.findOneAndUpdate({ _id: id }, req.body, { new: true });
            if(liquid){
                res.status(200).json({
                    success: true,
                    message: 'Liquid updated',
                    data: liquid,
                });
            }else{
                res.status(404).json({
                    success: false,
                    message: 'Liquid not found',
                });
            }
        }catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },
    destroyOne: async (req, res) => {
        let { id } = req.params;

        try {
            let liquid = await Liquid.findOneAndDelete({ _id: id });
            if(liquid){
                res.status(200).json({
                    success: true,
                    message: 'Liquid deleted',
                    data: liquid,
                });
            }else{
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
    }catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

}

module.exports = controller