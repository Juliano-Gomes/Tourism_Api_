## My tourism webserver :

# 1-what is it ?

it's a nodejs v22 , fastify server , that handle http request from a frontEnd application,

# 2-what specific it handle with?

This webserver handles Get ,Post ,Put and Delete request from the front end.

# 3-Does this webserver use a database ? if yes,what is?

Yes,it does, this webserver uses pg (postgres) database to keep data .

# 4-what kind of route does it have?

This webserver has several routes , from create a user account,make login ,delete account,create a post,search for certain place , delete a post , update a post's description ,and get several post,this website also uses swagger to create a docs for the api , just run the project and visit : [Localhost](http://localhost:8011/docs)

# 5-Why did you create this webserver?

I was thinking in a website that you can go and just share the most beautiful places that you went , and motivate people to also visit that place , this should be helpful for tourism

# 6-bonus

This site uses multipart data [what allow you to receive data from user] , you can receive image,audio,video,even files. also use database to keep the data .

# 7-License

[MIT](https://choosealicense.com/licenses/mit/)

# 8-author

by Julien_007

# Initial steps to run the project :

1) Install

    ``yarn install ``
        OR
    ``yarn``

2) create a .env file
   ``bash         touch .env         ``
3) add your string connection on it ,such as :

```
    HOST =""
    PORT=number
    USER=""
    PASS=""
    DB=""  
```

4)run the project :

    ``npm run tour``

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
