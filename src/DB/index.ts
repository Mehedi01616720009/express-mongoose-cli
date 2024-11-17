import config from '../config';
import { IUser } from '../modules/user/user.interface';
import { USER_ROLES } from '../modules/user/user.constant';

// super admin data
const superAdminData: Partial<IUser> = {
    name: 'Mehedi Hasan',
    email: 'mehedi01616720009@gmail.com',
    phone: '01616720009',
    gender: 'Male',
    address: 'Dhaka',
    password: config.superAdminPassword as string,
    role: USER_ROLES.superAdmin,
    status: 'Active',
};

// super admin query
const superAdminQuery = { role: USER_ROLES.superAdmin };

const seedSuperAdmin = async () => {
    // // check count of super admins, if it grater than limit of super admin delete all and initialize it
    // const totalSuperAdmins = await Admin.countDocuments(superAdminQuery);
    // if (totalSuperAdmins > Number(config.superAdminLimit)) {
    //     await Admin.deleteMany(superAdminQuery);
    // }
    // // check if any super admin exist, if no one then seed super admin
    // const isSuperAdminExist = await Admin.findOne(superAdminQuery);
    // if (!isSuperAdminExist) {
    //     const isUserExist = await Admin.isUserExistByEmail(
    //         superAdminData?.email as string
    //     );
    //     if (isUserExist?.email) {
    //         throw new AppError(
    //             httpStatus.IM_USED,
    //             'This email has already exist'
    //         );
    //     }
    //     superAdminData.id = await generateUserId(
    //         superAdminData?.email as string
    //     );
    //     superAdminData.password = await bcrypt.hash(
    //         superAdminData.password as string,
    //         Number(config.bcryptSaltRounds)
    //     );
    //     superAdminData.profileImg = config.profileImg as string;
    //     await Admin.create(superAdminData);
    // }
};

export default seedSuperAdmin;
