import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Step3(props) {
  const classes = useStyles(props);

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className="flex justify-center items-center py-40">
          <p className="text-lg text-gray-800">
            You are required to pay a Processing fee of N 5,000
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Step3;
