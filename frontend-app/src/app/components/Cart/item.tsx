import * as React from 'react';
import { Skeleton, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Product } from '@/app/types/Product';

export default function CartItem({ product }: { product: Product }) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <Card>
      <CardActionArea>
        {!loaded && <Skeleton variant="rectangular" width={200} height={120} />}
        <CardMedia
          component="img"
          image={product.images[0]}
          alt="green iguana"
          onLoad={() => setLoaded(true)}
          sx={{ 
            display: loaded ? 'block' : 'none',
            objectFit: 'contain',
            height: 120,
            margin: 0,
          }}
        />
        <CardContent sx={{ width: 200, height: 190 }}>
          <Typography variant="h6" noWrap className="text-lg m-0">
            {product.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} className="m-0">
            ${product.price}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 7,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            className="text-xs m-0">
              {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
