import AWS from "aws-sdk";
const nanoid = require("nanoid");

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};
const S3 = new AWS.S3(awsConfig);
export const uploadImage = async (req, res) => {
  // console.log(req.body);
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("No image");

    // prepare the image
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    // image params
    const params = {
      Bucket: "youdemy-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log("Error from server/controller/course upload to s3 =>", err);
        return res.sendStatus(400);
      }
      // console.log(data);
      res.send(data);
    });
  } catch (e) {
    console.log("Error from uploadImage from controllers/course => : ", e);
  }
};

export const removeImage = async (req, res) => {
  try {
    const { image } = req.body;
    // console.log(image);

    // image params
    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    // delete from s3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("Error from S3.deleteObject =>", err);
        res.sendStatus(400);
      }
      res.send({ ok: true });
    });
  } catch (e) {
    console.log("Error from removeImage catch =>", e);
  }
};
