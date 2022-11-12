const Product = require('../models/product');
const Maintenance = require('../models/maintenance');
const Agency = require('../models/agency');

exports.addToMaintenance = async(req,res) => {
    let mnos = [];
    let no = req.body.Mno;
    let p = await Product.findOne({name: req.body.name});
    if(!p) res.json({message : "product not found"});
    if(p){
        var foundr = p.removedItems.find(function (element) {
            return element == no;
        });
        if(foundr == undefined)
      {
        
        var found = p.MaintenanceItems.find(function (element) {
            return element == no;
        });
        if(found == undefined)
        {
            
            let m = await Maintenance.findOne({name: req.body.name});
            if(!m) {
               mnos.push(no);
            const mainObj = {
                name:req.body.name, 
                quantityunderMaintenance:1,
                quantitydelievered:0,
                cost:0,
                itemid:p._id,
                maintenanceNos:mnos,
                agency:req.body.agency,
                dateAdded:req.body.dateadd,
                dateReceived:null,
                status:req.body.status
            };
            const mitem = new Maintenance(mainObj);
            mitem.save(((error,item) => {
                if(error) return res.status(400).json({error});
                
        }));
        }
        if(m){
            m.maintenanceNos.push(no);
            let q = m.quantityunderMaintenance + 1;
            var myquery = { name: req.body.name };
            var newvalues = { $set:{ maintenanceNos:m.maintenanceNos, quantityunderMaintenance : q,dateAdded:req.body.dateadd, status:req.body.status, agency:req.body.agency}};
            Maintenance.updateOne(myquery,newvalues,function(err,item){
                if(err) return res.status(400).json({err});
            })

        }
        p.MaintenanceItems.push(no);
        let q = p.CurrentQuantity - 1 ;
            var myquery = { name: req.body.name };
        var newvalues = { $set:{ MaintenanceItems: p.MaintenanceItems ,CurrentQuantity:q }}
        Product.updateOne(myquery,newvalues,function(error,item){
            if(error) return res.status(400).json({error});
            if(item){
                res.json({message : "product added to maintenance successfully!"});
            }
        })


    }
    else{
        res.json({message : "product already in Maintenance"});
    }}
    else  {
        res.json({message : "product already removed"});
    }
}
}

exports.updateMaintenance = async(req,res) => {
    let no = req.body.Mno;
    let m = await Maintenance.findOne({name: req.body.name});
            if(!m) {
                res.json({message : "No such product  in Maintenance"});

            }
            
            if(m){
                var found = m.maintenanceNos.find(function (element) {
                    return element == no;
                });
                if(found == undefined)
                {
                    res.json({message : "No such product  in Maintenance"});
    
                }
                let p = await Product.findOne({name: req.body.name});
                if(p)
                {
                    let i = p.MaintenanceItems.indexOf(no);
                    p.MaintenanceItems.splice(i,1);
                    let q = p.CurrentQuantity + 1 ;
                    var myquery = { name: req.body.name };
                    var newvalues = { $set:{ MaintenanceItems: p.MaintenanceItems ,CurrentQuantity:q }}
                    Product.updateOne(myquery,newvalues,function(error,item){
                        if(error) return res.status(400).json({error});
                       
                    })
                    
                }
                let index = m.maintenanceNos.indexOf(no);
                m.maintenanceNos.splice(index, 1);
                
                m.quantityunderMaintenance = m.quantityunderMaintenance - 1;
                m.quantitydelievered = m.quantitydelievered + 1;
                let st="pending";
                if(m.quantityunderMaintenance == 0)
                {
                    st ="deleivered";
                }
                let ct = m.cost + parseInt(req.body.cost);
                var myquery = { name: req.body.name };
            var newvalues = { $set:{ maintenanceNos:m.maintenanceNos, quantityunderMaintenance : m.quantityunderMaintenance,quantitydelievered:m.quantitydelievered,dateReceived:req.body.daterec, status:st,cost:ct}};
            Maintenance.updateOne(myquery,newvalues,function(error,item){
                if(error) return res.status(400).json({error});
                
            })
            res.json({message : "Maintenance updated successfully!"});
            }


}

