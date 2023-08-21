# Proyecto integrador DAIoT - Backend

## Correr back

cd carpeta backend/ node index.js

## Paquenes necesarios

```javascript
$ npm install --save express
$ npm install --save mysql
$ npm install --save cors
$ npm install commander
$ npm install moment --save 
```

## Cuestiones sobre mySQL

```sql
CREATE USER 'usuario'@'%' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON * . * TO 'usuario'@'%';
para poder acceder desde root
ALTER USER 'usuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'userPass';
```
