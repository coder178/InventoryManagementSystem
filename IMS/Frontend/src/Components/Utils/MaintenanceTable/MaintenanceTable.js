import './MaintenanceTable.css';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from '../../../helpers/axios';

const columns = [
  {
    field: "id",
    headerName: "Item ID",
    width: 150,
    editable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "itemName",
    headerName: "Item Name",
    width: 170,
    editable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "qtyd",
    headerName: "Qty Delievered",
    width: 100,
    editable: false,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "qtyp",
    headerName: "Qty Pending",
    width: 100,
    editable: false,
    headerClassName: 'super-app-theme--header',
  },
  {
    field: "dateAdded",
    headerName: "Date Added",
    width: 170,
    type: "date",
    // editable: true,
    editable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "dateRecieved",
    headerName: "Date Recieved",
    type: "date",
    width: 170,
    // editable: true,
    editable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "state",
    headerName: "State",
    editable: false,
    width: 160,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "cost",
    headerName: "Cost",
    headerAlign: "start",
    type: "number",
    width: 170,
    editable: false,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "agency",
    headerName: "Agency",
    width: 170,
    editable: false,
    headerClassName: "super-app-theme--header",
  },
];




const Index = (props) => {
  const rows = [];
  const rows1 = [];
  const rows2 = [];
  let [Products, setProducts] = useState("");
  const [Result, setResult] = useState("");
  const [Recentproducts, setRecentproducts] = useState("");
  useEffect(() => {
    const getProducts = async () => {

      const res = await axios.get(`/maintenance/getmaintenanceList`);
      console.log(res.data.maintenanceList);
      console.log(res.data.code);
      setProducts(res.data.maintenanceList);

    };
    const getrecentProducts = async () => {

      const res = await axios.get(`/maintenance/getrecentmaintenanceList`);
      console.log(res.data.maintenanceList);
      console.log(res.data.code);
      setRecentproducts(res.data.maintenanceList);


    };
    getProducts();
    getrecentProducts();
  },[Products,Recentproducts]);
  console.log(Products);
  let n = Products.length;
  let i = 0;
  for (i; i < n; i++) {
    rows.push({
      id: Products[i].itemid,
      itemName: Products[i].name,
      dateAdded: Products[i].dateAdded,
      dateRecieved: Products[i].dateReceived,
      state: Products[i].status,
      cost: Products[i].cost,
      agency: Products[i].agency,
      qtyd:Products[i].dqty,
      qtyp:Products[i].rqty
      

    })
  }
  n = Recentproducts.length;
  i = 0;
  for (i; i < n; i++) {
    rows1.push({
      id: Recentproducts[i].itemid,
      itemName: Recentproducts[i].name,
      dateAdded: Recentproducts[i].dateAdded,
      dateRecieved: Recentproducts[i].dateReceived,
      state: Recentproducts[i].status,
      cost: Recentproducts[i].cost,
      agency: Recentproducts[i].agency,
      qtyd:Recentproducts[i].dqty,
      qtyp:Recentproducts[i].rqty
      

    })
  }
  if (props.type === "Pro") {
    let name = props.pname;
    const getResult = async () => {
      
      await axios.post(`/maintenance/getmaintenancelistbyname`, { name }).then(function (res) {
  
        setResult(res.data.maintenanceList);
        
  
      }).catch(function (error) {
        console.log(error);
      })
    }
    
      getResult();
    let l = Result.length;
      let k = 0;
      for (k; k < l; k++) {
        rows2.push({
          id: Result[i].itemid,
          itemName: Result[i].name,
          dateAdded: Result[i].dateAdded,
          dateRecieved: Result[i].dateReceived,
          state: Result[i].status,
          cost: Result[i].cost,
          agency: Result[i].agency,
          qtyd:Result[i].dqty,
          qtyp:Result[i].rqty

        })
      }
  }
  var data;
  switch (props.type) {
    case "full":
      data = rows;
      break;
    case "recent":
      data = rows1;
      break;
    case 'Pro':
      data = rows2;
      break;
    default:
      data = rows;
  }
  return (
    <div className="fe-maintenance-table">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
          sx={{
            border: 2,
            borderColor: "#673AB7",
            borderRadius: 1,
            "& .MuiDataGrid-cell:hover": {
              color: "black",
              // backgroundColor:'primary.light',
            },
            "& .MuiDataGrid-cell": {
              color: "white",
              // backgroundColor:'primary.light',
            },
            "& .super-app-theme--header": {
              backgroundColor: "#673AB7",
              color: "white",
              fontWeight: "bold",
            },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}
export default Index;