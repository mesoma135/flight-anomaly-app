import mongoose , { Document, Schema } from "mongoose";

export interface UserDocument extends Document{
    fname: string | null;
    lname: string | null;
    pnumber: string | null;
    email: string | null;
    gender: string | null;
    country: string | null;
    dob: Date;
}

const UserSchema = new Schema<UserDocument>({
    fname: { type: String, req: true },
    lname: { type: String, req: true },
    pnumber: String,
    email: String,
    country: String,
    dob: { type: Date, default: null}
});

export default mongoose.model<UserDocument>("User", UserSchema);
