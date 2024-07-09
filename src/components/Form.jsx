import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Divider,
  Modal,
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    bio: '',
    country: '',
    city: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalEmailError, setModalEmailError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setOpen(true);
    }
  };

  const handleSend = () => {
    if (!modalEmail) {
      setModalEmailError('Email is required');
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const dataToSend = {
      ...formData,
      sentAt: formattedDate,
    };

    console.log(`Sending data to ${modalEmail}:`, dataToSend);
    // Здесь вы можете добавить логику для отправки данных на email

    setOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: 'rgba(140, 152, 164, 0.125) 0px 6px 24px 0px',
          p: 4,
          maxWidth: '895px',
          width: '100%',
          pb: 4,
        }}
      >
        <form onSubmit={handleSubmit} style={{ height: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Change your private information
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.875rem',
              lineHeight: 1.57,
              color: 'rgb(103, 119, 136)',
            }}
          >
            Please read our{' '}
            <Link href="https://www.google.com">terms of use</Link> to be
            informed how we manage your private data.
          </Typography>
          <Box
            sx={{
              paddingTop: '32px',
              paddingBottom: '32px',
            }}
          >
            <Divider
              sx={{
                margin: '0px',
                flexShrink: 0,
                borderWidth: '0px 0px thin',
                borderStyle: 'solid',
                borderColor: 'rgba(0, 0, 0, 0.12)',
              }}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  margin: '0px 0px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.57,
                  fontWeight: 700,
                }}
              >
                Enter your first name
              </Typography>
              <TextField
                fullWidth
                label="First name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={{
                  borderRadius: '5px',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  margin: '0px 0px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.57,
                  fontWeight: 700,
                }}
              >
                Enter your email
              </Typography>
              <TextField
                fullWidth
                label="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  borderRadius: '5px',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  margin: '0px 0px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.57,
                  fontWeight: 700,
                }}
              >
                Bio
              </Typography>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                sx={{
                  borderRadius: '5px',
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              paddingTop: '32px',
              paddingBottom: '32px',
            }}
          >
            <Divider
              sx={{
                margin: '0px',
                flexShrink: 0,
                borderWidth: '0px 0px thin',
                borderStyle: 'solid',
                borderColor: 'rgba(0, 0, 0, 0.12)',
              }}
            />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  margin: '0px 0px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.57,
                  fontWeight: 700,
                }}
              >
                Country
              </Typography>
              <TextField
                fullWidth
                label="Country *"
                name="country"
                value={formData.country}
                onChange={handleChange}
                sx={{
                  borderRadius: '5px',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  margin: '0px 0px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.57,
                  fontWeight: 700,
                }}
              >
                City
              </Typography>
              <TextField
                fullWidth
                label="City *"
                name="city"
                value={formData.city}
                onChange={handleChange}
                sx={{
                  borderRadius: '5px',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  margin: '0px 0px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.57,
                  fontWeight: 700,
                }}
              >
                Enter your address
              </Typography>
              <TextField
                fullWidth
                label="Address *"
                name="address"
                value={formData.address}
                onChange={handleChange}
                sx={{
                  borderRadius: '5px',
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '32px',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  lineHeight: 1.57,
                  color: 'rgb(30, 32, 34)',
                }}
              >
                You may also consider to update your{' '}
                <Link
                  href="https://www.google.com"
                  sx={{
                    margin: 0,
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                    color: 'rgb(55, 125, 255)',
                    textDecoration: 'none',
                  }}
                >
                  billing information
                </Link>
                .
              </Typography>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  outline: 0,
                  border: 0,
                  margin: 0,
                  cursor: 'pointer',
                  userSelect: 'none',
                  verticalAlign: 'middle',
                  textDecoration: 'none',
                  textTransform: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  minWidth: '64px',
                  padding: '10px 22px',
                  transition:
                    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  color: 'rgb(255, 255, 255)',
                  backgroundColor: 'rgb(55, 125, 255)',
                  boxShadow: 'rgba(140, 152, 164, 0.1) 0px 12px 15px',
                  fontWeight: 400,
                  borderRadius: '5px',
                }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" gutterBottom>
              Enter the email to send the data
            </Typography>
            <TextField
              fullWidth
              label="Email"
              name="modalEmail"
              value={modalEmail}
              onChange={(e) => {
                setModalEmail(e.target.value);
                setModalEmailError('');
              }}
              error={!!modalEmailError}
              helperText={modalEmailError}
              sx={{
                borderRadius: '5px',
                marginBottom: '16px',
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                outline: 0,
                border: 0,
                margin: 0,
                cursor: 'pointer',
                userSelect: 'none',
                verticalAlign: 'middle',
                textDecoration: 'none',
                textTransform: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                lineHeight: 1.75,
                minWidth: '64px',
                padding: '10px 22px',
                transition:
                  'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                color: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(55, 125, 255)',
                boxShadow: 'rgba(140, 152, 164, 0.1) 0px 12px 15px',
                fontWeight: 400,
                borderRadius: '5px',
              }}
            >
              Send
            </Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default Form;
