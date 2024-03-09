const healthCtrl = (req,res)=>{
    try{
        res.status(200).json({
            status: "success",
        })
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports = {healthCtrl};