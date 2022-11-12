import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SearchBar from '../../../../Utils/Search/index';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useEffect, useState } from "react";
import React from "react";
import axios from "../../../../../helpers/axios";

const AddItem = () => {
  const [open, setOpen] = React.useState(false);
  const [agency, setAgency] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [dateadd, setDateAdd] = React.useState("");
  const [name, setName] = React.useState("");
  const [Mno, setMno] = React.useState("");
  const [product,setProduct] = React.useState("");
  const [Agencies, setAgencies] = useState("");


  useEffect(()=>{
    const getAgencis = async() => {
   
      const  res =await axios.get(`/agency/getagency`);
      setAgencies(res.data.agencies);
    
    };
    getAgencis();
  },[])

  const handleResult = P =>
    {
      setProduct(P);
    };
  
  let qty = product.InitialQuantity;

  const handleChangeDateAdd = (newValue) => {
    setDateAdd(newValue);
  };



  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeAgency = (event) => {
    setAgency(event.target.value);
  };
  const token = localStorage.getItem('token');
  const auth = "Bearer " + token;

  const Addmaintenanceitem = (e) => {
    e.preventDefault();
    axios.post(`/maintenance/add`,{name,Mno,dateadd,agency,status},{headers :{
      'Authorization': auth
    
    }}).then(function(response){
      alert(response.data.message)
      
      setOpen(false);
    }).catch(function(error){
      console.log(error);
    })
    setOpen(false);
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddCircleRoundedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add to Maintenance</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Add Item
          </DialogContentText> */}
          <SearchBar search="Items" handleResult={handleResult}/>
          
          <TextField
            margin="dense"
            required
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
            label="Item No To Remove"
            type="number"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            inputProps={{  min: 0, max: qty  }}
            value={Mno}
            onChange = {(e) => setMno(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date Added"
              required
              inputFormat="MM/DD/YYYY"
              value={dateadd}
              onChange={handleChangeDateAdd}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </Select>

          


          <InputLabel id="maintenance-agency" sx={{mt:3}}>Agency</InputLabel>
          <Select
            labelId="maintenance-agency"
            required
            id="maintenance-agency"
            value={agency}
            onChange={handleChangeAgency}
            label="Agency"
            fullWidth
            variant="standard"
            sx={{mb:3}}
          >
              {Agencies && Agencies.map(option => <MenuItem value={option._id} key={option._id}>{option.name}</MenuItem>)}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={Addmaintenanceitem}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddItem;
