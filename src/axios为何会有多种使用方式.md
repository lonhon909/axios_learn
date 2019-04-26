## axios为何会有多种使用方式

###### 第1种使用方式：<font color=#FF0000 >axios(option)</font>
```js
axios({
  url,
  method,
  headers,
})
```

###### 第2种使用方式：<font color=#FF0000 >axios(url[, option])</font>
```js
axios(url, {
  method,
  headers,
})
```

###### 第3种使用方式（对于get、delete等方法）：<font color=#FF0000 >axios[method](url[, option])</font>
```js
axios.get(url, {
  headers,
})
```

###### 第4种使用方式（对于post、put等方法）：<font color=#FF0000 >axios[method](url[, data[, option]])</font>
```js
axios.post(url, data, {
  headers,
})
```

###### 第5种使用方式：<font color=#FF0000 >axios.request(option)</font>
```js
axios.request({
  url,
  method,
  headers,
})
```







