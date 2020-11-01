/// <reference types="jest" />
declare const transports: {};
export { transports };
declare const wormhole: {
    open: jest.Mock<any, any>;
    close: jest.Mock<any, any>;
    transports: {};
    getContentForTarget: jest.Mock<any, any>;
};
export { wormhole };
