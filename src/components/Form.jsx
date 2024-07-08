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
} from '@mui/material';

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
      // Submit the form
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          p: 3,
          boxShadow: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Change your private information
          </Typography>
          <Typography variant="body2" gutterBottom>
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
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={formData.bio}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2">
                You may also consider to update your{' '}
                <Link href="/billing">billing information</Link>.
              </Typography>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Form;
