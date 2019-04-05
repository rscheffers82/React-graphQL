Test Queries for the GraphQL playground

```
#Get all dogs
query getAllDogs {
  dogs {
    name
  }
}

#create a new dog
mutation createADog {
  createDog(name: "Joost") {
    name
  }
}
```