const { isIsoDate, isInt, isString, validateTrip, validateStation } = require('../config/import/importHelpers')

describe("Test import script", () => {
  test("isIsoDate function ", () => {
    expect(isIsoDate('1997-04-12')).toBe(false)
    expect(isIsoDate('1997-04-12T11:11:11')).toBe(true)
    expect(isIsoDate()).toBe(false)
    expect(isIsoDate('')).toBe(false)
    expect(isIsoDate(NaN)).toBe(false)
  });

  test("isString function ", () => {
    expect(isString('hello')).toBe(true)
    expect(isString('')).toBe(false)
    expect(isString(' ')).toBe(true)
    expect(isString(undefined)).toBe(false)
    expect(isString(null)).toBe(false)
  });

  test("isInt function ", () => {
    expect(isInt(1)).toBe(true)
    expect(isInt('1')).toBe(true)
    expect(isInt('one please? :)')).toBe(false)
  });
});