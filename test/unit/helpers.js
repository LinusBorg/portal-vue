import { default as chai, expect } from 'chai'
import td from 'testdouble'
import tdChai from 'testdouble-chai'

// make sure to call tdChai with td to inject the dependency
chai.use(tdChai(td))

export {
  expect,
  td,
}
