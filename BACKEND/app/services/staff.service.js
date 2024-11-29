const staffModel = require('../models/staff.model');
const { ObjectId } = require('mongodb');
const { escapeRegex } = require('../utils/helper');
class StaffService {
    extractStaffData(payload) {
        const staff = {
            staff_name: payload.staff_name,
            staff_role: payload.staff_role,
            staff_address: payload.staff_address,
            staff_phone: payload.staff_phone,
            account_id: payload.account_id,
        };
        Object.keys(staff).forEach((key) => staff[key] == undefined && delete staff[key]);
        return staff;
    }

    //Used
    async create(payload) {
        const staff = this.extractStaffData(payload);
        const lastStaff = await staffModel.findOne({}).sort({
            createdAt: -1,
        });
        if (lastStaff) {
            staff.staff_id = 'S' + (parseInt(lastStaff.staff_id.substr(1)) + 1);
        } else {
            staff.staff_id = 'S1001';
        }
        const escapedStaff = escapeRegex(staff);
        const result = await staffModel.create(escapedStaff);
        return result._id;
    }

    async update(id, payload) {
        try {
            const staff = this.extractStaffData(payload);
            const escapedStaff = escapeRegex(staff);
            const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
            const options = { returnDocument: true };
            const updateDoc = {
                $set: escapedStaff,
            };
            return await staffModel.findOneAndUpdate(filter, updateDoc, options);
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const result = await staffModel.deleteOne(filter);
        return result.deletedCount;
    }

    async deleteAll() {
        const result = await staffModel.deleteMany({});
        return result.deletedCount;
    }

    async getById(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        return await staffModel.findOne(filter);
    }

    async getAll() {
        return await staffModel.find({}).populate('account_id');
    }

    async getByAccountId(id) {
        const filter = { account_id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        return await staffModel.findOne(filter);
    }
}

module.exports = StaffService;
