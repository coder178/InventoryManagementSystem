import SearchBar from '../../../../Utils/Search/index';
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import axios from '../../../../../helpers/axios';

const UpdateAgency = () => {
  const [open, setOpen] = React.useState(false);
  const [oldname, setOldname] = React.useState("");
  const [newname, setNewname] = React.useState("");
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [address, setAddress] = React.useState('');

  const updateAgency =(e)=>{
    e.preventDefault();
    axios.post(`/agency/updateagency`,{oldname,newname,email,number,address},).then(function(response){
      alert(response.data.message);
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
        <UpgradeRoundedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Agency Details</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Add Item
          </DialogContentText> */}
          <SearchBar search="Agency"/>
          <TextField
            autoFocus
            required
            margin="dense"
            id="AgencyName"
            label="Agency Old Name"
            type="text"
            fullWidth
            variant="standard"
            value={oldname}
            onChange = {(e) => setOldname(e.target.value)}
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="AgencyName"
            label="Agency New Name"
            type="text"
            fullWidth
            variant="standard"
            value={newname}
            onChange = {(e) => setNewname(e.target.value)}
            
          />
          <TextField
            margin="dense"
            required
            id="AgencyMobile"
            label="Agency Mobile"
            type="tel"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            required
            id="AgencyEmail"
            label="Agency Email"
            type="email"
            fullWidth
            variant="standard"
            sx={{mb:3}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            required 
            id="AgencyAddress"
            label="Agency Address"
            type="text"
            multiline
            fullWidth
            rows={5}
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateAgency}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateAgency;
