# 가격대 별 상품 개수 구하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131530

## 문제 분류

: GROUP BY

## 풀이 과정

## 풀이 코드

```sql
SELECT TRUNCATE(PRICE, -4) AS PRICE_GROUP, COUNT(PRICE) AS PRODUCTS
FROM PRODUCT
GROUP BY PRICE_GROUP
ORDER BY PRICE_GROUP
```
