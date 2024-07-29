import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const guestSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});


const Guest = mongoose.models.Guest || mongoose.model('Guest', guestSchema);

export default Guest;


