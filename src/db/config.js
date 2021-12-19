const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://classed:U25wr12uHEjL2eXI@cluster.cifxa.mongodb.net/hackWithAgora?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(() => {
    console.log(`Connection is Successful`);
}).catch((e) => {
    console.log(`no Connection`);
})