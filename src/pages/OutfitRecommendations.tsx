import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Outfit, ClothingItem } from '../types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Mock data for outfits
const mockOutfits: Outfit[] = [
  {
    id: '1',
    name: 'Urban Street Style',
    items: [
      {
        id: '1',
        name: 'Graphic T-Shirt',
        brand: 'Urban Outfitters',
        price: 29.99,
        imageUrl: 'https://source.unsplash.com/random/200x200?tshirt',
        category: 'Tops',
        style: ['Streetwear', 'Casual'],
        store: 'Urban Outfitters',
        url: '#'
      },
      {
        id: '2',
        name: 'Distressed Jeans',
        brand: 'Levi\'s',
        price: 89.99,
        imageUrl: 'https://source.unsplash.com/random/200x200?jeans',
        category: 'Bottoms',
        style: ['Streetwear', 'Casual'],
        store: 'Levi\'s',
        url: '#'
      }
    ],
    style: 'Streetwear',
    description: 'A casual streetwear look perfect for everyday wear',
    imageUrl: 'https://source.unsplash.com/random/400x300?streetwear-outfit'
  },
  // Add more mock outfits here
];

const OutfitRecommendations: React.FC = () => {
  const { styleId } = useParams<{ styleId: string }>();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Outfit Recommendations
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
        Discover perfect outfits that match your style
      </Typography>

      <Grid container spacing={4}>
        {mockOutfits.map((outfit) => (
          <Grid item key={outfit.id} xs={12}>
            <Card>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={outfit.imageUrl}
                    alt={outfit.name}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom>
                      {outfit.name}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {outfit.description}
                    </Typography>
                    
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Items in this outfit:
                    </Typography>
                    <Grid container spacing={2}>
                      {outfit.items.map((item) => (
                        <Grid item xs={12} sm={6} key={item.id}>
                          <Card variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                                  {item.name}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                  ${item.price}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {item.brand}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                {item.style.map((style) => (
                                  <Chip
                                    key={style}
                                    label={style}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                              <Button
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                size="small"
                                href={item.url}
                                target="_blank"
                              >
                                Shop Now
                              </Button>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OutfitRecommendations; 