exports.getMaintenanceList = async(req,res) =>{
    
    const maintenanceList = [];
    let mitems = await Maintenance.find({});
    for(let m of mitems){
        let itemid = m.itemid.toString();
        
        let dateadded = m.dateAdded.toUTCString().slice(6,16);
        // console.log(m.dateAdded.getFullYear());
        let datereceived =m.dateReceived;
        if(m.dateReceived != null){
        datereceived = m.dateReceived.toUTCString().slice(6,16);
        }
        let aid = m.agency.toString();
        let a = await Agency.findById(aid);
        if(!a)
        {
            res.json({message : "Error!!"});
            }

        
        let agency =a.name;
        
        maintenanceList.push({
            itemid:itemid,
            name:m.name,
            dqty:m.quantitydelievered,
            rqty:m.quantityunderMaintenance,
            dateAdded:dateadded,
            dateReceived:datereceived,
            status:m.status,
            agency:agency,
            cost:m.cost

        });

    }
    // console.log(maintenanceList);
    res.json({maintenanceList,code:1});
};
exports.getrecentMaintenanceList = async(req,res) =>{
    const maintenanceList = [];
    let mitems = await Maintenance.find({}).sort({"createdAt":1}).limit(10);
    for(let m of mitems){
        let itemid = m.itemid.toString();
       
        let dateadded = m.dateAdded.toUTCString().slice(6,16);
        let datereceived =m.dateReceived;
        if(m.dateReceived != null){
        datereceived = m.dateReceived.toUTCString().slice(6,16);
        }
        let aid = m.agency.toString();
        let a = await Agency.findById(aid);
        let agency =a.name;
        
        maintenanceList.push({
            itemid:itemid,
            name:m.name,
            dateAdded:dateadded,
            dateReceived:datereceived,
            status:m.status,
            agency:agency,
            cost:m.cost,
            dqty:m.quantitydelievered,
            rqty:m.quantityunderMaintenance,

        });

    }
    res.json({code:1,maintenanceList});
}
exports.getMaintenanceListByName = async(req,res) =>{
    let name1 = req.body.name;
    const maintenanceList = [];
    let m = await Maintenance.find({name: name1});
    if(!m)
    {
        res.json({ message: "product not found" ,maintenanceList});
    }
    if(m){
        let itemid = m.itemid.toString();
       
        let dateadded = m.dateAdded.toUTCString().slice(6,16);
        let datereceived =m.dateReceived;
        if(m.dateReceived != null){
        datereceived = m.dateReceived.toUTCString().slice(6,16);
        }
        let aid = m.agency.toString();
        let a = await Agency.findById(aid);
        if(!a)
        {
            res.json({message : "Error!!"});
            }

        
        let agency =a.name;
        
        maintenanceList.push({
            itemid:itemid,
            name:m.name,
            dqty:m.quantitydelievered,
            rqty:m.quantityunderMaintenance,
            dateAdded:dateadded,
            dateReceived:datereceived,
            status:m.status,
            agency:agency,
            cost:m.cost

        });
        res.json({maintenanceList});
    }
    
}
exports.getMaintenanceProducts = (req, res) => {

    Maintenance.find({})
        .exec((error, maintenanceitems) => {
            if (error) return res.status(400).json({ error });
            if (maintenanceitems) {
                res.json({ maintenanceitems });
            }

        });
}
exports.getTotalMaintenance = (req, res) => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    console.log(year);
    console.log(month);
    let totalMaintenanceNo =0;
    let thisYearMaintenanceNo =0;
    thismonth
    let totalDeleiverdNo =0;
    let totalMaintenanceExpence =0;
    Maintenance.find({})
        .exec((error, products) => {
            if (error) return res.status(400).json({ error });
            if (products) {
                for(let m of products){
                    let myear = m.dateAdded.getFullYear();
                    console.log("a",myear);
                    if(myear == year)
                    {
                        console.log("Yes");
                    }
                totalMaintenanceNo = totalMaintenanceNo +  m.quantityunderMaintenance;
                totalMaintenanceExpence =totalMaintenanceExpence + m.cost;
                totalDeleiverdNo = totalDeleiverdNo + m.quantitydelievered;
                }
                res.json({ totalMaintenanceNo ,totalMaintenanceExpence,totalDeleiverdNo});
            }

        });
}
exports.getMonthsMaintenance = (req, res) => {
    let year = new Date().getFullYear();
   
    // console.log(year);
    // console.log(month);
    let JanMaintenanceExpence =0;
    let FebMaintenanceExpence =0;
    let MarMaintenanceExpence =0;
    let AprMaintenanceExpence =0;
    let MayMaintenanceExpence =0;
    let JunMaintenanceExpence =0;
    let JulMaintenanceExpence =0;
    let AugMaintenanceExpence =0;
    let SepMaintenanceExpence =0;
    let OctMaintenanceExpence =0;
    let NovMaintenanceExpence =0;
    let DecMaintenanceExpence =0;

    let totalMaintenanceExpence =0;
    Maintenance.find({})
        .exec((error, products) => {
            if (error) return res.status(400).json({ error });
            if (products) {
                for(let m of products){
                    let myear = m.dateAdded.getFullYear();
                    let month = m.dateAdded.getMonth();
                    // console.log("a",month);
                    if(myear == year && month==1)
                    {
                        JanMaintenanceExpence =JanMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==2)
                    {
                        FebMaintenanceExpence =FebMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==3)
                    {
                        MarMaintenanceExpence =MarMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==4)
                    {
                        AprMaintenanceExpence =AprMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==5)
                    {
                        MayMaintenanceExpence =MayMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==6)
                    {
                        JunMaintenanceExpence =JunMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==7)
                    {
                        JulMaintenanceExpence =JulMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==8)
                    {
                        AugMaintenanceExpence =AugMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==9)
                    {
                        SepMaintenanceExpence =SepMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==10)
                    {
                        console.log("Yes");
                        OctMaintenanceExpence =OctMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==11)
                    {
                        
                        NovMaintenanceExpence =NovMaintenanceExpence + m.cost;   
                    }
                    else if(myear == year && month==12)
                    {
                        DecMaintenanceExpence =DecMaintenanceExpence + m.cost;   
                    }
               
               
                }
                res.json({ JanMaintenanceExpence ,FebMaintenanceExpence,MarMaintenanceExpence,AprMaintenanceExpence,MayMaintenanceExpence,JunMaintenanceExpence,JulMaintenanceExpence,AugMaintenanceExpence,SepMaintenanceExpence,OctMaintenanceExpence,NovMaintenanceExpence,DecMaintenanceExpence});
            }

        });
}