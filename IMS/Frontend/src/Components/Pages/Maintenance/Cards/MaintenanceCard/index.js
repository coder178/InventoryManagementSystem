import "./card.css";
import AddMaintenanceButton from './AddMaintenance';
import UpdateMaintenanceButton from './UpdateMaintenance';

import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const Index = () => {
  return (
    <div className="fe-maintenance-card">
      <div className="fe-maintenance-card-new">
        <Stack direction="row" alignItems="center" spacing={21}>
          <p>Add to Maintenance</p>
          <IconButton>
            <AddMaintenanceButton />
          </IconButton>
        </Stack>
      </div>
      <div className="fe-maintenance-card-update">
        <Stack direction="row" alignItems="center" spacing={12.3}>
          <p>Update Maintenance Details</p>
          <IconButton>
            <UpdateMaintenanceButton />
          </IconButton>
        </Stack>
      </div>
      {/* <div className="fe-maintenance-card-update">
        <Stack direction="row" alignItems="center" spacing={11.4}>
          <p>Remove Maintenance Details</p>
          <IconButton>
            <DeleteMaintenanceButton />
          </IconButton>
        </Stack>
      </div> */}
    </div>
  );
};

export default Index;
