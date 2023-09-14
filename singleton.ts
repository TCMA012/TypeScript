//singleton
//define visibility modifiers on constructors
class MyClass
{
    private static _instance: MyClass;

    private constructor()
    {
        //...
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
}

const myClassInstance = MyClass.Instance;
