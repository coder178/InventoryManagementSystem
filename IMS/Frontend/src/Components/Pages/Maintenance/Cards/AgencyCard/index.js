import "./card.css";
import AddAgencyButton from './AddAgency';
import UpdateAgencyButton from './UpdateAgency';
import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const Index = () => {
  return (
    <div className="fe-maintenance-card">
      <div className="fe-maintenance-card-new">
        <Stack direction="row" alignItems="center" spacing={15}>
          <p>Add Maintenance Agency</p>
          <IconButton>
            <AddAgencyButton />
          </IconButton>
        </Stack>
      </div>
      <div className="fe-maintenance-card-update">
        <Stack direction="row" alignItems="center" spacing={3.5}>
          <p>Update Maintenance Agency Details</p>
          <IconButton>
            <UpdateAgencyButton />
          </IconButton>
        </Stack>
      </div>
      {/* <div className="fe-maintenance-card-delete">
        <Stack direction="row" alignItems="center" spacing={10.5}>
          <p>Remove Maintenance Agency</p>
          <IconButton>
            <DeleteAgencyButton />
          </IconButton>
        </Stack>
      </div> */}
    </div>
  );
};

export default Index;
