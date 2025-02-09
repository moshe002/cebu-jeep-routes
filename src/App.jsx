import { useState } from "react";
import { 
  Box, 
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography
} from "@mui/material";
import Search from "./components/Search";
import Map from "./components/Map";
import route_data from "./data/route_data.json";

function App() {

  const JEEPNEY_CODES = Object.keys(route_data);

  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250,
      },
    },
  };

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        minHeight: '100vh', 
        width: '100%', 
        pt: '2rem',
        overflow: 'auto',
      }}
      className="px-0 sm:px-2"
    >
      <Box>
        <Typography variant="h4" align="center">
          Cebu Jeepney Routes
        </Typography>
        <Typography variant="subtitle1" align="center">
          Not familiar with Cebu Jeepney codes? Just choose one below!
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: '2rem' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="code-label">Code</InputLabel>
          <Select
            labelId="code-label"
            id="code-select"
            value={code}
            label="Code"
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {
              JEEPNEY_CODES.map((code, index) => {
                return (
                  <MenuItem key={index} value={code}>{code.replace("_", " ")}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <Typography
          className="text-gray-400" 
          variant="subtitle2" 
          component='p'
          align="center"
        >
          The route map might take a while to load. Please be patient.
        </Typography>
      </Box>
      <Map code={code} />
      <Search />
    </Box>
  )
}

export default App
