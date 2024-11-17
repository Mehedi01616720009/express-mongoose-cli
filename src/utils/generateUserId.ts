const generateUserId = async (email: string) => {
    const id = email.split('@');
    return id[0];
};

export default generateUserId;
