/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
4.9 Adding Const Context to Generic Type Parameters

https://github.com/type-challenges/type-challenges
*/
function router<const T extends Route>(routes: T[]) {
    return {
        navigate(path: T["path"]) {
            //tbd
        }
    }
}
  
  
type Route = {
    path: string,
    component: ComponentConstructor
}

interface ComponentConstructor {
    new(): Component
}

interface Component {
    render(): HTMLElement
}

class Main implements Component {
    render(): HTMLElement {
        return document.createElement("main")
    }
}

class About implements Component {
    render(): HTMLElement {
        return document.createElement("main")
    }
}

const rtr = router([{
    path: "/",
    component: Main
}, {
    path: "/about",
    component: About
}])

rtr.navigate("/about")

rtr.navigate("/faq")
//Argument of type '"/faq"' is not assignable to parameter of type '"/" | "/about"'.ts(2345)
