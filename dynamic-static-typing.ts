//https://www.smashingmagazine.com/2021/01/dynamic-static-typing-typescript/
const app = {
  get,
};

type ServerReply = {
  send: (obj?: any) => void;
  status: (statusCode: StatusCode) => ServerReply;
};

//#region StatusCode
type StatusCode =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 449
  | 450
  | 451
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 598
  | 599;
//#endregion

type Methods = "GET" | "POST" | "PUT" | "DELETE";

function get<Path extends string = string>(
  path: Path,
  callback: CallbackFn<"GET", ParseRouteParams<Path>>
) {
  // to be implemented
}

type ParseRouteParams<Rte> = Rte extends `${string}/:${infer P}/${infer Rest}`
  ? P | ParseRouteParams<`/${Rest}`>
  : Rte extends `${string}/:${infer P}`
  ? P
  : never;

type CallbackFn<Met extends Methods, Par extends string> = (
  req: ServerRequest<Met, Par>,
  reply: ServerReply
) => void;

type ServerRequest<Met extends Methods, Par extends string = string> = {
  method: Met;
  params: { [K in Par]: string };
};

app.get("/api/users/:userID/:orderId", function (req, res) {
  req.params.userID;
  res.status(200).send();
});




// Params is "userID"
type Params = ParseRouteParams<"/api/user/:userID">

// MoreParams is "userID" | "orderID"
type MoreParams = ParseRouteParams<"/api/user/:userID/orders/:orderId">;




function identity<T>(inp: T) : T {
  return inp
}

const y = identity("yes") // y is of type "yes"
