describe("footballcointoss integration tests", () => {
    require("./test-suites/check-connect.test");
    require("./test-suites/sign-in.test");
    // require("./test-suites/unsettled-round.test");
    // require("./test-suites/get-pf-info.test")
    require("./test-suites/place-bet.test");
    require("./test-suites/settle.test");
});
