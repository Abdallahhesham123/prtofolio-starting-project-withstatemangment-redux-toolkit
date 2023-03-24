import UserModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import cloudinary from "../../../utils/cloudinary.js";
export const getUser = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find({}).select("-password");
  return res.json({ message: "Done", users });
});



export const findByIdAndUpdate = asyncHandler(async (req, res, next) => {

  const profileimage = await cloudinary.uploader.upload(
    req.files?.Profilepic[0]?.path,
    { folder: `user/${req.user._id}/profilePic` }
  );
  const coverimage = await cloudinary.uploader.upload(
    req.files?.Coverpic[0]?.path,
    { folder: `user/${req.user._id}/cover` }
  );
  const user = await UserModel.findByIdAndUpdate(
    { _id: req.user._id, isDeleted: false },
    {
      ...req.body,
      Profilepic:profileimage.secure_url,
      Profilepic_id:profileimage.public_id,
      Coverpic:coverimage.secure_url,
      Coverpic_id:coverimage.public_id,
    },
    { new: false }
  );

  await cloudinary.uploader.destroy(user.Profilepic_id);
  await cloudinary.uploader.destroy(user.Coverpic_id);

  console.log("abd", user);
  return user
    ? res.json({ message: "user Updated Sucsessfully" })
    : next(new Error("InValid-UserId"));
});

export const getProfile = asyncHandler(async (req, res, next) => {
  //   const { id } = req.params;
  const user = await UserModel.findOne({
    _id: req.user._id,
    isDeleted: false,
    confirmEmail: true,
  }).select("-password -confirmEmail -isDeleted ");
  return user
    ? res.json({ message: "user Profile Founded Sucsessfully", user })
    : next(new Error("InValid-UserId"));
});






      //it is return object without modifiedCount( hardDeleted== deleted from database)
export const findOneAndDelete = asyncHandler(async (req, res, next) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
    const fullpath= path.join(__dirname, "../../../uploads/")
  const user = await UserModel.findOneAndDelete({ _id: req.user._id, isDeleted: false }, { new: false });
  if(user.Profilepic && user.Profilepic !== req.body.Profilepic) {
    const newdata = user.Profilepic.replace("/","\\")
    fs.unlinkSync(`${fullpath}${newdata}`);
    
  }
  return user
    ? res.json({ message: "user Deleted Sucsessfully from database" })
    : next(new Error("InValid-UserId"));
    
});

export const profilePicUpdated = asyncHandler(async (req, res, next) => {

  const {secure_url ,public_id} =await cloudinary.uploader.upload(req.file.path, {folder:`user/${req.user._id}/profilePic`})

const user = await UserModel.findByIdAndUpdate(
  req.user._id,
  {Profilepic:secure_url , Profilepic_id:public_id} ,
  {new:false}
  )
  await cloudinary.uploader.destroy(user.Profilepic_id)
 return res.json({ message: "Done",user })

    
});

export const softDelete =asyncHandler( async (req, res, next) => {

  const user = await UserModel.updateOne(
    { _id:req.user._id, isDeleted: false },
    { isDeleted: true }
  );


  return user.modifiedCount
    ? res.json({
        message: "user deleted Sucsessfully but this user in database" })
    :  next(new Error("InValid-UserId"));
   
});

export const restoretodatabase = asyncHandler( async (req, res, next) => {

  
  const user = await UserModel.updateOne(
    { _id:req.user._id, isDeleted: true },
    { isDeleted: false }
  );


  return user.modifiedCount
    ? res.json({
        message: "user Restored Sucsessfully and your post Restored" })
    :  next(new Error("InValid-UserId"));
   
});