import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Style } from '../types';

// Mock data for styles
const styles: Style[] = [
  {
    id: '1',
    name: 'Streetwear',
    description: 'Urban-inspired fashion combining comfort with style',
    imageUrl: 'https://source.unsplash.com/random/400x300?streetwear',
    characteristics: ['Casual', 'Urban', 'Comfortable', 'Trendy']
  },
  {
    id: '2',
    name: 'Minimalist',
    description: 'Clean lines and simple designs for a timeless look',
    imageUrl: 'https://source.unsplash.com/random/400x300?minimalist-fashion',
    characteristics: ['Simple', 'Elegant', 'Timeless', 'Clean']
  },
  {
    id: '3',
    name: 'Bohemian',
    description: 'Free-spirited style with eclectic patterns and natural materials',
    imageUrl: 'https://source.unsplash.com/random/400x300?bohemian-fashion',
    characteristics: ['Free-spirited', 'Eclectic', 'Natural', 'Artistic']
  },
  {
    id: '4',
    name: 'Classic',
    description: 'Timeless elegance with sophisticated pieces',
    imageUrl: 'https://source.unsplash.com/random/400x300?classic-fashion',
    characteristics: ['Elegant', 'Sophisticated', 'Timeless', 'Refined']
  }
];

const StyleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Choose Your Style
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center" sx={{ mb: 6 }}>
        Select a style to see personalized outfit recommendations
      </Typography>

      <Grid container spacing={4}>
        {styles.map((style) => (
          <Grid item key={style.id} xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  cursor: 'pointer'
                }
              }}
              onClick={() => navigate(`/outfits/${style.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={style.imageUrl}
                alt={style.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {style.name}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {style.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {style.characteristics.map((char, index) => (
                    <Typography
                      key={index}
                      variant="caption"
                      sx={{
                        bgcolor: 'primary.light',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}
                    >
                      {char}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StyleSelection; 