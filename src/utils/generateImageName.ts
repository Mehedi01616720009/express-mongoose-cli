const generateImageName = (name: string) => {
    return Date.now() + '-' + name.toLocaleLowerCase().split(' ').join('-');
};

export default generateImageName;
