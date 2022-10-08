![banner](http://article.biliimg.com/bfs/article/9817fa4328a0025655f40f58b1bbad8894b3cac5.png)

## 💡 本文说明

本文使用 Bilibili-Markdown 编写，主要用于效果展示，简介和安装请点击下方链接查看

[https://github.com/LuckyPuppy514/Bilibili-Markdown](https://github.com/LuckyPuppy514/Bilibili-Markdown)

## 🌲 原生语法

### 1. 标题

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

```text
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```

### 2. 文本

**这是一段加粗文本**

~~这是一段删除文本~~

> 这是一段引用文本

```text
**这是一段加粗文本**

~~这是一段删除文本~~

> 这是一段引用文本
```

### 3. 代码块

围栏式

```java
system.out.println("hello world");
```

    ```java
    system.out.println("hello world");
    ```

缩进式

    console.log("hello world");

```text
# 4个空格或 TAB 键
    console.log("hello world");
```

### 4. 链接

站内链接: [https://space.bilibili.com/356927809](https://space.bilibili.com/356927809)

站外链接: [https://www.lckp.top](https://www.lckp.top)

```text
站内链接: [https://space.bilibili.com/356927809](https://space.bilibili.com/356927809)

站外链接: [https://www.lckp.top](https://www.lckp.top)
```

- 🔥 B站无法跳转外链，所以建议注明具体链接地址

### 5. 图片

![banner](http://article.biliimg.com/bfs/article/9817fa4328a0025655f40f58b1bbad8894b3cac5.png)

```text
![banner](http://article.biliimg.com/bfs/article/9817fa4328a0025655f40f58b1bbad8894b3cac5.png)
```

- 💡 B站不支持站外图片
- 💡 B站支持的格式，站外图片会自动上传并替换为B站链接
- 💡 B站不支持的格式，建议自行进行格式转换后上传
- 💡 复制或截图，粘贴到编辑器中，即可自动上传到B站

### 6. 表格

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格单元格 | 单元格单元格 | 单元格单元格 |

```text
| 左对齐 | 右对齐 | 居中对齐 |
| :----- | ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格单元格 | 单元格单元格 | 单元格单元格 |
```

- 💡 B站并不支持表格，表格会自动截图上传
- 💡 保存时建议全屏，以便截图更为准确
- 💡 有问题可以自行截图上传

### 7. 无序列表

- 第一项
- 第二项
- 第三项

```text
- 第一项
- 第二项
- 第三项
```

### 8. 有序列表

1. 第一项
2. 第二项
3. 第三项

```text
1. 第一项
2. 第二项
3. 第三项
```

### 9. 分割线

------------

```text
------------
```

### 10. 目录

```text
[TOC]
```

- 🔥 B站不支持跳转锚点，所以点击目录也无法跳转
- 🔥 多级目录，返回原编辑器后，会自动变乱
- 🔥 所以现阶段不建议使用

## 🅱️ B站专属

### 1. 字号

<span class="font-size-12">小字号</span>  
<span class="font-size-16">标准字号</span>  
<span class="font-size-20">大字号</span>  
<span class="font-size-23">特大字号</span>  

```html
<span class="font-size-12">小字号</span>  
<span class="font-size-16">标准字号</span>  
<span class="font-size-20">大字号</span>  
<span class="font-size-23">特大字号</span>  
```

### 2. 颜色

<span class="color-pink-03">赤</span>
<span class="color-yellow-04">橙</span>
<span class="color-yellow-02">黄</span>
<span class="color-green-03">绿</span>
<span class="color-lblue-03">青</span>
<span class="color-blue-02">蓝</span>
<span class="color-purple-04">紫</span>

```html
<span class="color-pink-03">赤</span>
<span class="color-yellow-04">橙</span>
<span class="color-yellow-02">黄</span>
<span class="color-green-03">绿</span>
<span class="color-lblue-03">青</span>
<span class="color-blue-02">蓝</span>
<span class="color-purple-04">紫</span>
```

### 3. 对齐

<p style="text-align: left;">左对齐</p>
<p style="text-align: center;">居中对齐</p>
<p style="text-align: right;">右对齐</p>

```text
<p style="text-align: left;">左对齐</p>
<p style="text-align: center;">居中对齐</p>
<p style="text-align: right;">右对齐</p>
```

### 4. 分割线

![cut-off-1](https://i0.hdslb.com/bfs/article/0117cbba35e51b0bce5f8c2f6a838e8a087e8ee7.png)

![cut-off-2](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png)

![cut-off-3](https://i0.hdslb.com/bfs/article/71bf2cd56882a2e97f8b3477c9256f8b09f361d3.png)

![cut-off-4](https://i0.hdslb.com/bfs/article/db75225feabec8d8b64ee7d3c7165cd639554cbc.png)

![cut-off-5](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png)

![cut-off-6](https://i0.hdslb.com/bfs/article/02db465212d3c374a43c60fa2625cc1caeaab796.png)

```text
![cut-off-1](https://i0.hdslb.com/bfs/article/0117cbba35e51b0bce5f8c2f6a838e8a087e8ee7.png)

![cut-off-2](https://i0.hdslb.com/bfs/article/4aa545dccf7de8d4a93c2b2b8e3265ac0a26d216.png)

![cut-off-3](https://i0.hdslb.com/bfs/article/71bf2cd56882a2e97f8b3477c9256f8b09f361d3.png)

![cut-off-4](https://i0.hdslb.com/bfs/article/db75225feabec8d8b64ee7d3c7165cd639554cbc.png)

![cut-off-5](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png)

![cut-off-6](https://i0.hdslb.com/bfs/article/02db465212d3c374a43c60fa2625cc1caeaab796.png)
```

## 🔆 进阶使用

大家可以发现，B站专属格式其实是采用 html + css 的方式实现的，所以懂 html + css 的小伙伴，可以自行探索，这边给出几种我尝试过的且支持的格式

### 1. 文字

<p style="text-align: center;">
<span style="font-size: 30px; color: red">字号，对齐，颜色</span>
</p>

```html
<p style="text-align: center;">
<span style="font-size: 30px; color: red">字号，对齐，颜色</span>
</p>
```

### 2. 图片

<p style="text-align: center; margin-bottom: -15px;">100x100</p>

<figure class="img-box" contenteditable="false">
<img referrerpolicy="no-referrer" alt="图片" width="100" height="100" src="http://article.biliimg.com/bfs/article/3e927f211d063b57cd39c4041ac2d07fd959726c.png">
</figure>

------------

<p style="text-align: center; margin-bottom: -15px;">200x200</p>

<figure class="img-box" contenteditable="false">
<img referrerpolicy="no-referrer" alt="图片" width="200" src="http://article.biliimg.com/bfs/article/3e927f211d063b57cd39c4041ac2d07fd959726c.png">
</figure>

```html
<p style="text-align: center; margin-bottom: -15px;">100x100</p>

<figure class="img-box" contenteditable="false">
<img referrerpolicy="no-referrer" alt="图片" width="100" height="100" src="http://article.biliimg.com/bfs/article/3e927f211d063b57cd39c4041ac2d07fd959726c.png">
</figure>

------------

<p style="text-align: center; margin-bottom: -15px;">200x200</p>

<figure class="img-box" contenteditable="false">
<img referrerpolicy="no-referrer" alt="图片" width="200" src="http://article.biliimg.com/bfs/article/3e927f211d063b57cd39c4041ac2d07fd959726c.png">
</figure>
```
