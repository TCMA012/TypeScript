/*
Partial
https://timmousk.com/blog/typescript-partial/
https://www.becomebetterprogrammer.com/typescript-partial-type/
https://netbasal.com/getting-to-know-the-partial-type-in-typescript-ecfcfbc87cb6
*/
//When you need to only update some fields in an existing object
interface IArticle {
    content: string;
    tags: string[];
    category: string;
}

const updatedArticle: Partial<IArticle> = {
    content: 'new content'
};

const update = (article: Partial<IArticle>): void => {
    // update the article here.
};

update({ content: 'new content' });



//When you need to pass constructor values to populate a new instance of the class
//JavaScript doesn’t support multiple constructors
class Article {
    public content!: string;
    public tags!: string[];
    public category!: string;

    public constructor(data: Partial<Article>) {
        Object.assign(this, data);
    }
}

const article = new Article({
    content: 'New content'
});



//a component that takes configuration object as Input() and you want to have a default value.
type ComponentConfig = {
    optionOne: string;
    optionTwo: string;
    optionThree: string;
}
export class SomeComponent {  
    private _defaultConfig: Partial<ComponentConfig> = {
        optionOne: '...'
    }
    @Input() config: ComponentConfig;

    ngOnInit() {
        const merged = { ...this._defaultConfig, ...this.config };
    }
}



//nested object
//using an interface with a type
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

interface IPerson {
    firstName: string;
    lastName: string;
    address: {
       city: string;
       country: string;
    }
}

const updatePerson: RecursivePartial<IPerson> = {
    address: {
        city: 'Montreal'
    },
    firstName: 'Tim',
};



//Make a property required and the rest optional
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

interface IPerson {
    firstName: string;
    lastName: string;
    password: string
    age: number;
}

type UpdatedPerson = AtLeast<IPerson, 'firstName'>;

//only the firstName field is a required field, the rest of the fields are optional
const updatedPerson: UpdatedPerson = {
    firstName: 'Tim'
};
