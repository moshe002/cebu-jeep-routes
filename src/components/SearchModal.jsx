import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Modal, Autocomplete } from "@mui/material";
import route_data from "../data/route_data.json";


export default function SearchModal({ open, openFunc }) {

    const ROUTE_KEYS = Object.keys(route_data);
  
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

    const getAllKeywords = () => {
        const allKeywords = [];
        for (let x = 0; x < ROUTE_KEYS.length; x++) {
            const keywords = route_data[ROUTE_KEYS[x]].keywords;
            if (keywords) {
                allKeywords.push(...keywords);
            }
        }

        return [...new Set(allKeywords)];
    };

    //const handleSearch = (e) => setLocation(e.target.value);

    const searchLocation = (searchValue) => {
        const foundRoutes = [];

        for (let x = 0; x < ROUTE_KEYS.length; x++) {
            let keywords = route_data[ROUTE_KEYS[x]].keywords;

            if (keywords && keywords.some(keyword => keyword.toLowerCase().includes(searchValue.toLowerCase()))) {
                foundRoutes.push(ROUTE_KEYS[x]);
            }
        }
        setLocations(foundRoutes);
    };

    const handleAutocompleteChange = (event, value) => {
        setLocation(value)
    };
  
    return (
        <Modal open={open} onClose={() => openFunc(false)}>
            <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', md: 'auto' },
                    maxWidth: 500,
                    maxHeight: { xs: '90%', md: 'auto' },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: '6px',
                    overflowY: 'auto'
                }}
            >
                <Typography variant='subtitle2' align='center' className='text-gray-400 pb-2'>
                    Enter a location if you're unsure of the jeepney code.
                </Typography>
                <Autocomplete
                    disablePortal
                    options={getAllKeywords()}
                    sx={{ width: { xs: '100%', md: 400 }, maxHeight: { xs: '80%', md: 'auto' } }}
                    onInputChange={(event, value) => handleAutocompleteChange(event, value)}
                    renderInput={(params) => <TextField {...params} label="Location" />}
                />
                {/* <TextField 
                    id="place-input" 
                    label="Location" 
                    variant="outlined"
                    value={location}
                    placeholder='Where are you going?'
                    onChange={handleSearch}
                /> */}
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
        </Modal>
    )
};
