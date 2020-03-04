# API
GET: /counter
{
    points: 2543,
    nextUnlockBy: 4000
}
POST: /counter/increase
{
    amount: 20
}
GET: /faces
{
    [
        face: {
            amount: 30,
            url: "./images/blabla.jpg"
        }, 
        face: {
            ...
        }
    ]
}
POST: /faces/add
{
    face: {
        amount: 40,
        url: "image.jpg"
    }
}

# DB Schema:

## Semester
| SemesterId | SemesterDate | Points |
| ---------- | ------------ | ------ |
|     1      |  2020-06-01  | 444444 |
## Faces
| FaceId | Url | Amount | SemesterFK |
| ------ | --- | ------ | ---------- |
|    1   | img |   50   |     1      |