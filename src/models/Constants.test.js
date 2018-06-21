import * as Constants from "./Constants";

describe("Constants", () => {
  test("Constants.POINT_VALUES should be a specific object", () => {
    expect(Constants.POINT_VALUES).toMatchObject({
      "50": 600,
      Utils: 800,
      "100": 1000,
      "150": 1500,
      "200": 1800,
      "250": 2200,
      RR: 2500,
      "300": 2700,
      "400": 3000,
      "500": 3500
    });
  });

  test("Constants.PROPERTY_TYPES_IN_VALUE_ORDER should be a specific array", () => {
    expect(Constants.PROPERTY_TYPES_IN_VALUE_ORDER).toMatchObject([
      "500",
      "400",
      "300",
      "RR",
      "250",
      "200",
      "150",
      "100",
      "Utils",
      "50"
    ]);
  });
});
