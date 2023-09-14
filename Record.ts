/*
TypeScript Record
https://timmousk.com/blog/typescript-record/
https://dmitripavlutin.com/typescript-record/
https://type-level-typescript.com/objects-and-records#records
https://itnext.io/use-typescript-record-types-for-better-code-ce1768c6cb53
https://dev.to/mnathani/how-the-typescript-record-type-works-4c8
https://www.copycat.dev/blog/typescript-record/
*/
type Status = 'error' | 'success';

const statusImages: Record<Status, string> = {
  error: 'image1.png',
  success: 'image2.png'
};



{
enum Status {
  'error' = 'error',
  'success' = 'success',
}

const statusImages: Record<Status, string> = {
  error: 'image1.png',
  success: 'image2.png',
};
}



interface RoleInfo {
  image: string;
  icon: string;
}

type Role = 'admin' | 'user';

const roleInfo: Record<Role, RoleInfo> = {
  admin: {
    image: 'image1.png',
    icon: 'icon1.svg'
  },
  user: {
    image: 'image2.png',
    icon: 'icon2.svg'
  }
};




/*
Use the Record type when using the values of a union type or an enum as properties.
Use the index signature on generic objects with key names that you don't know in advance.
*/
type Roles = 'admin' | 'manager';

const rolesImages: Record<Roles, string> = {
  admin: 'image1.png',
  manager: 'image2.png',
};

const genericImages: { [key: string]: string } = {
  admin: 'image1.png',
  role3: 'image3.png',
  role4: 'image3.png',
};

//to iterate over a Record
for (const role in rolesImages) {
  console.log(role);
}
