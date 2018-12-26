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
    hasTarget: jest.Mock<{}>;
    transports: {};
};
export default wormhole;
