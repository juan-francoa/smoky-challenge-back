const Equipment = require('../models/Equipment')

const controller = {

    create: async(req,res) => { //método para crear un Equipment
        try {
            let nuevo = await Equipment.create(req.body)
            res.status(201).json({
                id: nuevo._id,
                success: true,
                message: "Equipment create"
            })
        } catch(error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    read: async(req,res) => { //método para leer/obtener todos los Equipment
        let { query } = req 
        
        //en la petición agrego un signo de pregunta ? para poder enviar una query/consulta
        //a la base de datos
        try {
            let todos = await Equipment.find()
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
                    message: "find Equipments"
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "not find Equipments"
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
            let equipment = await Equipment.findOne({ _id: id })

            if (equipment) {
                res.status(200).json({
                    success: true,
                    message: 'Equipment found',
                    data: equipment,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Equipment not found',
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
            let equipment = await Equipment.findOneAndUpdate({ _id: id }, req.body, { new: true });
            if(equipment){
                res.status(200).json({
                    success: true,
                    message: 'Equipment updated',
                    data: equipment,
                });
            }else{
                res.status(404).json({
                    success: false,
                    message: 'Equipment not found',
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
            let equipment = await Equipment.findOneAndDelete({ _id: id });
            if(equipment){
                res.status(200).json({
                    success: true,
                    message: 'Equipment deleted',
                    data: equipment,
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