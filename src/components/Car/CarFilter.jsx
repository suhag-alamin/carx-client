import { useDebounced } from "@/redux/hooks";
import { Box, Grid, Slider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CarFilter = ({ setFilter, filter }) => {
  const [priceRange, setPriceRange] = useState([500, 10000]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRangeChange = (e, newValue) => {
    setPriceRange(newValue);
  };

  const debouncedSearchQuery = useDebounced(searchQuery, 600);

  useEffect(() => {
    setFilter({ ...filter, minPrice: priceRange[0], maxPrice: priceRange[1] });

    if (!!debouncedSearchQuery) {
      setFilter({ ...filter, query: debouncedSearchQuery });
    } else {
      delete filter.query;
      setFilter({
        ...filter,
      });
    }
  }, [priceRange, setFilter, debouncedSearchQuery]);

  return (
    <Box
      sx={{
        py: 4,
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h6">Search Car</Typography>
            <TextField
              fullWidth
              label="Search"
              placeholder="Nissan"
              variant="outlined"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6">Price Range</Typography>
            <Slider
              defaultValue={priceRange}
              max={100000}
              min={500}
              value={priceRange}
              onChange={handleRangeChange}
              valueLabelDisplay="auto"
              placeholder="Search"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarFilter;
