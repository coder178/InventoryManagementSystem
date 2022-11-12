const Agency = require('../models/agency')




exports.addAgency = (req,res) => {
    const AgencyObj =  {
        name:req.body.name,
        email:req.body.email,
        contactNumber:req.body.contactNumber,
        address:req.body.address
    }

   
    const a = new Agency(AgencyObj);
    a.save((error, agency) => {
        if(error) return res.status(400).json({ error });
        if(agency)
        {  
            return res.json({ message: "Agency added successfully!"});
        }
    });

}

exports.getAgencies = (req,res) =>{
    Agency.find({})
    .exec((error, agencies) => {
        if(error) return res.status(400).json({ error });
        if(agencies){
           
            res.status(200).json({ agencies });
        }

    });
}
exports.updateAgencyByName = (req,res) =>{
    
    const newname = req.body.newname;
    const email=req.body.email;
    const contactNumber=req.body.contactNumber;
    const address=req.body.address;
     
    Agency.findOne({name: req.body.oldname})
     .exec((error, agency) => {
         if(error) return res.status(400).json({ error });
         if(agency){
             
             let name1 = agency.name;
             var myquery = { name: name1 };
             var newvalues = { $set:{ name: newname,email:email,contactNumber:contactNumber,address:address}}
             Agency.updateOne(myquery,newvalues,function(err,item){
                 if(err) return res.status(400).json({error});
                 if(item){
                     
                     res.json({ code:0,message: "Agency updated successfully!"});
                 }
             })
         }
 
     });
 }