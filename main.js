const pg = require('pg');
const fs = require('fs');
const fetch = require("node-fetch");

const url = 'https://jsonplaceholder.typicode.com';

// const connectionString = 'postgres://vaibhav:password123@localhost:5432/vkdb';
const connectionString = 'postgres://fchhltfc:vcyFNRGGWwzAIXdQPiTMXcEXz5nYAYLV@satao.db.elephantsql.com:5432/fchhltfc';

var sqlCreateTables = fs.readFileSync('createTables.sql').toString();

const client = new pg.Client(connectionString);

client
.connect()
.then(() => console.log('Postgres Connected'))
.catch(err => console.log('Connection error',err.stack));

//Function for filling the users
const fillUsersData = async url => {
  try{
    const users = await fetch(url+'/users');
    const usersArray = await users.json();
    var str = '';
    for(var i = 0;i<usersArray.length;i++){
      str += `INSERT INTO users(id, name_str, username, email, address_str, phone, website, company) VALUES (${usersArray[i].id}, '${usersArray[i].name}', '${usersArray[i].username}', '${usersArray[i].email}', '${JSON.stringify(usersArray[i].address)}', '${usersArray[i].phone}', '${usersArray[i].website}', '${JSON.stringify(usersArray[i].company)}');`;
    }
    const response = await client.query(str);
  }catch (error){
      console.log(error);
    }
};

//Function for filling the posts
const fillPostsData = async url => {
  try{
    const posts = await fetch(url+'/posts');
    const postsArray = await posts.json();
    var str = '';
    for(var i = 0;i<postsArray.length;i++){
      str += `INSERT INTO posts(id,userId,title,body) VALUES (${postsArray[i].id},${postsArray[i].userId},'${postsArray[i].title}','${postsArray[i].body}');`;
    }
    const response = await client.query(str);
  }catch (error){
      console.log(error);
    }
};

//Function for filling the comments
const fillCommentsData = async url => {
  try{
    const comments = await fetch(url+'/comments');
    const commentsArray = await comments.json();
    var str = '';
    for(var i = 0;i<commentsArray.length;i++){
      str += `INSERT INTO comments(id, postId , name_str, email, body) VALUES (${commentsArray[i].id}, ${commentsArray[i].postId}, '${commentsArray[i].name}', '${commentsArray[i].email}', '${commentsArray[i].body}');`;
    }
    const response = await client.query(str);
  }catch (error){
      console.log(error);
    }
};

//Function for filling the albums
const fillAlbumsData = async url => {
  try{
    const albums = await fetch(url+'/albums');
    const albumsArray = await albums.json();
    var str = '';
    for(var i = 0;i<albumsArray.length;i++){
      str += `INSERT INTO albums(id, userId , title) VALUES (${albumsArray[i].id}, ${albumsArray[i].userId}, '${albumsArray[i].title}');`;
    }
    const response = await client.query(str);
  }catch (error){
      console.log(error);
    }
};

//Function for filling the photos
const fillPhotosData = async url => {
  try{
    const photos = await fetch(url+'/photos');
    const photosArray = await photos.json();
    var str = '';
    for(var i = 0;i<photosArray.length;i++){
      str += `INSERT INTO photos(id, albumId , title, url_str, thumbnailUrl) VALUES (${photosArray[i].id},${photosArray[i].albumId}, '${photosArray[i].title}', '${photosArray[i].url}', '${photosArray[i].thumbnailUrl}');`;
    }
    const response = await client.query(str);
  }catch (error){
      console.log(error);
    }
};

//Function for filling the todos
const fillTodosData = async url => {
  try{
    const todos = await fetch(url+'/todos');
    const todosArray = await todos.json();
    var str = '';
    for(var i = 0;i<todosArray.length;i++){
      str += `INSERT INTO todos(id, userId , title, completed) VALUES (${todosArray[i].id}, ${todosArray[i].userId}, '${todosArray[i].title}', ${todosArray[i].completed});`;
    }
    const response = await client.query(str);
  }catch (error){
      console.log(error);
    }
};

//Main function
const fillData = async url => {
  try{
    // Creating Tables
    await client.query(sqlCreateTables);

    //Filling Values
    await fillUsersData(url);
    await fillPostsData(url);
    await fillCommentsData(url);
    await fillAlbumsData(url);
    await fillPhotosData(url);
    await fillTodosData(url);
    client.end();

  } catch (error){
    console.log(error);
  }
};

fillData(url);
  









