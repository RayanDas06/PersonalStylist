import React, { useEffect, useState } from 'react';
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
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Outfit, ClothingItem } from '../types';
import { searchClothingItems } from '../services/priceApi';

const OutfitRecommendations: React.FC = () => {
  const { styleId } = useParams<{ styleId: string }>();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add these lines to check the environment variable
  console.log('API Key available:', !!process.env.REACT_APP_PRICE_API_KEY);
  console.log('API Key length:', process.env.REACT_APP_PRICE_API_KEY?.length);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        setLoading(true);
        const styleName = styleId === '1' ? 'Streetwear' :
                         styleId === '2' ? 'Minimalist' :
                         styleId === '3' ? 'Bohemian' : 'Classic';

        const items = await searchClothingItems(styleName);
        
        if (items.length === 0) {
          setError('No clothing items found for this style. Please try again later.');
          return;
        }

        // Create outfits by grouping items
        const newOutfits: Outfit[] = [];
        for (let i = 0; i < items.length; i += 2) {
          if (i + 1 < items.length) {
            newOutfits.push({
              id: `outfit-${i}`,
              name: `${styleName} Outfit ${newOutfits.length + 1}`,
              items: [items[i], items[i + 1]],
              style: styleName,
              description: `A perfect ${styleName.toLowerCase()} combination for your style`,
              imageUrl: items[i].imageUrl
            });
          }
        }
        
        setOutfits(newOutfits);
        setError(null);
      } catch (err) {
        setError('Failed to fetch outfit recommendations. Please try again later.');
        console.error('Error fetching outfits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOutfits();
  }, [styleId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading outfit recommendations...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Outfit Recommendations
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
        Discover perfect outfits that match your style
      </Typography>

      <Grid container spacing={4}>
        {outfits.map((outfit) => (
          <Grid item key={outfit.id} xs={12}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {outfit.name}
              </Typography>
              <Typography color="text.secondary" paragraph>
                {outfit.description}
              </Typography>
              
              <Grid container spacing={3}>
                {outfit.items.map((item) => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    <Card sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 6
                      }
                    }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={item.imageUrl}
                        alt={item.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" component="h3">
                            {item.name}
                          </Typography>
                          <Typography variant="h6" color="primary">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.brand}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
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
                          fullWidth
                          href={item.url}
                          target="_blank"
                          sx={{ mt: 'auto' }}
                        >
                          Shop Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OutfitRecommendations; 