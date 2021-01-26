import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";

export default function FeaturedCardComponent({ property }) {
  return (
    <Card className="grid grid-cols-2">
      <CardMedia
        image="https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg"
        title="featured"
      />
      <CardContent>
        <h3 className="text-gray-800 font-medium text-sm mb-1 uppercase">
          {property ? (
            <Link className="no-underline" to={`/property/${property.id}`}>
              {property.title}
            </Link>
          ) : (
            <Skeleton />
          )}
        </h3>
        <span className="text-xs text-gray-600 uppercase">
          {property ? property.propertyRef : <Skeleton />}
        </span>
        {property ? (
          <h3 className="flex items-center text-xs font-normal text-gray-500 mt-1">
            <LocationOnIcon color="secondary" fontSize="small" />{" "}
            {property.address.city} {property.address.state}{" "}
            {property.address.country}
          </h3>
        ) : (
          <Skeleton />
        )}
      </CardContent>
    </Card>
  );
}
