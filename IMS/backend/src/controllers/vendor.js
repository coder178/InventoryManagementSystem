const Vendor = require('../models/vendor')




exports.addVendor = (req,res) => {
    const vendorObj =  {
        name:req.body.name,
        email:req.body.email,
        contactNumber:req.body.contactNumber,
        address:req.body.address
    }

   
    const ven = new Vendor(vendorObj);
    ven.save((error, vendor) => {
        if(error) return res.status(400).json({ error });
        if(vendor)
        {
            
            res.json({message : "Vendor Added successfully!"});
        }
    });

}

exports.getVendors = (req,res) =>{
    Vendor.find({})
    .exec((error, vendors) => {
        if(error) return res.status(400).json({ error });
        if(vendors){
           
            res.status(200).json({ vendors});
        }

    });
}
exports.updateVendorByName = (req,res) =>{
    
    const newname = req.body.newname;
    const email=req.body.email;
    const contactNumber=req.body.contactNumber;
    const address=req.body.address;
     
     Vendor.findOne({name: req.body.oldname})
     .exec((error, vendor) => {
         if(error) return res.status(400).json({ error });
         if(vendor){
             console.log("updated1");
             let name1 = vendor.name;
             var myquery = { name: name1 };
             var newvalues = { $set:{ name: newname,email:email,contactNumber:contactNumber,address:address}}
             Vendor.updateOne(myquery,newvalues,function(err,item){
                 if(err) return res.status(400).json({error});
                 if(item){
                     console.log("updated2");
                     res.json({ code:0,item});
                 }
             })
         }
 
     });
 }