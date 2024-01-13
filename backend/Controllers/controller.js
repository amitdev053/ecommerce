// We are defining here the logic of home page routes controllers******************////////////
const Home = async (req, res)=>{
    try{
        res.status(200).send("Welcome to our backend Home Page using -----------Controller")


    } catch(error){
        console.log("error")
    }
}
// We are defining here the logic of home page routes controllers******************////////////

// We are defining here the logic of Product page routes controllers******************////////////

const Product = async (req, res)=>{
    try{
        res.status(200).send("Welcome to our backend Products Page using -----------Controller")


    } catch(error){
        console.log("error")
    }
}
// We are defining here the logic of Product page routes controllers******************////////////
const Login = async (req, res)=>{
    try{
        console.log(req.body)
        res.status(200).json({"message": req.body})
    } catch(error){
        console.log("error")
    }
}


module.exports = {Home, Product, Login}