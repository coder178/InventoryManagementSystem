import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import axios from "../../../../../helpers/axios";

const AddItem = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  
 const contactNumber = number;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const token = localStorage.getItem('token');
  const auth = "Bearer " + token;
  
  const handleAddVendor = (e) =>
  {
    e.preventDefault();
    axios.post(`/vendor/create`,{name,email,contactNumber,address},{headers :{
      'Authorization': auth
    
    }}).then(function(response){
        alert(response.data.message);
    }).catch(function(error){
      console.log(error);
    })
    setOpen(false);
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddCircleRoundedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Vendor</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Add Item
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="VendorName"
            label="Vendor Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="VendorMobile"
            label="Vendor Mobile"
            type="tel"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            id="VendorEmail"
            label="Vendor Email"
            type="email"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="VendorAddress"
            label="Vendor Address"
            multiline
            type="text"
            fullWidth
            rows={5}
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddVendor}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddItem;
