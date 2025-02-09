import React from "react";
import { Box, Typography } from "@mui/material";
import route_data from "../data/route_data.json";

export default function Map({ code }) {

    return (
    <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            mt: '2rem',
            py: '1rem',
        }}
        className="px-0 sm:px-2"
    >
        <Box className="overflow-hidden md:overflow-auto">
            {
                code ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <div
                            style={{ width: '100%', height: '100%', textAlign: 'center', paddingBottom: '5px' }} 
                            dangerouslySetInnerHTML={{ __html: route_data[code].frame }}>
                        </div>
                        <Typography variant="caption" align="center" className="text-gray-400 opacity-75">
                            Jeepney Route Data from https://cebujeepneys.weebly.com/jeepney-routes.html
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography
                            className="text-gray-400" 
                            variant="subtitle2" 
                            component='p'>
                                Choose a jeepney code to see the route.
                        </Typography>
                    </>
                )
            }
        </Box>
    </Box>
  )
}