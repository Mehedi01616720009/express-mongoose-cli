const generateSlug = async (name: string) => {
    const id = name.toLocaleLowerCase().split(' ').join('-');
    return id;
};

export default generateSlug;
