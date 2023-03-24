import mongoose, { Schema, model, Types } from "mongoose";
const postSchema = new Schema(
  {
   title:{
    type: String,
    required:true
   },
   caption:{
    type: String,
    required:true
   },
   image:{
    type: Object,
    required:true
   },
   user_Id:{
    type: Types.ObjectId,
    ref:"User",
    required:true
   },
   like:[{
    type: Types.ObjectId,
    ref:"User",
   }],
   unlike:[{
    type: Types.ObjectId,
    ref:"User",
   }],
//    comment:[{
//     type: Types.ObjectId,
//     ref:"Comment",
//    }],
    isDeleted:{
        type:Boolean,
        default:false
    },
    totalVote:{
        type:Number,
        default:0
    }
  },
  {
    timestamps: true,
  }
);

const postModel =mongoose.models.Post || model("Post", postSchema);
export default postModel;
