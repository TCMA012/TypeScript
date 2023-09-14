/*
Type VS Interface
https://timmousk.com/blog/typescript-type-vs-interface/

The most important differences between a type vs interface are:
An interface can participate in declaration merging, but a type cannot.
An interface cannot declare a primitive (number, string, tuple, etc...), but a type can.
Only a type can use mapped properties.
*/
//Primitive Types !
type AString = string;
type BNumber = number;
type CBoolean = boolean;
type DArray = string[];
type EUnknown = unknown;
type FAny = any;
type GNull = null;
type HUndefined = undefined;



//Declaration Merging !
interface IArticle {
    content: string;
}

interface IArticle {
    category: string;
}

const article: IArticle = {
    category: 'news',
    content: 'new content'
};



//can only use mapped properties with a type !
type MyConfig<T> = {
    [Property in keyof T]: string;
};



//extends
interface IArticleContent { 
    content: string;
}

interface IArticle extends IArticleContent { 
    category: string;
}



type ArticleContent = { 
    content: string;
}

type Article = ArticleContent & { 
    category: string;
}



//implements
{
interface IArticle { 
    category: string;
    content: string;
}

class Article implements IArticle {
    public category = '';
    public content = '';
}
}

{
type MyArticle = { 
    category: string;
    content: string;
}

class Article implements MyArticle {
    public category = '';
    public content = '';
}
}




//A tuple can only be declared with a type
type MyTuple = [ string, number ];



{
//Intersection types allow the developer to merge two or more type declarations into one.
type MyArticle = {
    content: string;
}

type ArticleContent = {
    category: string;
}

type Article = MyArticle & ArticleContent;

const article: Article = {
    category: 'news',
    content: 'new content'
};


{
interface IArticle {
    content: string;
}

interface IArticleContent {
    category: string;
}

type Article = IArticle & IArticleContent;

const article: Article = {
    category: 'news',
    content: 'new content'
}; 
}
}



//union
type Cat = {
    name: string;
};

type Dog = {
    name: string;
};

type Animal = Cat | Dog;


{
interface ICat {
    name: string;
}

interface IDog {
    name: string;
}

type Animal = ICat | IDog;
}


