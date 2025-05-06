import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Tabs,
  Tab,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Store } from '../types';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Mock data for stores
const stores: Store[] = [
  {
    id: '1',
    name: 'Urban Outfitters',
    type: 'major',
    website: 'https://www.urbanoutfitters.com',
    location: 'Nationwide'
  },
  {
    id: '2',
    name: 'Local Boutique',
    type: 'local',
    website: 'https://www.localboutique.com',
    location: 'Atlanta, GA'
  },
  {
    id: '3',
    name: 'Zara',
    type: 'major',
    website: 'https://www.zara.com',
    location: 'Nationwide'
  },
  {
    id: '4',
    name: 'The Fashion House',
    type: 'local',
    website: 'https://www.fashionhouse.com',
    location: 'New York, NY'
  }
];

const StoreDirectory: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (store.location?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesType = selectedTab === 0 ? true : 
                       (selectedTab === 1 ? store.type === 'major' : store.type === 'local');
    return matchesSearch && matchesType;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Store Directory
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
        Discover fashion stores from major brands to local boutiques
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search stores by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Stores" />
          <Tab label="Major Brands" />
          <Tab label="Local Boutiques" />
        </Tabs>
      </Box>

      <Grid container spacing={4}>
        {filteredStores.map((store) => (
          <Grid item key={store.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StorefrontIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h5" component="h2">
                      {store.name}
                    </Typography>
                    <Chip
                      label={store.type === 'major' ? 'Major Brand' : 'Local Boutique'}
                      color={store.type === 'major' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography color="text.secondary">
                    {store.location}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  href={store.website}
                  target="_blank"
                >
                  Visit Store
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StoreDirectory; 