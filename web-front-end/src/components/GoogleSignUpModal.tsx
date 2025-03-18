import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import GoogleIcon from "../icons/Google"

interface GoogleSignUpModalProps {
  openModal: boolean
  setOpenModal: (open: boolean) => void
  googleEmail: string
  onGoogleSignUp: (credential: string) => void
  googleCredential?: string
}

export default function GoogleSignUpModal({
  openModal,
  setOpenModal,
  googleEmail,
  onGoogleSignUp,
  googleCredential,
}: GoogleSignUpModalProps) {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="sign_up_google"
      aria-describedby={`Do you want to Sign up using Google account ${googleEmail}?`}
    >
      <Paper
        elevation={6}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          borderRadius: 2,
          p: 0,
          outline: "none",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translate(-50%, -50%) scale(1.01)",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ bgcolor: "primary.main", py: 2, px: 3 }}>
          <Typography id="sign_up_google" variant="h6" component="h2" color="white" fontWeight="500">
            Sign up with Google
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar sx={{ bgcolor: "white", color: "error.main" }}>
              <GoogleIcon />
            </Avatar>
            <Typography variant="body1" fontWeight="medium">
              {googleEmail}
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You're about to create a new account using your Google credentials. Click continue to proceed.
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={() => setOpenModal(false)} size="large">
              Cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={() => onGoogleSignUp(googleCredential as string)}
              startIcon={<GoogleIcon />}
              sx={{
                px: 3,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  )
}
