//class constants
class MyClass {
    static readonly myReadOnlyProperty = 1;

    constructor() {
        MyClass.myReadOnlyProperty = 5; // error, readonly
    }

    myMethod() {
        console.log(MyClass.myReadOnlyProperty);
        MyClass.myReadOnlyProperty = 5; // error, readonly
    }
}

MyClass.myReadOnlyProperty = 5; // error, readonly