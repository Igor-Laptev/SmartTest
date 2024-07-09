import React, { useState, useEffect } from 'react';
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
import emailjs from '@emailjs/browser';

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    bio: '',
    country: '',
    city: '',
    address: '',
  });
  const [recipientEmail, setRecipientEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [notification]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
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
      setModalOpen(true);
    }
  };

  const handleSendEmail = () => {
    const templateParams = {
      firstName: formData.firstName,
      email: formData.email,
      bio: formData.bio,
      country: formData.country,
      city: formData.city,
      address: formData.address,
      sentAt: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      to_email: recipientEmail,
    };

    emailjs
      .send(
        'service_3iz3fca', // Service ID
        'template_8s9k94d', // Template ID
        templateParams,
        'UZ6iZUKQpwd8MDrz4', // User ID
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setNotification('Email sent successfully!');
          setNotificationType('success');
          setModalOpen(false);
        },
        (error) => {
          console.log('FAILED...', error);
          setNotification('Failed to send email.');
          setNotificationType('error');
        },
      );
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
            Please read our <Link href="/terms">terms of use</Link> to be
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
                  href="/billing"
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
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: 'rgba(140, 152, 164, 0.125) 0px 6px 24px 0px',
            p: 4,
            maxWidth: '400px',
            width: '100%',
            margin: 'auto',
            marginTop: '10%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Enter Recipient Email
          </Typography>
          <TextField
            fullWidth
            label="Recipient Email"
            value={recipientEmail}
            onChange={handleRecipientEmailChange}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendEmail}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>

      {notification && (
        <Box
          sx={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: notificationType === 'success' ? 'green' : 'red',
            color: 'white',
            borderRadius: '5px',
            boxShadow: 'rgba(140, 152, 164, 0.125) 0px 6px 24px 0px',
            p: 2,
            zIndex: 9999,
          }}
        >
          <Typography variant="body1">{notification}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default Form;
