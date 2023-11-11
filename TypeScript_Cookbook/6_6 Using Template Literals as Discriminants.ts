/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
6.6. Using Template Literals as Discriminants
*/
type UserRequest =
    | {
        state: "USER_PENDING";
      }
    | {
        state: "USER_ERROR";
        message: string;
      }
    | {
        state: "USER_SUCCESS";
        data: User;
      }


type User = string;

type Order = number;

{
type Pending = {
    state: `${Uppercase<string>}_PENDING`;
};

type Err = {
    state: `${Uppercase<string>}_ERROR`;
    message: string;
};

type Success = {
    state: `${Uppercase<string>}_SUCCESS`;
    data: any;
};

type BackendRequest = Pending | Err | Success;



function execute(req: BackendRequest) {
    switch (req.state) {
        case "USER_PENDING":
        // req: Pending
        console.log("Login pending");
        break;
        case "USER_ERROR":
        // req: Err
        throw new Error(`Login failed: ${req.message}`);
        case "USER_SUCCESS":
        // req: Success
        console.log(req.data);
        break;
        //...
    }
}

type RequestConstants = "user" | "order";
}



type Data = {
    user: User | null;
    order: Order | null;
}

type RequestConstants = keyof Data;

type Pending = {
    state: `${Uppercase<RequestConstants>}_PENDING`;
};

type Err = {
    state: `${Uppercase<RequestConstants>}_ERROR`;
    message: string;
};

{
type Success = {
    state: `${Uppercase<RequestConstants>}_SUCCESS`;
    data: any; //want to have the actual data type associated with "user" or "order"
};
}
{
/*
index access
type Order = unknown;
data can be both "User" | "Order"
*/
type Success = {
    state: `${Uppercase<RequestConstants>}_SUCCESS`;
    data: NonNullable<Data[RequestConstants]>;
};
}
type Success = {
    [K in RequestConstants]: {
    state: `${Uppercase<K>}_SUCCESS`;
    data: NonNullable<Data[K]>;
    };
}[RequestConstants];