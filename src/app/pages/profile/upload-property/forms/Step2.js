import React from "react";
import { Card, CardContent } from "@material-ui/core";
import ImageDropzone from "./../components/ImageDropzone";
import DocDropzone from "./../components/DocDropzone";

function Step2(props) {
  const { form, handleImageUpload } = props;

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col p-8 space-y-4">
          <div>
            <ImageDropzone form={form} handleImageUpload={handleImageUpload} />
          </div>
          <div>
            <DocDropzone form={form} handleImageUpload={handleImageUpload} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Step2;
