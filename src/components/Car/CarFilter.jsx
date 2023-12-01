import { useDebounced } from "@/redux/hooks";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const CarFilter = ({ setFilter, filter }) => {
  const sortTypes = [
    "Newest",
    "Oldest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const [priceRange, setPriceRange] = useState([500, 100000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(sortTypes[0]);

  const handleRangeChange = (_, newValue) => {
    setPriceRange(newValue);
  };

  const debouncedSearchQuery = useDebounced(searchQuery, 600);

  useEffect(() => {
    let newFilter = {
      ...filter,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };

    if (!!debouncedSearchQuery) {
      newFilter = { ...newFilter, query: debouncedSearchQuery };
    }
    if (debouncedSearchQuery === "") {
      delete newFilter.query;
    }

    if (sortType === "Newest") {
      newFilter = { ...newFilter, sortBy: "createdAt", sortOrder: "desc" };
    } else if (sortType === "Oldest") {
      newFilter = { ...newFilter, sortBy: "createdAt", sortOrder: "asc" };
    } else if (sortType === "Price: Low to High") {
      newFilter = { ...newFilter, sortBy: "price", sortOrder: "asc" };
    } else if (sortType === "Price: High to Low") {
      newFilter = { ...newFilter, sortBy: "price", sortOrder: "desc" };
    }

    setFilter(newFilter);
  }, [priceRange, debouncedSearchQuery, sortType, setFilter]);

  return (
    <Box
      sx={{
        py: 4,
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6">Sort By</Typography>
            <FormControl fullWidth>
              <InputLabel>Default</InputLabel>
              <Select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                label="Default"
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                }}
              >
                {sortTypes?.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarFilter;
