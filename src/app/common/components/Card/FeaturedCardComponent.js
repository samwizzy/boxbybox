import React from "react";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

export default function FeaturedCardComponent(props) {
  return (
    <Card className="grid grid-cols-2">
      <CardMedia
        image="https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg"
        title="featured"
      />
      <CardContent>
        <h3 className="text-gray-800 font-medium text-sm mb-1 uppercase">
          4 BEDROOM DUPLEX
        </h3>
        <span className="text-xs text-gray-600 uppercase">R003YXXEN</span>
        <h3 className="flex items-center text-xs font-normal text-gray-500 mt-1">
          <LocationOnIcon color="secondary" fontSize="small" /> Yaba Lagos
          Nigeria
        </h3>
      </CardContent>
    </Card>
  );
}
