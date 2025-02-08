import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from "@mui/material";
import route_data from "../data/route_data.json";

export default function Search() {

    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (location) {
            const timer = setTimeout(() => {
            searchLocation(location);
            }, 300); // Debounce time of 300ms

            return () => clearTimeout(timer);
        } else {
            setLocations([]);
        }
    }, [location]);

    const handleSearch = (e) => setLocation(e.target.value);

    const searchLocation = (searchValue) => {
        const routeKeys = Object.keys(route_data);
        const foundRoutes = [];

        for (let x = 0; x < routeKeys.length; x++) {
            let keywords = route_data[routeKeys[x]].keywords;

            if (keywords && keywords.some(keyword => keyword.toLowerCase().includes(searchValue.toLowerCase()))) {
                foundRoutes.push(routeKeys[x]);
            }
        }
        setLocations(foundRoutes);
    };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, py: 4 }}>
        <Typography variant='subtitle2' align='center' className='text-gray-400 pb-2'>
            Type a location if you're unsure of the jeepney code.
        </Typography>
        <TextField 
            id="place-input" 
            label="Location" 
            variant="outlined"
            value={location}
            onChange={handleSearch}
        />
        {locations.length > 0 && (
            <Box sx={{ mt: 2 }}>
                <Typography variant='subtitle2' align='center' className='text-gray-400'>
                    Found Routes:
                </Typography>
                <ul className='flex row flex-wrap justify-center gap-5 mt-3'>
                    {locations.map((route, index) => (
                        <li key={index}>{route.replace("_", " ")}</li>
                    ))}
                </ul>
            </Box>
        )}
    </Box>
  )
};