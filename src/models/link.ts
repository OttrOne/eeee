import { model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';

export interface ILink {
    full: string,
    short: string,
    clicks: number,
}

const schema = new Schema<ILink>({
    full: { type: String, required: true },
    short: {
        type: String,
        required: true,
        unique: true,
        default: () => nanoid(6)
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

export default model<ILink>('Link', schema);
