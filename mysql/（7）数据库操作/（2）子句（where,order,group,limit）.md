
> 子句

```

子句之间是有顺序    
WHERE GROUP ORDER LIMIT     // 顺序不能倒，否则会报错 sh(i) px 4px
筛选  合并  排序  限制

SELECT class,COUNT(class) FROM student_table
WHERE score>60
GROUP BY class
ORDER BY COUNT(class) DESC
LIMIT 2;

```

> 子句: where  条件

```

WHERE name='blue'
WHERE age>18
WHERE age<=18
WHERE age>=18 AND score<60
WHERE cach>100 OR score>10000

ORDER 排序

```

> 子句: ORDER 排序

```

  ORDER BY age ASC/DESC
  ASC-升序(从小到大)
  DESC-降序(从大到小)
  
  实例：
    // 价格按升序排序
    ORDER BY price ASC

    // 价格(price)升序排序，如果价格相同，再按销量(sales)降序排序
    ORDER BY price ASC, sales DESC

```

> 子句: GROUP	聚类-合并相同

```

    // 数据源：统计每个班人数
    ID	class	name
    "1"	"1"	"小明"
    "2"	"2"	"小红"
    "3"	"1"	"小刚"
    "4"	"2"	"小华"
    "5"	"3"	"小强"
    "6"	"3"	"小四"
    "7"	"1"	"小刘"
    "8"	"1"	"小花"
    
    实例1：
        SELECT * FROM student_table;
        
        ID	class	name
        "1"	"1"	"小明"
        "2"	"2"	"小红"
        "3"	"1"	"小刚"
        "4"	"2"	"小华"
        "5"	"3"	"小强"
        "6"	"3"	"小四"
        "7"	"1"	"小刘"
        "8"	"1"	"小花"
    
    实例2：
        SELECT * FROM student_table GROUP BY class;
        
        ID	class	name
        "1"	"1"	"小明"
        "2"	"2"	"小红"
        "5"	"3"	"小强"
    
        SELECT class FROM student_table GROUP BY class;
        
        class
        "1"
        "2"
        "3"
    
        SELECT class,COUNT(class) FROM student_table GROUP BY class;
        
        class	COUNT(class)
        1	4
        2	2
        3	2

    ---------------------------------------------------
    
    GROUP配合COUNT、MIN、MAX、AVG才能发挥更大作用
    
    // 数据源
    ID	class	name	score
    1	 1	    小明	34
    2	 2	    小红	98
    3	 1	    小刚	26
    4	 2	    小华	99
    5	 3	    小强	18
    6	 3	    小四	95
    7	 1	    小刘	57
    8	 1	    小花	100
    
    // 统计每个班的平均分
    SELECT class,AVG(score) FROM student_table GROUP BY class
    
    class	score
    1	    54.25
    2	    98.5
    3	    56.5
    
    // 每个班级的最高、最低分
    SELECT class,MAX(score),MIN(score) FROM student_table GROUP BY class
    
    ID	class	name	score
    1	 1	    小明	34
    2	 2	    小红	98
    3	 1	    小刚	26
    4	 2	    小华	99
    5	 3	    小强	18
    6	 3	    小四	95
    7	 1	    小刘	57
    8	 1	    小花	100
    
    --------------------------------------------------------------------
    
    // 数据源
    
    ID	name	price
    1	blue	3
    2	blue	5
    3	张三	28000
    4	李四	81000
    5	blue	4
    6	张三	46000
    7	李四	38000
    8	赵六	18
    
    // 每个人的消费总额
    SELECT name,SUM(price) FROM sales_table GROUP BY name
    
    // 消费总额降序排列
    SELECT name,SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) DESC
    
    name	SUM(price)
    李四	119000
    张三	74000
    赵六	18
    blue	12
    
    // 消费总额升序排列
    SELECT name,SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) ASC
    
    

```

> 子句: LIMIT-限制输出

```

 LIMIT 10;	前10条
 LIMIT 5,8;	从5开始，要8个

分页：
 每页20条

第1页	0,20	0~19
第2页	20,20	20~39
第3页	40,20
第n页	(n-1)*20,20




```