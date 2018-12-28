/// <reference types="jest" />
declare const transports: {};
export { transports };
declare const wormhole: {
    open: jest.Mock<{}>;
    close: jest.Mock<{}>;
    registerSource: jest.Mock<{}>;
    unregisterSource: jest.Mock<{}>;
    registerTarget: jest.Mock<{}>;
    unregisterTarget: jest.Mock<{}>;
    hasSource: jest.Mock<{}>;
    hasTarget: jest.Mock<{}>;
    transports: {};
    targets: {};
    sources: {};
};
export { wormhole };
