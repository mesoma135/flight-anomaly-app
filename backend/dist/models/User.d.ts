import mongoose, { Document } from "mongoose";
export interface UserDocument extends Document {
    fname: string | null;
    lname: string | null;
    pnumber: string | null;
    email: string | null;
    gender: string | null;
    country: string | null;
    dob: Date;
}
declare const _default: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & UserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, UserDocument>;
export default _default;
//# sourceMappingURL=User.d.ts.map