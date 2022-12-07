import { CaluclateRequestsNeeded } from "./spotify.utils"

it("should calculate correct amount of requests missing", () => {
    const requestsMissing = CaluclateRequestsNeeded(200, 50)
    expect(requestsMissing).toBe(4);
})

it("should subtract one request if first one has already been done", () => {
    const requestsMissing = CaluclateRequestsNeeded(200, 50, true)
    expect(requestsMissing).toBe(3);
})