import React from 'react';
import { Button, Card, CardMedia, CardActions, Chip } from '@material-ui/core';
import { PhoneIcon } from '@heroicons/react/outline'
import Rating from '@material-ui/lab/Rating';


const PlaceDetails = ({ refProp, place }) => {
  refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6} className="overflow-y-auto w-full">
     
      <div className="flex items-start w-full p-1"> 
        <CardMedia
          style={{ height: 150,width: 150}}
          image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
          title={place.name}
        />
        <div className="p-2 pl-5 place-items-center">
          <div className="w-full">
            <h3 className="text-base pl-0.5 font-bold">{place.name}</h3>
            <Rating name="read-only" value={Number(place.rating)} readOnly precision={0.5} size="small"/>
            <p className="text-xs pl-0.5 font-light">{place.num_reviews} review{place.num_reviews > 1 && 's'}</p>
          </div>
          <p className="text-xs pl-0.5 font-light">{place.price_level}</p>
        </div>
      </div>
  
      <div className="p-3">
        <p className="text-xs font-medium px-1">{place.ranking}</p>
        {place?.awards?.map((award) => (
          <div className="flex items-start pb-1">
            <img src={award.images.small}  alt={award.display_name} className="pr-3"/>
            <p className="text-xs pt-1">{award.display_name}</p>
          </div>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className="text-xs font-light"/>
        ))}

        {place.address && (
          <p className="flex pt-3 text-xs text-gray-500">
            {place.address}
          </p>
        )}

        {place.phone && (
          <p className="flex text-xs text-gray-500">
            <PhoneIcon className="mr-3 h-4 w-4 text-gray-500"/> {place.phone}
          </p>
        )}
      </div>
   
      <CardActions>
        <div className="flex items-end">
          <Button size="small" variant="text" color="secondary" onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisor
          </Button>
          <Button size="small" variant="text" color="secondary" onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;