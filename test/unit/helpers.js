import {default as chai, expect } from 'chai'
import td from 'testdouble'
import tdChai from "testdouble-chai"

chai.use(tdChai(td)); // make sure to call tdChai with td to inject the dependency

export {
  expect,
  td,
}
