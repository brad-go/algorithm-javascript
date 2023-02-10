# 자동차 대여 기록에서 대여중 대여 가능 여부 구분하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/157340

## 문제 분류

: GROUP BY

## 풀이 과정

1. CAR_RENTAL_COMPANY_RENTAL_HISTORY에서 데이터를 가져온다.
2. CAR_ID별로 그룹화한다.
3. 서브 쿼리르 이용해 '2022-10-16'에 대여중인 차량을 IF문을 이용해 대여중이라면 대여중, 아니라면 대여 가능을 값으로 AVAILABILITY라는 컬럼을 만든다.
4. CAR_ID와 AVAILABILITY를 선택한다.
5. CAR_ID를 기준으로 내림차순한다.

## 풀이 코드

```sql
SELECT CAR_ID, IF(
  CAR_ID IN (
    SELECT CAR_ID
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    WHERE '2022-10-16' BETWEEN START_DATE AND END_DATE
  ), '대여중', '대여 가능'
) AS AVAILABILITY
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY CAR_ID
ORDER BY CAR_ID DESC
```

## 다른 풀이

SUM을 이용해 조건에 부합하는 값을 취합해서 풀이

```sql
SELECT CAR_ID, IF(
  SUM(IF('2022-10-16' BETWEEN START_DATE AND END_DATE, 1, 0)) > 0, '대여중', '대여 가능') AS AVAILABILITY
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY CAR_ID
ORDER BY CAR_ID DESC
```
