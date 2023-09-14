// Optional Chaining can be used alongside Nullish Coalescing to provide a fallback value when dealing with null or undefined values
const data = change?.after?.data() ?? someOtherData();