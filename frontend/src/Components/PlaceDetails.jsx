import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import { PhoneIcon, LocationMarkerIcon } from '@heroicons/react/outline'

import Rating from '@material-ui/lab/Rating';



const PlaceDetails = ({place, selected, refProp}) => {
  if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6} className="overflow-y-auto w-full">
    <CardMedia
      style={{ height: 150 }}
      image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
      title={place.name}
    />
    <CardContent>
      <Typography variant="h6" className="pl-1">{place.name}</Typography>
      <Box display="flex" justifyContent="space-between" my={2} className="flex items-start">
        <Rating name="read-only" value={Number(place.rating)} readOnly/>
        <Typography component="legend" gutterBottom variant="caption" className="pt-1 pl-3">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" className="flex items-start">
        <Typography component="legend" variant="body2">Price</Typography>
        <Typography variant="body2">
          {place.price_level}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" className="flex items-start">
        <Typography component="legend" variant="body2">Ranking</Typography>
        <Typography gutterBottom variant="body2">
          {place.ranking}
        </Typography>
      </Box>
      {place?.awards?.map((award) => (
        <Box display="flex" justifyContent="space-between" my={1} alignItems="center" className="flex items-start">
          <img src={award.images.small}  alt={award.display_name} className="pr-3"/>
          <Typography gutterBottom variant="body2" color="textSecondary">{award.display_name}</Typography>
        </Box>
      ))}
      {place?.cuisine?.map(({ name }) => (
        <Chip key={name} size="small" label={name} />
      ))}
      {place.address && (
        <Typography gutterBottom variant="body2" color="textSecondary" className="flex items-start pt-3">
          {place.address}
        </Typography>
      )}
      {place.phone && (
        <Typography variant="body2" color="textSecondary" className="flex items-start">
          <PhoneIcon className="mr-3 h-6 w-6"/> {place.phone}
        </Typography>
      )}
    </CardContent>
    <CardActions>
      <Button size="small" variant="text" color="secondary" onClick={() => window.open(place.web_url, '_blank')}>
        Trip Advisor
      </Button>
      <Button size="small" variant="text" color="secondary" onClick={() => window.open(place.website, '_blank')}>
        Website
      </Button>
    </CardActions>
  </Card>
  );
};

export default PlaceDetails;