# 자동차 종류 별 특정 옵션이 포함된 자동차 수 구하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/151137

## 문제 분류

: GROUP BY

## 풀이 과정

1. CAR_RENTAL_COMPANY_CAR 테이블에서 데이터를 가져온다.
2. OPTIONS가 퉁풍시트, 열선시트, 가죽시트를 하나라도 포함하는 데이터만 남긴다.
3. CAR_TYPE별로 그룹화한다.
4. CAR_TYPE과 해당 포함되는 차의 수를 CARS로 해서 선택한다.
5. CAR_TYPE을 기준으로 오름차순 정렬한다.

## 풀이 코드

```sql
SELECT CAR_TYPE, COUNT(CAR_TYPE) AS CARS
FROM CAR_RENTAL_COMPANY_CAR
WHERE OPTIONS LIKE '%시트%'
GROUP BY CAR_TYPE
ORDER BY CAR_TYPE ASC
```

## 다른 풀이

정규식을 사용해서 풀이할 수도 있다.

```sql
SELECT CAR_TYPE, COUNT(CAR_ID) AS CARS
FROM CAR_RENTAL_COMPANY_CAR
WHERE OPTIONS REGEXP '통풍시트|열선시트|가죽시트'
GROUP BY CAR_TYPE
ORDER BY CAR_TYPE ASC
```
