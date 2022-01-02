const mongoose = require("mongoose");

mongoose.connect(" ",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(() => {
    console.log(`Connection is Successful`);
}).catch((e) => {
    console.log(`no Connection`);
})
