# 평균 일일 대여 요금 구하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/151136

## 문제 분류

: SELECT

## 풀이 과정

1. CAR_RENTAL_COMPANY_CAR에서 DAILY_FEE 컬럼 선택하기
2. CAR_TYPE이 SUV인 자동차들을 골라야하므로 WHERE 조건문 붙여주기
3. AVG를 통해 평균을 구하고 ROUND를 통해 소수점 첫째자리에서 반올림 해주기
4. AS를 통해 컬럼명을 AVERAGE_FEE로 지정

## 풀이 코드

```sql
SELECT ROUND(AVG(DAILY_FEE), 0) AS AVERAGE_FEE
FROM CAR_RENTAL_COMPANY_CAR
WHERE CAR_TYPE = 'SUV'
```
