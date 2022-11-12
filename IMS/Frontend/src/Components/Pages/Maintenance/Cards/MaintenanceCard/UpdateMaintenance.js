import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SearchBar from '../../../../Utils/Search/index';
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { UpgradeRounded } from "@mui/icons-material";
import React from "react";
import axios from "../../../../../helpers/axios";

const UpdateMaintenance = () => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [daterec, setDateRec] = React.useState("");
  const [product,setProduct] = React.useState("");
  const [name, setName] = React.useState("");
  const [Mno, setMno] = React.useState("");
  const [cost, setCost] = React.useState("");

  
  const handleChangeDateRec = (newValue) => {
    setDateRec(newValue);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const token = localStorage.getItem('token');
  const auth = "Bearer " + token;

  
  const updateMaintenance = (e) => {
    e.preventDefault();
    axios.post(`/maintenance/update`,{name,Mno,daterec,cost,status},{headers :{
      'Authorization': auth
    
    }}).then(function(response){
      alert(response.data.message)
      
      setOpen(false);
    }).catch(function(error){
      console.log(error);
    })
    setOpen(false);
  };
  
  const handleResult = P =>
    {
      setProduct(P);
    };
    let qty = product.InitialQuantity;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <UpgradeRoundedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Maintenance Details</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Add Item
          </DialogContentText> */}
          <SearchBar search="Items" handleResult={handleResult}/>
         
          <TextField
            margin="dense"
            id="ItemName"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            value={name}
            onChange = {(e) => setName(e.target.value)}
          />
           <TextField
            margin="dense"
            id="ItemQuantity"
            label="Item No To Update"
            type="number"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            inputProps={{  min: 0, max: qty ,step:1  }}
            value={Mno}
            onChange = {(e) => setMno(e.target.value)}
          />
       
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date Recieved"
              required
              inputFormat="MM/DD/YYYY"
              value={daterec}
              onChange={handleChangeDateRec}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            autoFocus
            margin="dense"
            id="ItemCost"
            label="Cost"
            type="text"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            value={cost}
            onChange = {(e) => setCost(e.target.value)}
          />

          <InputLabel id="maintenance-status">Status</InputLabel>
          <Select
            labelId="maintenance-status"
            required
            id="maintenance-status"
            value={status}
            onChange={handleChangeStatus}
            label="Status"
            fullWidth
            variant="standard"
            sx={{mb:3}}
          >
            
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateMaintenance}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateMaintenance;
