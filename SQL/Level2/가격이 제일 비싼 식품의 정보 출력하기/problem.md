# 가격이 제일 비싼 식품의 정보 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131115

## 문제 분류

: SUM, MAX, MIN

## 풀이 과정

테이블에서 가격이 가장 비싼 상품의 행을 가져오기 위해서는 다음과 같이 수행할 수 있다.

1. FOOD_PRODUCT 테이블에서 데이터를 가져온다.
2. PRICE 컬럼과 FOOD_PRODUCT 테이블에서 가장 높은 PRICE 값을 비교해 같은 값만 남긴다.
3. 모든 컬럼을 선택해서 출력한다.

## 풀이 코드

```sql
SELECT *
FROM FOOD_PRODUCT
WHERE PRICE = (SELECT MAX(PRICE) FROM FOOD_PRODUCT)
```

## 다른 코드

ORDER BY와 LIMIT를 사용해서 풀이할 수도 있다.

```sql
SELECT *
FROM FOOD_PRODUCT
ORDER BY PRICE DESC
LIMIT 1
```
