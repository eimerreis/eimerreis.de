export const CaluclateRequestsNeeded = (totalCount: number, maxFetchableItems: number, hasDoneFirstRequest: boolean = false) => {
    if(hasDoneFirstRequest) {
        return Math.ceil((totalCount - maxFetchableItems) / maxFetchableItems)
    }

    return Math.ceil(totalCount / maxFetchableItems)
}