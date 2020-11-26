// interface Human {
//   name: string,
//   age: number,
//   gender: string
// }

class Human {
  public name: string;
  public age: number;
  public gender: string;
  // typescript 에서만 적용 가능한 public, private(보호 가능 -> 밖에서 호출, 변경 불가능) 속성
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const yuna = new Human("Yuna", 20, "female");

const person = {
  name: "yooooong",
  age: 20,
  gender: "female",
};

const name = "Yuna",
  age = 20,
  gender = "female";

const sayHi = (person: Human): string => {
  return `Hello My name is ${person.name} ${person.age} ${person.gender}`;
};

console.log(sayHi(person));

export {};
