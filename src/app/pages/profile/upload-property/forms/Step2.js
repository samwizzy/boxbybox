import React from "react";
import { Card, CardContent } from "@material-ui/core";
import ImageDropzone from "./../components/ImageDropzone";
import DocDropzone from "./../components/DocDropzone";

function Step2(props) {
  // const { form, handleChange } = props;

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div>
            <ImageDropzone />
          </div>
          <div>
            <DocDropzone />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Step2;
