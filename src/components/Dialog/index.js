// material
import {
  Button,
  Dialog,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

// ----------------------------------------------------------------------

export default function CartDialog({
  cartData,
  open,
  handleClose = () => {},
  handleAddtoCart,
  handleRemoveFromCart,
  totalPrice
}) {
  console.log("🚀 ~ file: index.js:18 ~ CartDialog ~ cartData:", cartData);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ py: 2, px: 3 }}
      >
        <Typography variant="h6" fontWeight={600}>
          Cart
        </Typography>
        <CloseIcon onClick={handleClose} />
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        sx={{ py: 2, px: 3, height: "200px" }}
      >
        {cartData.length === 0 ? (
          <Stack alignItems="center" justifyContent="center">
            <Typography variant="body1" fontWeight={600}>
              No data in cart
            </Typography>
          </Stack>
        ) : (
          cartData.map((e, index) => {
            return (
              <>
                <Stack key={index} direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography variant="body1" fontWeight={600}>
                      {e.fields.title}
                    </Typography>
                    <Typography variant="body1">
                      {e.fields.price} THB/Day
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleAddtoCart(e)}
                      sx={{
                        minWidth: "30px",
                        minHeight: "30px",
                        maxWidth: "30px",
                        maxHeight: "30px",
                        bgcolor: "#3B82F6",
                      }}
                    >
                      <AddIcon />
                    </Button>
                    <Typography variant="body1">{e.quantity}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleRemoveFromCart(e)}
                      sx={{
                        minWidth: "30px",
                        minHeight: "30px",
                        maxWidth: "30px",
                        maxHeight: "30px",
                        bgcolor: "#3B82F6",
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                  </Stack>
                </Stack>
                <Divider />
              </>
            );
          })
        )}
      </Stack>
      <Stack direction="column" spacing={1} sx={{ py: 2, px: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={600}>
            Total
          </Typography>
          <Typography variant="body1">{totalPrice} THB</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={600}>
            Discount
          </Typography>
          <Typography variant="body1">0 THB</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" fontWeight={600}>
            Grand Total
          </Typography>
          <Typography variant="body1">{totalPrice} THB</Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
}
