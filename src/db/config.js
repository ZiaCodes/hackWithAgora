const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Rocking_Rima:SWmbx1GOlfaOKyXB@cluster.jge2v.mongodb.net/hackWithAgora?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(() => {
    console.log(`Connection is Successful`);
}).catch((e) => {
    console.log(`no Connection`);
})
