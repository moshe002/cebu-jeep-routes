import React, { useState } from 'react';
import { Button, Box } from "@mui/material";
import SearchModal from './SearchModal';

export default function Search() {

    const [openModal, setOpenModal] = useState(false);

  return (
    <>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, py: 4 }}>
            <Button variant='text' sx={{ fontSize: '12px', textTransform: 'none', color: 'black' }} onClick={() => setOpenModal(true)}>
                Click me to search for jeepney code/s base on the location you're going to
            </Button>
        </Box>
        <SearchModal open={openModal} openFunc={setOpenModal} />
    </>
  )
};