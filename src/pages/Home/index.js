import DrivehubLogo from "../../assets/dh-logo.svg";
import { ReactComponent as CardLogo } from "../../assets/union.svg";
import { ReactComponent as FilterLogo } from "../../assets/transfer.svg";
import imgError from "../../assets/img-error.svg";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  AppBar,
  Box,
  Card,
  CardMedia,
  Grid,
  Button,
  Stack,
  Typography,
  Toolbar,
  IconButton,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import CartDialog from "../../components/Dialog";
import "../../App.css";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [carList, setCarList] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [priceFilter, setPriceFilter] = useState("low-2-high");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.value === "low-2-high") {
      const results = carList.sort((a, b) =>
        a.fields.price > b.fields.price ? 1 : -1
      );
      setPriceFilter(event.target.value);
      setCarList(results);
    } else {
      const results = carList.sort((a, b) =>
        a.fields.price < b.fields.price ? 1 : -1
      );
      setPriceFilter(event.target.value);
      setCarList(results);
    }
  };

  const filterCarBySearch = (list, input) => {
    if (input === "") {
      return list;
    } else {
      const keyword = input.toLowerCase();
      return list.filter((item) =>
        item.fields.title.toLowerCase().includes(keyword)
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    let result = carList;
    result = filterCarBySearch(result, search);
    setCarList(result);
  };

  const handleAddtoCart = (item) => {
    const productExist = cart.find((e) => e.sys.id === item.sys.id);
    if (productExist) {
      setCart(
        cart.map((e) =>
          e.sys.id === item.sys.id
            ? {
                ...productExist,
                quantity: productExist.quantity + 1,
                totalPrice: (e.totalPrice += productExist.fields.price),
              }
            : item
        )
      );
      setTotalPrice(cart.reduce((n, { totalPrice }) => n + totalPrice, 0));
    } else {
      setCart([
        ...cart,
        { ...item, quantity: 1, totalPrice: item.fields.price },
      ]);
      setTotalPrice(cart.reduce((n, { totalPrice }) => n + totalPrice, 0));
    }
    console.log("🚀 handleAddtoCart ~ item:", cart);
  };

  const handleRemoveFromCart = (item) => {
    const productExist = cart.find((e) => e.sys.id === item.sys.id);
    if (productExist) {
      if (productExist.quantity === 0) {
        cart.splice(productExist, 1);
      } else {
        setCart(
          cart.map((e) =>
            e.sys.id === item.sys.id
              ? { ...productExist, quantity: productExist.quantity - 1 }
              : item
          )
        );
        setTotalPrice(cart.reduce((n, { fields }) => n - fields.price, 0));
      }
    }
    console.log("🚀 handleAddtoCart ~ item:", cart);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = imgError;
  };

  useEffect(() => {
    if (search === "") {
      const url =
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car";

      axios
        .get(url, {
          headers: {
            Authorization: "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o",
          },
        })
        .then((response) => {
          // console.log(response.data);
          const results = response.data.items.sort((a, b) =>
            a.fields.price > b.fields.price ? 1 : -1
          );
          setCarList(results);
        })
        .catch((error) => {});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <Stack direction="column">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="sticky"
            sx={{
              width: "100%",
              height: "80px",
              bgcolor: "white",
            }}
          >
            <Toolbar
              sx={{
                height: "100%",
                p: "0 !important",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  width: "100%",
                  px: { xs: "16px", md: "113px" },
                }}
              >
                <IconButton
                  sx={{
                    p: 0,
                  }}
                >
                  <img
                    src={DrivehubLogo}
                    alt="logo"
                    style={{
                      height: "32px",
                    }}
                  />
                </IconButton>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={handleOpen}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <CardLogo />
                  <Typography variant="body1" color="black">
                    Cart ({cart.length})
                  </Typography>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{
            bgcolor: "#FFFFFF",
            px: { xs: "8px", md: "113px" },
            py: "32px",
            zIndex: 1,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Car Available
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, sm: 3, md: 2 }}
            sx={{
              width: { xs: "100%", sm: "100%", md: "500px" },
            }}
          >
            <TextField
              id="searchbar"
              variant="outlined"
              fullWidth
              placeholder="Search Car"
              size="small"
              onChange={handleSearchChange}
            />
            <FormControl fullWidth>
              <Select
                labelId="price-filter-label"
                id="price-filter"
                value={priceFilter}
                label=""
                onChange={handleChange}
                sx={{
                  height: "40px",
                }}
              >
                <MenuItem value={"low-2-high"}>
                  <Stack direction="row" alignItems="center">
                    <FilterLogo />
                    <Typography variant="body1" ml={0.5}>
                      Price: Low - High
                    </Typography>
                  </Stack>
                </MenuItem>
                <MenuItem value={"high-2-low"}>
                  <Stack direction="row" alignItems="center">
                    <FilterLogo />
                    <Typography variant="body1" ml={0.5}>
                      Price: High - Low
                    </Typography>
                  </Stack>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Stack direction="column">
          <Grid
            container
            spacing={3}
            sx={{
              px: { xs: "16px", sm: "50px", md: "113px" },
              py: 3,
              bgcolor: "#F3F4F6",
            }}
          >
            {carList.length === 0 ? (
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <Typography variant="h6">No Data</Typography>
                </Stack>
              </Grid>
            ) : (
              carList.map((item, index) => {
                const { fields } = item;
                return (
                  <Grid key={item.sys.id} item xs={12} sm={4} md={3}>
                    <Card sx={{ borderRadius: "16px" }}>
                      <CardMedia
                        component="img"
                        sx={{ height: "140px" }}
                        src={fields.photo}
                        onError={handleImageError}
                      />

                      <Stack
                        direction="column"
                        justifyContent="space-between"
                        spacing={2}
                        p={2}
                      >
                        <Stack direction="column">
                          <Typography variant="body1" fontWeight={600}>
                            {fields.title}
                          </Typography>
                          <Typography variant="body2">
                            {fields.price} THB/Day
                          </Typography>
                        </Stack>
                        <Box>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleAddtoCart(item)}
                            sx={{
                              height: "56px",
                              borderRadius: "8px",
                              bgcolor: "#3B82F6",
                              boxShadow: 0,
                              textTransform: "none",
                            }}
                          >
                            Add to cart
                          </Button>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Stack>

        <Stack
          direction={{ sm: "column", md: "row" }}
          alignItems={{ sm: "flex-start", md: "center" }}
          justifyContent={{ sm: "space-around", md: "space-between" }}
          spacing={2}
          sx={{
            py: { xs: "24px", sm: "24px", md: 0 },
            px: { xs: "24px", sm: "50px", md: "113px" },
            height: { xs: "165px", sm: "165px", md: "125px" },
            bgcolor: "#111827",
          }}
        >
          <Stack direction="column">
            <Typography variant="body1" color="white" fontWeight={600}>
              {`Drivehub Co.,Ltd`}
            </Typography>

            <Typography variant="body1" color="white">
              {`193-195 Lake Rajada Office Complex,`}
            </Typography>

            <Typography variant="body1" color="white">
              {`Ratchadapisek road, Khlong Toei, Bangkok`}
            </Typography>
          </Stack>
          <Stack direction="column" pt={{ sm: 0, md: 5 }}>
            <Typography variant="body1" color="white">
              {`© Drivehub 2023`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <CartDialog
        cartData={cart}
        open={isOpen}
        handleClose={handleClose}
        handleAddtoCart={handleAddtoCart}
        handleRemoveFromCart={handleRemoveFromCart}
        totalPrice={totalPrice}
      />
    </>
  );
}
