# 식품분류별 가장 비싼 식품의 정보 조회하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131116

## 문제 분류

: GROUP BY

## 풀이 과정

SELF JOIN을 사용해서 문제를 풀이할 수 있었다.

1. FOOD_PRODUCT를 F1으로 해서 데이터를 가져온다.
2. FOOD_PRODUCT를 F2로 가져온 후에 이 값이 F1의 PRICE와 같은 것들 중 CATEGORY별로 묶어서 가장 비싼 값(MAX(PRICE))인 정보만 병합한다.
3. 카테고리가 과자, 국, 김치, 식용유인 것들만 남긴다.
4. 카테고리별로 묶어준다.
5. 카테고리, 가격, 상품명의 컬럼을 선택한다.
6. 가격을 기준으로 내림차순해준다.

## 풀이 코드

```sql
SELECT F1.CATEGORY, F1.PRICE AS MAX_PRICE, F1.PRODUCT_NAME
FROM FOOD_PRODUCT AS F1 JOIN (
    SELECT MAX(PRICE) AS PRICE
    FROM FOOD_PRODUCT
    GROUP BY CATEGORY
) AS F2 ON F1.PRICE = F2.PRICE
WHERE F1.CATEGORY IN ('과자', '국', '김치', '식용유')
GROUP BY F1.CATEGORY
ORDER BY F1.PRICE DESC
```

## 다른 풀이

JOIN을 하지 않고 조건을 통해서 풀이할 수도 있었다.

```sql
SELECT CATEGORY, PRICE AS MAX_PRICE, PRODUCT_NAME
FROM FOOD_PRODUCT
WHERE CATEGORY IN ('과자', '국', '김치', '식용유')
  AND PRICE IN (
      SELECT MAX(PRICE)
      FROM FOOD_PRODUCT
      GROUP BY CATEGORY
    )
GROUP BY CATEGORY
ORDER BY PRICE DESC
```
