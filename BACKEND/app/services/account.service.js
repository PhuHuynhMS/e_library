const accountModel = require('../models/account.model');
const { ObjectId } = require('mongodb');
const { escapeRegex } = require('../utils/helper');
const bcryptjs = require('bcryptjs');
const ReaderService = require('./reader.service');
const StaffService = require('./staff.service');

const readerService = new ReaderService();
const staffService = new StaffService();
class AccountService {
    extractAccountData(data) {
        const account = {
            account_name: data.account_name,
            account_password: data.account_password,
        };
        Object.keys(account).forEach((key) => account[key] == undefined && delete account[key]);
        return account;
    }
    async create(data) {
        const salt = await bcryptjs.genSalt(10);
        data.account_password = await bcryptjs.hash(data.account_password, salt);
        const account = await accountModel.create(data);
        return account;
    }

    async getById(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const account = await accountModel.findOne(filter);
        return account;
    }

    async getAll() {
        const accounts = await accountModel.find({});
        return accounts;
    }

    async update(id, data) {
        const extractedData = this.extractAccountData(data);
        const escapedData = escapeRegex(extractedData);
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const options = { returnDocument: true };
        const updateDoc = {
            $set: escapedData,
        };
        return await bookModel.findOneAndUpdate(filter, updateDoc, options);
    }

    async delete(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const account = await accountModel.deleteOne(filter);
        return account;
    }
    async deleteAll() {
        const accounts = await accountModel.deleteMany({});
        return accounts.deletedCount;
    }

    async authenticate(data) {
        const username = data.username;
        const account = await accountModel.findOne({ account_name: username });

        if (account) {
            const validPassword = await bcryptjs.compare(data.password, account.account_password);

            if (validPassword) return account;
        }
    }

    async createDefaultAdmin() {
        const existingAdmin = await accountModel.findOne({ account_role: 'admin' });
        if (!existingAdmin) {
            const salt = await bcryptjs.genSalt(10);

            const adminPayload = {
                account_name: 'admin',
                account_password: await bcryptjs.hash('admin123', salt),
                account_role: 'admin',
            };

            const admin = await accountModel.create(adminPayload);
            console.log('Admin created: ', admin);
        }
        console.log('Admin already exists');
    }

    async createReaderAccount(data) {
        const accountPayload = {
            account_name: data.username,
            account_password: data.password,
        };

        const account = await this.create(accountPayload);

        const readerPayload = {
            reader_firstname: data.firstName,
            reader_lastname: data.lastName,
            reader_birthday: data.dateOfBirth,
            reader_address: data.address,
            reader_phone: data.phoneNumber,
            reader_gender: data.gender,
            account_id: account._id,
        };

        await readerService.create(readerPayload);

        return account;
    }

    async createStaffAccount(data) {
        const accountPayload = {
            account_name: data.account_name,
            account_password: data.account_password,
            account_role: 'staff',
        };

        const account = await this.create(accountPayload);

        const staffPayload = {
            staff_name: data.staff_name,
            staff_role: data.staff_role,
            staff_address: data.staff_address,
            staff_phone: data.staff_phone,
            account_id: account._id,
        };

        await staffService.create(staffPayload);

        return account;
    }

    async changePassword(id, data) {
        const account = await this.getById(id);
        console.log('account: ', account);

        await bcryptjs.compare(data.currentPassword, account.account_password).then(async (validPassword) => {
            if (validPassword) {
                const salt = await bcryptjs.genSalt(10);
                data.newPassword = await bcryptjs.hash(data.newPassword, salt);
                const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
                const options = { returnDocument: true };
                const updateDoc = {
                    account_password: data.newPassword,
                };
                return await accountModel.findOneAndUpdate(filter, updateDoc, options);
            }
        });
    }
}

module.exports = AccountService;
